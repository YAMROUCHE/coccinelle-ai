import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log('🤖 VXML Simple IA appelé')
  
  const simpleVxml = `<?xml version="1.0" encoding="UTF-8"?>
<vxml version="2.1" xmlns="http://www.w3.org/2001/vxml">
  <form id="main">
    <block>
      <prompt bargein="false">
        <prosody rate="medium">
          Bonjour ! Vous êtes en ligne avec Coccinelle A I. 
          Nous avons un appartement T3 à Toulouse pour 250 000 euros, 
          et une maison à Colomiers pour 1200 euros par mois. 
          Pour plus d'informations, appelez-nous. Merci !
        </prosody>
      </prompt>
      <exit/>
    </block>
  </form>
</vxml>`

  return new NextResponse(simpleVxml, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
    },
  })
}

export async function GET() {
  return NextResponse.json({ message: 'VXML Simple IA pour debug' })
}
