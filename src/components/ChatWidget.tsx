'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send,
  Sparkles
} from 'lucide-react';
import { type BusinessSector } from '@/lib/retell-enhanced';

interface ChatWidgetProps {
  sector?: BusinessSector;
  className?: string;
}

export default function ChatWidget({ sector = 'e-commerce', className = '' }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
  }>>([
    {
      id: '1',
      text: `Bonjour ! Je suis l'agent IA coccinelle.ai spécialisé ${sector === 'ecommerce' ? 'e-commerce' : sector === 'healthcare' ? 'santé' : sector === 'finance' ? 'finance' : sector === 'realestate' ? 'immobilier' : 'votre secteur'}. Comment puis-je vous aider aujourd'hui ?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputValue, sector),
        sender: 'ai' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const generateAIResponse = (message: string, currentSector: BusinessSector): string => {
    const responses: Record<BusinessSector, string[]> = {
      ecommerce: [
        "Je peux vous aider avec vos commandes, le suivi de livraison, ou toute question sur nos produits. Que souhaitez-vous savoir ?",
        "Pour votre commande, je peux vérifier le stock en temps réel et vous proposer des alternatives si nécessaire.",
        "Je vois que vous avez des questions sur notre politique de retour. Je peux vous expliquer le processus en détail."
      ],
      healthcare: [
        "Je peux vous aider à prendre un rendez-vous ou répondre à vos questions médicales générales. Avez-vous besoin d'une consultation ?",
        "Pour votre rendez-vous, je peux vérifier les disponibilités et vous proposer les créneaux les plus adaptés.",
        "Je comprends votre préoccupation. Je peux vous orienter vers le bon spécialiste selon vos besoins."
      ],
      finance: [
        "Je peux vous aider avec vos questions financières et vous orienter vers les services appropriés. Que recherchez-vous ?",
        "Pour votre demande de crédit, je peux vous expliquer les conditions et vous guider dans le processus.",
        "Je peux vous informer sur nos produits d'épargne et d'investissement adaptés à votre profil."
      ],
      realestate: [
        "Je peux vous aider à trouver le bien immobilier idéal ou répondre à vos questions sur l'immobilier. Que recherchez-vous ?",
        "Pour votre recherche, je peux vous proposer des biens correspondant à vos critères et organiser des visites.",
        "Je peux vous accompagner dans votre projet d'achat ou de location avec une expertise personnalisée."
      ],
      automotive: [
        "Je peux vous aider avec vos questions automobiles, la prise de rendez-vous pour entretien ou réparation. Que souhaitez-vous ?",
        "Pour votre véhicule, je peux vérifier les disponibilités et vous proposer les créneaux d'entretien les plus adaptés.",
        "Je peux vous informer sur nos services automobiles et vous accompagner dans vos démarches."
      ],
      education: [
        "Je peux vous aider avec vos questions sur l'éducation, l'inscription ou l'orientation. Que recherchez-vous ?",
        "Pour votre inscription, je peux vous guider dans le processus et répondre à vos questions.",
        "Je peux vous informer sur nos programmes éducatifs et vous accompagner dans votre parcours."
      ],
      b2b: [
        "Je peux vous aider avec vos questions B2B et vous orienter vers les services appropriés. Que recherchez-vous ?",
        "Pour votre entreprise, je peux vous proposer des solutions adaptées à vos besoins.",
        "Je peux vous accompagner dans vos démarches B2B avec une expertise personnalisée."
      ]
    };

    const sectorResponses = responses[currentSector];
    return sectorResponses[Math.floor(Math.random() * sectorResponses.length)];
  };

  return (
    <>
      {/* Chat Widget Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50 ${className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-neutral-200 z-40 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-primary text-white p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Coccinelle.ai</h3>
                  <p className="text-xs opacity-90">Agent IA spécialisé {sector}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 h-64">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-primary-blue text-white'
                        : 'bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-neutral-100 text-neutral-800 px-4 py-2 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-neutral-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Tapez votre message..."
                  className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-3 py-2 bg-primary-blue text-white rounded-lg hover:bg-primary-indigo transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 