import React, { useState, useEffect } from 'react';
import {
  MessageSquare, Plus, ExternalLink, Trash2, Edit3, CheckCircle2,
  XCircle, Save, X, Eye, Sparkles, Copy, Check, ShieldCheck,
  Users, Sun, Moon, GraduationCap, Plane, AlertCircle, Link as LinkIcon
} from 'lucide-react';
import { CommunityGroup, GroupCategory } from '../types';
import {
  getCommunityGroups,
  saveCommunityGroups,
  DEFAULT_COMMUNITY_GROUPS
} from '../utils/communityGroupsStorage';

interface AdminCommunityGroupManagerProps {
  onNotify?: (msg: string) => void;
}

const CATEGORY_OPTIONS: { id: GroupCategory; label: string; icon: string }[] = [
  { id: 'A1', label: 'German Level A1', icon: '🌱' },
  { id: 'A2', label: 'German Level A2', icon: '🌿' },
  { id: 'B1', label: 'German Level B1', icon: '🎯' },
  { id: 'B2', label: 'German Level B2', icon: '🏆' },
  { id: 'All Levels', label: 'All Students / General', icon: '👥' },
  { id: 'Germany Visa / Study', label: 'Germany Visa & Study Hub', icon: '🇩🇪' },
  { id: 'Ausbildung & Work', label: 'Ausbildung & Work Visa', icon: '💼' }
];

const AUDIENCE_PRESETS = [
  'Yeh group sirf un students ke liye hai jo Level A1 Morning Zoom Batch (10:00 AM) attend karte hain. Daily Zoom class link aur slides yahin milti hain.',
  'Yeh group un students ke liye hai jo Level A1 Night Zoom Batch (09:00 PM) attend karte hain. Evening class link aur recordings yahan post ki jati hain.',
  'Un students ke liye jinhone A1 clear kar liya hai aur ab A2 ya B1 Goethe / TELC exam preparation aur speaking practice chahte hain.',
  'Un sabhi students aur professionals ke liye jo Germany me Study, Ausbildung ya Chancenkarte (Opportunity Card) ke liye apply kar rahe hain.',
  'Healthcare professionals, Nurses aur Doctors ke liye jo Germany Approbation aur B2 Medical German prepare kar rahe hain.'
];

