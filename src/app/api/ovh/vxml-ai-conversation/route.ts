// src/app/api/ovh/vxml-ai-conversation/route.ts
// VXML Intelligent avec IA Conversationnelle

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  console.log('🤖 VXML IA Conversationnel appelé')
  
  try {
    // Récupérer les paramètres OVH
    const formData = await request.formData()
    const ani = formData.get('ani') as string || 'Numéro inconnu'
    const dnis = formData.get('dnis') as string || '0582952787'
    const speechInput = formData.get('speechInput') as string || ''
    const conversationStep = formData.get('conversationStep') as string || 'greeting'

    console.log(`📞 Appel de ${ani} vers ${dnis}`)
    console.log(`🗣️ Étape: ${conversationStep}, Input: ${speechInput}`)

    let vxmlResponse: string

    // Étape 1: Salutation et écoute
    if (conversationStep === 'greeting' || !speechInput) {
      vxmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<vxml version="2.1" xmlns="http://www.w3.org/2001/vxml" xml:lang="fr-FR">
  <form id="greeting">
    <block>
      <prompt bargein="false">
        <voice gender="female" xml:lang="fr-FR">
          <prosody rate="90%">
            Bonjour ! Vous êtes en ligne avec Coccinelle point A I, votre agence immobilière intelligente.
            Je suis votre assistante IA et je peux vous aider à trouver le bien de vos rêves.
            Dites-moi ce que vous recherchez : appartement, maison, votre budget, vos critères.
          </prosody>
        </voice>
      </prompt>
      <goto next="#listen"/>
    </block>
  </form>

  <form id="listen">
    <field name="userSpeech" type="speech">
      <grammar type="application/srgs+xml">
        <rule id="anything">
          <one-of>
            <item>appartement</item>
            <item>maison</item>
            <item>studio</item>
            <item>toulouse</item>
            <item>colomiers</item>
            <item>pièces</item>
            <item>budget</item>
            <item>euro</item>
            <item>location</item>
            <item>achat</item>
            <item>vente</item>
            <item repeat="0-1"><ruleref special="GARBAGE"/></item>
          </one-of>
        </rule>
      </grammar>
      
      <filled>
        <submit next="https://coccinelle-ai.vercel.app/api/ovh/vxml-ai-conversation" 
                method="post" 
                namelist="userSpeech"
                fetchtimeout="10s"/>
      </filled>
      
      <noinput count="1">
        <prompt>
          <voice gender="female" xml:lang="fr-FR">
            <prosody rate="90%">
              Je vous écoute. Dites-moi ce que vous recherchez comme bien immobilier.
            </prosody>
          </voice>
        </prompt>
        <reprompt/>
      </noinput>
      
      <noinput count="2">
        <prompt>
          <voice gender="female" xml:lang="fr-FR">
            <prosody rate="90%">
              Pas de problème. Vous pouvez me dire par exemple : je cherche un appartement trois pièces à Toulouse.
            </prosody>
          </voice>
        </prompt>
        <reprompt/>
      </noinput>
      
      <noinput count="3">
        <prompt>
          <voice gender="female" xml:lang="fr-FR">
            <prosody rate="90%">
              Je vais vous proposer nos biens disponibles. Un moment s'il vous plaît.
            </prosody>
          </voice>
        </prompt>
        <goto next="#fallback"/>
      </noinput>
      
      <nomatch count="1">
        <prompt>
          <voice gender="female" xml:lang="fr-FR">
            <prosody rate="90%">
              Désolée, je n'ai pas bien compris. Pouvez-vous répéter votre demande ?
            </prosody>
          </voice>
        </prompt>
        <reprompt/>
      </nomatch>
      
      <nomatch count="2">
        <goto next="#fallback"/>
      </nomatch>
    </field>
  </form>

  <form id="fallback">
    <block>
      <prompt>
        <voice gender="female" xml:lang="fr-FR">
          <prosody rate="90%">
            Nous avons actuellement deux excellents biens disponibles :
            Un appartement T3 au centre-ville de Toulouse pour 250 000 euros,
            et une maison de 4 pièces avec jardin à Colomiers pour 1200 euros par mois.
            Pour plus d'informations ou organiser une visite, 
            appelez-nous au zéro cinq quatre-vingt-deux quatre-vingt-quinze vingt-sept quatre-vingt-sept.
            Merci et excellente journée !
          </prosody>
        </voice>
      </prompt>
      <exit/>
    </block>
  </form>
</vxml>`
    }
    
    // Étape 2: Traitement IA de la réponse vocale
    else if (speechInput) {
      console.log(`🤖 Traitement IA du message: "${speechInput}"`)
      
      // Appeler notre API IA
      const aiResponse = await fetch('https://coccinelle-ai.vercel.app/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: speechInput,
          prospectInfo: {
            phone: ani,
            source: 'phone_call'
          }
        })
      })

      if (aiResponse.ok) {
        const aiData = await aiResponse.json()
        const aiMessage = aiData.response || 'Désolée, je rencontre un problème technique.'
        const matchingProperties = aiData.matchingProperties || []
        
        console.log(`🤖 Réponse IA: "${aiMessage}"`)
        console.log(`🏠 Biens correspondants: ${matchingProperties.length}`)

        // Construire la réponse vocale avec les biens trouvés
        let propertyDetails = ''
        if (matchingProperties.length > 0) {
          const property = matchingProperties[0]
          propertyDetails = `
            Nous avons trouvé un bien qui correspond parfaitement : 
            ${property.title}, 
            au prix de ${property.price} euros${property.transaction_type === 'rent' ? ' par mois' : ''}, 
            avec ${property.rooms} pièces et ${property.surface_area} mètres carrés, 
            situé ${property.address} à ${property.city}.
          `
        }

        vxmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<vxml version="2.1" xmlns="http://www.w3.org/2001/vxml" xml:lang="fr-FR">
  <form id="aiResponse">
    <block>
      <prompt bargein="false">
        <voice gender="female" xml:lang="fr-FR">
          <prosody rate="90%">
            ${aiMessage.replace(/[<>&"']/g, (match) => {
              const entities: { [key: string]: string } = {
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;',
                '"': '&quot;',
                "'": '&apos;'
              }
              return entities[match]
            })}
            ${propertyDetails}
          </prosody>
        </voice>
      </prompt>
      <goto next="#continueConversation"/>
    </block>
  </form>

  <form id="continueConversation">
    <field name="nextSpeech" type="speech">
      <prompt>
        <voice gender="female" xml:lang="fr-FR">
          <prosody rate="90%">
            Avez-vous d'autres questions ou souhaitez-vous organiser une visite ?
          </prosody>
        </voice>
      </prompt>
      
      <grammar type="application/srgs+xml">
        <rule id="response">
          <one-of>
            <item>oui</item>
            <item>non</item>
            <item>visite</item>
            <item>rendez-vous</item>
            <item>merci</item>
            <item>au revoir</item>
            <item repeat="0-1"><ruleref special="GARBAGE"/></item>
          </one-of>
        </rule>
      </grammar>
      
      <filled>
        <if cond="nextSpeech.indexOf('visite') != -1 || nextSpeech.indexOf('rendez') != -1 || nextSpeech.indexOf('oui') != -1">
          <prompt>
            <voice gender="female" xml:lang="fr-FR">
              <prosody rate="90%">
                Parfait ! Pour organiser une visite, appelez-nous au zéro cinq quatre-vingt-deux quatre-vingt-quinze vingt-sept quatre-vingt-sept, 
                ou envoyez-nous un email à test arobase coccinelle tiret a i point com. 
                Nous vous rappellerons rapidement. Merci et à très bientôt !
              </prosody>
            </voice>
          </prompt>
        <else/>
          <prompt>
            <voice gender="female" xml:lang="fr-FR">
              <prosody rate="90%">
                Merci pour votre appel ! N'hésitez pas à nous recontacter pour tout renseignement. 
                Excellente journée avec Coccinelle point A I !
              </prosody>
            </voice>
          </prompt>
        </if>
        <exit/>
      </filled>
      
      <noinput count="1">
        <prompt>
          <voice gender="female" xml:lang="fr-FR">
            <prosody rate="90%">
              Merci pour votre appel ! Contactez-nous au zéro cinq quatre-vingt-deux quatre-vingt-quinze vingt-sept quatre-vingt-sept pour toute question. Au revoir !
            </prosody>
          </voice>
        </prompt>
        <exit/>
      </noinput>
    </field>
  </form>
</vxml>`
      } else {
        // Fallback si l'IA ne répond pas
        console.error('❌ Erreur API IA')
        vxmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<vxml version="2.1" xmlns="http://www.w3.org/2001/vxml" xml:lang="fr-FR">
  <form id="error">
    <block>
      <prompt>
        <voice gender="female" xml:lang="fr-FR">
          <prosody rate="90%">
            Je rencontre actuellement un problème technique. 
            Veuillez nous contacter directement au zéro cinq quatre-vingt-deux quatre-vingt-quinze vingt-sept quatre-vingt-sept. 
            Merci et désolée pour la gêne occasionnée.
          </prosody>
        </voice>
      </prompt>
      <exit/>
    </block>
  </form>
</vxml>`
      }
    }

    console.log('🎵 VXML IA envoyé à OVH')

    return new NextResponse(vxmlResponse, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml; charset=utf-8',
        'Cache-Control': 'no-cache'
      },
    })

  } catch (error) {
    console.error('❌ Erreur VXML IA:', error)

    const errorResponse = `<?xml version="1.0" encoding="UTF-8"?>
<vxml version="2.1" xmlns="http://www.w3.org/2001/vxml" xml:lang="fr-FR">
  <form id="error">
    <block>
      <prompt>
        <voice gender="female" xml:lang="fr-FR">
          <prosody rate="90%">
            Désolée, une erreur technique s'est produite. 
            Contactez-nous directement au zéro cinq quatre-vingt-deux quatre-vingt-quinze vingt-sept quatre-vingt-sept. 
            Merci et au revoir.
          </prosody>
        </voice>
      </prompt>
      <exit/>
    </block>
  </form>
</vxml>`

    return new NextResponse(errorResponse, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml; charset=utf-8'
      },
    })
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'VXML IA Conversationnel pour OVH',
    description: 'Endpoint qui génère du VXML intelligent avec reconnaissance vocale et IA',
    features: [
      'Reconnaissance vocale automatique',
      'IA conversationnelle',
      'Recherche intelligente de biens',
      'Réponses vocales naturelles'
    ]
  })
}
