import React, { useState, useRef, useEffect } from 'react';
import { Send, Settings, Bot, Clock, CheckCircle, Calendar, Brain, Zap, MessageSquare, Star } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'task' | 'reminder';
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

interface AICapability {
  icon: React.ReactNode;
  title: string;
  description: string;
  active: boolean;
}

const AIPersonalAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente personal inteligente. Puedo ayudarte con tareas, recordatorios, análisis de texto, y mucho más. ¿En qué puedo ayudarte hoy?',
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Revisar emails importantes', completed: false, priority: 'high', dueDate: '2025-08-08' },
    { id: '2', title: 'Preparar presentación', completed: false, priority: 'medium', dueDate: '2025-08-09' },
    { id: '3', title: 'Llamar al dentista', completed: true, priority: 'low' }
  ]);
  
  const [aiCapabilities] = useState<AICapability[]>([
    { icon: <MessageSquare size={20} />, title: 'Chat Inteligente', description: 'Conversación natural', active: true },
    { icon: <Calendar size={20} />, title: 'Gestión de Tareas', description: 'Organización automática', active: true },
    { icon: <Brain size={20} />, title: 'Análisis de Texto', description: 'Procesamiento NLP', active: true },
    { icon: <Zap size={20} />, title: 'Automatización', description: 'Workflows inteligentes', active: false }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('tarea') || lowerMessage.includes('task')) {
      return 'He añadido esa tarea a tu lista. ¿Te gustaría establecer una fecha límite o prioridad específica?';
    }
    
    if (lowerMessage.includes('recordatorio') || lowerMessage.includes('reminder')) {
      return 'Perfecto, he configurado ese recordatorio. Te notificaré en el momento apropiado.';
    }
    
    if (lowerMessage.includes('analizar') || lowerMessage.includes('analyze')) {
      return 'Analizando el contenido con IA... He procesado la información y aquí están los puntos clave que identifiqué.';
    }
    
    if (lowerMessage.includes('calendario') || lowerMessage.includes('calendar')) {
      return 'Revisando tu calendario... Tienes 2 eventos próximos y 3 tareas pendientes para esta semana.';
    }

    if (lowerMessage.includes('ayuda') || lowerMessage.includes('help')) {
      return 'Puedo ayudarte con: ✨ Gestión de tareas ✨ Recordatorios inteligentes ✨ Análisis de texto ✨ Organización de calendario ✨ Automatización de workflows. ¿Qué necesitas?';
    }
    
    // Respuestas conversacionales generales
    const responses = [
      'Interesante perspectiva. ¿Podrías darme más detalles para ayudarte mejor?',
      'Entiendo. Basándome en mi análisis, te sugiero considerar estas opciones...',
      'He procesado tu solicitud con IA. Aquí tienes algunas recomendaciones personalizadas.',
      'Perfecto. Usando mis capacidades de aprendizaje automático, creo que esto podría interesarte.',
      'Excelente pregunta. Mi análisis indica que la mejor aproximación sería...'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simular procesamiento de IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="backdrop-blur-md bg-black/30 border-b border-gray-700 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-gray-400 flex items-center justify-center">
              <Brain size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold">AI Personal Assistant</h1>
              <p className="text-sm text-gray-300">Powered by Advanced AI</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-sm bg-green-500/20 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>AI Online</span>
            </div>
            <Settings className="w-6 h-6 cursor-pointer hover:text-gray-400 transition-colors" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* AI Capabilities Panel */}
        <div className="lg:col-span-1">
          <div className="backdrop-blur-md bg-black/20 rounded-xl border border-gray-700 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Zap className="mr-2" size={20} />
              AI Capabilities
            </h3>
            <div className="space-y-3">
              {aiCapabilities.map((capability, index) => (
                <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  capability.active ? 'bg-green-500/20 border border-green-500/30' : 'bg-gray-500/20'
                }`}>
                  <div className={`${capability.active ? 'text-green-400' : 'text-gray-400'}`}>
                    {capability.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{capability.title}</div>
                    <div className="text-xs text-gray-400">{capability.description}</div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    capability.active ? 'bg-green-400' : 'bg-gray-500'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks Panel */}
          <div className="backdrop-blur-md bg-black/20 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <CheckCircle className="mr-2" size={20} />
              Smart Tasks
            </h3>
            <div className="space-y-2">
              {tasks.map((task) => (
                <div key={task.id} className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all hover:bg-white/5 ${
                  task.completed ? 'opacity-60' : ''
                }`} onClick={() => toggleTask(task.id)}>
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    task.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'
                  }`}>
                    {task.completed && <CheckCircle size={12} />}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm ${task.completed ? 'line-through' : ''}`}>
                      {task.title}
                    </div>
                    {task.dueDate && (
                      <div className="text-xs text-gray-400 flex items-center mt-1">
                        <Clock size={10} className="mr-1" />
                        {task.dueDate}
                      </div>
                    )}
                  </div>
                  <Star className={`w-3 h-3 ${getPriorityColor(task.priority)}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <div className="backdrop-blur-md bg-black/20 rounded-xl border border-gray-700 h-[600px] flex flex-col">
            
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-600 to-gray-400 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <div className="font-medium">AI Assistant</div>
                  <div className="text-xs text-green-400">Procesando con IA avanzada...</div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-gray-600 to-gray-400 text-white ml-auto' 
                      : 'bg-white/20 backdrop-blur-sm border border-white/30'
                  }`}>
                    <div className="text-sm">{message.text}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-lg max-w-xs">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje... (ej: 'crear tarea', 'analizar texto', 'ayuda')"
                  className="flex-1 bg-white/10 border border-white/30 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="bg-gradient-to-r from-gray-600 to-gray-400 hover:from-gray-700 hover:to-gray-500 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="text-xs text-gray-400 mt-2 text-center">
                Potenciado por IA avanzada • REST APIs • TypeScript • Vite
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPersonalAssistant;
