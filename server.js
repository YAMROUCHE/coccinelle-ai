const express = require('express');
const { Retell } = require('retell-sdk');
const app = express();

app.use(express.json());

// Tes configurations Retell AI
const RETELL_API_KEY = 'key_fa0ea1e421575f2e3b0672af4ea3';
const AGENT_ID = 'agent_fac849a25b3acaac9a73d303e5';

// Initialise le client Retell
const retell = new Retell({
    apiKey: RETELL_API_KEY,
});

// CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    next();
});

// Endpoint pour déclencher l'appel depuis le bouton de ton site
app.post('/trigger-call', async (req, res) => {
    try {
        const { phoneNumber, message } = req.body;
        
        console.log('Tentative d\'appel vers:', phoneNumber);
        
        // Appel à l'API Retell avec le SDK
        const response = await retell.call.createPhoneCall({
            agent_id: AGENT_ID,
            to_number: phoneNumber,
            from_number: '+13365683422',
            metadata: {
                trigger_source: 'website_button',
                initial_message: message || 'Bonjour, vous avez demandé à être rappelé depuis notre site web.'
            }
        });

        console.log('Appel initié avec succès, ID:', response.call_id);
        
        res.json({ 
            success: true, 
            callId: response.call_id,
            message: 'Appel initié avec succès' 
        });

    } catch (error) {
        console.error('Erreur lors de l\'initiation de l\'appel:', error.message);
        res.status(500).json({ 
            success: false, 
            error: error.message || 'Erreur lors de l\'initiation de l\'appel' 
        });
    }
});

// Webhook pour recevoir les événements de Retell AI
app.post('/webhook/retell', (req, res) => {
    const { event, call_id, data } = req.body;
    
    console.log(`Événement reçu: ${event} pour l'appel ${call_id}`);
    
    switch(event) {
        case 'call_started':
            console.log('Appel démarré');
            break;
        case 'call_ended':
            console.log('Appel terminé');
            break;
        case 'call_analyzed':
            console.log('Analyse de l\'appel disponible');
            break;
    }
    
    res.status(200).send('OK');
});

app.listen(3002, () => {
    console.log('Serveur webhook démarré sur le port 3002');
});

// Test de connexion au SDK
console.log('SDK Retell initialisé avec API Key:', RETELL_API_KEY.substring(0, 10) + '...');
console.log('Agent ID configuré:', AGENT_ID);
