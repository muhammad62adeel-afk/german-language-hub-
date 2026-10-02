import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Award, Users, BookOpen, Clock, HelpCircle, ChevronRight, Video, Sun, Moon } from 'lucide-react';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onOpenQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onOpenQuiz
}) => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-stone-100 via-stone-50 to-white pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-stone-200">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 blur-3xl">
        <div className="absolute -top-12 left-10 w-72 h-72 rounded-full bg-red-400/20" />
        <div className="absolute -top-12 right-10 w-80 h-80 rounded-full bg-amber-400/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Top eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 text-stone-100 text-xs font-semibold mb-6 shadow-xs border border-stone-800">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Ahmed Rajput Language Program</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-950 leading-[1.12]">
            Learn German <span className="underline decoration-red-600 decoration-4 underline-offset-4">A1, A2, B1 & B2</span>
          </h1>

          {/* Subheading */}
          <p className="mt-5 text-base sm:text-xl text-stone-700 leading-relaxed max-w-2xl mx-auto font-normal">
            Start your German language journey and prepare yourself for better study, work and future opportunities in Germany.
          </p>

          {/* Zoom App & Two Timings Callout Bar */}
          <div className="mt-6 max-w-xl mx-auto p-3.5 sm:p-4 rounded-2xl bg-blue-50/90 border border-blue-200 text-blue-950 shadow-2xs">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-900 mb-2">
              <Video className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Classes Zoom App Perr Live Ho Gee</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-white/80 p-2 sm:p-2.5 rounded-xl border border-blue-100">
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-amber-700">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Suba (Morning)</span>
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-stone-900 mt-0.5">
                  10:00 AM – 11:00 AM
                </div>
              </div>
              <div className="bg-white/80 p-2 sm:p-2.5 rounded-xl border border-blue-100">
                <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-indigo-700">
                  <Moon className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Raat (Night)</span>
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-stone-900 mt-0.5">
                  09:00 PM – 10:00 PM
                </div>
              </div>
            </div>
            <div className="text-[11px] text-blue-800 font-medium text-center mt-2">
              Registration form mein apni pasand ka <strong>koi 1 time slot select karein</strong>.
            </div>
          </div>

          {/* Single Focused Button: Register Now */}
          <div className="mt-8 max-w-xs mx-auto">
            <button
              onClick={onRegisterClick}
              className="w-full py-4 px-8 rounded-xl font-bold text-base sm:text-lg bg-stone-950 text-white shadow-lg hover:bg-stone-800 hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Register Now</span>
              <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Quick Quiz prompt */}
          <div className="mt-4">
            <button
              onClick={onOpenQuiz}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-700 hover:text-red-600 transition-colors py-1 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Unsure which level fits you? Take our 60-second Level Quiz</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </button>
          </div>

          {/* Key Benefits Grid for TikTok & WhatsApp Mobile Visitors */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center mb-2.5">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-950">Goethe & TELC Standards</h4>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1">Official CEFR curriculum recognized worldwide.</p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-2.5">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-950">Active WhatsApp Batches</h4>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1">Daily speaking drills, homework & Q&A assistance.</p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-950">Visa & Chancenkarte Focus</h4>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1">Targeted for Masters, Ausbildung & Job search.</p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center mb-2.5">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-950">Flexible Class Timings</h4>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-1">Evening & weekend batches for working students.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
