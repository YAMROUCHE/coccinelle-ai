# 🚀 COCCINELLE.AI - Call Center IA Multi-Secteurs

**Coccinelle.ai** est la première plateforme SaaS française de Call Center IA conversationnel qui transforme **n'importe quelle entreprise** en centre d'excellence client grâce à des agents IA spécialisés par secteur d'activité.

## 🎯 Vision & Positionnement

**Value Proposition Unique :** "L'Intelligence Artificielle au service de TOUS les métiers - Votre centre d'appels intelligent qui s'adapte automatiquement à votre secteur d'activité."

### Secteurs Supportés
- 🛒 **E-commerce & Retail** - Support client 24/7, gestion commandes, SAV automatisé
- 🏥 **Santé & Médical** - Prise RDV, screening, compliance GDPR/HIPAA
- 💰 **Finance & Banque** - Pré-qualification crédit, conseil réglementé
- 🏠 **Immobilier** - Qualification prospects, programmation visites
- 🚗 **Automobile** - RDV entretien, conseil véhicules, SAV
- 🎓 **Éducation** - Inscription, orientation, support pédagogique
- 🏢 **B2B Services** - Qualification leads, démonstrations, support technique

## 🏗️ Architecture Technique

### Stack Technologique Premium
- **Frontend** : Next.js 15+ avec App Router, TypeScript, Tailwind CSS
- **Backend** : Next.js API Routes + Firebase Functions + Supabase
- **Base de données** : Firebase Firestore + Supabase (téléphonie)
- **Authentification** : Firebase Auth + NextAuth.js multi-provider
- **IA Conversationnelle** : Retell AI Enhanced avec Fast Tier OpenAI
- **Chat Widget** : Retell Chat Widget avec Public Keys
- **Custom Functions** : Retell Enhanced avec 5 méthodes HTTP
- **Monitoring** : Nouveaux codes d'erreur Retell + Analytics IA
- **Déploiement** : Vercel (Frontend) + Firebase (Backend)

### Infrastructure Retell Enhanced
```typescript
const RETELL_ENHANCED_INFRASTRUCTURE = {
  // Numéro Twilio validé
  twilioNumber: '+1 (978) 748-6848',
  
  // Agent IA principal (Fast Tier activé)
  primaryAgent: {
    id: 'agent_7bf576aa313d5af19e9fac7855',
    tier: 'fast', // 1.5x cost vs 2x (économie 25%)
    performance: '<150ms average response',
    capabilities: 'Multi-secteur avec spécialisation automatique'
  },
  
  // Public Keys pour Chat Widget
  publicKeys: {
    universal: 'pk_coccinelle_universal_widget',
    ecommerce: 'pk_coccinelle_ecommerce_widget',
    healthcare: 'pk_coccinelle_healthcare_widget',
    finance: 'pk_coccinelle_finance_widget',
    realestate: 'pk_coccinelle_realestate_widget'
  },
  
  // Custom Functions Enhanced
  customFunctions: {
    maxResponseLength: 15000, // +50% vs avant
    maxTokens: 32768, // Conversations étendues
    httpMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    concurrent: 5 // Appels parallèles
  }
};
```

## 🚀 Installation & Démarrage Rapide

### Prérequis
- Node.js 18+ 
- npm ou yarn
- Compte Vercel (déploiement)
- Compte Firebase (backend)
- Compte Retell AI (IA conversationnelle)

### Installation Locale
```bash
# Cloner le repository
git clone https://github.com/coccinelle-ai/coccinelle-ai.git
cd coccinelle-ai

# Installer les dépendances
npm install

# Configuration des variables d'environnement
cp .env.example .env.local

# Démarrer le serveur de développement
npm run dev
```

