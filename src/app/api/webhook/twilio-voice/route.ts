import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Celine" language="fr-FR">
    Bonjour ! Vous êtes en ligne avec Coccinelle point A I, votre agence immobilière intelligente. Je suis votre assistante IA et je peux vous aider à trouver le bien de vos rêves. Dites-moi ce que vous recherchez.
  </Say>
  <Gather input="speech" language="fr-FR" speechTimeout="5" action="https://coccinelle-ai.vercel.app/api/webhook/twilio-voice">
    <Say voice="Polly.Celine" language="fr-FR">Je vous écoute.</Say>
  </Gather>
</Response>`

    return new NextResponse(twiml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Erreur Twilio:', error)
    return new NextResponse('Error', { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Endpoint Twilio Voice' })
}
