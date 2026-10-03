import React, { useState, useEffect } from 'react';
import {
  Calendar, Clock, Sparkles, AlertCircle, ArrowRight,
  X, Image as ImageIcon, CheckCircle, ExternalLink, Flame
} from 'lucide-react';
import { Announcement } from '../types';
import { getActiveAnnouncement } from '../utils/announcementsStorage';

interface ActiveAnnouncementBannerProps {
  onRegisterClick: () => void;
}

export const ActiveAnnouncementBanner: React.FC<ActiveAnnouncementBannerProps> = ({ onRegisterClick }) => {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number } | null>(null);

  // Load announcement from localStorage and optional server sync
  const loadActive = () => {
    const active = getActiveAnnouncement();
    setAnnouncement(active);
  };

  useEffect(() => {
    loadActive();

    // Listen to storage update events (from Admin updates)
    const handleUpdate = () => loadActive();
    window.addEventListener('announcements-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('announcements-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Countdown timer logic
  useEffect(() => {
    if (!announcement?.deadlineDate) {
      setTimeLeft(null);
      return;
    }

    const calculateTime = () => {
      // Parse deadline date at end of day or standard local
      const targetTime = new Date(`${announcement.deadlineDate}T23:59:59`).getTime();
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);

      setTimeLeft({ days, hours, minutes });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, [announcement]);

  if (!announcement || !announcement.isActive || isDismissed) {
    return null;
  }

  // Format deadline date for readable display e.g. "15 October 2026"
  const formattedDate = (() => {
    if (!announcement.deadlineDate) return '';
    try {
      const [year, month, day] = announcement.deadlineDate.split('-');
      const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
      return dateObj.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return announcement.deadlineDate;
    }
  })();

  return (
    <>
      {/* ATTRACTIVE TOP BANNER WITH RED & YELLOW HIGH-IMPACT HIGHLIGHTS */}
      <div className="relative z-30 bg-gradient-to-r from-red-700 via-amber-500 to-red-700 text-white shadow-lg border-b-2 border-amber-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
            
            {/* Left: Highlight Pill & Headline */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950 text-amber-300 text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-sm ring-1 ring-amber-400/40 animate-pulse">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>OFFICIAL ADMISSION NOTICE</span>
              </span>

              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <span className="text-sm sm:text-base font-black tracking-tight text-white drop-shadow-sm">
                  {announcement.title}
                </span>

                {formattedDate && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold bg-amber-400/90 text-stone-950 px-2 py-0.5 rounded-md shadow-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Starts on {formattedDate}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Right: Countdown, Poster Preview & Action Button */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 shrink-0">
              
              {/* Countdown badge */}
              {timeLeft && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-950/80 text-amber-300 text-xs font-mono font-bold border border-amber-400/30">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {timeLeft.days > 0 ? (
                    <span>{timeLeft.days}d {timeLeft.hours}h left</span>
                  ) : (
                    <span>{timeLeft.hours}h {timeLeft.minutes}m left</span>
                  )}
                </div>
              )}

              {/* View Poster Button (if poster image is attached) */}
              {announcement.posterImage && (
                <button
                  type="button"
                  onClick={() => setIsPosterModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold backdrop-blur-xs transition-all cursor-pointer border border-white/30"
                  title="View Admission Poster"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>View Poster</span>
                </button>
              )}

              {/* Direct Register CTA */}
              <button
                type="button"
                onClick={onRegisterClick}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-stone-950 hover:bg-stone-900 text-amber-400 hover:text-amber-300 text-xs sm:text-sm font-black transition-transform hover:scale-[1.03] active:scale-[0.98] shadow-md cursor-pointer border border-amber-400/40"
              >
                <span>Register Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Dismiss button */}
              <button
                type="button"
                onClick={() => setIsDismissed(true)}
                className="p-1 rounded-lg hover:bg-black/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* POPUP POSTER MODAL (when clicked or for full visual review) */}
      {isPosterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-xl w-full bg-stone-900 border border-stone-700 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-stone-950 border-b border-stone-800 text-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <h3 className="font-extrabold text-sm sm:text-base text-white">
                  {announcement.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPosterModalOpen(false)}
                className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Poster Image or Rich Poster Graphic */}
            <div className="p-4 sm:p-6 space-y-4">
              {announcement.posterImage ? (
                <div className="rounded-2xl overflow-hidden border border-stone-700 max-h-[60vh] flex items-center justify-center bg-black">
                  <img
                    src={announcement.posterImage}
                    alt={announcement.title}
                    className="max-h-[60vh] w-auto object-contain"
                  />
                </div>
              ) : (
                /* Elegant Default Poster Card Graphic */
                <div className="p-6 rounded-2xl bg-gradient-to-br from-red-950 via-stone-900 to-amber-950 border border-amber-500/30 text-center space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Live Zoom Batches</span>
                  </div>
                  <h4 className="text-2xl font-black text-white">
                    {announcement.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed">
                    {announcement.description}
                  </p>
                  {formattedDate && (
                    <div className="inline-block px-4 py-2 rounded-xl bg-amber-400 text-stone-950 font-black text-sm shadow-md mt-2">
                      Starts on {formattedDate}
                    </div>
                  )}
                </div>
              )}

              {/* Description Details */}
              {announcement.description && (
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-stone-950/60 p-4 rounded-xl border border-stone-800">
                  {announcement.description}
                </p>
              )}

              {/* Action in Modal */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPosterModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPosterModalOpen(false);
                    onRegisterClick();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-extrabold text-xs shadow-lg transition-transform hover:scale-[1.02] cursor-pointer flex items-center gap-2"
                >
                  <span>Register For This Batch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
