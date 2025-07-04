'use client';

import React, { useState, useEffect } from 'react';
import { Phone, X, PhoneCall, PhoneOff, Loader2 } from 'lucide-react';
import { createRetellService, getDefaultRetellConfig, RetellCallStatus } from '../lib/retell-service';

interface RetellPhoneWidgetProps {
  sector?: 'realestate' | 'ecommerce' | 'healthcare' | 'finance';
  className?: string;
}

export default function RetellPhoneWidget({ sector = 'realestate', className = '' }: RetellPhoneWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [callStatus, setCallStatus] = useState<RetellCallStatus>({ status: 'idle' });
  const [agentStatus, setAgentStatus] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Initialiser le service Retell
  const retellService = createRetellService(getDefaultRetellConfig());

  useEffect(() => {
    // Vérifier le statut de l'agent au chargement
    checkAgentStatus();
  }, []);

  const checkAgentStatus = async () => {
    try {
      const status = await retellService.checkAgentStatus();
      setAgentStatus(status);
      console.log('Agent disponible:', status);
    } catch (error) {
      console.error('Erreur vérification agent:', error);
      setAgentStatus(false);
    }
  };

  const handleCall = async () => {
    if (!phoneNumber.trim()) {
      setError('Veuillez entrer un numéro de téléphone');
      return;
    }

    if (!agentStatus) {
      setError('Agent IA non disponible pour le moment');
      return;
    }

    setIsLoading(true);
    setError('');
    setCallStatus({ status: 'connecting', message: 'Connexion en cours...' });

    try {
      console.log('🚀 Démarrage appel vers:', phoneNumber);
      
      // Démarrer l'appel avec la vraie API Retell
      const result = await retellService.startCall(phoneNumber);
      
      setCallStatus(result);
      
      if (result.status === 'error') {
        setError(result.error || 'Erreur lors de l\'appel');
      } else {
        console.log('✅ Appel démarré avec succès:', result);
        
        // Polling pour vérifier le statut de l'appel
        const pollInterval = setInterval(async () => {
          const status = await retellService.getCallStatus();
          setCallStatus(status);
          
          if (status.status === 'ended' || status.status === 'error') {
            clearInterval(pollInterval);
          }
        }, 2000);
      }

    } catch (error) {
      console.error('❌ Erreur appel:', error);
      setError(error instanceof Error ? error.message : 'Erreur inconnue');
      setCallStatus({ status: 'error', error: 'Erreur lors de l\'appel' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndCall = async () => {
    setIsLoading(true);
    try {
      const result = await retellService.endCall();
      setCallStatus(result);
      console.log('📞 Appel terminé:', result);
    } catch (error) {
      console.error('❌ Erreur fin d\'appel:', error);
      setError(error instanceof Error ? error.message : 'Erreur lors de la fin d\'appel');
    } finally {
      setIsLoading(false);
    }
  };

  const resetCall = () => {
    setCallStatus({ status: 'idle' });
    setPhoneNumber('');
    setError('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connecting': return 'text-yellow-600';
      case 'connected': return 'text-green-600';
      case 'ended': return 'text-gray-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connecting': return '🔄';
      case 'connected': return '📞';
      case 'ended': return '✅';
      case 'error': return '❌';
      default: return '📱';
    }
  };

  return (
    <>
      {/* Bouton widget flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-green-500 text-white shadow-lg z-50 hover:bg-green-600 transition-colors"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Phone className="w-6 h-6" />
        )}
      </button>

      {/* Panel widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-xl p-4 z-40 border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Agent IA Immobilier</h3>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${agentStatus ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">
                {agentStatus ? 'En ligne' : 'Indisponible'}
              </span>
            </div>
          </div>

          {/* Statut de l'appel */}
          {callStatus.status !== 'idle' && (
            <div className={`mb-4 p-3 rounded-lg border ${getStatusColor(callStatus.status).replace('text-', 'border-')}`}>
              <div className="flex items-center gap-2">
                <span className="text-lg">{getStatusIcon(callStatus.status)}</span>
                <div>
                  <p className={`font-medium ${getStatusColor(callStatus.status)}`}>
                    {callStatus.status === 'connecting' && 'Connexion en cours...'}
                    {callStatus.status === 'connected' && 'Appel en cours'}
                    {callStatus.status === 'ended' && 'Appel terminé'}
                    {callStatus.status === 'error' && 'Erreur'}
                  </p>
                  {callStatus.message && (
                    <p className="text-sm text-gray-600">{callStatus.message}</p>
                  )}
                  {callStatus.callId && (
                    <p className="text-xs text-gray-500">ID: {callStatus.callId}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Contenu selon le statut */}
          {callStatus.status === 'idle' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Entrez votre numéro de téléphone pour être appelé par notre agent IA spécialisé immobilier.
              </p>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+33 6 12 34 56 78"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={isLoading}
              />
              
              {/* Message d'erreur */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                onClick={handleCall}
                disabled={!phoneNumber || isLoading || !agentStatus}
                className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Connexion...
                  </>
                ) : (
                  <>
                    <PhoneCall className="w-4 h-4" />
                    Être appelé
                  </>
                )}
              </button>
            </div>
          )}

          {callStatus.status === 'connecting' && (
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-green-500" />
              <h4 className="font-semibold">Connexion en cours...</h4>
              <p className="text-sm text-gray-600">
                L'agent IA vous appelle sur {phoneNumber}
              </p>
              <button
                onClick={handleEndCall}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                Annuler
              </button>
            </div>
          )}

          {callStatus.status === 'connected' && (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-green-600">En communication</h4>
              <p className="text-sm text-gray-600">
                Vous parlez avec l'agent IA immobilier
              </p>
              <button
                onClick={handleEndCall}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 mx-auto"
              >
                <PhoneOff className="w-4 h-4" />
                Terminer l'appel
              </button>
            </div>
          )}

          {callStatus.status === 'ended' && (
            <div className="text-center space-y-4">
              <PhoneOff className="w-12 h-12 text-gray-400 mx-auto" />
              <h4 className="font-semibold">Appel terminé</h4>
              <p className="text-sm text-gray-600">
                Merci d'avoir utilisé Coccinelle.ai
              </p>
              <button
                onClick={resetCall}
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                Nouvel appel
              </button>
            </div>
          )}

          {callStatus.status === 'error' && (
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                <X className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-red-600">Erreur</h4>
              <p className="text-sm text-gray-600">
                {callStatus.error || 'Une erreur est survenue'}
              </p>
              <button
                onClick={resetCall}
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
              >
                Réessayer
              </button>
            </div>
          )}

          {/* Informations techniques */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 space-y-1">
              <div>Agent ID: {getDefaultRetellConfig().agentId}</div>
              <div>Numéro: {getDefaultRetellConfig().twilioNumber}</div>
              <div>Secteur: Immobilier</div>
              <div>API: Retell REST</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 