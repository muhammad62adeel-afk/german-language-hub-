import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle, X, Send, Sparkles, Bot, User,
  RotateCcw, ArrowRight, CheckCircle2, ChevronDown
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

interface AIChatBotProps {
  onRegisterClick?: () => void;
}

const QUICK_PROMPTS = [
  { label: '⏱️ Course Duration kitna hai?', query: 'German language course ka duration kitna hai (A1, A2, B1, B2)?' },
  { label: '💻 Zoom App Classes kaise hoti hain?', query: 'Zoom app par classes kis tarah conduct hoti hain aur timings kya hain?' },
  { label: '🇩🇪 Germany aane me team support kaise kregi?', query: 'Agar main talented student hoon toh kya team mujhe Germany aane me support karegi?' },
  { label: '👨‍🏫 Teachers aur fees ka batayein?', query: 'Classes kon parhata hai aur kya yeh bilkul free hai?' },
];

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-1',
  sender: 'bot',
  text: `Guten Tag! 🇩🇪 Main **Ahmed Rajput German Language Program** ka official AI Guide hoon.

Aap mujhse courses, levels ki duration (A1, A2, B1, B2), Zoom app live classes, teachers, ya Germany visa aur study support ke baare me kuch bhi pooch sakte hain.

Main aapki kis cheez me madad karoon? ✨`,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

