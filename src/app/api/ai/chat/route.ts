// src/app/api/ai/chat/route.ts
// API IA Conversationnelle pour l'Immobilier

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Interface pour les messages de conversation
interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

// Interface pour la requête
interface ChatRequest {
  message: string
  conversationHistory?: Message[]
  prospectInfo?: {
    name?: string
    phone?: string
    budget?: number
    criteria?: string
  }
}

export async function POST(request: Request) {
  try {
    // Vérifier la configuration Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const openaiApiKey = process.env.OPENAI_API_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        error: 'Configuration Supabase manquante'
      }, { status: 500 })
    }

    if (!openaiApiKey) {
      return NextResponse.json({
        error: 'Clé OpenAI manquante'
      }, { status: 500 })
    }

    // Parser la requête
    const body: ChatRequest = await request.json()
    const { message, conversationHistory = [], prospectInfo } = body

    // Créer le client Supabase
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Récupérer les biens disponibles pour context
    const { data: properties } = await supabase
      .from('properties')
      .select(`
        id,
        title,
        price,
        property_type,
        transaction_type,
        rooms,
        surface_area,
        city,
        address,
        agencies (
          name,
          phone
        )
      `)
      .eq('status', 'available')

    // Récupérer les infos de l'agence
    const { data: agency } = await supabase
      .from('agencies')
      .select('*')
      .limit(1)
      .single()

    // Construire le contexte pour l'IA
    const systemPrompt = `Tu es un assistant IA spécialisé en immobilier pour l'agence "${agency?.name || 'Coccinelle Immobilier'}".

INFORMATIONS AGENCE :
- Nom: ${agency?.name || 'Coccinelle Immobilier'}
- Téléphone: ${agency?.phone || '+33 5 82 95 27 87'}
- Email: ${agency?.email || 'contact@coccinelle-ai.com'}
- Ville: ${agency?.city || 'Toulouse'}

BIENS DISPONIBLES ACTUELLEMENT :
${properties?.map(p => `
- ${p.title}
  * Type: ${p.property_type} (${p.transaction_type})
  * Prix: ${p.price}€${p.transaction_type === 'rent' ? '/mois' : ''}
  * Pièces: ${p.rooms}
  * Surface: ${p.surface_area}m²
  * Ville: ${p.city}
  * Adresse: ${p.address}
`).join('\n') || 'Aucun bien disponible'}

INSTRUCTIONS :
1. Tu es professionnel, chaleureux et expert en immobilier
2. Réponds toujours en français
3. Utilise uniquement les biens listés ci-dessus
4. Si on te demande des biens que tu n'as pas, propose des alternatives
5. Propose toujours de programmer une visite ou un RDV
6. Reste dans le domaine immobilier
7. Sois concis mais informatif (max 100 mots par réponse)
8. Si le prospect donne des critères, trouve les biens qui correspondent

${prospectInfo ? `
INFORMATIONS PROSPECT :
- Nom: ${prospectInfo.name || 'Non renseigné'}
- Téléphone: ${prospectInfo.phone || 'Non renseigné'}
- Budget: ${prospectInfo.budget ? prospectInfo.budget + '€' : 'Non renseigné'}
- Critères: ${prospectInfo.criteria || 'Non renseignés'}
` : ''}

Réponds maintenant au message du prospect de manière naturelle et professionnelle.`

    // Préparer les messages pour OpenAI
    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ]

    // Appel à OpenAI GPT-4
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: messages,
        max_tokens: 200,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      })
    })

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.text()
      console.error('Erreur OpenAI:', errorData)
      return NextResponse.json({
        error: 'Erreur avec l\'API OpenAI'
      }, { status: 500 })
    }

    const openaiData = await openaiResponse.json()
    const aiResponse = openaiData.choices[0]?.message?.content

    if (!aiResponse) {
      return NextResponse.json({
        error: 'Pas de réponse de l\'IA'
      }, { status: 500 })
    }

    // Analyser l'intention du prospect (extraction de critères)
    const extractedCriteria = extractCriteriaFromMessage(message, aiResponse)

    // Trouver les biens qui correspondent
    const matchingProperties = findMatchingProperties(properties || [], extractedCriteria)

    return NextResponse.json({
      success: true,
      response: aiResponse,
      conversation: [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: aiResponse }
      ],
      extractedCriteria,
      matchingProperties: matchingProperties.slice(0, 3), // Max 3 biens
      propertiesCount: properties?.length || 0,
      matchCount: matchingProperties.length
    })

  } catch (error) {
    console.error('Erreur API Chat:', error)
    return NextResponse.json({
      error: 'Erreur serveur',
      details: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 })
  }
}

