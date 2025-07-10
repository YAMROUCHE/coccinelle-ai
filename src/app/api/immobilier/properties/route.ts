import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
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
