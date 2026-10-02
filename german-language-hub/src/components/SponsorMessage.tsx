import React from 'react';
import { Award, Briefcase, MapPin, HeartHandshake, CheckCircle2, Globe2 } from 'lucide-react';

export const SponsorMessage: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-stone-900 text-stone-100 border-b border-stone-800 relative overflow-hidden">
      {/* German flag hairline accent */}
      <div className="absolute top-0 left-0 right-0 flex h-1">
        <div className="flex-1 bg-stone-950" />
        <div className="flex-1 bg-red-600" />
        <div className="flex-1 bg-amber-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Sponsor Avatar Badge */}
            <div className="relative shrink-0 text-center">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-tr from-stone-800 via-stone-700 to-amber-900/40 p-1.5 shadow-xl border-2 border-amber-500/30 flex items-center justify-center">
                <div className="w-full h-full rounded-2xl bg-stone-950 flex flex-col items-center justify-center text-center p-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-1 font-black text-xl">
                    AR
                  </div>
                  <span className="text-xs font-bold text-white tracking-wide">Ahmed Rajput</span>
                  <span className="text-[10px] text-amber-400">Software Engineer</span>
                  <span className="text-[10px] text-stone-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 text-red-500" /> Munich / Berlin
                  </span>
                </div>
              </div>
              <div className="mt-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-semibold border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified in Germany</span>
              </div>
            </div>

            {/* Message Body */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Message From Network Owner</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                "German Language Is The Key That Opened Every Door For Me In Europe."
              </h2>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                When I was preparing to move to Germany from Pakistan, language academies were demanding PKR 40,000 to 70,000 per level — making the German dream unaffordable for thousands of deserving students.
              </p>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                I initiated <strong>FREE GERMAN A1 A2 B1 B2 LANGUAGE</strong> to provide high-quality CEFR-standard live online training. My mission is to see thousands of Pakistani youth build honorable lives in Germany through studies, Ausbildung, and IT careers.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-stone-400">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span>Senior Software Engineer in Germany</span>
                </div>
                <span className="hidden sm:inline text-stone-700">•</span>
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-red-400" />
                  <span>Community Language Mentor</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
