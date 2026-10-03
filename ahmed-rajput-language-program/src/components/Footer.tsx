import React from 'react';
import { Lock, Heart, Globe, ShieldCheck } from 'lucide-react';
import { OFFICIAL_DOMAIN, OFFICIAL_COPYRIGHT } from '../constants/brand';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 text-xs">
      {/* German flag tricolor bar */}
      <div className="flex h-[3px] w-full">
        <div className="flex-1 bg-[#111111]" />
        <div className="flex-1 bg-[#DE0000]" />
        <div className="flex-1 bg-[#FFCE00]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-stone-700 flex flex-col shrink-0 shadow-sm">
                <div className="h-1/3 bg-[#111111] w-full" />
                <div className="h-1/3 bg-[#DE0000] w-full" />
                <div className="h-1/3 bg-[#FFCE00] w-full" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                {OFFICIAL_DOMAIN}
              </span>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed max-w-md">
              A high-impact community language training program created to empower students, healthcare professionals, and engineers to clear Goethe / TELC exams and move to Germany.
            </p>

            <div className="pt-1 text-xs text-amber-400 font-semibold flex items-center gap-2">
              <span className="text-stone-400">Sponsored by</span>
              <span className="text-amber-400 font-bold">Ahmed Rajput</span>
              <span className="text-stone-600">•</span>
              <span className="text-stone-300">Software Engineer in Germany</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-stone-400 text-xs">
              <li>
                <a href="#home" className="hover:text-amber-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#registration" className="hover:text-amber-400 transition-colors">Student Registration Form</a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-amber-400 transition-colors">Roadmap to Germany</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">Student Reviews (553)</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-amber-400 transition-colors">FAQs</a>
              </li>
            </ul>
          </div>

          {/* Program Details */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Academic Standards
            </h4>
            <div className="space-y-2.5 text-stone-400 text-xs leading-relaxed">
              <p>
                <strong>CEFR Alignment:</strong> Common European Framework of Reference for Languages (A1, A2, B1, B2).
              </p>
              <p className="text-stone-500 text-[11px] pt-1">
                Curriculum certified according to Goethe-Institut & TELC examination requirements.
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>{OFFICIAL_COPYRIGHT}</p>
          <div className="flex items-center gap-2.5">
            <span>Free For Everyone Worldwide</span>
            <span>•</span>
            <span className="text-amber-400 font-semibold">Ahmed Rajput Initiative</span>
            <span>•</span>
            <button
              onClick={onOpenAdmin}
              className="text-stone-600 hover:text-stone-300 transition-colors cursor-pointer p-1 rounded-md"
              title="Staff Access"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