// Fonction pour extraire les critères du message
function extractCriteriaFromMessage(userMessage: string, aiResponse: string) {
  const criteria: any = {}
  
  // Extraire le budget
  const budgetMatch = userMessage.match(/(\d+)\s*(?:euros?|€|k)/i)
  if (budgetMatch) {
    let budget = parseInt(budgetMatch[1])
    if (userMessage.toLowerCase().includes('k')) {
      budget *= 1000
    }
    criteria.budget = budget
  }

  // Extraire le nombre de pièces
  const roomsMatch = userMessage.match(/(\d+)\s*(?:pièces?|chambres?|pièce|chambre|T(\d+))/i)
  if (roomsMatch) {
    criteria.rooms = parseInt(roomsMatch[1] || roomsMatch[2])
  }

  // Extraire le type de bien
  if (userMessage.toLowerCase().includes('appartement')) criteria.type = 'apartment'
  if (userMessage.toLowerCase().includes('maison')) criteria.type = 'house'
  if (userMessage.toLowerCase().includes('studio')) criteria.type = 'studio'

  // Extraire le type de transaction
  if (userMessage.toLowerCase().includes('achat') || userMessage.toLowerCase().includes('acheter') || userMessage.toLowerCase().includes('vente')) {
    criteria.transaction = 'sale'
  }
  if (userMessage.toLowerCase().includes('location') || userMessage.toLowerCase().includes('louer') || userMessage.toLowerCase().includes('loue')) {
    criteria.transaction = 'rent'
  }

  // Extraire la ville
  const cities = ['toulouse', 'colomiers', 'blagnac', 'cugnaux', 'tournefeuille']
  for (const city of cities) {
    if (userMessage.toLowerCase().includes(city)) {
      criteria.city = city.charAt(0).toUpperCase() + city.slice(1)
      break
    }
  }

  return criteria
}

// Fonction pour matcher les biens selon les critères
function findMatchingProperties(properties: any[], criteria: any) {
  return properties.filter(property => {
    let matches = true

    // Filtrer par budget
    if (criteria.budget) {
      if (criteria.transaction === 'rent' && property.transaction_type === 'rent') {
        matches = matches && property.price <= criteria.budget
      } else if (criteria.transaction === 'sale' && property.transaction_type === 'sale') {
        matches = matches && property.price <= criteria.budget
      }
    }

    // Filtrer par nombre de pièces
    if (criteria.rooms) {
      matches = matches && property.rooms >= criteria.rooms
    }

    // Filtrer par type de bien
    if (criteria.type) {
      matches = matches && property.property_type === criteria.type
    }

    // Filtrer par type de transaction
    if (criteria.transaction) {
      matches = matches && property.transaction_type === criteria.transaction
    }

    // Filtrer par ville
    if (criteria.city) {
      matches = matches && property.city.toLowerCase().includes(criteria.city.toLowerCase())
    }

    return matches
  })
}

// Endpoint GET pour tester
export async function GET() {
  return NextResponse.json({
    message: 'API IA Conversationnelle Immobilier',
    endpoints: {
      POST: 'Envoyer un message à l\'IA',
      test: '/api/ai/chat?test=true'
    },
    example: {
      message: "Bonjour, je cherche un appartement 3 pièces à Toulouse pour 250000€",
      conversationHistory: [],
      prospectInfo: {
        name: "Jean Dupont",
        phone: "+33123456789"
      }
    }
  })
}
