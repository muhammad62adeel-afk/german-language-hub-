import React from 'react';
import { MapPin, Lock } from 'lucide-react';

interface TopSponsorBannerProps {
  onOpenAdmin?: () => void;
}

export const TopSponsorBanner: React.FC<TopSponsorBannerProps> = ({ onOpenAdmin }) => {
  return (
    <div className="w-full bg-[#111111] text-stone-200 border-b border-stone-800 relative z-30">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left">
          
          {/* Left sponsor & community badge */}
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <span className="px-3 py-0.5 rounded-full bg-[#2d2208] text-amber-400 border border-amber-500/40 text-[11px] font-extrabold uppercase tracking-wider shadow-2xs">
              COMMUNITY INITIATIVE
            </span>

            <div className="text-xs sm:text-sm font-semibold tracking-wide">
              <span className="text-stone-400 font-normal">NETWORK OWNER: </span>
              <span className="text-amber-400 font-extrabold uppercase tracking-wider">AHMED RAJPUT</span>
            </div>

            <span className="hidden sm:inline text-stone-600" aria-hidden="true">•</span>

            {/* Location & Software Engineer with discreet tiny secret lock */}
            <div className="flex items-center gap-1.5 text-xs text-stone-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>Software Engineer in Germany</span>

              {/* Discreet Tiny Secret Lock Button */}
              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="text-stone-600 hover:text-stone-400 transition-colors p-0.5 rounded-xs cursor-pointer ml-1 inline-flex items-center opacity-40 hover:opacity-100"
                  aria-label="Secure Access"
                >
                  <Lock className="w-2.5 h-2.5 text-stone-500" />
                </button>
              )}
            </div>
          </div>

          {/* Right side status */}
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Admissions Open for New Batch</span>
            </div>
            
            <span className="hidden md:inline text-stone-700" aria-hidden="true">|</span>

            <span className="hidden md:inline text-stone-400 font-medium">
              A1 • A2 • B1 • B2 CEFR Standard
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
