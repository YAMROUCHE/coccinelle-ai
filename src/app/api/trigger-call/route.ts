// src/app/api/trigger-call/route.ts
// API pour déclencher les appels Twilio depuis coccinelle.ai (App Router)

import { NextRequest, NextResponse } from 'next/server'

// Import Twilio dynamiquement pour éviter les erreurs côté client
let twilioClient: any = null

async function getTwilioClient() {
    if (!twilioClient) {
        const twilio = await import('twilio')
        twilioClient = twilio.default(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        )
    }
    return twilioClient
}

export async function POST(request: NextRequest) {
    try {
        const { phoneNumber, message, customerName } = await request.json()

        if (!phoneNumber) {
            return NextResponse.json({
                success: false,
                error: 'Numéro de téléphone requis'
            }, { status: 400 })
        }

        console.log('🇫🇷 Coccinelle.ai - Déclenchement appel vers:', phoneNumber)

        // Vérification des variables d'environnement
        if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
            console.error('❌ Variables Twilio manquantes')
            return NextResponse.json({
                success: false,
                error: 'Configuration Twilio manquante'
            }, { status: 500 })
        }

        // Message personnalisé selon le contexte
        let personalizedMessage = `Bonjour, c'est Coccinelle.ai. Vous avez demandé à être rappelé depuis notre site web. ${message || 'Un conseiller va prendre votre appel.'}`

        // Optionnel : OpenAI pour personnaliser le message
        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-')) {
            try {
                const { OpenAI } = await import('openai')
                const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

                const aiResponse = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "Tu es l'assistant IA de Coccinelle.ai, une entreprise française spécialisée dans les solutions d'IA conversationnelle. Crée un message de rappel chaleureux et professionnel en français. Maximum 100 mots."
                        },
                        {
                            role: "user",
                            content: `Crée un message de rappel personnalisé. Nom du client: ${customerName || 'Client'}. Contexte: ${message || 'Demande de rappel depuis le site web'}`
                        }
                    ],
                    max_tokens: 150,
                    temperature: 0.7
                })

                personalizedMessage = aiResponse.choices[0].message.content || personalizedMessage
                console.log('🤖 Message IA généré')

            } catch (aiError) {
                console.log('⚠️ Fallback message (OpenAI indisponible)')
                // Garde le message par défaut
            }
        }

        // Initialise le client Twilio
        const twilio = await getTwilioClient()

        // URL du webhook TwiML
        const origin = request.headers.get('origin') || 'https://coccinelle.ai'
        const webhookUrl = `${origin}/api/twiml-response`

        // Crée l'appel Twilio
        const call = await twilio.calls.create({
            to: phoneNumber,
            from: process.env.TWILIO_PHONE_NUMBER || '+19787486848',
            url: webhookUrl,
            method: 'POST',
            statusCallback: `${origin}/api/webhook/twilio`,
            statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
            statusCallbackMethod: 'POST'
        })

        console.log('✅ Appel Coccinelle.ai initié:', call.sid)

        // MÊME FORMAT QUE RETELL AI (compatibilité frontend)
        return NextResponse.json({
            success: true,
            callId: call.sid,
            message: 'Appel initié avec succès par Coccinelle.ai',
            provider: 'Twilio',
            personalizedMessage: personalizedMessage,
            timestamp: new Date().toISOString()
        })

    } catch (error: any) {
        console.error('❌ Erreur Coccinelle.ai:', error.message)
        
        return NextResponse.json({
            success: false,
            error: error.message || 'Erreur lors de l\'initiation de l\'appel',
            provider: 'Twilio'
        }, { status: 500 })
    }
}

// GET pour tester que l'endpoint fonctionne
export async function GET() {
    return NextResponse.json({
        message: 'Trigger Call API actif',
        provider: 'Twilio',
        endpoints: {
            POST: 'Déclencher un appel',
            GET: 'Status de l\'API'
        }
    })
}
