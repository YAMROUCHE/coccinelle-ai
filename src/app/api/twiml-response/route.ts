// src/app/api/twiml-response/route.ts
// Version simplifiée pour diagnostiquer le problème

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    console.log('🎵 TwiML Response appelé depuis Twilio')
    
    try {
        // TwiML simple sans logique complexe
        const twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="fr-FR">Bonjour ! Test simple de Coccinelle point A I. Ce message fonctionne parfaitement !</Say>
</Response>`

        console.log('🎵 TwiML simple envoyé à Twilio')

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
    <Say voice="alice" language="fr-FR">Erreur détectée. Test de Coccinelle A I.</Say>
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
    return NextResponse.json({ message: 'TwiML endpoint actif - version simple' })
}
