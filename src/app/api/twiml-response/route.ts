// src/app/api/twiml-response/route.ts
// Endpoint TwiML pour les réponses vocales Twilio (App Router)

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    console.log('🎵 TwiML Response appelé depuis Twilio')
    
    try {
        const formData = await request.formData()
        const digits = formData.get('Digits') as string
        const callSid = formData.get('CallSid') as string
        const from = formData.get('From') as string
        const to = formData.get('To') as string

        console.log(`📞 Appel reçu de ${from} vers ${to}`)
        console.log(`🆔 Call ID: ${callSid}`)
        console.log(`🔢 Digits: ${digits}`)

        let twimlResponse: string

        if (digits === '1') {
            // L'utilisateur veut parler à un conseiller
            twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="fr-FR">Parfait ! Nous vous transférons vers un conseiller. Patientez quelques instants.</Say>
    <Pause length="2"/>
    <Say voice="alice" language="fr-FR">Nos conseillers sont actuellement occupés. Nous vous rappellerons dans les plus brefs délais.</Say>
</Response>`
        } else {
            // Message principal avec options
            twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="fr-FR">Bonjour ! C'est Coccinelle point A I. Vous avez demandé à être rappelé depuis notre site web.</Say>
    <Pause length="1"/>
    <Gather numDigits="1" timeout="10" action="/api/twiml-response" method="POST">
        <Say voice="alice" language="fr-FR">Pour parler à un conseiller, appuyez sur 1. Sinon, nous vous recontacterons bientôt.</Say>
        <Pause length="3"/>
        <Say voice="alice" language="fr-FR">Appuyez sur 1 maintenant pour parler à un conseiller.</Say>
    </Gather>
    <Say voice="alice" language="fr-FR">Merci pour votre intérêt pour Coccinelle point A I. Nous vous recontacterons très bientôt. Excellente journée !</Say>
</Response>`
        }

        console.log('🎵 TwiML envoyé à Twilio')

        return new NextResponse(twimlResponse, {
            status: 200,
            headers: {
                'Content-Type': 'text/xml',
            },
        })

    } catch (error) {
        console.error('❌ Erreur TwiML:', error)

        const errorResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="fr-FR">Désolé, une erreur technique s'est produite. Nous vous rappellerons bientôt. Au revoir.</Say>
</Response>`

        return new NextResponse(errorResponse, {
            status: 200,
            headers: {
                'Content-Type': 'text/xml',
            },
        })
    }
}

export async function GET() {
    return NextResponse.json({ message: 'TwiML endpoint actif' })
}
