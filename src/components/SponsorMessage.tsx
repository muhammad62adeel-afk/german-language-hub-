import React from 'react';
import { Briefcase, MapPin, HeartHandshake, CheckCircle2, Globe2 } from 'lucide-react';
import { OFFICIAL_DOMAIN } from '../constants/brand';

export const SponsorMessage: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-stone-100/70 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-md flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Sponsor Avatar Badge */}
            <div className="relative shrink-0 text-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-tr from-stone-900 via-stone-800 to-amber-900 p-2 shadow-lg border border-amber-300 flex items-center justify-center">
                <div className="w-full h-full rounded-2xl bg-stone-950 flex flex-col items-center justify-center text-center p-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 text-stone-950 flex items-center justify-center mb-2 font-black text-2xl shadow-md">
                    AR
                  </div>
                  <span className="text-sm font-black text-white tracking-wide">Ahmed Rajput</span>
                  <span className="text-[11px] text-amber-400 font-semibold">Software Engineer</span>
                  <span className="text-[10px] text-stone-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-red-500" /> Berlin / Munich, DE
                  </span>
                </div>
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified in Germany</span>
              </div>
            </div>

            {/* Message Body */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700 bg-red-100 px-3.5 py-1 rounded-full border border-red-200">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>A Personal Message from Sponsor</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight leading-snug">
                "German Language Is The Key That Opened Every Door For Me In Europe."
              </h2>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                When I was preparing to move to Germany from Pakistan, traditional commercial academies demanded PKR 40,000 to 70,000 per level — making the European dream out of reach for thousands of hardworking, gifted students.
              </p>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                I initiated <strong>{OFFICIAL_DOMAIN}</strong> to provide high-quality CEFR-standard live online training. My mission is to see thousands of students build honorable, high-earning lives in Germany through studies, Ausbildung, and IT/Engineering careers.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-semibold text-stone-600">
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-amber-600" />
                  <span>Senior Software Engineer in Germany</span>
                </div>
                <span className="hidden sm:inline text-stone-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-red-600" />
                  <span>Global Community Mentor</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
