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

// Configuration des secteurs
export const SECTOR_CONFIGS = {
  "e-commerce": { name: "E-commerce", icon: "🛒" },
  "santé": { name: "Santé", icon: "🏥" },
  "finance": { name: "Finance", icon: "💰" },
  "immobilier": { name: "Immobilier", icon: "🏠" },
  "automobile": { name: "Automobile", icon: "🚗" },
  "éducation": { name: "Éducation", icon: "🎓" },
  "b2b-services": { name: "B2B Services", icon: "🏢" }
};

// Interface pour les secteurs
export interface BusinessSector {
  id: string;
  name: string;
  icon: string;
}

// Fonction pour récupérer tous les secteurs
export function getAllSectors(): BusinessSector[] {
  return Object.entries(SECTOR_CONFIGS).map(([key, config]) => ({
    id: key,
    name: config.name,
    icon: config.icon
  }));
}

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
