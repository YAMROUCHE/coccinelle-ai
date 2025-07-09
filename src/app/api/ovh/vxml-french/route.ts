// src/app/api/ovh/vxml-french/route.ts
// VXML avec voix française optimisée

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    console.log('🇫🇷 VXML Voix Française appelé depuis OVH')
    
    try {
        // Récupérer les paramètres de l'appel
        const url = new URL(request.url)
        const callerNumber = url.searchParams.get('ani') || 'un numéro masqué'
        const calledNumber = url.searchParams.get('dnis') || '05 82 95 27 87'
        
        console.log(`📞 Appel OVH de ${callerNumber} vers ${calledNumber}`)

        // VXML avec configuration vocale française parfaite
        const frenchVxml = `<?xml version="1.0" encoding="UTF-8"?>
<vxml version="2.1" xmlns="http://www.w3.org/2001/vxml" xml:lang="fr-FR">
  <property name="inputmodes" value="dtmf voice"/>
  <property name="timeout" value="10s"/>
  <property name="bargein" value="true"/>
  
  <form id="welcome">
    <block>
      <prompt xml:lang="fr-FR">
        <voice gender="female" xml:lang="fr-FR">
          <prosody rate="90%" pitch="medium" volume="90">
            Bonjour ! Vous êtes bien en ligne avec Coccinelle point A I, 
            votre partenaire en intelligence artificielle. 
            Merci pour votre appel au ${calledNumber.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')}. 
            Notre équipe d'experts est là pour vous accompagner dans tous vos projets numériques.
          </prosody>
        </voice>
      </prompt>
      <goto next="#menu"/>
    </block>
  </form>
  
  <form id="menu">
    <field name="choice" type="digits">
      <prompt xml:lang="fr-FR" bargein="true">
        <voice gender="female" xml:lang="fr-FR">
          <prosody rate="90%" pitch="medium" volume="90">
            Pour être rappelé par un conseiller, tapez 1 sur votre clavier. 
            Pour entendre nos services, tapez 2. 
            Pour raccrocher, tapez 9 ou ne faites rien.
          </prosody>
        </voice>
      </prompt>
      
      <filled>
        <if cond="choice == '1'">
          <prompt xml:lang="fr-FR">
            <voice gender="female" xml:lang="fr-FR">
              <prosody rate="90%" pitch="medium" volume="90">
                Parfait ! Nous avons bien enregistré votre demande de rappel 
                depuis le ${callerNumber.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')}. 
                Un expert Coccinelle point A I vous contactera dans les plus brefs délais 
                pour discuter de vos projets d'intelligence artificielle. 
                Merci pour votre confiance et à très bientôt !
              </prosody>
            </voice>
          </prompt>
          <exit/>
        <elseif cond="choice == '2'"/>
          <prompt xml:lang="fr-FR">
            <voice gender="female" xml:lang="fr-FR">
              <prosody rate="85%" pitch="medium" volume="90">
                Coccinelle point A I vous propose : développement d'applications intelligentes, 
                intégration d'intelligence artificielle dans vos processus, 
                création de chatbots et assistants vocaux, 
                conseil en transformation numérique, 
                et formation à l'intelligence artificielle. 
                Pour plus d'informations, nous vous rappelons très prochainement. 
                Excellente journée !
              </prosody>
            </voice>
          </prompt>
          <exit/>
        <elseif cond="choice == '9'"/>
          <prompt xml:lang="fr-FR">
            <voice gender="female" xml:lang="fr-FR">
              <prosody rate="90%" pitch="medium" volume="90">
                Merci d'avoir contacté Coccinelle point A I. 
                À bientôt pour de nouveaux projets innovants !
              </prosody>
            </voice>
          </prompt>
          <exit/>
        <else/>
          <prompt xml:lang="fr-FR">
            <voice gender="female" xml:lang="fr-FR">
              <prosody rate="90%" pitch="medium" volume="90">
                Choix non reconnu. 
                Merci d'avoir appelé Coccinelle point A I. Au revoir !
              </prosody>
            </voice>
          </prompt>
          <exit/>
        </if>
      </filled>
      
      <noinput count="1">
        <prompt xml:lang="fr-FR">
          <voice gender="female" xml:lang="fr-FR">
            <prosody rate="90%" pitch="medium" volume="90">
              Merci pour votre appel. 
              L'équipe Coccinelle point A I vous souhaite une excellente journée !
            </prosody>
          </voice>
        </prompt>
        <exit/>
      </noinput>
    </field>
  </form>
</vxml>`

        console.log('🎤 VXML français optimisé envoyé')

        return new NextResponse(frenchVxml, {
            status: 200,
            headers: {
                'Content-Type': 'application/voicexml+xml; charset=utf-8',
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Accept-Language': 'fr-FR',
            },
        })

    } catch (error) {
        console.error('❌ Erreur VXML Français:', error)

        const errorVxml = `<?xml version="1.0" encoding="UTF-8"?>
<vxml version="2.1" xmlns="http://www.w3.org/2001/vxml" xml:lang="fr-FR">
  <form>
    <block>
      <prompt xml:lang="fr-FR">
        <voice gender="female" xml:lang="fr-FR">
          <prosody rate="90%" pitch="medium">
            Désolé, une erreur technique s'est produite. 
            Veuillez rappeler ultérieurement. Merci et au revoir.
          </prosody>
        </voice>
      </prompt>
      <exit/>
    </block>
  </form>
</vxml>`

        return new NextResponse(errorVxml, {
            status: 200,
            headers: {
                'Content-Type': 'application/voicexml+xml; charset=utf-8',
                'Accept-Language': 'fr-FR',
            },
        })
    }
}

export async function POST(request: NextRequest) {
    return GET(request)
}
