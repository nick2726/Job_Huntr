import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import api from '../services/api';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hi there! I am your AI career assistant. How can I help you find an internship today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await api.post('/ai/chat', { message: userMessage });
      
      if (res.data.simulated) {
        setMessages(prev => [...prev, { role: 'bot', content: res.data.data + '\n\n*(Note: This is a simulated response because the OpenAI API Key is missing).*' }]);
      } else {
        setMessages(prev => [...prev, { role: 'bot', content: res.data.data }]);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.error || 'Oops, something went wrong connecting to the AI.';
      setMessages(prev => [...prev, { role: 'bot', content: `Error: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 p-3.5 sm:p-4 rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 transition-transform ${isOpen ? 'scale-0' : 'scale-100'} z-50 flex items-center justify-center cursor-pointer`}
        aria-label="Open AI Assistant"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] max-w-[380px] sm:max-w-[400px] h-[480px] sm:h-[500px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'} z-50 border border-gray-200 dark:border-gray-700`}>
        
        {/* Header */}
        <div className="bg-indigo-600 p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6" />
            <h3 className="font-semibold text-base sm:text-lg">AI Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white hover:bg-indigo-700 p-1 rounded-md transition-colors cursor-pointer" aria-label="Close AI Assistant">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-indigo-100 dark:bg-indigo-900/50' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> : <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
              </div>
              <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-tl-none whitespace-pre-wrap'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-tl-none">
                <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 sm:p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-900 border border-transparent focus:bg-white dark:focus:bg-gray-800 focus:border-indigo-500 rounded-full text-xs sm:text-sm outline-none dark:text-white transition-colors"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4 ml-[-2px]" />
          </button>
        </form>
      </div>
    </>
  );
};

export default AIChatBot;
