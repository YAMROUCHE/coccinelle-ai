// src/app/api/voice/jambonz-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const webhookData = await request.json()
    console.log('🎤 Webhook Jambonz reçu:', JSON.stringify(webhookData, null, 2))

    // Premier appel - Salutation IA
    if (!webhookData.speech && !webhookData.dtmf) {
      console.log('🎯 Premier appel - Salutation')
      
      const welcomeResponse = [
        {
          verb: 'say',
          text: "Bonjour ! Vous êtes en ligne avec Coccinelle point A I, votre agence immobilière intelligente. Je suis votre assistante IA et je peux vous aider à trouver le bien de vos rêves. Dites-moi ce que vous recherchez.",
          synthesizer: {
            vendor: 'google',
            voice: 'fr-FR-Wavenet-C'
          }
        },
        {
          verb: 'gather',
          input: ['speech'],
          actionHook: 'https://coccinelle-ai.vercel.app/api/voice/jambonz-webhook',
          speechTimeout: 5,
          speechRecognizer: {
            vendor: 'google',
            language: 'fr-FR'
          }
        }
      ]
      
      return NextResponse.json(welcomeResponse)
    }

    // Traitement de la parole avec TON IA
    if (webhookData.speech?.alternatives?.[0]?.transcript) {
      const transcript = webhookData.speech.alternatives[0].transcript
      console.log(`🗣️ Transcript reçu: "${transcript}"`)

      // Vérifier les mots de fin de conversation
      const endWords = ['merci', 'au revoir', 'goodbye', 'bye', 'stop', 'terminer', 'fini']
      const shouldEnd = endWords.some(word => 
        transcript.toLowerCase().includes(word)
      )

      if (shouldEnd) {
        console.log('🔚 Fin de conversation détectée')
        return NextResponse.json([
          {
            verb: 'say',
            text: "Merci pour votre appel ! Pour organiser une visite ou obtenir plus d'informations, contactez-nous au 05 82 95 27 87. Excellente journée !",
            synthesizer: {
              vendor: 'google',
              voice: 'fr-FR-Wavenet-C'
            }
          },
          { verb: 'hangup' }
        ])
      }

      // APPEL À TON IA PROPRIÉTAIRE
      console.log('🤖 Appel à l\'IA...')
      const aiResponse = await fetch('https://coccinelle-ai.vercel.app/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: transcript,
          prospectInfo: {
            phone: webhookData.from || 'Numéro inconnu',
            source: 'jambonz_us_test',
            callId: webhookData.call_sid
          }
        })
      })

      if (aiResponse.ok) {
        const aiData = await aiResponse.json()
        console.log('✅ Réponse IA reçue:', aiData.response)
        
        let responseText = aiData.response

        // Ajouter les biens trouvés de manière naturelle
        if (aiData.matchingProperties?.length > 0) {
          const property = aiData.matchingProperties[0]
          const priceText = property.transaction_type === 'rent' 
            ? `${property.price} euros par mois` 
            : `${property.price} euros`
          
          responseText += ` Nous avons trouvé ${property.title}, au prix de ${priceText}, d'une surface de ${property.surface_area} mètres carrés.`
        }

        // Continuer la conversation
        const response = [
          {
            verb: 'say',
            text: responseText,
            synthesizer: {
              vendor: 'google',
              voice: 'fr-FR-Wavenet-C'
            }
          },
          {
            verb: 'gather',
            input: ['speech'],
            actionHook: 'https://coccinelle-ai.vercel.app/api/voice/jambonz-webhook',
            speechTimeout: 8,
            speechRecognizer: {
              vendor: 'google',
              language: 'fr-FR'
            },
            say: {
              text: "Avez-vous d'autres questions ou souhaitez-vous plus de détails ?",
              synthesizer: {
                vendor: 'google',
                voice: 'fr-FR-Wavenet-C'
              }
            }
          }
        ]

        return NextResponse.json(response)
      } else {
        console.error('❌ Erreur appel IA:', aiResponse.status)
      }
    }

    // Gestion des timeouts ou autres cas
    if (webhookData.reason === 'no-input' || webhookData.reason === 'timeout') {
      console.log('⏰ Timeout détecté')
      return NextResponse.json([
        {
          verb: 'say',
          text: "Je n'ai pas bien entendu. Pour plus d'informations, contactez-nous directement au 05 82 95 27 87. Au revoir !",
          synthesizer: {
            vendor: 'google',
            voice: 'fr-FR-Wavenet-C'
          }
        },
        { verb: 'hangup' }
      ])
    }

    // Fallback général
    console.log('🔄 Fallback général')
    const fallbackResponse = [
      {
        verb: 'say',
        text: "Je vous remercie de votre appel. Pour être mis en relation avec un conseiller, contactez-nous au 05 82 95 27 87. Au revoir !",
        synthesizer: {
          vendor: 'google',
          voice: 'fr-FR-Wavenet-C'
        }
      },
      { verb: 'hangup' }
    ]

    return NextResponse.json(fallbackResponse)

  } catch (error) {
    console.error('❌ Erreur webhook Jambonz:', error)
    return NextResponse.json([
      {
        verb: 'say',
        text: "Erreur technique. Contactez-nous au 05 82 95 27 87. Au revoir.",
        synthesizer: { 
          vendor: 'google', 
          voice: 'fr-FR-Wavenet-C' 
        }
      },
      { verb: 'hangup' }
    ])
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Webhook Jambonz IA Conversationnel',
    status: 'active',
    endpoint: '/api/voice/jambonz-webhook'
  })
}
