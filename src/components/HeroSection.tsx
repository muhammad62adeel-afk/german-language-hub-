import React from 'react';
import { ArrowRight, Video, ChevronRight, Award, Users, CheckCircle2, Clock } from 'lucide-react';
import { OFFICIAL_DOMAIN } from '../constants/brand';

interface HeroSectionProps {
  onRegisterClick: () => void;
  onOpenQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onOpenQuiz
}) => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#fbf8f3] via-white to-stone-50/40 pt-10 pb-16 sm:pt-14 sm:pb-20 border-b border-stone-200">
      
      {/* Subtle ambient warm glow in top corners */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 translate-x-1/2 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Eyebrow Badge (Exact from screenshot: [ ● Ahmed Rajput Language Program ]) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#24211d] text-stone-200 text-xs font-medium mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span>{OFFICIAL_DOMAIN}</span>
          </div>

          {/* Main Headline (Exact from screenshot: Learn German with 3 separate red underlines) */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-stone-950 leading-[1.18]">
            Learn German{' '}
            <span className="underline decoration-red-600 decoration-[3.5px] underline-offset-8">A1,</span>{' '}
            <span className="underline decoration-red-600 decoration-[3.5px] underline-offset-8">A2,</span>{' '}
            <span className="underline decoration-red-600 decoration-[3.5px] underline-offset-8">B1 & B2</span>
          </h1>

          {/* Subheading (Exact 2-line break from screenshot) */}
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl mx-auto font-normal">
            Start your German language journey and prepare yourself for better study,<br className="hidden sm:inline" /> work and future opportunities in Germany.
          </p>

          {/* Live Zoom Class Info Box (Exact from screenshot) */}
          <div className="mt-8 max-w-lg mx-auto p-4 sm:p-5 rounded-3xl bg-[#f0f7ff]/70 border border-sky-200 shadow-2xs">
            {/* Top Bar Header */}
            <div className="flex items-center justify-center gap-2 text-sky-600 text-xs font-bold uppercase tracking-wider mb-3">
              <Video className="w-4 h-4 text-sky-600" />
              <span>CLASSES WILL BE HELD LIVE ON ZOOM APP</span>
            </div>

            {/* Time Slot Boxes Side by Side */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
                <div className="text-xs font-semibold text-amber-600 flex items-center justify-center gap-1">
                  <span>☀️</span>
                  <span>Morning Batch</span>
                </div>
                <div className="text-sm sm:text-base font-black text-stone-900 mt-0.5">
                  10:00 AM – 11:00 AM
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
                <div className="text-xs font-semibold text-sky-600 flex items-center justify-center gap-1">
                  <span>🌙</span>
                  <span>Night Batch</span>
                </div>
                <div className="text-sm sm:text-base font-black text-stone-900 mt-0.5">
                  09:00 PM – 10:00 PM
                </div>
              </div>
            </div>

            {/* Bottom note in blue */}
            <div className="text-xs text-sky-600 font-medium text-center mt-3">
              Select your preferred time slot in the registration form below.
            </div>
          </div>

          {/* Primary Action Button (Exact from screenshot: Black rounded button "Register Now →") */}
          <div className="mt-7">
            <button
              onClick={onRegisterClick}
              className="py-3.5 px-8 rounded-2xl font-bold text-base bg-[#111111] hover:bg-stone-900 text-white shadow-sm inline-flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>Register Now</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Quick Quiz prompt (Exact from screenshot) */}
          <div className="mt-3.5">
            <button
              onClick={onOpenQuiz}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-stone-600 hover:text-stone-950 transition-colors py-1 cursor-pointer"
            >
              <div className="w-4 h-4 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-[10px] font-black">
                ?
              </div>
              <span>Unsure which level fits you? Take our 60-second Level Quiz</span>
              <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            </button>
          </div>

          {/* 4 Feature Bento Cards (Exact from screenshot) */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center mb-3">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-stone-900">Goethe & TELC Standards</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Official CEFR curriculum aligned with German embassy visa criteria.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-3">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-stone-900">Active WhatsApp Batches</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Daily lecture notes, worksheets, audio drills, and direct teacher guidance.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-stone-900">Visa & Chancenkarte Focus</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Relocation pathways for public universities, paid Ausbildung and job search.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-xs transition-all">
              <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-600 flex items-center justify-center mb-3">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-stone-900">Flexible Class Timings</h4>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Morning & night batches designed for working students and professionals.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
