// src/app/api/webhook/twilio-voice/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log('🎤 Appel Twilio reçu')
    
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Bonjour Coccinelle A I test. Au revoir.</Say>
</Response>`

    return new NextResponse(twiml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('❌ Erreur Twilio:', error)
    
    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Erreur technique.</Say>
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
    message: 'Endpoint Twilio Voice Simple',
    status: 'active'
  })
}
