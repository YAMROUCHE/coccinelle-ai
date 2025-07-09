// src/app/api/ovh/vxml-response/route.ts
// Endpoint VXML pour OVH - Retourne du VoiceXML

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    console.log('🇫🇷 VXML Response appelé depuis OVH')
    
    try {
        // Récupérer les paramètres de l'appel OVH
        const url = new URL(request.url)
        const callerNumber = url.searchParams.get('ani') || 'Numéro inconnu'
        const calledNumber = url.searchParams.get('dnis') || '0582952787'
        
        console.log(`📞 Appel OVH reçu de ${callerNumber} vers ${calledNumber}`)

        // Message personnalisé Coccinelle.ai
        const personalizedMessage = `Bonjour ! Vous avez appelé Coccinelle point A I au ${calledNumber}. 
        Merci pour votre appel depuis le ${callerNumber}. 
        Notre intelligence artificielle est là pour vous accompagner dans tous vos projets. 
        Pour parler à un conseiller, restez en ligne, nous vous rappellerons très bientôt. 
        Excellente journée !`

        // Générer le VXML
        const vxmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<vxml version="2.1" xmlns="http://www.w3.org/2001/vxml">
  <form id="main">
    <block>
      <prompt bargein="false">
        <prosody rate="medium">
          ${personalizedMessage}
        </prosody>
      </prompt>
      <goto next="#menu"/>
    </block>
  </form>
  
  <form id="menu">
    <field name="choice" type="digits">
      <prompt bargein="true">
        <prosody rate="medium">
          Pour rester en contact, appuyez sur 1. 
          Pour raccrocher, appuyez sur 2, ou ne faites rien.
        </prosody>
      </prompt>
      
      <filled>
        <if cond="choice == '1'">
          <prompt>
            <prosody rate="medium">
              Parfait ! Nous avons bien noté votre demande. 
              Un conseiller Coccinelle point A I vous recontactera dans les plus brefs délais. 
              Merci et à très bientôt !
            </prosody>
          </prompt>
          <exit/>
        <elseif cond="choice == '2'"/>
          <prompt>
            <prosody rate="medium">
              Merci d'avoir appelé Coccinelle point A I. Au revoir !
            </prosody>
          </prompt>
          <exit/>
        <else/>
          <prompt>
            <prosody rate="medium">
              Choix non reconnu. Au revoir !
            </prosody>
          </prompt>
          <exit/>
        </if>
      </filled>
      
      <noinput count="1">
        <prompt>
          <prosody rate="medium">
            Merci d'avoir appelé Coccinelle point A I. Au revoir !
          </prosody>
        </prompt>
        <exit/>
      </noinput>
    </field>
  </form>
</vxml>`

        console.log('🎤 VXML généré pour OVH')

        return new NextResponse(vxmlResponse, {
            status: 200,
            headers: {
                'Content-Type': 'application/voicexml+xml',
                'Cache-Control': 'no-cache',
            },
        })

    } catch (error) {
        console.error('❌ Erreur VXML OVH:', error)

        const errorVxml = `<?xml version="1.0" encoding="UTF-8"?>
<vxml version="2.1" xmlns="http://www.w3.org/2001/vxml">
  <form>
    <block>
      <prompt>
        <prosody rate="medium">
          Désolé, une erreur technique s'est produite. 
          Veuillez rappeler ultérieurement. 
          Merci et au revoir.
        </prosody>
      </prompt>
      <exit/>
    </block>
  </form>
</vxml>`

        return new NextResponse(errorVxml, {
            status: 200,
            headers: {
                'Content-Type': 'application/voicexml+xml',
            },
        })
    }
}

export async function POST(request: NextRequest) {
    // OVH peut aussi envoyer des POST
    return GET(request)
}
