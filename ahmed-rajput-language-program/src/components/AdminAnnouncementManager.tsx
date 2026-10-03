import React, { useState, useEffect } from 'react';
import {
  Megaphone, Plus, Calendar, Clock, Trash2, Edit3, Image as ImageIcon,
  CheckCircle2, XCircle, AlertCircle, Save, X, Eye, Sparkles, UploadCloud,
  Check, Lock, ExternalLink
} from 'lucide-react';
import { Announcement } from '../types';
import {
  getAnnouncements,
  saveAnnouncements,
  DEFAULT_ANNOUNCEMENTS
} from '../utils/announcementsStorage';

interface AdminAnnouncementManagerProps {
  onNotify?: (msg: string) => void;
}

export const AdminAnnouncementManager: React.FC<AdminAnnouncementManagerProps> = ({ onNotify }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [posterImage, setPosterImage] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [formError, setFormError] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Load announcements
  const loadList = () => {
    const list = getAnnouncements();
    setAnnouncements(list);
  };

  useEffect(() => {
    loadList();
  }, []);

  // Handle open create form
  const handleAddNew = () => {
    setCurrentEditId(null);
    setTitle('');
    setDescription('');
    // Default deadline 2 weeks ahead or default 2026-10-15
    setDeadlineDate('2026-10-15');
    setPosterImage('');
    setIsActive(true);
    setFormError('');
    setPreviewImage(null);
    setIsEditing(true);
  };

  // Handle open edit form
  const handleEdit = (item: Announcement) => {
    setCurrentEditId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setDeadlineDate(item.deadlineDate);
    setPosterImage(item.posterImage || '');
    setIsActive(item.isActive);
    setFormError('');
    setPreviewImage(item.posterImage || null);
    setIsEditing(true);
  };

  // Handle Image Upload & Convert to Base64
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 2.5MB to comfortably fit in localStorage)
    if (file.size > 2.5 * 1024 * 1024) {
      setFormError('Image size exceeds 2.5MB. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPosterImage(base64String);
      setPreviewImage(base64String);
      setFormError('');
    };
    reader.onerror = () => {
      setFormError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  // Remove uploaded poster
  const handleRemovePoster = () => {
    setPosterImage('');
    setPreviewImage(null);
  };

  // Save Announcement
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Please enter an announcement title.');
      return;
    }

    const now = new Date().toISOString();
    let updatedList: Announcement[] = [];

    if (currentEditId) {
      // Update existing
      updatedList = announcements.map((item) => {
        if (item.id === currentEditId) {
          return {
            ...item,
            title: title.trim(),
            description: description.trim(),
            deadlineDate,
            posterImage,
            isActive,
            updatedAt: now
          };
        }
        // If this one is set to active, optionally keep others active or toggle
        return item;
      });
      if (onNotify) onNotify('Announcement updated successfully!');
    } else {
      // Add new
      const newAnn: Announcement = {
        id: `ann-${Date.now()}`,
        title: title.trim(),
        description: description.trim(),
        deadlineDate,
        posterImage,
        isActive,
        createdAt: now,
        updatedAt: now
      };
      updatedList = [newAnn, ...announcements];
      if (onNotify) onNotify('New announcement created successfully!');
    }

    // Save to localStorage & notify
    saveAnnouncements(updatedList);
    setAnnouncements(updatedList);

    // Sync to backend API if available
    try {
      await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: currentEditId || `ann-${Date.now()}`,
          title: title.trim(),
          description: description.trim(),
          deadlineDate,
          posterImage,
          isActive
        })
      });
    } catch (err) {
      console.warn('Backend sync notice (localStorage is primary):', err);
    }

    setIsEditing(false);
  };

  // Toggle active status directly from list
  const handleToggleStatus = async (item: Announcement) => {
    const updated = announcements.map((a) => {
      if (a.id === item.id) {
        return { ...a, isActive: !a.isActive, updatedAt: new Date().toISOString() };
      }
      return a;
    });
    saveAnnouncements(updated);
    setAnnouncements(updated);
    if (onNotify) {
      onNotify(`Announcement status switched to ${!item.isActive ? 'Active' : 'Inactive'}`);
    }

    // Sync to backend
    try {
      await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, isActive: !item.isActive })
      });
    } catch (err) {
      // safe fallback
    }
  };

  // Delete Announcement
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;
    const filtered = announcements.filter((a) => a.id !== id);
    saveAnnouncements(filtered);
    setAnnouncements(filtered);
    if (onNotify) onNotify('Announcement deleted successfully.');

    // Sync to backend
    try {
      await fetch(`/api/announcements/${id}`, { method: 'DELETE' });
    } catch (err) {
      // safe fallback
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Section Header */}
      <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Megaphone className="w-3.5 h-3.5" />
              <span>Announcement & Poster Manager</span>
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            New Batch Deadlines & Admission Posters
          </h2>
          <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
            Manage alerts and posters shown on the student portal. Active announcements appear as high-visibility red & yellow banners with a live countdown timer.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 hover:from-red-500 hover:to-amber-300 text-stone-950 font-black text-xs sm:text-sm shadow-lg transition-transform hover:scale-[1.02] cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Announcement</span>
        </button>
      </div>

      {/* Editor Modal / Form Container */}
      {isEditing && (
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-950 border border-amber-500/40 shadow-2xl space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">
                  {currentEditId ? 'Edit Announcement / Poster' : 'Create New Announcement'}
                </h3>
                <p className="text-xs text-stone-400">
                  Data will be saved in localStorage and persistent storage for Vercel & GitHub.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="p-2 rounded-xl bg-stone-900 text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Field 1: Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5 font-mono">
                Announcement Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 15 October New Batch Classes Start"
                required
                className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 text-sm font-semibold focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
              <span className="text-[11px] text-stone-400 mt-1 block">
                Example: "15 October New Batch Classes Start" or "Last Date To Register: 15 October"
              </span>
            </div>

            {/* Field 2: Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5 font-mono">
                Short Description / Details
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Enter batch schedule, morning/night slots, or guidance for joining Zoom classes..."
                className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 text-sm focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
            </div>

            {/* Row: Deadline Date & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Field 3: Deadline Date */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5 font-mono">
                  Deadline / Start Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={deadlineDate}
                    onChange={(e) => setDeadlineDate(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm font-semibold focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <span className="text-[11px] text-stone-400 mt-1 block">
                  Students will see a live countdown timer calculated from this date.
                </span>
              </div>

              {/* Field 5: Status Active / Inactive toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5 font-mono">
                  Display Status
                </label>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-900 border border-stone-700">
                  <button
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                      isActive ? 'bg-emerald-500' : 'bg-stone-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        isActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className={`text-xs font-black uppercase ${isActive ? 'text-emerald-400' : 'text-stone-400'}`}>
                    {isActive ? 'ACTIVE (Visible on Public Website)' : 'INACTIVE (Hidden)'}
                  </span>
                </div>
                <span className="text-[11px] text-stone-400 mt-1 block">
                  When active, the top banner will immediately show this notice to all visitors.
                </span>
              </div>
            </div>

            {/* Field 4: Poster Image Upload (optional) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 font-mono">
                Poster Image Upload <span className="text-stone-500 font-normal lowercase">(optional)</span>
              </label>

              <div className="p-4 rounded-2xl bg-stone-900/90 border-2 border-dashed border-stone-700 hover:border-amber-400/60 transition-colors">
                {posterImage ? (
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={posterImage}
                      alt="Uploaded poster preview"
                      className="w-32 h-32 object-cover rounded-xl border border-stone-700 shadow-md"
                    />
                    <div className="space-y-2 text-center sm:text-left">
                      <div className="text-xs font-bold text-emerald-400 flex items-center justify-center sm:justify-start gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Poster Image Loaded</span>
                      </div>
                      <p className="text-[11px] text-stone-400">
                        This image will be available for students to inspect via the "View Poster" modal.
                      </p>
                      <button
                        type="button"
                        onClick={handleRemovePoster}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950 text-red-300 border border-red-800 text-xs font-bold hover:bg-red-900 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove Poster</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 space-y-2">
                    <UploadCloud className="w-8 h-8 text-stone-500 mx-auto" />
                    <div className="text-xs text-stone-300 font-medium">
                      <label className="text-amber-400 hover:text-amber-300 underline font-bold cursor-pointer">
                        <span>Click to browse file</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="sr-only"
                        />
                      </label>
                      <span> or drag and drop your poster image here</span>
                    </div>
                    <p className="text-[10px] text-stone-500">
                      Supports PNG, JPG, WEBP (Max: 2.5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{formError}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 font-semibold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 hover:from-red-500 hover:to-amber-300 text-stone-950 font-black text-xs sm:text-sm shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Announcement</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List of Announcements */}
      <div className="rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Configured Announcements ({announcements.length})
            </span>
          </div>
          <span className="text-[11px] text-stone-500">
            Stored persistently in localStorage & database
          </span>
        </div>

        {announcements.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Megaphone className="w-10 h-10 text-stone-600 mx-auto" />
            <h4 className="text-base font-bold text-stone-300">No Announcements Found</h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Create your first batch deadline announcement or upload a poster to inform students on the public website.
            </p>
            <button
              type="button"
              onClick={handleAddNew}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs shadow-sm hover:bg-amber-400 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Announcement</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-stone-800">
            {announcements.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-6 hover:bg-stone-850/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {/* Status Toggle Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(item)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all ${
                        item.isActive
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-stone-800 text-stone-400 border border-stone-700 hover:bg-stone-700'
                      }`}
                      title="Click to toggle status"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${item.isActive ? 'bg-emerald-400 animate-pulse' : 'bg-stone-500'}`} />
                      <span>{item.isActive ? 'Active (Live)' : 'Inactive'}</span>
                    </button>

                    {/* Deadline Badge */}
                    {item.deadlineDate && (
                      <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20">
                        <Calendar className="w-3 h-3" />
                        <span>Deadline: {item.deadlineDate}</span>
                      </span>
                    )}

                    {/* Has Poster indicator */}
                    {item.posterImage && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">
                        <ImageIcon className="w-3 h-3" />
                        <span>Poster Attached</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-base sm:text-lg font-black text-white">
                    {item.title}
                  </h4>

                  {item.description && (
                    <p className="text-xs text-stone-400 line-clamp-2 max-w-2xl leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-stone-800">
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors cursor-pointer border border-stone-700"
                    title="Edit announcement"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 hover:text-white text-xs font-bold transition-colors cursor-pointer border border-red-900"
                    title="Delete announcement"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