export const AdminCommunityGroupManager: React.FC<AdminCommunityGroupManagerProps> = ({ onNotify }) => {
  const [groups, setGroups] = useState<CommunityGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [category, setCategory] = useState<GroupCategory>('A1');
  const [badge, setBadge] = useState('Morning Slot (10 AM)');
  const [memberCountNote, setMemberCountNote] = useState('Daily Zoom Links & Slides');
  const [isActive, setIsActive] = useState(true);
  const [formError, setFormError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<CommunityGroup | null>(null);

  // Load Groups from Server or Local Storage
  const loadGroups = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/groups');
      if (res.ok) {
        const data = await res.json();
        if (data.groups && Array.isArray(data.groups)) {
          setGroups(data.groups);
          saveCommunityGroups(data.groups);
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn('API /api/groups fallback to localStorage:', e);
    }
    const local = getCommunityGroups();
    setGroups(local);
    setIsLoading(false);
  };

  useEffect(() => {
    loadGroups();
    const handleUpdate = () => {
      setGroups(getCommunityGroups());
    };
    window.addEventListener('community-groups-updated', handleUpdate);
    return () => window.removeEventListener('community-groups-updated', handleUpdate);
  }, []);

  const handleAddNew = () => {
    setCurrentEditId(null);
    setTitle('');
    setLink('');
    setTargetAudience('');
    setCategory('A1');
    setBadge('Morning Slot (10 AM)');
    setMemberCountNote('Daily Zoom Links & Slides');
    setIsActive(true);
    setFormError('');
    setIsEditing(true);
  };

  const handleEdit = (item: CommunityGroup) => {
    setCurrentEditId(item.id);
    setTitle(item.title);
    setLink(item.link);
    setTargetAudience(item.targetAudience);
    setCategory(item.category);
    setBadge(item.badge || '');
    setMemberCountNote(item.memberCountNote || 'Daily Zoom Links & Slides');
    setIsActive(item.isActive);
    setFormError('');
    setIsEditing(true);
  };

  const handleCopyLink = (grpLink: string, id: string) => {
    navigator.clipboard.writeText(grpLink);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
    if (onNotify) onNotify('Group link copied to clipboard!');
  };

  const handleToggleStatus = async (item: CommunityGroup) => {
    const updated = { ...item, isActive: !item.isActive, updatedAt: new Date().toISOString() };
    const newList = groups.map((g) => (g.id === item.id ? updated : g));
    setGroups(newList);
    saveCommunityGroups(newList);

    try {
      await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (e) {
      console.warn('Backend sync warning:', e);
    }

    if (onNotify) {
      onNotify(updated.isActive ? 'Group is now ACTIVE on website!' : 'Group is now HIDDEN from website.');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Please enter a Group Title');
      return;
    }
    if (!link.trim()) {
      setFormError('Please enter the Group Link (e.g. WhatsApp invite link)');
      return;
    }
    if (!targetAudience.trim()) {
      setFormError('Please specify "Group kis ke liye hai" (Who should join this group)');
      return;
    }

    const payload: CommunityGroup = {
      id: currentEditId || `grp-${Date.now()}`,
      title: title.trim(),
      link: link.trim(),
      targetAudience: targetAudience.trim(),
      category,
      platform: 'whatsapp',
      badge: badge.trim() || 'Official Batch',
      memberCountNote: memberCountNote.trim() || 'Daily Zoom Links & Slides',
      isActive,
      createdAt: currentEditId
        ? groups.find((g) => g.id === currentEditId)?.createdAt || new Date().toISOString()
        : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let updatedList: CommunityGroup[];
    if (currentEditId) {
      updatedList = groups.map((g) => (g.id === currentEditId ? payload : g));
    } else {
      updatedList = [payload, ...groups];
    }

    setGroups(updatedList);
    saveCommunityGroups(updatedList);
    setIsEditing(false);

    try {
      await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Backend group save sync:', err);
    }

    if (onNotify) {
      onNotify(currentEditId ? 'Group updated successfully!' : '🎉 New WhatsApp Group uploaded to website!');
    }
  };

  const confirmDelete = async () => {
    if (!deleteCandidate) return;
    const id = deleteCandidate.id;
    const filtered = groups.filter((g) => g.id !== id);
    setGroups(filtered);
    saveCommunityGroups(filtered);
    setDeleteCandidate(null);

    try {
      await fetch(`/api/groups/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Backend group delete sync:', err);
    }

    if (onNotify) onNotify('Group deleted successfully.');
  };

  const activeCount = groups.filter((g) => g.isActive).length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner: WhatsApp & Community Groups Manager */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                WhatsApp & Community Groups Manager
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-black uppercase">
                {activeCount} Active on Web
              </span>
            </div>
            <p className="text-sm text-stone-400 max-w-2xl leading-relaxed">
              Yahan se aap website par naye <strong>WhatsApp Group Links</strong> upload kar sakte hain. Student ko pata chalega ke <strong>group kis ke liye hai</strong> (A1 Morning, A1 Night, A2/B1 Exam Prep, ya Germany Relocation).
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-black text-sm shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98] cursor-pointer shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span>Upload New Group</span>
          </button>
        </div>
      </div>

      {/* Editor Modal / Drawer */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    {currentEditId ? 'Edit WhatsApp Group' : 'Upload New WhatsApp Group to Website'}
                  </h3>
                  <p className="text-xs text-stone-400">
                    Group details fill karein — save hote hi website par live display ho jayega.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-5 p-3.5 bg-red-950/40 border border-red-800 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-5">
              
              {/* 1. Group Title */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-stone-300 mb-1.5">
                  Group Title / Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. German A1 - Morning Batch (10:00 AM – 11:00 AM)"
                  className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm placeholder:text-stone-500 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* 2. Group WhatsApp Link */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-300">
                    Group Link (WhatsApp / Telegram) <span className="text-red-500">*</span>
                  </label>
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-400 hover:underline inline-flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Test / Open Link</span>
                    </a>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://chat.whatsapp.com/..."
                    className="w-full px-4 py-3 pl-10 rounded-xl bg-stone-900 border border-stone-700 text-white text-sm font-mono placeholder:text-stone-500 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                  <LinkIcon className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* 3. Group Kis Ke Liye Hai / Target Audience (CRITICAL USER REQUEST) */}
              <div className="p-4 rounded-2xl bg-stone-900/80 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-black uppercase tracking-wider text-emerald-400">
                    Yeh Group Kis Ke Liye Hai? (Target Audience) <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Required for Students
                  </span>
                </div>
                <p className="text-xs text-stone-400">
                  Wazeh alfaz me likhein taake student ko maloom ho ke yeh group kis batch ya maqsad ke liye hai:
                </p>

                <textarea
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  rows={3}
                  placeholder="e.g. Yeh group un tamam registered students ke liye hai jinhone Level A1 Morning Zoom Batch (10:00 AM) select kiya hai. Daily live Zoom link aur lecture slides yahin aayengi."
                  className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-700 text-white text-xs sm:text-sm placeholder:text-stone-500 focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  required
                />

                {/* Quick Presets */}
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                    Quick Presets (Click to insert):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {AUDIENCE_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setTargetAudience(preset)}
                        className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-[11px] text-stone-300 transition-colors text-left"
                      >
                        ⚡ Preset {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Category & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-300 mb-1.5">
                    Course Level / Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as GroupCategory)}
                    className="w-full px-3.5 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs sm:text-sm font-semibold focus:outline-hidden focus:border-emerald-500"
                  >
                    {CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.icon} {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-300 mb-1.5">
                    Badge / Tag (e.g. Morning Slot, Night Slot)
                  </label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="e.g. Morning Slot (10 AM)"
                    className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs sm:text-sm placeholder:text-stone-500 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* 5. Additional Note & Active Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-300 mb-1.5">
                    Feature Note / Benefit
                  </label>
                  <input
                    type="text"
                    value={memberCountNote}
                    onChange={(e) => setMemberCountNote(e.target.value)}
                    placeholder="e.g. Daily Zoom Links & Slides"
                    className="w-full px-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white text-xs sm:text-sm placeholder:text-stone-500 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-300 mb-1.5">
                    Visibility on Website
                  </label>
                  <div className="flex items-center gap-3 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 bg-stone-900 border-stone-700"
                      />
                      <span className="text-xs font-bold text-stone-200">
                        {isActive ? '✅ Active (Visible on Website)' : '⏸️ Inactive (Hidden)'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block">
                  Live Preview of How Students Will See It:
                </span>
                <div className="p-4 rounded-2xl bg-white border border-stone-200 text-stone-900 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                      💬 WhatsApp Official
                    </span>
                    <span className="px-2 py-0.5 rounded bg-stone-900 text-white text-[10px] font-bold">
                      {badge || category}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-sm text-stone-950">
                    {title || 'Group Name will show here'}
                  </h4>
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-stone-800">
                    <span className="font-bold text-amber-900 block mb-0.5">🎯 Yeh group kis ke liye hai:</span>
                    <p className="text-xs leading-relaxed text-stone-700">
                      {targetAudience || 'Target audience description will appear here...'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-black shadow-lg shadow-emerald-500/20 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{currentEditId ? 'Update Group' : 'Upload & Publish to Website'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-stone-950 border border-stone-800 rounded-3xl p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-red-950/60 text-red-400 border border-red-800/60 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-white mb-1">
              Delete WhatsApp Group?
            </h3>
            <p className="text-xs text-stone-400 mb-4">
              Kya aap waqayi <strong>&ldquo;{deleteCandidate.title}&rdquo;</strong> ko website se remove karna chahte hain?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Groups List */}
      <div className="space-y-4">
        {groups.length === 0 ? (
          <div className="p-12 text-center bg-stone-950 border border-stone-800 rounded-3xl">
            <MessageSquare className="w-10 h-10 text-stone-600 mx-auto mb-3" />
            <p className="font-bold text-stone-300 text-sm">Koi WhatsApp Group nahi mila</p>
            <p className="text-xs text-stone-500 mt-1 mb-4">
              Naya WhatsApp group upload karne ke liye button par click karein.
            </p>
            <button
              onClick={handleAddNew}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-stone-950 font-bold text-xs"
            >
              Upload First Group
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groups.map((group) => {
              const isCopied = copiedId === group.id;
              return (
                <div
                  key={group.id}
                  className={`p-5 rounded-3xl border transition-all ${
                    group.isActive
                      ? 'bg-stone-950 border-stone-800 hover:border-emerald-500/50 shadow-lg'
                      : 'bg-stone-950/50 border-stone-900 opacity-60'
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                        💬
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md bg-stone-900 border border-stone-800 text-stone-300 text-[10px] font-black">
                            {group.category}
                          </span>
                          {group.badge && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[10px] font-bold">
                              {group.badge}
                            </span>
                          )}
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              group.isActive
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-stone-800 text-stone-500'
                            }`}
                          >
                            {group.isActive ? 'Active on Web' : 'Hidden'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleToggleStatus(group)}
                        title={group.isActive ? 'Hide from website' : 'Make active on website'}
                        className={`p-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                          group.isActive
                            ? 'bg-emerald-950/60 border-emerald-800/60 text-emerald-400 hover:bg-emerald-900'
                            : 'bg-stone-900 border-stone-800 text-stone-500 hover:text-stone-300'
                        }`}
                      >
                        {group.isActive ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleEdit(group)}
                        className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-colors cursor-pointer"
                        title="Edit Group"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteCandidate(group)}
                        className="p-2 rounded-xl bg-stone-900 hover:bg-red-950/80 text-stone-400 hover:text-red-400 border border-stone-800 hover:border-red-800 transition-colors cursor-pointer"
                        title="Delete Group"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-extrabold text-base text-white mb-2 leading-snug">
                    {group.title}
                  </h3>

                  {/* Target Audience Box: "Group Kis Ke Liye Hai" */}
                  <div className="p-3.5 rounded-2xl bg-stone-900 border border-emerald-500/20 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1 mb-1">
                      <span>🎯</span>
                      <span>Yeh Group Kis Ke Liye Hai:</span>
                    </span>
                    <p className="text-xs text-stone-300 leading-relaxed font-medium">
                      {group.targetAudience}
                    </p>
                  </div>

                  {/* Group Link & Quick Copy */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-800/80">
                    <a
                      href={group.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-mono truncate max-w-[200px] sm:max-w-xs inline-flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{group.link}</span>
                    </a>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleCopyLink(group.link, group.id)}
                        className="px-2.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-semibold border border-stone-800 inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                      <a
                        href={group.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs inline-flex items-center gap-1"
                      >
                        <span>Join</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
