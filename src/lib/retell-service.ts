// 🚀 Service Retell pour Coccinelle.AI
// Gestion des appels téléphoniques avec l'API REST Retell

export interface RetellCallConfig {
  agentId: string;
  apiKey: string;
  twilioNumber: string;
  phoneNumber: string;
}

export interface RetellCallStatus {
  status: 'idle' | 'connecting' | 'connected' | 'ended' | 'error';
  message?: string;
  error?: string;
  callId?: string;
}

export class RetellService {
  private config: RetellCallConfig;
  private currentCallId: string | undefined = undefined;
  private baseUrl = 'https://api.retellai.com';

  constructor(config: RetellCallConfig) {
    this.config = config;
  }

  /**
   * Démarrer un appel téléphonique avec l'API REST Retell
   */
  async startCall(phoneNumber: string): Promise<RetellCallStatus> {
    try {
      console.log('🚀 RetellService: Démarrage appel vers', phoneNumber);

      // Validation du numéro
      if (!this.validatePhoneNumber(phoneNumber)) {
        throw new Error('Numéro de téléphone invalide');
      }

      // Appel à l'API REST Retell pour créer un appel
      const response = await fetch(`${this.baseUrl}/call/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: this.config.agentId,
          phone_number: phoneNumber,
          metadata: {
            sector: 'realestate',
            source: 'coccinelle-ai',
            campaign: 'widget-test'
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erreur API Retell: ${errorData.message || response.statusText}`);
      }

      const callData = await response.json();
      this.currentCallId = callData.call_id;

      console.log('✅ Appel Retell créé:', callData);

      return {
        status: 'connecting',
        message: 'Appel en cours de connexion',
        callId: this.currentCallId
      };

    } catch (error) {
      console.error('❌ RetellService: Erreur lors de l\'appel', error);
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Valider le format du numéro de téléphone
   */
  private validatePhoneNumber(phoneNumber: string): boolean {
    // Format international: +33 6 12 34 56 78
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber.replace(/\s/g, ''));
  }

  /**
   * Terminer un appel
   */
  async endCall(): Promise<RetellCallStatus> {
    try {
      console.log('📞 RetellService: Fin d\'appel');

      if (this.currentCallId) {
        // Appel à l'API REST Retell pour terminer l'appel
        const response = await fetch(`${this.baseUrl}/call/${this.currentCallId}/end`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Erreur API Retell: ${errorData.message || response.statusText}`);
        }

        this.currentCallId = undefined;
        console.log('✅ Appel terminé avec succès');
      }

      return {
        status: 'ended',
        message: 'Appel terminé'
      };

    } catch (error) {
      console.error('❌ RetellService: Erreur lors de la fin d\'appel', error);
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Vérifier le statut de l'agent
   */
  async checkAgentStatus(): Promise<boolean> {
    try {
      // Appel à l'API REST Retell pour vérifier le statut de l'agent
      const response = await fetch(`${this.baseUrl}/agent/${this.config.agentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        console.log('❌ Agent non trouvé ou erreur API');
        return false;
      }

      const agentData = await response.json();
      console.log('🔍 Statut agent:', agentData);

      return agentData.status === 'online' || agentData.status === 'available';

    } catch (error) {
      console.error('❌ Erreur vérification agent:', error);
      return false;
    }
  }

  /**
   * Obtenir les informations de l'agent
   */
  getAgentInfo() {
    return {
      id: this.config.agentId,
      sector: 'realestate',
      name: 'Agent IA Immobilier',
      capabilities: ['Qualification prospects', 'Programmation visites', 'Conseils immobiliers'],
      status: 'online',
      phoneNumber: this.config.twilioNumber
    };
  }

  /**
   * Obtenir le statut de l'appel en cours
   */
  async getCallStatus(): Promise<RetellCallStatus> {
    if (!this.currentCallId) {
      return { status: 'idle' };
    }

    try {
      // Appel à l'API REST Retell pour obtenir le statut de l'appel
      const response = await fetch(`${this.baseUrl}/call/${this.currentCallId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        return { status: 'error', error: 'Impossible de récupérer le statut' };
      }

      const callData = await response.json();
      
      return {
        status: callData.status || 'connected',
        message: 'Appel en cours',
        callId: this.currentCallId
      };

    } catch (error) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  }

  /**
   * Écouter les événements d'appel (webhook)
   */
  onCallEvent(event: string, callback: (data: any) => void) {
    // Pour l'instant, pas d'implémentation des webhooks
    // TODO: Implémenter les webhooks Retell
    console.log('📡 Webhook non implémenté pour l\'événement:', event);
  }
}

// Instance par défaut
export const createRetellService = (config: RetellCallConfig) => new RetellService(config);

// Configuration par défaut
export const getDefaultRetellConfig = (): RetellCallConfig => ({
  agentId: process.env.NEXT_PUBLIC_RETELL_AGENT_ID || 'agent_7bf576aa313d5af19e9fac7855',
  apiKey: process.env.NEXT_PUBLIC_RETELL_API_KEY || 'key_32e5c7de2928946ccc3faad705d6',
  twilioNumber: process.env.NEXT_PUBLIC_RETELL_TWILIO_NUMBER || '+1 (978) 748-6848',
  phoneNumber: ''
}); 