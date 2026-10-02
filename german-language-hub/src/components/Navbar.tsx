import React, { useState } from 'react';
import { Menu, X, ArrowRight, BookOpen, UserPlus, CreditCard, PhoneCall, Sparkles, Lock } from 'lucide-react';

interface NavbarProps {
  onRegisterClick: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRegisterClick, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo & Name with Professional German Flag Emblem */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3.5 group focus:outline-hidden"
          >
            {/* Professional German Flag Crest */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden shadow-md border-2 border-stone-300 flex flex-col shrink-0 transition-transform group-hover:scale-105 group-hover:shadow-lg ring-1 ring-black/10">
              <div className="h-1/3 bg-[#111111] w-full" />
              <div className="h-1/3 bg-[#DE0000] w-full" />
              <div className="h-1/3 bg-[#FFCE00] w-full" />
              {/* Subtle glassmorphic sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/15 via-transparent to-white/35 pointer-events-none" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-stone-950 leading-none">
                  FREE GERMAN
                </span>
              </div>

              {/* CEFR Level Badges */}
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="px-1.5 py-0.5 rounded-md bg-stone-950 text-white font-black text-[10px] shadow-2xs leading-none">
                  A1
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-stone-900 text-white font-black text-[10px] shadow-2xs leading-none">
                  A2
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-red-600 text-white font-black text-[10px] shadow-2xs leading-none">
                  B1
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-amber-500 text-stone-950 font-black text-[10px] shadow-2xs leading-none">
                  B2
                </span>
                <span className="text-[10px] font-extrabold text-stone-500 tracking-wider uppercase ml-0.5">
                  LANGUAGE
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold text-stone-700 hover:text-stone-950 transition-colors py-2 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-red-600 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action: Secret Admin Lock (Register Now removed from this corner as requested) */}
          <div className="hidden sm:flex items-center gap-2.5">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 hover:border-stone-400 bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-900 transition-all cursor-pointer text-xs font-bold shadow-2xs group"
                title="Admin Portal (Password Protected)"
              >
                <Lock className="w-3.5 h-3.5 text-stone-600 group-hover:text-stone-950 transition-colors" />
                <span>Admin Lock</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="p-2 rounded-lg border border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100"
                title="Admin Lock"
              >
                <Lock className="w-4 h-4 text-stone-700" />
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-colors focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-3">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center justify-between px-3 py-3 rounded-lg text-base font-semibold text-stone-800 hover:bg-stone-100 hover:text-stone-950 transition-colors"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-stone-400" />
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-100 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRegisterClick();
              }}
              className="w-full py-3.5 px-4 rounded-xl text-center font-bold text-base bg-stone-950 text-white flex items-center justify-center gap-2 shadow-md"
            >
              <span>Register Now (A1, A2, B1, B2)</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>

            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-stone-300 bg-stone-100 text-stone-800 flex items-center justify-between text-xs font-bold"
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-stone-700" />
                  <span>Admin Lock</span>
                </div>
                <span className="text-[10px] bg-stone-200 text-stone-600 px-2 py-0.5 rounded">Protected</span>
              </button>
            )}
          </div>

          <div className="text-center pt-2 text-xs text-stone-500">
            Network Owner: Ahmed Rajput • Software Engineer in Germany
          </div>
        </div>
      )}
    </nav>
  );
};