function getClientBilingualReply(userMessage: string): string {
  const query = userMessage.toLowerCase().trim();

  const englishWords = [
    'what', 'how', 'when', 'why', 'where', 'who', 'which', 'is', 'are', 'can', 'do', 'does',
    'duration', 'time', 'timing', 'schedule', 'class', 'classes', 'teacher', 'teachers',
    'free', 'cost', 'fee', 'fees', 'money', 'register', 'apply', 'registration', 'germany',
    'support', 'visa', 'job', 'work', 'study', 'university', 'ausbildung', 'opportunity',
    'certificate', 'exam', 'hello', 'hi', 'hey', 'good morning', 'good evening', 'thank',
    'thanks', 'tell me', 'information', 'detail', 'details', 'beginner', 'learn', 'month', 'months'
  ];
  const urduWords = [
    'kya', 'kia', 'kaise', 'kese', 'kaisa', 'kis', 'kab', 'kyun', 'kion', 'kitna', 'kitne',
    'kitta', 'mahina', 'mahine', 'maheene', 'waqt', 'class', 'parhai', 'parhate', 'ustad',
    'sir', 'teacher', 'paisa', 'paise', 'fees', 'muft', 'free', 'faida', 'fyda', 'seekhna',
    'karna', 'hoga', 'hogi', 'aana', 'jana', 'support', 'madad', 'team', 'ahmed', 'rajput',
    'salam', 'assalam', 'aoa', 'kuch', 'batao', 'batayein', 'bataen', 'btain', 'shuru'
  ];

  let englishScore = 0;
  let urduScore = 0;
  for (const w of englishWords) {
    if (new RegExp(`\\b${w}\\b`, 'i').test(query)) englishScore++;
  }
  for (const w of urduWords) {
    if (new RegExp(`\\b${w}\\b`, 'i').test(query)) urduScore++;
  }
  const isEnglish = englishScore > urduScore || (englishScore > 0 && urduScore === 0);

  if (query.includes('duration') || query.includes('time') || query.includes('month') || query.includes('kitna') || query.includes('kitta') || query.includes('mahine') || query.includes('how long')) {
    if (isEnglish) {
      return `🇩🇪 **German Course Levels & Exact Durations:**\n\n• **Level A1:** 2 Months (Beginner)\n• **Level A2:** 2 Months (Elementary)\n• **Level B1:** 3 Months (Intermediate)\n• **Level B2:** 3 Months (Professional Fluency)\n\n✨ Total duration is **10 months** from zero to fluent! Classes are 100% Free on Zoom.`;
    }
    return `🇩🇪 **German Course Levels Aur Unka Duration:**\n\n• **Level A1:** 2 Mahine (Shuruati buniyaad)\n• **Level A2:** 2 Mahine (Daily conversation & grammar)\n• **Level B1:** 3 Mahine (Visa aur job requirement)\n• **Level B2:** 3 Mahine (Professional fluency & university admission)\n\n✨ Total 10 mahine me aap zero se fluent ban saktay hain! Classes 100% Free Zoom app par hoti hain.`;
  }

  if (query.includes('zoom') || query.includes('kaise') || query.includes('kese') || query.includes('how does') || query.includes('how class')) {
    if (isEnglish) {
      return `💻 **How Live Zoom Classes Work:**\n\n• **100% Live on Zoom:** Certified teachers share books, slides, and grammar rules live.\n• **Interactive Speaking:** You can unmute your microphone to practice speaking German live with the teacher.\n• **Two Batches:** Morning Batch (10:00 AM – 11:00 AM PKT) & Night Batch (09:00 PM – 10:00 PM PKT).\n• Notes and recordings are provided in WhatsApp groups!`;
    }
    return `💻 **Zoom App Live Classes Ka Tariqa:**\n\n• **100% Live Zoom App:** Classes Zoom par live hoti hain, teacher screen share kar ke book aur grammar sikhate hain.\n• **Live Speaking Practice:** Aap mic on kar ke direct teacher ke sath German bolne ki practice karte hain.\n• **2 Batches:** Subha (10 AM – 11 AM) aur Raat (09 PM – 10 PM PKT).\n• WhatsApp group me notes aur lecture materials bhi milte hain!`;
  }

  if (query.includes('germany') || query.includes('support') || query.includes('talent') || query.includes('visa') || query.includes('ausbildung') || query.includes('job')) {
    if (isEnglish) {
      return `🚀 **Team Germany Support for Talented Students:**\n\nYes! If you are dedicated and talented, **Ahmed Rajput and his team will fully support your relocation to Germany**:\n\n1. 🎓 **Study in Germany:** Free tuition public university admissions.\n2. 💼 **Ausbildung:** Paid vocational training with monthly stipend (~€1,000+).\n3. 🛂 **Opportunity Card (Chancenkarte):** Job seeker visa guidance.\n4. 🩺 **Work Visas:** Direct opportunities for IT, Engineers, and Healthcare.\n5. 📄 **CV & Interview Prep:** German format CV and Embassy interview coaching!`;
    }
    return `🚀 **Talented Students Ke Liye Germany Support:**\n\nBilkul! Agar aap mehnati aur talented hain, toh **Ahmed Rajput aur unki team aapko Germany aane me poori support karegi**:\n\n1. 🎓 **Study in Germany:** Free tuition public universities me admission.\n2. 💼 **Ausbildung:** Paid vocational training (har mahine ~€1,000+ stipend).\n3. 🛂 **Opportunity Card (Chancenkarte):** Job search visa guidance.\n4. 🩺 **Work Visas:** IT, Engineers aur Nurses ke liye visa support.\n5. 📄 **CV & Visa Help:** German format CV aur embassy interview prep!`;
  }

  if (query.includes('teacher') || query.includes('ustad') || query.includes('sir') || query.includes('faida') || query.includes('benefit')) {
    if (isEnglish) {
      return `👨‍🏫 **Qualified Teachers & Huge Benefits:**\n\n• **Dedicated Certified Teachers:** We have hired professional German instructors to guide every student step-by-step.\n• **Huge Benefit:** Private academies charge Rs. 30,000–60,000+ per level, but here it is **100% Free**!\n• **Direct Attention:** Live pronunciation corrections and complete Goethe/TELC exam preparation.`;
    }
    return `👨‍🏫 **Dedicated Teachers Aur Bada Faida (Idr Teacher Raka Ha):**\n\n• **Qualified Teachers:** Hum ne specially certified German teachers hire kiye huay hain jo zero se aakhir tak guide karte hain.\n• **Bohat Bada Faida:** Market me yehi courses hazaron rupay ke hotay hain, jabke yahan Ahmed Rajput ki taraf se **100% Free** hain!\n• **Direct Feedback:** Teacher aapki pronunciation theek karate hain aur exam ki poori tayyari karwayi jaati hai!`;
  }

  if (query.includes('free') || query.includes('fee') || query.includes('paisa') || query.includes('cost')) {
    if (isEnglish) {
      return `🎉 **100% Completely Free!**\n\nThis entire German language program (A1, A2, B1, B2) has **zero fees**. It is 100% sponsored by Ahmed Rajput (Software Engineer in Germany). Simply fill out the registration form to join!`;
    }
    return `🎉 **100% Bilkul Free! Koi Fees Nahi:**\n\nYeh mukammal German program (A1, A2, B1, B2) **bilkul 100% Free** hai. Yeh program Ahmed Rajput ki taraf se sponsored hai. Abhi form fill karein aur foran join karein!`;
  }

  if (isEnglish) {
    return `Great question! 🇩🇪\n\nIn the **Ahmed Rajput German Language Program**:\n• **Durations:** A1 (2 Months), A2 (2 Months), B1 (3 Months), B2 (3 Months).\n• **Zoom Classes:** Interactive live sessions with certified teachers (Morning 10 AM & Night 9 PM PKT).\n• **Germany Support:** Team supports talented students for study, Ausbildung, and visas in Germany.\n• **Cost:** 100% Free of charge.`;
  }

  return `Bohat acha sawal hai! 🇩🇪\n\n**Ahmed Rajput German Language Program** me:\n• **Course Durations:** A1 (2 Mahine), A2 (2 Mahine), B1 (3 Mahine), B2 (3 Mahine).\n• **Classes:** Zoom app par live teachers ke sath hoti hain (Morning 10 AM & Night 9 PM).\n• **Idr Teacher Raka Ha:** Qualified instructors hired hain jo step-by-step sikhate hain.\n• **Germany Support:** Talented students ko team Germany aane me poori support karti hai (Study, Ausbildung, Visa).\n• **Fees:** 100% Free hai!`;
}

