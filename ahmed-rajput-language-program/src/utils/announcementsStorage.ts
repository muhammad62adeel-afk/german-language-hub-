import { Announcement } from '../types';

export const ANNOUNCEMENTS_STORAGE_KEY = 'ahmed_rajput_announcements';

// Default initial announcement matching user request example
export const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-batch-oct15',
    title: '15 October New Batch Classes Start',
    description: 'Admissions open for German A1, A2, B1 & B2! Live interactive Zoom sessions with certified teachers. 100% free under Ahmed Rajput Language Program.',
    deadlineDate: '2026-10-15',
    posterImage: '',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const getAnnouncements = (): Announcement[] => {
  if (typeof window === 'undefined') return DEFAULT_ANNOUNCEMENTS;
  try {
    const raw = localStorage.getItem(ANNOUNCEMENTS_STORAGE_KEY);
    if (!raw) {
      // Seed default announcement if none exists
      localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(DEFAULT_ANNOUNCEMENTS));
      return DEFAULT_ANNOUNCEMENTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_ANNOUNCEMENTS;
  } catch (err) {
    console.error('Error reading announcements from storage:', err);
    return DEFAULT_ANNOUNCEMENTS;
  }
};

export const saveAnnouncements = (announcements: Announcement[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(announcements));
    // Dispatch custom event for immediate reactive update across components
    window.dispatchEvent(new CustomEvent('announcements-updated'));
  } catch (err) {
    console.error('Error saving announcements to storage:', err);
  }
};

export const getActiveAnnouncement = (): Announcement | null => {
  const all = getAnnouncements();
  const active = all.filter((a) => a.isActive);
  if (active.length === 0) return null;
  // Return most recently updated/created active announcement
  return active.sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime())[0];
};
