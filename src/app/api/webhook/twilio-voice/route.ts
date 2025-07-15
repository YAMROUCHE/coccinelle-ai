// src/app/api/webhook/twilio-voice/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const params = new URLSearchParams(body)
    const speechResult = params.get('SpeechResult')
    const confidence = params.get('Confidence')
    const from = params.get('From') || 'Numéro inconnu'
    
    console.log('🎤 Appel Twilio reçu:', {
      speechResult,
      confidence,
      from,
      bodyParams: body.substring(0, 200)
    })

    // Premier appel - Salutation et demande
    if (!speechResult || speechResult.trim() === '') {
      const welcomeTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Celine" language="fr-FR">
    Bonjour ! Vous êtes en ligne avec Coccinelle point A I, votre agence immobilière intelligente. Je suis votre assistante IA et je peux vous aider à trouver le bien de vos rêves. Dites-moi ce que vous recherchez.
  </Say>
  <Gather input="speech" 
          language="fr-FR" 
          speechTimeout="5" 
          timeout="10"
          action="https://coccinelle-ai.vercel.app/api/webhook/twilio-voice"
          method="POST">
    <Say voice="Polly.Celine" language="fr-FR">Je vous écoute...</Say>
  </Gather>
  <Say voice="Polly.Celine" language="fr-FR">
    Je n'ai pas bien entendu. Pour plus d'informations, contactez-nous au 05 82 95 27 87. Au revoir !
  </Say>
</Response>`

      return new NextResponse(welcomeTwiml, {
        status: 200,
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
        },
      })
    }

    // Traitement de la réponse avec l'IA
    console.log(`🗣️ Parole détectée: "${speechResult}" (confiance: ${confidence})`)

    // Vérifier les mots de fin
    const endWords = ['merci', 'au revoir', 'goodbye', 'bye', 'stop', 'terminer', 'fini', 'c\'est tout']
    const shouldEnd = speechResult && endWords.some(word => 
      speechResult.toLowerCase().includes(word)
    )

    if (shouldEnd) {
      console.log('🔚 Fin de conversation détectée')
      const goodbyeTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Celine" language="fr-FR">
    Merci pour votre appel ! Pour organiser une visite ou obtenir plus d'informations, contactez-nous au 05 82 95 27 87. Excellente journée !
  </Say>
</Response>`

      return new NextResponse(goodbyeTwiml, {
        status: 200,
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
        },
      })
    }

    // APPEL À TON IA IMMOBILIERE (seulement si on a du texte)
    if (speechResult && speechResult.trim() !== '') {
      console.log('🤖 Appel à l\'IA immobilière...')
      const aiResponse = await fetch('https://coccinelle-ai.vercel.app/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: speechResult,
          prospectInfo: {
            phone: from,
            source: 'twilio_voice_call',
            confidence: confidence
          }
        })
      })

    if (aiResponse.ok) {
      const aiData = await aiResponse.json()
      console.log('✅ Réponse IA reçue:', aiData.response)
      
      let responseText = aiData.response

      // Enrichir avec les biens trouvés
      if (aiData.matchingProperties?.length > 0) {
        const property = aiData.matchingProperties[0]
        const priceText = property.transaction_type === 'rent' 
          ? `${property.price} euros par mois` 
          : `${property.price} euros`
        
        responseText += ` Nous avons trouvé pour vous ${property.title}, au prix de ${priceText}, d'une surface de ${property.surface_area} mètres carrés, situé ${property.address}.`
        
        // Ajouter d'autres biens s'il y en a
        if (aiData.matchingProperties.length > 1) {
          responseText += ` Nous avons également ${aiData.matchingProperties.length - 1} autre${aiData.matchingProperties.length > 2 ? 's' : ''} bien${aiData.matchingProperties.length > 2 ? 's' : ''} qui pourrai${aiData.matchingProperties.length > 2 ? 'ent' : 't'} vous intéresser.`
        }
      }

      // Nettoyer le texte pour TwiML (enlever caractères spéciaux)
      const cleanText = responseText
        .replace(/[<>&"']/g, (match) => {
          const entities: { [key: string]: string } = {
            '<': '', '>': '', '&': 'et', '"': '', "'": ''
          }
          return entities[match]
        })
        .replace(/\s+/g, ' ')
        .trim()

      // Continuer la conversation
      const conversationTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Celine" language="fr-FR">
    ${cleanText}
  </Say>
  <Gather input="speech" 
          language="fr-FR" 
          speechTimeout="8" 
          timeout="15"
          action="https://coccinelle-ai.vercel.app/api/webhook/twilio-voice"
          method="POST">
    <Say voice="Polly.Celine" language="fr-FR">
      Avez-vous d'autres questions ou souhaitez-vous plus de détails sur un bien en particulier ?
    </Say>
  </Gather>
  <Say voice="Polly.Celine" language="fr-FR">
    Pour organiser une visite, contactez-nous au 05 82 95 27 87. Merci et à bientôt !
  </Say>
</Response>`

      return new NextResponse(conversationTwiml, {
        status: 200,
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
        },
      })
    } else {
      console.error('❌ Erreur appel IA:', aiResponse.status)
    }
    } else {
      console.log('⚠️ Pas de texte reçu de la reconnaissance vocale')
    }

    // Fallback en cas d'erreur IA
    const fallbackTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Celine" language="fr-FR">
    Je rencontre une petite difficulté technique. Pour être mis en relation avec un conseiller, appelez-nous directement au 05 82 95 27 87. Merci de votre compréhension.
  </Say>
</Response>`

    return new NextResponse(fallbackTwiml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
      },
    })

  } catch (error) {
    console.error('❌ Erreur webhook Twilio:', error)
    
    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Celine" language="fr-FR">
    Erreur technique. Contactez-nous au 05 82 95 27 87. Au revoir.
  </Say>
</Response>`
    
    return new NextResponse(errorTwiml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
      },
    })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Agent IA Conversationnel Immobilier Complet',
    status: 'active',
    features: [
      'Voix française naturelle (Polly.Celine)',
      'Reconnaissance vocale temps réel',
      'IA conversationnelle intégrée',
      'Recherche de biens immobiliers',
      'Gestion de conversation fluide',
      'Détection de fin de conversation'
    ]
  })
}
