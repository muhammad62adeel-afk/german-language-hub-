import React from 'react';
import { Globe, Sparkles } from 'lucide-react';

export const GlobalTickerBanner: React.FC = () => {
  const announcementText = "Anyone from any country can learn German A1, A2, B1, and B2 language for free";

  return (
    <div className="w-full bg-red-700 text-white text-xs font-bold tracking-wide overflow-hidden py-1.5 border-b border-red-800 select-none shadow-xs">
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-6 text-[11px] sm:text-xs">
          {/* First loop block */}
          <div className="flex items-center gap-6 shrink-0">
            <span className="inline-flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="font-extrabold uppercase tracking-wider text-white">
                {announcementText}
              </span>
              <span className="text-amber-300 font-bold ml-2">★</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="font-extrabold uppercase tracking-wider text-amber-100">
                100% Free Live Zoom Classes • Open Worldwide
              </span>
              <span className="text-amber-300 font-bold ml-2">★</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="font-extrabold uppercase tracking-wider text-white">
                {announcementText}
              </span>
              <span className="text-amber-300 font-bold ml-2">★</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="font-extrabold uppercase tracking-wider text-amber-100">
                Official Goethe & TELC Standards
              </span>
              <span className="text-amber-300 font-bold ml-2">★</span>
            </span>
          </div>

          {/* Second duplicate block for seamless continuous loop */}
          <div className="flex items-center gap-6 shrink-0">
            <span className="inline-flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="font-extrabold uppercase tracking-wider text-white">
                {announcementText}
              </span>
              <span className="text-amber-300 font-bold ml-2">★</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="font-extrabold uppercase tracking-wider text-amber-100">
                100% Free Live Zoom Classes • Open Worldwide
              </span>
              <span className="text-amber-300 font-bold ml-2">★</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="font-extrabold uppercase tracking-wider text-white">
                {announcementText}
              </span>
              <span className="text-amber-300 font-bold ml-2">★</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="font-extrabold uppercase tracking-wider text-amber-100">
                Official Goethe & TELC Standards
              </span>
              <span className="text-amber-300 font-bold ml-2">★</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
