import React from 'react';

export const GlobalTickerBanner: React.FC = () => {
  const tickerMessage = "Ahmed Rajput Language Program aims to teach languages for free worldwide and support the UN's mission to empower individuals for global success.";

  return (
    <div className="w-full bg-[#0d2348] text-white text-xs font-bold tracking-wide overflow-hidden py-2 select-none shadow-xs border-b border-blue-950">
      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-10 text-[11px] sm:text-xs font-bold tracking-wide">
          {/* First loop block */}
          <div className="flex items-center gap-8 shrink-0">
            <span className="text-amber-400 font-black">★</span>
            <span className="text-white font-semibold">{tickerMessage}</span>
            <span className="text-amber-400 font-black">★</span>
            <span className="text-blue-200 font-medium">100% Free Education For Everyone Worldwide</span>
            <span className="text-amber-400 font-black">★</span>
            <span className="text-white font-semibold">{tickerMessage}</span>
            <span className="text-amber-400 font-black">★</span>
          </div>

          {/* Second duplicate block for seamless continuous loop */}
          <div className="flex items-center gap-8 shrink-0">
            <span className="text-amber-400 font-black">★</span>
            <span className="text-white font-semibold">{tickerMessage}</span>
            <span className="text-amber-400 font-black">★</span>
            <span className="text-blue-200 font-medium">100% Free Education For Everyone Worldwide</span>
            <span className="text-amber-400 font-black">★</span>
            <span className="text-white font-semibold">{tickerMessage}</span>
            <span className="text-amber-400 font-black">★</span>
          </div>
        </div>
      </div>
    </div>
  );
};
