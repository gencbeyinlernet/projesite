import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Send, X, Bot, User, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

// Global text parser to make bold text and raw URLs clickable
function parseMessageText(text: string, isModel: boolean) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const boldParts = text.split('**');
  
  return boldParts.map((boldChunk, index) => {
    const isBold = index % 2 === 1;
    const subChunks = boldChunk.split(urlRegex);
    
    const renderedChunks = subChunks.map((subChunk, subIdx) => {
      // Check if subChunk is a URL
      if (urlRegex.test(subChunk) || subChunk.startsWith('http://') || subChunk.startsWith('https://')) {
        let cleanUrl = subChunk;
        let trailingPunctuation = '';
        
        // Strip trailing punctuation so link remains valid
        const match = cleanUrl.match(/[.,;:!?)]+$/);
        if (match) {
          trailingPunctuation = match[0];
          cleanUrl = cleanUrl.slice(0, -trailingPunctuation.length);
        }
        
        return (
          <span key={`url-${subIdx}`}>
            <a
              href={cleanUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline break-all font-semibold transition-all ${
                isModel 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-blue-150 hover:text-white'
              }`}
            >
              {cleanUrl}
            </a>
            {trailingPunctuation}
          </span>
        );
      }
      return subChunk;
    });

    if (isBold) {
      return (
        <strong key={`bold-${index}`} className={isModel ? "text-blue-300 font-semibold" : "font-extrabold"}>
          {renderedChunks}
        </strong>
      );
    }
    
    return <span key={`text-${index}`}>{renderedChunks}</span>;
  });
}

export default function BrainAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Merhaba değerli öğretmenim! Hazırlamış olduğumuz **Yapay Zekâ ile Ders Tasarımı Eğitimi** hakkında sorularınızı yanıtlamak için buradayım. Eğitim takvimi, oturum içerikleri, eğitmenler veya teknik adımlar (örneğin Node.js ve Gemini CLI kurulumu) hakkında bana dilediğinizi sorabilirsiniz. 🧠',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Eğitim ne zaman ve nerede yapılacak?',
    'Eğitimin oturumlarında neler anlatılacak?',
    'Gemini CLI kurulumu nasıl yapılır?',
    'Eğitmenlerimiz kimlerdir?'
  ];

  // Scroll to bottom on updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setError(null);
    const userMsgId = `user-${Date.now()}`;
    const newMsg: Message = {
      id: userMsgId,
      role: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history format (for context)
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Yapay zeka asistanı yanıt veremedi.');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `model-${Date.now()}`,
          role: 'model',
          text: data.text || 'Üzgünüm, şu an cevap üretemiyorum.',
          timestamp: new Date(),
        },
      ]);
    } catch (err: any) {
      console.error('Chat hatası:', err);
      setError(err?.message || 'Bağlantı kurulurken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-55 font-sans" id="brain-assistant-wrapper">
      <AnimatePresence>
        {/* Toggle Button */}
        {!isOpen && (
          <motion.button
            key="assistant-trigger"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => setIsOpen(true)}
            id="assistant-trigger-btn"
            className="flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 text-white rounded-full shadow-2xl cursor-pointer relative group border border-blue-400/40"
          >
            <Brain className="w-7 h-7 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500"></span>
            </span>
            {/* Tooltip */}
            <div className="absolute right-16 bg-slate-900 border border-slate-850 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl tracking-tight">
              Eğitim Soru Asistanı (Yapay Zekâ)
            </div>
          </motion.button>
        )}

        {/* Chat window */}
        {isOpen && (
          <motion.div
            key="assistant-window"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="w-[340px] sm:w-[380px] h-[550px] bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-3xl border border-slate-800 flex flex-col overflow-hidden"
            id="assistant-chat-window"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 px-4 py-3.5 border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="bg-gradient-to-tr from-blue-550 to-indigo-650 p-2 rounded-xl text-white shadow-inner flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5 text-blue-300" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100 flex items-center gap-1.5 leading-none">
                    <span>Nöron Asistan</span>
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono tracking-tight block mt-1">Eğitim & Müfredat SSS</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 cursor-pointer transition-colors"
                aria-label="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((message) => {
                const isModel = message.role === 'model';
                return (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2.5 ${isModel ? 'justify-start' : 'justify-end'}`}
                  >
                    {isModel && (
                      <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 p-1.5 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-blue-450" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed ${
                        isModel
                          ? 'bg-slate-950/60 border border-slate-800 text-slate-205 rounded-tl-none font-light'
                          : 'bg-blue-600 text-white rounded-tr-none font-medium shadow-md'
                      }`}
                    >
                      <p className="whitespace-pre-line">
                        {parseMessageText(message.text, isModel)}
                      </p>
                    </div>
                    {!isModel && (
                      <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 p-1 font-bold text-[10px]">
                        HOC
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Loader */}
              {isLoading && (
                <div className="flex items-start gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 p-1.5 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-blue-450 animate-bounce" />
                  </div>
                  <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-1 text-slate-400 rounded-tl-none">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}

              {/* Error messages */}
              {error && (
                <div className="bg-red-950/45 border border-red-900/30 text-red-300 p-3 rounded-xl text-xs flex items-start gap-2 animate-fade">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  <div>
                    <span className="font-bold">Bağlantı Hatası:</span> {error}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions list (only show if user has asked <= 1 custom question) */}
            {messages.length < 4 && (
              <div className="px-4 py-2 bg-slate-950/50 border-t border-slate-850/40">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-1">Sorabileceğiniz Sorular:</span>
                <div className="flex gap-1.5 py-1.5 overflow-x-auto scrollbar-none">
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="shrink-0 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all cursor-pointer whitespace-nowrap active:scale-95"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(input);
              }}
              className="p-3 bg-slate-950 border-t border-slate-850/80 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Eğitim hakkında bir soru sorun..."
                disabled={isLoading}
                className="flex-1 bg-slate-905 border border-slate-800/80 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800/80 disabled:opacity-40 text-white rounded-xl p-2 shrink-0 transition-all cursor-pointer flex items-center justify-center active:scale-95"
                aria-label="Gönder"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
