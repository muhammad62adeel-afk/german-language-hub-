import React from 'react';
import { ShieldCheck, Heart, MapPin, Users, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 text-xs">
      {/* German flag tricolor bar */}
      <div className="flex h-1.5 w-full">
        <div className="flex-1 bg-stone-900" />
        <div className="flex-1 bg-red-600" />
        <div className="flex-1 bg-amber-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-stone-700 flex flex-col shrink-0">
                <div className="h-1/3 bg-stone-900 w-full" />
                <div className="h-1/3 bg-red-600 w-full" />
                <div className="h-1/3 bg-amber-400 w-full" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                FREE GERMAN A1 A2 B1 B2 LANGUAGE
              </span>
            </div>

            <p className="text-stone-400 text-xs leading-relaxed max-w-md">
              A high-impact community language training program created to empower students, healthcare professionals, and engineers to clear Goethe / TELC exams and move to Germany.
            </p>

            <div className="pt-2 text-[11px] text-amber-400 font-semibold flex items-center gap-1.5">
              <span>NETWORK OWNER: AHMED RAJPUT</span>
              <span className="text-stone-600">•</span>
              <span className="text-stone-300">Software Engineer in Germany</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#registration" className="hover:text-white transition-colors">Student Registration Form</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Student Reviews (553)</a>
              </li>
            </ul>
          </div>

          {/* Fee & Standards Disclaimer */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
              Program Details
            </h4>
            <div className="space-y-2 text-stone-400 text-[11px] leading-relaxed">
              <p>
                <strong>Curriculum:</strong> Common European Framework of Reference for Languages (CEFR: A1, A2, B1, B2).
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-colors cursor-pointer text-xs font-semibold"
                >
                  <Lock className="w-3.5 h-3.5 text-stone-400" />
                  <span>Admin Registrations Portal</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} FREE GERMAN A1 A2 B1 B2 LANGUAGE. Network Owner: Ahmed Rajput.</p>
          <div className="flex items-center gap-2">
            <span>Built for Pakistani & International Students</span>
            <span>•</span>
            <span className="text-amber-400 font-medium">Study & Work in Germany</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
