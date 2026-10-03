import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { OFFICIAL_DOMAIN } from '../constants/brand';

interface NavbarProps {
  onRegisterClick: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRegisterClick, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Registration', href: '#registration' },
    { label: 'Reviews (553)', href: '#reviews' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3.5 group focus:outline-hidden"
          >
            {/* German Flag Rounded 3D Crest */}
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden shadow-xs border border-stone-200 flex flex-col shrink-0">
              <div className="h-1/3 bg-[#111111] w-full" />
              <div className="h-1/3 bg-[#DE0000] w-full" />
              <div className="h-1/3 bg-[#FFCE00] w-full" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm sm:text-base md:text-lg font-black tracking-tight text-stone-950 leading-tight">
                {OFFICIAL_DOMAIN}
              </span>

              {/* CEFR Level Badges */}
              <div className="flex items-center gap-1.5 mt-1">
                <span className="px-1.5 py-0.5 rounded-md bg-stone-900 text-white font-black text-[10px] leading-none">
                  A1
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-stone-800 text-white font-black text-[10px] leading-none">
                  A2
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-red-600 text-white font-black text-[10px] leading-none">
                  B1
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-amber-400 text-stone-950 font-black text-[10px] leading-none">
                  B2
                </span>
                <span className="text-[10px] font-bold text-amber-700 tracking-wider uppercase ml-0.5">
                  FREE
                </span>
              </div>
            </div>
          </a>

          {/* Center Navigation Links (Exact from screenshot: Home, Registration, Reviews (553)) */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold text-stone-700 hover:text-stone-950 transition-colors py-2"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action: Contact Button */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Contact Support Button with Telegram Icon */}
            <button
              onClick={() => setContactModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50/90 hover:bg-blue-100 text-[#0088cc] hover:text-[#0077b5] border border-blue-200 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.18 3.35-1.39 3.73-1.39.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .36z" />
              </svg>
              <span>Contact</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Contact Button */}
            <button
              onClick={() => setContactModalOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-[#0088cc] text-xs font-bold"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.18 3.35-1.39 3.73-1.39.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .36z" />
              </svg>
              <span>Contact</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:bg-stone-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:text-stone-950"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-stone-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setContactModalOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-blue-50 text-[#0088cc] font-bold text-xs flex items-center justify-center gap-1.5 border border-blue-200"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.18 3.35-1.39 3.73-1.39.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .36z" />
              </svg>
              <span>Contact / Telegram Support (@OfficialAhmed101)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRegisterClick();
              }}
              className="w-full py-2.5 rounded-xl bg-stone-950 text-white font-bold text-xs text-center"
            >
              Register Now
            </button>
          </div>
        </div>
      )}

      {/* Contact Support Modal: Telegram @OfficialAhmed101 */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative border border-stone-200">
            {/* Close Button */}
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Telegram Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0088cc] text-white flex items-center justify-center shadow-md shrink-0">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.18 3.35-1.39 3.73-1.39.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .36z" />
                </svg>
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0088cc] border border-blue-200 text-[10px] font-black uppercase tracking-wider mb-0.5">
                  Telegram Official Support
                </span>
                <h3 className="text-xl font-black text-stone-950 tracking-tight">
                  Direct Student Support
                </h3>
              </div>
            </div>

            {/* Telegram Username Box */}
            <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 mb-3.5">
              <span className="text-[11px] text-blue-900 font-bold block mb-1">
                Official Telegram Handle:
              </span>
              <div className="flex items-center justify-between gap-2 bg-white px-3.5 py-2.5 rounded-xl border border-blue-200">
                <span className="font-mono font-black text-stone-950 text-base sm:text-lg">
                  @OfficialAhmed101
                </span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText('@OfficialAhmed101');
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="px-3 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  {copied ? 'Copied! ✓' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Key Guidance Message (Problem & Ausbildung Contract) */}
            <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-stone-900 mb-4 text-xs sm:text-sm leading-relaxed space-y-2">
              <p className="font-bold text-stone-950 flex items-center gap-1.5">
                <span>💬 Ausbildung & Student Helpline:</span>
              </p>
              <p className="text-stone-800">
                Agar kisi ko koi bhi <strong>problem</strong> ha ya agar kisi ko Germany ke liye <strong>Ausbildung ka contract nahi mil raha</strong>, to is Telegram <strong>(@OfficialAhmed101)</strong> par foran message karein, aapko full support aur step-by-step guidance milegi.
              </p>
            </div>

            {/* Support Highlights */}
            <div className="grid grid-cols-2 gap-2 mb-4 text-[11px] text-stone-700 font-medium">
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                ✅ Ausbildung Contracts
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                ✅ Visa & Docs Guidance
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <a
                href="https://t.me/OfficialAhmed101"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.18 3.35-1.39 3.73-1.39.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .36z" />
                </svg>
                <span>MESSAGE ON TELEGRAM (@OfficialAhmed101)</span>
              </a>

              <button
                type="button"
                onClick={() => setContactModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
