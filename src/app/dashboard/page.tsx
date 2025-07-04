'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  MessageSquare, 
  Users, 
  TrendingUp,
  Settings,
  Play,
  Pause,
  Volume2,
  Calendar,
  BarChart3,
  Zap,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  Star
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [agentStatus, setAgentStatus] = useState('active');

  const stats = {
    callsToday: 47,
    callsThisWeek: 234,
    avgCallDuration: '4m 32s',
    satisfactionRate: 94.2,
    leadsQualified: 23,
    appointmentsBooked: 8
  };

  const recentCalls = [
    { id: 1, number: '+33 1 23 45 67 89', duration: '3m 45s', status: 'completed', satisfaction: 5, time: '14:32' },
    { id: 2, number: '+33 1 98 76 54 32', duration: '5m 12s', status: 'completed', satisfaction: 4, time: '14:15' },
    { id: 3, number: '+33 1 11 22 33 44', duration: '2m 18s', status: 'missed', satisfaction: null, time: '13:58' },
    { id: 4, number: '+33 1 55 66 77 88', duration: '6m 33s', status: 'completed', satisfaction: 5, time: '13:42' },
    { id: 5, number: '+33 1 99 88 77 66', duration: '4m 07s', status: 'completed', satisfaction: 4, time: '13:25' }
  ];

  const quickActions = [
    { icon: Phone, label: 'Test d\'appel', color: 'bg-blue-500' },
    { icon: MessageSquare, label: 'Chat Widget', color: 'bg-green-500' },
    { icon: Settings, label: 'Configuration', color: 'bg-purple-500' },
    { icon: BarChart3, label: 'Analytics', color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-blue-600">coccinelle.ai</h1>
              <div className="text-sm text-neutral-500">Dashboard</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${agentStatus === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-neutral-600">
                  Agent IA {agentStatus === 'active' ? 'Actif' : 'Inactif'}
                </span>
              </div>
              <button className="text-neutral-600 hover:text-blue-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8 shadow-sm">
          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
            { id: 'calls', label: 'Appels', icon: Phone },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'settings', label: 'Paramètres', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">Appels aujourd'hui</p>
                    <p className="text-2xl font-bold text-neutral-900">{stats.callsToday}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">Satisfaction</p>
                    <p className="text-2xl font-bold text-neutral-900">{stats.satisfactionRate}%</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">Leads qualifiés</p>
                    <p className="text-2xl font-bold text-neutral-900">{stats.leadsQualified}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600">RDV programmés</p>
                    <p className="text-2xl font-bold text-neutral-900">{stats.appointmentsBooked}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Agent Status & Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Agent Status */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="md:col-span-1 bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Statut de l'agent IA</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Statut</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${agentStatus === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm font-medium">
                        {agentStatus === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Temps de réponse</span>
                    <span className="text-sm font-medium">{stats.avgCallDuration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Performance</span>
                    <span className="text-sm font-medium text-green-600">Excellent</span>
                  </div>
                  
                  <div className="pt-4 border-t border-neutral-200">
                    <button
                      onClick={() => setAgentStatus(agentStatus === 'active' ? 'inactive' : 'active')}
                      className={`w-full py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        agentStatus === 'active'
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {agentStatus === 'active' ? (
                        <>
                          <Pause className="w-4 h-4" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Activer
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:col-span-2 bg-white rounded-xl shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Actions rapides</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <button
                      key={action.label}
                      className="flex flex-col items-center gap-3 p-4 rounded-lg border border-neutral-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-neutral-700">{action.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent Calls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-neutral-900">Appels récents</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700">Voir tout</button>
              </div>
              
              <div className="space-y-3">
                {recentCalls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-3 rounded-lg border border-neutral-200">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        call.status === 'completed' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-neutral-900">{call.number}</p>
                        <p className="text-sm text-neutral-600">{call.time} • {call.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {call.satisfaction && (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < call.satisfaction! ? 'text-yellow-400 fill-current' : 'text-neutral-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      {call.status === 'missed' && (
                        <span className="text-sm text-red-600">Manqué</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Appels */}
        {activeTab === 'calls' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Gestion des appels</h2>
            <p className="text-neutral-600">Interface de gestion des appels en cours de développement...</p>
          </div>
        )}

        {/* Analytics */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Analytics avancées</h2>
            <p className="text-neutral-600">Graphiques et analyses détaillées en cours de développement...</p>
          </div>
        )}

        {/* Paramètres */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-6">Paramètres</h2>
            <p className="text-neutral-600">Configuration de l'agent IA en cours de développement...</p>
          </div>
        )}
      </div>
    </div>
  );
} 