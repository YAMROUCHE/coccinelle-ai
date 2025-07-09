// src/app/api/ovh/vxml-simple/route.ts
// VXML Ultra-Simple pour tester OVH

import { NextResponse } from 'next/server'

export async function GET() {
    console.log('🔧 VXML Simple Debug appelé')
    
    // VXML minimal et compatible
    const simpleVxml = `<?xml version="1.0" encoding="UTF-8"?>
<vxml version="2.1">
  <form>
    <block>
      <prompt>
        Bonjour ! Test simple de Coccinelle A I. Si vous entendez ce message, la configuration fonctionne parfaitement.
      </prompt>
      <exit/>
    </block>
  </form>
</vxml>`

    console.log('🎤 VXML simple envoyé')

    return new NextResponse(simpleVxml, {
        status: 200,
        headers: {
            'Content-Type': 'application/voicexml+xml; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        },
    })
}

export async function POST() {
    return GET()
}