export const AIChatBot: React.FC<AIChatBotProps> = ({ onRegisterClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Send to server API route /api/chat
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageContent,
          history: messages.slice(-6)
        })
      });

      if (!res.ok) {
        throw new Error('Network error');
      }

      const data = await res.json();
      const botReply = data.reply || 'Bohat shukriya! Ahmed Rajput Language Program me A1 (2 Months), A2 (2 Months), B1 (3 Months), B2 (3 Months) ki classes Zoom app par 100% Free hoti hain.';

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      // Dynamic tailored fallback response matching user language and intent
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: getClientBilingualReply(messageContent),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <>
      {/* Floating Launcher Button at Bottom Right */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 px-4 py-3 rounded-2xl bg-stone-950 hover:bg-stone-900 text-white shadow-2xl border border-stone-800 hover:border-amber-400/50 flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
          title="Open German Learning AI Assistant"
        >
          {/* German Flag Badge with Pulsing Green Indicator */}
          <div className="relative">
            <div className="w-8 h-8 rounded-xl overflow-hidden border border-stone-700 flex flex-col shrink-0 shadow-xs">
              <div className="h-1/3 bg-[#111111] w-full" />
              <div className="h-1/3 bg-[#DE0000] w-full" />
              <div className="h-1/3 bg-[#FFCE00] w-full" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-stone-950 animate-pulse" />
          </div>

          <div className="text-left hidden sm:block">
            <div className="text-xs font-black tracking-tight text-white flex items-center gap-1.5">
              <span>Ask AI Guide</span>
              <Sparkles className="w-3 h-3 text-amber-400 group-hover:rotate-12 transition-transform" />
            </div>
            <div className="text-[10px] text-stone-400">
              Free Guidance & Zoom FAQs
            </div>
          </div>
        </button>
      )}

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-96 max-w-[calc(100vw-2rem)] h-[540px] max-h-[85vh] bg-stone-950 text-stone-100 rounded-3xl border border-stone-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Chat Header */}
          <div className="p-4 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-stone-800 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-stone-700 flex flex-col shrink-0 shadow-md">
                  <div className="h-1/3 bg-[#111111] w-full" />
                  <div className="h-1/3 bg-[#DE0000] w-full" />
                  <div className="h-1/3 bg-[#FFCE00] w-full" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-stone-950" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-black text-white tracking-tight">
                    German Hub AI Guide
                  </h3>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    LIVE
                  </span>
                </div>
                <p className="text-[10px] text-stone-400">
                  Ahmed Rajput Language Program
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800/80 transition-colors cursor-pointer"
                title="Reset chat conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800/80 transition-colors cursor-pointer"
                title="Close AI chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Info Top Strip */}
          <div className="px-4 py-2 bg-stone-900/60 border-b border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400 shrink-0">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Free Live Zoom Classes
            </span>
            {onRegisterClick && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onRegisterClick();
                }}
                className="text-amber-400 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>Register</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Message History List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-stone-800 text-amber-400 flex items-center justify-center shrink-0 border border-stone-700 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-tr-xs shadow-md'
                      : 'bg-stone-900/90 text-stone-200 border border-stone-800 rounded-tl-xs shadow-xs'
                  }`}
                >
                  <div className="whitespace-pre-line break-words">
                    {msg.text}
                  </div>
                  <div
                    className={`text-[9px] mt-1.5 font-medium ${
                      msg.sender === 'user' ? 'text-amber-100 text-right' : 'text-stone-500'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 mt-0.5 font-black text-[11px]">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-xl bg-stone-800 text-amber-400 flex items-center justify-center shrink-0 border border-stone-700">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 text-stone-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[10px] text-stone-400 ml-1">AI Guide is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Suggestions */}
          <div className="px-3 py-2 bg-stone-950 border-t border-stone-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt.query)}
                disabled={isTyping}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-[10px] font-bold transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                {prompt.label}
              </button>
            ))}
          </div>

          {/* Message Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-stone-950 border-t border-stone-800 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything in Urdu or English..."
              disabled={isTyping}
              className="flex-1 py-2.5 px-3.5 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 text-xs focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-md active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
