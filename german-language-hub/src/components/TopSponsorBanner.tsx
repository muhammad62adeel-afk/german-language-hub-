import React from 'react';
import { Sparkles, MapPin, Award } from 'lucide-react';

export const TopSponsorBanner: React.FC = () => {
  return (
    <div className="w-full bg-stone-950 text-stone-100 border-b border-stone-800">
      {/* German flag tricolor micro-stripe */}
      <div className="flex h-1 w-full">
        <div className="flex-1 bg-stone-900" />
        <div className="flex-1 bg-red-600" />
        <div className="flex-1 bg-amber-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          {/* Main Sponsor line */}
          <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start">
            <span className="text-[11px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Community Initiative
            </span>
            <div className="text-xs sm:text-sm font-semibold tracking-wide text-white">
              <span className="text-stone-400 font-normal">NETWORK OWNER: </span>
              <span className="text-amber-400 font-extrabold uppercase tracking-wider">AHMED RAJPUT</span>
            </div>
            <span className="hidden sm:inline text-stone-600" aria-hidden="true">•</span>
            <div className="flex items-center gap-1.5 text-xs text-stone-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>Software Engineer in Germany</span>
            </div>
          </div>

          {/* Quick trust tag */}
          <div className="flex items-center gap-3 text-xs text-stone-400">
            <div className="flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Admissions Open for New Batch</span>
            </div>
            <span className="hidden md:inline text-stone-700" aria-hidden="true">|</span>
            <span className="hidden md:inline text-stone-300">A1 · A2 · B1 · B2 CEFR Standard</span>
          </div>
        </div>
      </div>
    </div>
  );
};
