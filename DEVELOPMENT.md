# 🚀 GUIDE DE DÉVELOPPEMENT - COCCINELLE.AI

Ce guide détaille les bonnes pratiques, l'architecture et les processus de développement pour Coccinelle.ai.

## 📋 Table des Matières

1. [Architecture du Projet](#architecture-du-projet)
2. [Configuration de l'Environnement](#configuration-de-lenvironnement)
3. [Conventions de Code](#conventions-de-code)
4. [Structure des Composants](#structure-des-composants)
5. [Tests](#tests)
6. [Déploiement](#déploiement)
7. [Debugging](#debugging)
8. [Performance](#performance)

## 🏗️ Architecture du Projet

### Stack Technologique
- **Frontend** : Next.js 15+ avec App Router
- **Styling** : Tailwind CSS avec design system personnalisé
- **Animations** : Framer Motion
- **État** : React Hooks + Context API
- **Formulaires** : React Hook Form + Zod
- **Backend** : Next.js API Routes + Firebase + Supabase
- **IA** : Retell Enhanced avec Fast Tier OpenAI

### Structure des Dossiers
```
src/
├── app/                    # App Router Next.js 13+
│   ├── layout.tsx         # Layout principal avec métadonnées
│   ├── page.tsx           # Page d'accueil
│   ├── globals.css        # Styles globaux
│   └── api/               # API Routes
├── components/            # Composants réutilisables
│   ├── ChatWidget.tsx     # Widget de chat multi-secteurs
│   └── SectorMetrics.tsx  # Métriques par secteur
├── lib/                   # Utilitaires et configurations
│   ├── retell-enhanced.ts # Configuration Retell
│   └── design-system.ts   # Système de design
├── hooks/                 # Custom hooks
├── types/                 # Types TypeScript
└── utils/                 # Fonctions utilitaires
```

## ⚙️ Configuration de l'Environnement

### Prérequis
- Node.js 18+
- npm 9+ ou yarn
- Git

### Installation
```bash
# Cloner le repository
git clone https://github.com/coccinelle-ai/coccinelle-ai.git
cd coccinelle-ai

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp env.example .env.local

# Démarrer le serveur de développement
npm run dev
```

### Variables d'Environnement Requises
```env
# Retell AI
RETELL_API_KEY=your_retell_api_key
RETELL_AGENT_ID=agent_7bf576aa313d5af19e9fac7855

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 Conventions de Code

### TypeScript
- **Strict Mode** : Toujours activé
- **Types explicites** : Pour toutes les fonctions publiques
- **Interfaces** : Pour les props de composants
- **Enums** : Pour les valeurs constantes

```typescript
// ✅ Bon
interface ChatWidgetProps {
  sector: BusinessSector;
  publicKey?: string;
  className?: string;
}

// ❌ Éviter
const ChatWidget = ({ sector, publicKey, className }) => {
```

### React
- **Functional Components** : Toujours utiliser
- **Hooks** : Préférer les hooks personnalisés
- **Props** : Destructuration explicite
- **Children** : Type ReactNode

```typescript
// ✅ Bon
interface ComponentProps {
  children: ReactNode;
  className?: string;
}

export default function Component({ children, className = '' }: ComponentProps) {
  return <div className={className}>{children}</div>;
}
```

### CSS/Tailwind
- **Utility Classes** : Préférer Tailwind
- **Custom Classes** : Dans globals.css avec @layer
- **Responsive** : Mobile-first
- **Dark Mode** : Support optionnel

```css
/* ✅ Bon - Dans globals.css */
@layer components {
  .btn-primary {
    @apply bg-primary-blue hover:bg-primary-indigo text-white font-semibold py-3 px-8 rounded-xl;
  }
}
```

## 🧩 Structure des Composants

### Template de Composant
```typescript
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ComponentProps } from '@/types';

interface MyComponentProps {
  // Props du composant
}

export default function MyComponent({ ...props }: MyComponentProps) {
  // Hooks
  const [state, setState] = useState();

  // Effects
  useEffect(() => {
    // Logique d'effet
  }, []);

  // Handlers
  const handleClick = () => {
    // Logique de gestion
  };

  // Render
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="component-class"
    >
      {/* Contenu du composant */}
    </motion.div>
  );
}
```

### Conventions de Nommage
- **Composants** : PascalCase (ex: `ChatWidget`)
- **Fichiers** : PascalCase.tsx (ex: `ChatWidget.tsx`)
- **Hooks** : camelCase avec "use" (ex: `useRetellClient`)
- **Types** : PascalCase (ex: `BusinessSector`)
- **Constants** : UPPER_SNAKE_CASE (ex: `RETELL_CONFIG`)

## 🧪 Tests

### Structure des Tests
```
src/
├── __tests__/           # Tests d'intégration
├── components/
│   └── __tests__/      # Tests de composants
└── lib/
    └── __tests__/      # Tests d'utilitaires
```

### Exemple de Test
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import ChatWidget from '@/components/ChatWidget';

describe('ChatWidget', () => {
  it('should render with correct sector', () => {
    render(<ChatWidget sector="ecommerce" />);
    
    expect(screen.getByText(/Assistant E-commerce/)).toBeInTheDocument();
  });

  it('should open chat window on click', () => {
    render(<ChatWidget sector="ecommerce" />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByPlaceholderText(/Tapez votre message/)).toBeInTheDocument();
  });
});
```

### Commandes de Test
```bash
npm run test              # Tests unitaires
npm run test:watch        # Tests en mode watch
npm run test:coverage     # Tests avec couverture
```

## 🚀 Déploiement

### Environnements
- **Development** : `http://localhost:3000`
- **Staging** : `https://staging.coccinelle.ai`
- **Production** : `https://coccinelle.ai`

### Processus de Déploiement
1. **Développement** : `npm run dev`
2. **Build** : `npm run build`
3. **Test** : `npm run test`
4. **Lint** : `npm run lint`
5. **Type Check** : `npm run type-check`
6. **Déploiement** : `vercel --prod`

### Vercel Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

## 🐛 Debugging

### Outils de Debug
- **React DevTools** : Extension navigateur
- **Next.js DevTools** : Intégré au serveur de dev
- **Console** : Logs structurés
- **Network** : Monitoring des requêtes API

### Logs Structurés
```typescript
// ✅ Bon
console.log('[ChatWidget]', {
  action: 'message_sent',
  sector: 'ecommerce',
  timestamp: new Date().toISOString(),
  data: { messageId, text }
});

// ❌ Éviter
console.log('Message sent:', messageId, text);
```

### Debug en Production
```typescript
// Utiliser les variables d'environnement
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

## ⚡ Performance

### Optimisations Next.js
- **Image Optimization** : Utiliser next/image
- **Code Splitting** : Automatique avec App Router
- **Prefetching** : Liens automatiques
- **Static Generation** : Quand possible

### Optimisations React
- **Memoization** : React.memo pour les composants lourds
- **useMemo** : Pour les calculs coûteux
- **useCallback** : Pour les fonctions passées en props
- **Lazy Loading** : Pour les composants volumineux

```typescript
// ✅ Bon - Memoization
const ExpensiveComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => {
    return heavyProcessing(data);
  }, [data]);

  return <div>{processedData}</div>;
});

// ✅ Bon - Lazy Loading
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### Monitoring Performance
- **Core Web Vitals** : LCP, FID, CLS
- **Bundle Analyzer** : `npm run analyze`
- **Lighthouse** : Tests de performance
- **Vercel Analytics** : Métriques en production

## 🔧 Scripts Utiles

### Développement
```bash
npm run dev              # Serveur de développement
npm run build            # Build de production
npm run start            # Serveur de production
npm run lint             # Linting ESLint
npm run type-check       # Vérification TypeScript
npm run format           # Formatage Prettier
```

### Tests
```bash
npm run test             # Tests unitaires
npm run test:watch       # Tests en mode watch
npm run test:coverage    # Tests avec couverture
```

### Analyse
```bash
npm run analyze          # Bundle analyzer
npm run build:analyze    # Build + analyse
```

## 📚 Ressources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Retell AI](https://retellai.com/docs)

### Outils
- [TypeScript](https://www.typescriptlang.org/docs)
- [React Hook Form](https://react-hook-form.com/docs)
- [Zod](https://zod.dev/)

### Communauté
- [Discord Coccinelle.ai](https://discord.gg/coccinelle-ai)
- [GitHub Issues](https://github.com/coccinelle-ai/coccinelle-ai/issues)
- [Documentation API](https://docs.coccinelle.ai)

---

**Besoin d'aide ?** Contactez l'équipe de développement à dev@coccinelle.ai 🚀 