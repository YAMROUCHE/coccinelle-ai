'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, Zap } from 'lucide-react';
import { SECTOR_CONFIGS } from '@/lib/retell-enhanced';

interface MetricData {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface SectorMetricsProps {
  sector: string;
  metrics?: MetricData[];
  className?: string;
}

interface Metric {
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  description: string;
}

export default function SectorMetrics({ sector, className = '' }: SectorMetricsProps) {
  const sectorConfig = SECTOR_CONFIGS[sector as keyof typeof SECTOR_CONFIGS] || SECTOR_CONFIGS['e-commerce'];

  // Métriques par secteur
  const getSectorMetrics = (currentSector: string): Metric[] => {
    const metrics: Record<string, Metric[]> = {
      'e-commerce': [
        {
          label: 'Taux de Conversion',
          value: '+156%',
          icon: TrendingUp,
          color: '#10B981',
          description: 'Amélioration moyenne du taux de conversion'
        },
        {
          label: 'Panier Moyen',
          value: '+45%',
          icon: Target,
          color: '#3B82F6',
          description: 'Augmentation de la valeur moyenne des commandes'
        },
        {
          label: 'Satisfaction Client',
          value: '94%',
          icon: Users,
          color: '#F59E0B',
          description: 'Score de satisfaction client moyen'
        },
        {
          label: 'Temps de Réponse',
          value: '<150ms',
          icon: Zap,
          color: '#EF4444',
          description: 'Latence moyenne avec Fast Tier'
        }
      ],
      'santé': [
        {
          label: 'RDV Confirmés',
          value: '+95%',
          icon: TrendingUp,
          color: '#10B981',
          description: 'Taux de confirmation des rendez-vous'
        },
        {
          label: 'Satisfaction Patients',
          value: '98.5%',
          icon: Users,
          color: '#3B82F6',
          description: 'Score de satisfaction des patients'
        },
        {
          label: 'Conformité GDPR',
          value: '100%',
          icon: Target,
          color: '#F59E0B',
          description: 'Respect des normes de confidentialité'
        },
        {
          label: 'Temps de Réponse',
          value: '<150ms',
          icon: Zap,
          color: '#EF4444',
          description: 'Latence moyenne avec Fast Tier'
        }
      ],
      'finance': [
        {
          label: 'Leads Qualifiés',
          value: '+89%',
          icon: TrendingUp,
          color: '#10B981',
          description: 'Amélioration de la qualification des prospects'
        },
        {
          label: 'Taux d\'Approbation',
          value: '+45%',
          icon: Target,
          color: '#3B82F6',
          description: 'Augmentation du taux d\'approbation des dossiers'
        },
        {
          label: 'Conformité Réglementaire',
          value: '100%',
          icon: Users,
          color: '#F59E0B',
          description: 'Respect des normes ACPR/AMF'
        },
        {
          label: 'Temps de Réponse',
          value: '<150ms',
          icon: Zap,
          color: '#EF4444',
          description: 'Latence moyenne avec Fast Tier'
        }
      ],
      'immobilier': [
        {
          label: 'Prospects Qualifiés',
          value: '+145%',
          icon: TrendingUp,
          color: '#10B981',
          description: 'Augmentation des prospects qualifiés'
        },
        {
          label: 'Visites Programmées',
          value: '+80%',
          icon: Target,
          color: '#3B82F6',
          description: 'Amélioration du taux de programmation'
        },
        {
          label: 'Taux de Conversion',
          value: '+67%',
          icon: Users,
          color: '#F59E0B',
          description: 'Augmentation du taux de conversion'
        },
        {
          label: 'Temps de Réponse',
          value: '<150ms',
          icon: Zap,
          color: '#EF4444',
          description: 'Latence moyenne avec Fast Tier'
        }
      ],
      'automobile': [
        {
          label: 'RDV Entretien',
          value: '+78%',
          icon: TrendingUp,
          color: '#10B981',
          description: 'Augmentation des rendez-vous d\'entretien'
        },
        {
          label: 'Services SAV',
          value: '+52%',
          icon: Target,
          color: '#3B82F6',
          description: 'Amélioration de l\'adoption des services'
        },
        {
          label: 'Fidélisation Client',
          value: '91%',
          icon: Users,
          color: '#F59E0B',
          description: 'Taux de rétention client'
        },
        {
          label: 'Temps de Réponse',
          value: '<150ms',
          icon: Zap,
          color: '#EF4444',
          description: 'Latence moyenne avec Fast Tier'
        }
      ],
      'éducation': [
        {
          label: 'Inscriptions',
          value: '+82%',
          icon: TrendingUp,
          color: '#10B981',
          description: 'Augmentation du taux d\'inscription'
        },
        {
          label: 'Satisfaction Étudiants',
          value: '96%',
          icon: Users,
          color: '#3B82F6',
          description: 'Score de satisfaction des étudiants'
        },
        {
          label: 'Taux de Réussite',
          value: '+38%',
          icon: Target,
          color: '#F59E0B',
          description: 'Amélioration du taux de réussite'
        },
        {
          label: 'Temps de Réponse',
          value: '<150ms',
          icon: Zap,
          color: '#EF4444',
          description: 'Latence moyenne avec Fast Tier'
        }
      ],
      'b2b-services': [
        {
          label: 'Leads Qualifiés',
          value: '+73%',
          icon: TrendingUp,
          color: '#10B981',
          description: 'Amélioration de la qualification B2B'
        },
        {
          label: 'Démonstrations',
          value: '+89%',
          icon: Target,
          color: '#3B82F6',
          description: 'Augmentation des démonstrations programmées'
        },
        {
          label: 'Conversion Deals',
          value: '+41%',
          icon: Users,
          color: '#F59E0B',
          description: 'Amélioration du taux de conversion'
        },
        {
          label: 'Temps de Réponse',
          value: '<150ms',
          icon: Zap,
          color: '#EF4444',
          description: 'Latence moyenne avec Fast Tier'
        }
      ]
    };

    return metrics[currentSector] || metrics['b2b-services'];
  };

  const metrics = getSectorMetrics(sector);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h3 className="text-2xl font-bold mb-2">
          Performance {sectorConfig.name}
        </h3>
        <p className="text-sm text-neutral-600">
          L&apos;IA coccinelle.ai s&apos;adapte automatiquement à votre secteur avec expertise métier spécialisée.
        </p>
      </motion.div>

      {/* Grille de métriques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200 hover:shadow-xl transition-all duration-300"
            >
              {/* Icône */}
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${metric.color}20` }}
                >
                  <IconComponent 
                    className="w-6 h-6" 
                    style={{ color: metric.color }}
                  />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold" style={{ color: metric.color }}>
                    {metric.value}
                  </div>
                </div>
              </div>

              {/* Label et description */}
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">
                  {metric.label}
                </h4>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Badge Fast Tier */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 bg-fast-tier text-neutral-900 px-4 py-2 rounded-full font-semibold">
          <Zap className="w-4 h-4" />
          Fast Tier OpenAI - Performance Premium
        </div>
      </motion.div>
    </div>
  );
}
