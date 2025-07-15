// src/app/api/webhook/twilio-voice/route.ts
import { NextRequest, NextResponse } from 'next/server'

// Cache simple en mémoire pour réduire la latence
const responseCache = new Map<string, any>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Paramètres voix inspirés de ton Retell.ai JSON
const VOICE_CONFIG = {
  voice: "Polly.Celine",
  rate: "1.12", // voice_speed de ton Retell.ai
  volume: "1.9", // volume de ton Retell.ai  
  temperature: "0.9" // voice_temperature de ton Retell.ai
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const params = new URLSearchParams(body)
    const speechResult = params.get('SpeechResult')
    const confidence = params.get('Confidence')
    const from = params.get('From') || 'Numéro inconnu'
    const callSid = params.get('CallSid') || 'unknown'

    console.log('🎤 Appel Twilio reçu:', { speechResult, confidence, from, callSid })

    // Premier appel - Salutation avec paramètres Retell.ai
    if (!speechResult || speechResult.trim() === '') {
      const welcomeTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="${VOICE_CONFIG.voice}" language="fr-FR">
    <prosody rate="${VOICE_CONFIG.rate}" volume="${VOICE_CONFIG.volume}" pitch="+3%">
      Bonjour ! Coccinelle point A I, votre agence immobilière intelligente. Je peux vous aider à trouver votre bien idéal. Que recherchez-vous ?
    </prosody>
  </Say>
  <Gather input="speech" 
          language="fr-FR" 
          speechTimeout="3" 
          timeout="8"
          action="https://coccinelle-ai.vercel.app/api/webhook/twilio-voice"
          method="POST">
    <Say voice="${VOICE_CONFIG.voice}" language="fr-FR">
      <prosody rate="1.05" volume="${VOICE_CONFIG.volume}">Je vous écoute...</prosody>
    </Say>
  </Gather>
  <Say voice="${VOICE_CONFIG.voice}" language="fr-FR">
    <prosody rate="1.0" volume="${VOICE_CONFIG.volume}">
      Contactez-nous au 05 82 95 27 87. Au revoir !
    </prosody>
  </Say>
</Response>`

      return new NextResponse(welcomeTwiml, {
        status: 200,
        headers: {
          'Content-Type': 'text/xml; charset=utf-8',
          'Cache-Control': 'no-cache',
        },
      })
    }

    // Vérifier cache pour réponses similaires (optimisation latence)
    const cacheKey = speechResult.toLowerCase().trim()
    const cached = responseCache.get(cacheKey)
    
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      console.log('📋 Réponse depuis cache:', cacheKey)
      return new NextResponse(cached.twiml, {
        status: 200,
        headers: { 'Content-Type': 'text/xml; charset=utf-8' }
      })
    }

    // Vérifier les mots de fin (optimisé)
    const endWords = ['merci', 'au revoir', 'bye', 'stop', 'fini', 'c\'est tout', 'termine']
    const shouldEnd = speechResult && endWords.some(word => 
      speechResult.toLowerCase().includes(word)
    )

    if (shouldEnd) {
      console.log('🔚 Fin de conversation détectée')
      const goodbyeTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="${VOICE_CONFIG.voice}" language="fr-FR">
    <prosody rate="${VOICE_CONFIG.rate}" volume="${VOICE_CONFIG.volume}" pitch="+2%">
      Merci pour votre appel ! Pour organiser une visite, contactez-nous au 05 82 95 27 87. Excellente journée !
    </prosody>
  </Say>
</Response>`

      return new NextResponse(goodbyeTwiml, {
        status: 200,
        headers: { 'Content-Type': 'text/xml; charset=utf-8' }
      })
    }

    // APPEL IA OPTIMISÉ avec timeout réduit
    if (speechResult && speechResult.trim() !== '') {
      console.log('🤖 Appel IA optimisé...')
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000) // 3s timeout
      
      try {
        const aiResponse = await fetch('https://coccinelle-ai.vercel.app/api/ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: speechResult,
            prospectInfo: {
              phone: from,
              source: 'twilio_voice_optimized',
              confidence: confidence,
              callSid: callSid
            }
          }),
          signal: controller.signal
        })

        clearTimeout(timeoutId)

        if (aiResponse.ok) {
          const aiData = await aiResponse.json()
          console.log('✅ Réponse IA reçue (optimisée)')
          
          let responseText = aiData.response

          // Enrichissement optimisé avec biens trouvés
          if (aiData.matchingProperties?.length > 0) {
            const property = aiData.matchingProperties[0]
            const priceText = property.transaction_type === 'rent' 
              ? `${property.price} euros par mois` 
              : `${property.price} euros`
            
            responseText += ` Nous avons ${property.title} à ${priceText}, ${property.surface_area} m², ${property.address}.`
            
            if (aiData.matchingProperties.length > 1) {
              responseText += ` Plus ${aiData.matchingProperties.length - 1} autre${aiData.matchingProperties.length > 2 ? 's' : ''} bien${aiData.matchingProperties.length > 2 ? 's' : ''} disponible${aiData.matchingProperties.length > 2 ? 's' : ''}.`
            }
          }

          // Nettoyage optimisé du texte
          const cleanText = responseText
            .replace(/[<>&"']/g, '')
            .replace(/\s+/g, ' ')
            .trim()
            .substring(0, 400) // Limiter pour réduire latence

          // SSML optimisé pour voix naturelle (paramètres exacts Retell.ai)
          const conversationTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="${VOICE_CONFIG.voice}" language="fr-FR">
    <prosody rate="${VOICE_CONFIG.rate}" volume="${VOICE_CONFIG.volume}" pitch="+5%">
      ${cleanText}
    </prosody>
  </Say>
  <Gather input="speech" 
          language="fr-FR" 
          speechTimeout="4" 
          timeout="10"
          action="https://coccinelle-ai.vercel.app/api/webhook/twilio-voice"
          method="POST">
    <Say voice="${VOICE_CONFIG.voice}" language="fr-FR">
      <prosody rate="1.05" volume="${VOICE_CONFIG.volume}">
        Avez-vous d'autres questions sur nos biens ?
      </prosody>
    </Say>
  </Gather>
  <Say voice="${VOICE_CONFIG.voice}" language="fr-FR">
    <prosody rate="1.0" volume="${VOICE_CONFIG.volume}">
      Contactez-nous au 05 82 95 27 87. Merci et à bientôt !
    </prosody>
  </Say>
</Response>`

          // Mettre en cache la réponse (optimisation)
          responseCache.set(cacheKey, {
            twiml: conversationTwiml,
            timestamp: Date.now()
          })

          return new NextResponse(conversationTwiml, {
            status: 200,
            headers: { 'Content-Type': 'text/xml; charset=utf-8' }
          })
        }
      } catch (error) {
        clearTimeout(timeoutId)
        console.error('❌ Erreur IA ou timeout:', error)
      }
    }

    // Fallback optimisé
    const fallbackTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="${VOICE_CONFIG.voice}" language="fr-FR">
    <prosody rate="${VOICE_CONFIG.rate}" volume="${VOICE_CONFIG.volume}">
      Je rencontre une difficulté. Pour être mis en relation, appelez le 05 82 95 27 87. Merci.
    </prosody>
  </Say>
</Response>`

    return new NextResponse(fallbackTwiml, {
      status: 200,
      headers: { 'Content-Type': 'text/xml; charset=utf-8' }
    })

  } catch (error) {
    console.error('❌ Erreur webhook Twilio:', error)
    
    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="${VOICE_CONFIG.voice}" language="fr-FR">
    <prosody rate="1.0" volume="${VOICE_CONFIG.volume}">
      Erreur technique. Contactez le 05 82 95 27 87. Au revoir.
    </prosody>
  </Say>
</Response>`
    
    return new NextResponse(errorTwiml, {
      status: 200,
      headers: { 'Content-Type': 'text/xml; charset=utf-8' }
    })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Agent IA Twilio Optimisé - Paramètres Retell.ai',
    status: 'active',
    voice_config: VOICE_CONFIG,
    optimizations: [
      'Cache réponses similaires (5min)',
      'Timeout IA réduit (3s)',
      'Voix Polly.Celine avec paramètres Retell.ai',
      'voice_speed: 1.12 (comme Retell.ai)',
      'volume: 1.9 (comme Retell.ai)',
      'speechTimeout optimisé (3-4s)',
      'Texte limité 400 chars'
    ],
    elevenlabs_integration: 'Disponible via endpoint séparé'
  })
}
