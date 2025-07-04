'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  ArrowRight,
  Phone,
  MessageSquare,
  Settings,
  Zap,
  Building,
  Users,
  Target
} from 'lucide-react';

export default function OnboardingPage() {
  // Start at step 1 (objectives)
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    goals: [] as string[],
    integrations: [] as string[]
  });

  const goals = [
    'Qualifier des leads',
    'Gérer le support client',
    'Prendre des rendez-vous',
    'Traiter les commandes',
    'Gérer le SAV',
    'Conseiller les clients'
  ];

  const integrations = [
    'Shopify',
    'WooCommerce',
    'Salesforce',
    'HubSpot',
    'Zendesk',
    'Calendly',
    'Stripe',
    'Aucune pour l\'instant'
  ];

  const handleGoalToggle = (goal: string) => {
    setConfig(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleIntegrationToggle = (integration: string) => {
    setConfig(prev => ({
      ...prev,
      integrations: prev.integrations.includes(integration)
        ? prev.integrations.filter(i => i !== integration)
        : [...prev.integrations, integration]
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finaliser l'onboarding
      setLoading(true);
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-blue-600">coccinelle.ai</h1>
              <div className="text-sm text-neutral-500">Configuration</div>
            </div>
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <span>Étape {currentStep} sur 3</span>
              <div className="w-24 h-2 bg-neutral-200 rounded-full">
                <div 
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Étape 1: Objectifs */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Vos objectifs principaux
                </h2>
                <p className="text-neutral-600">
                  Sélectionnez les objectifs que vous souhaitez atteindre avec votre agent IA
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => handleGoalToggle(goal)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      config.goals.includes(goal)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-neutral-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 ${
                        config.goals.includes(goal) ? 'text-blue-600' : 'text-neutral-400'
                      }`} />
                      <span className="font-medium">{goal}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Étape 2: Intégrations */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Intégrations
                </h2>
                <p className="text-neutral-600">
                  Connectez vos outils existants pour une expérience optimale
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {integrations.map((integration) => (
                  <button
                    key={integration}
                    onClick={() => handleIntegrationToggle(integration)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      config.integrations.includes(integration)
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-neutral-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 ${
                        config.integrations.includes(integration) ? 'text-purple-600' : 'text-neutral-400'
                      }`} />
                      <span className="font-medium">{integration}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Étape 3: Finalisation */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Prêt à lancer votre agent IA !
                </h2>
                <p className="text-neutral-600">
                  Votre configuration est terminée. Nous allons maintenant créer votre agent IA personnalisé.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="font-semibold text-neutral-900 mb-4">Récapitulatif de votre configuration :</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Objectifs :</span>
                    <span className="font-medium">{config.goals.length} sélectionné(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Intégrations :</span>
                    <span className="font-medium">{config.integrations.length} sélectionnée(s)</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-semibold text-green-800">Configuration automatique</h4>
                    <p className="text-sm text-green-700">
                      Votre agent IA sera configuré automatiquement selon votre secteur et vos objectifs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-neutral-200">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6 py-3 text-neutral-600 hover:text-neutral-800 disabled:text-neutral-300 transition-colors"
            >
              Retour
            </button>
            
            <button
              onClick={handleNext}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-neutral-300 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Configuration en cours...
                </>
              ) : currentStep === 3 ? (
                <>
                  Lancer mon agent IA
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Continuer
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 