// Configuration Retell Enhanced pour Coccinelle.ai
export const RETELL_ENHANCED_INFRASTRUCTURE = {
  // Twilio Configuration
  twilioNumber: "+1 (978) 748-6848",
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  
  // OpenAI Configuration
  openaiApiKey: process.env.OPENAI_API_KEY,
  
  // Retell Configuration
  retellApiKey: process.env.RETELL_API_KEY,
  
  // App Configuration
  webhookUrl: "https://coccinelle.ai/api/webhook/twilio",
  twimlUrl: "https://coccinelle.ai/api/twiml-response",
  
  // Secteurs supportés
  sectors: [
    "e-commerce",
    "santé", 
    "finance",
    "immobilier",
    "automobile",
    "éducation",
    "b2b-services"
  ],
  
  // Langues supportées
  languages: ["fr-FR", "en-US"],
  
  // Numéro de support
  supportNumber: "+33 1 XX XX XX XX"
};

// Types pour TypeScript
export interface RetellConfig {
  twilioNumber: string;
  twilioAccountSid?: string;
  twilioAuthToken?: string;
  openaiApiKey?: string;
  retellApiKey?: string;
  webhookUrl: string;
  twimlUrl: string;
  sectors: string[];
  languages: string[];
  supportNumber: string;
}

// Export par défaut
export default RETELL_ENHANCED_INFRASTRUCTURE;