### Variables d'Environnement
```env
# Retell AI
RETELL_API_KEY=your_retell_api_key
RETELL_AGENT_ID=agent_7bf576aa313d5af19e9fac7855

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## 🎨 Design System

### Palette de Couleurs Multi-Secteurs
```css
:root {
  /* Couleurs principales */
  --primary-blue: #2563EB;
  --primary-indigo: #4F46E5;
  --primary-purple: #9333EA;
  
  /* Couleurs par secteur */
  --ecommerce: #9333EA;
  --healthcare: #DC2626;
  --finance: #4F46E5;
  --realestate: #059669;
  --automotive: #6B7280;
  --education: #F59E0B;
  --b2b: #1F2937;
  
  /* Couleurs Retell Enhanced */
  --fast-tier: #FFD700;
  --chat-widget: #00D4AA;
  --custom-functions: #FF6B6B;
}
```

### Typography
- **Primary Font** : Inter (Google Fonts)
- **Secondary Font** : Poppins (Google Fonts)
- **Hero Headline** : 4xl-7xl, font-extrabold, gradient text
- **Section Titles** : 3xl-5xl, font-bold
- **Body Text** : base-lg, font-normal

## 📱 Fonctionnalités Principales

### 1. 🤖 IA Multi-Secteurs Auto-Adaptative
- **Détection automatique** du secteur d'activité
- **Expertise métier** spécialisée par secteur
- **Scripts et workflows** adaptés automatiquement
- **Compliance réglementaire** intégrée

### 2. ⚡ Fast Tier OpenAI
- **Réponses ultra-rapides** (<150ms)
- **Latence prévisible** et stable
- **Scaling illimité** avec performance garantie
- **Coût optimisé** : 1.5x vs 2x standard

### 3. 💬 Chat Widget Multi-Secteurs
- **Installation en 1 ligne** de code
- **Adaptation automatique** selon le secteur
- **Public Keys sécurisées** incluses
- **Thème personnalisable** par secteur

### 4. 🔧 Custom Functions Enhanced
- **5 méthodes HTTP** (GET/POST/PUT/PATCH/DELETE)
- **Réponses 15k caractères** (+50% vs avant)
- **Conversations étendues** (32k tokens)
- **Intégrations complexes** simplifiées

### 5. 📊 Analytics Sectorielles
- **Métriques adaptées** par secteur d'activité
- **Monitoring avancé** avec nouveaux codes d'erreur
- **Insights business** spécialisés
- **ROI tracking** par secteur

## 💰 Plans Tarifaires

| Plan | Prix | Fonctionnalités |
|------|------|-----------------|
| **Découverte** | Gratuit (14j) | 1 Agent IA, 50 appels, Fast Tier inclus |
| **Starter** | 97€/mois | 1 Agent spécialisé, 200 appels, Analytics |
| **Professional** | 297€/mois | 3 Agents multi-secteurs, 1000 appels, API |
| **Enterprise** | Sur mesure | Agents illimités, infrastructure dédiée |

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

### Configuration Vercel
- **Framework Preset** : Next.js
- **Build Command** : `npm run build`
- **Output Directory** : `.next`
- **Install Command** : `npm install`

### Variables d'Environnement Vercel
```bash
vercel env add RETELL_API_KEY
vercel env add FIREBASE_PRIVATE_KEY
vercel env add STRIPE_SECRET_KEY
# ... autres variables
```

## 🔧 Développement

### Scripts Disponibles
```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Linting ESLint
npm run type-check   # Vérification TypeScript
```

### Structure des Dossiers
```
src/
├── app/                    # App Router Next.js 13+
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── lib/                   # Utilitaires et configurations
│   ├── retell-enhanced.ts # Configuration Retell
│   └── design-system.ts   # Système de design
├── components/            # Composants réutilisables
├── hooks/                 # Custom hooks
└── types/                 # Types TypeScript
```

### Conventions de Code
- **TypeScript strict** : Tous les fichiers en `.ts` ou `.tsx`
- **Tailwind CSS** : Classes utilitaires pour le styling
- **Framer Motion** : Animations fluides et performantes
- **ESLint + Prettier** : Code propre et cohérent

## 📈 Analytics & Monitoring

### Métriques de Performance
- **Trial to Paid** : >25% (objectif)
- **Sector Detection Accuracy** : >95%
- **Chat Widget Engagement** : >15%
- **Phone Test Completion** : >30%

### Métriques Retell Enhanced
- **Fast Tier Performance** : Latence <150ms
- **Custom Functions Usage** : Intégrations actives
- **Chat Widget Deployment** : Sites utilisant le widget
- **Error Handling** : Résolution automatique >90%

## 🔒 Sécurité & Compliance

### Sécurité
- **Chiffrement end-to-end** pour toutes les communications
- **Authentification multi-facteurs** (MFA)
- **Audit trail complet** pour toutes les actions
- **Backup automatique** quotidien

### Compliance par Secteur
- **E-commerce** : GDPR, PCI DSS
- **Santé** : GDPR, HIPAA, HDS
- **Finance** : ACPR, AMF, GDPR, PCI DSS
- **Immobilier** : GDPR, HCSF
- **Tous secteurs** : RGPD, ISO 27001

## 🤝 Support & Documentation

### Support Client
- **Support 7j/7** avec agents spécialisés
- **Documentation complète** en français
- **Vidéos tutoriels** par secteur
- **Community Discord** pour les développeurs

### Documentation API
- **API REST** complète avec OpenAPI 3.0
- **SDK JavaScript/TypeScript**
- **Exemples d'intégration** par secteur
- **Webhooks** pour événements temps réel

## 🚀 Roadmap

### Phase 1 : MVP (4 semaines) ✅
- [x] Infrastructure Retell Enhanced
- [x] Interface utilisateur multi-secteurs
- [x] Chat Widget adaptatif
- [x] Fast Tier migration
- [x] Custom Functions Enhanced

### Phase 2 : Spécialisation (6 semaines)
- [ ] Agents IA spécialisés par secteur
- [ ] Templates et workflows sectoriels
- [ ] Intégrations CRM/ERP principales
- [ ] Compliance et certifications
- [ ] Analytics avancées

### Phase 3 : Scale (4 semaines)
- [ ] Dashboard analytics multi-secteurs
- [ ] API complète pour entreprises
- [ ] White label et personnalisation
- [ ] Optimisations performance
- [ ] Programme partenaires

## 📞 Contact

- **Téléphone** : +1 (978) 748-6848
- **Email** : contact@coccinelle.ai
- **Site Web** : https://coccinelle.ai
- **Support** : support@coccinelle.ai

## 📄 Licence

Ce projet est propriétaire et confidentiel. Tous droits réservés © 2024 Coccinelle.ai.

---

**Propulsé par Retell Enhanced - L'avenir du Call Center IA est français ! 🇫🇷🤖🚀**
