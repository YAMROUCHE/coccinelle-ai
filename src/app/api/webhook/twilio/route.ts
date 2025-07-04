// src/app/api/webhook/twilio/route.ts
// Webhook pour recevoir les événements Twilio (App Router)

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    console.log('📞 Webhook Twilio reçu')
    
    try {
        const formData = await request.formData()
        
        // Récupère les données de l'appel depuis Twilio
        const callSid = formData.get('CallSid') as string
        const callStatus = formData.get('CallStatus') as string
        const from = formData.get('From') as string
        const to = formData.get('To') as string
        const direction = formData.get('Direction') as string
        const duration = formData.get('CallDuration') as string
        const digits = formData.get('Digits') as string

        console.log(`📞 Événement Twilio reçu:`)
        console.log(`- Call ID: ${callSid}`)
        console.log(`- Status: ${callStatus}`)
        console.log(`- From: ${from} → To: ${to}`)
        console.log(`- Direction: ${direction}`)
        
        if (duration) {
            console.log(`- Duration: ${duration} secondes`)
        }

        // Log des événements d'appel avec emojis
        switch(callStatus) {
            case 'initiated':
                console.log('🚀 Appel initié')
                break
            case 'ringing':
                console.log('📞 Appel en cours de sonnerie')
                break
            case 'in-progress':
                console.log('🟢 Appel en cours')
                break
            case 'completed':
                console.log('✅ Appel terminé avec succès')
                if (duration) {
                    console.log(`⏱️ Durée totale: ${duration} secondes`)
                }
                break
            case 'failed':
                console.log('❌ Appel échoué')
                break
            case 'busy':
                console.log('📵 Ligne occupée')
                break
            case 'no-answer':
                console.log('📞 Pas de réponse')
                break
            case 'canceled':
                console.log('❌ Appel annulé')
                break
            default:
                console.log(`ℹ️ Statut: ${callStatus}`)
        }

        // Si l'utilisateur a appuyé sur des touches
        if (digits) {
            console.log(`🔢 Utilisateur a appuyé sur: ${digits}`)
            
            // Tu peux sauvegarder cette interaction en base de données ici
            // await saveCallInteraction(callSid, digits, callStatus)
        }

        // Ici tu peux ajouter des actions selon l'événement
        if (callStatus === 'completed') {
            // Appel terminé - tu peux déclencher des actions
            console.log('📊 Appel terminé - analyser les résultats')
            
            // Exemples d'actions possibles :
            // - Envoyer un email de suivi
            // - Sauvegarder les stats en base
            // - Déclencher un webhook vers ton CRM
            // - Envoyer un SMS de confirmation
        }

        if (callStatus === 'failed' || callStatus === 'no-answer') {
            // Appel échoué - peut-être programmer un nouvel essai
            console.log('⚠️ Appel échoué - envisager un nouvel essai')
            
            // Tu pourrais programmer un rappel automatique ici
        }

        // Réponse success pour Twilio
        return NextResponse.json({
            success: true,
            message: 'Webhook traité avec succès',
            callId: callSid,
            status: callStatus,
            timestamp: new Date().toISOString()
        })

    } catch (error: any) {
        console.error('❌ Erreur webhook Twilio:', error)
        
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}

// GET pour vérifier que le webhook est actif
export async function GET() {
    return NextResponse.json({
        message: 'Webhook Twilio actif',
        provider: 'Twilio',
        endpoints: {
            POST: 'Recevoir les événements Twilio',
            GET: 'Status du webhook'
        },
        timestamp: new Date().toISOString()
    })
}
