import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    // Vérifier que les variables existent
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ 
        error: 'Configuration Supabase manquante',
        debug: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey
        }
      }, { status: 500 })
    }

    // Créer le client Supabase seulement si les variables existent
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Récupérer tous les biens avec l'agence
    const { data: properties, error } = await supabase
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
        status,
        created_at,
        agencies (
          name,
          email,
          phone
        )
      `)
      .eq('status', 'available')

    if (error) {
      console.error('Erreur Supabase:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      count: properties?.length || 0,
      data: properties
    })

  } catch (error) {
    console.error('Erreur API:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
