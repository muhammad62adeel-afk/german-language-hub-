import React, { useState, useEffect } from 'react';
import {
  MessageSquare, ExternalLink, Check, Copy, Sparkles, ShieldCheck,
  Users, Sun, Moon, GraduationCap, CheckCircle2, ArrowRight
} from 'lucide-react';
import { CommunityGroup, GroupCategory } from '../types';
import {
  getCommunityGroups,
  getActiveCommunityGroups
} from '../utils/communityGroupsStorage';

interface OfficialGroupsSectionProps {
  onRegisterClick?: () => void;
}

export const OfficialGroupsSection: React.FC<OfficialGroupsSectionProps> = ({ onRegisterClick }) => {
  const [groups, setGroups] = useState<CommunityGroup[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadGroups = () => {
    const list = getActiveCommunityGroups();
    setGroups(list);
  };

  useEffect(() => {
    loadGroups();
    // Also try fetch from server API
    fetch('/api/groups')
      .then((res) => res.json())
      .then((data) => {
        if (data.groups && Array.isArray(data.groups)) {
          const active = data.groups.filter((g: CommunityGroup) => g.isActive);
          setGroups(active);
        }
      })
      .catch(() => {});

    const handleUpdate = () => {
      loadGroups();
    };
    window.addEventListener('community-groups-updated', handleUpdate);
    return () => window.removeEventListener('community-groups-updated', handleUpdate);
  }, []);

  const handleCopyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredGroups = selectedCategory === 'ALL'
    ? groups
    : groups.filter((g) => g.category === selectedCategory || (selectedCategory === 'A1' && g.category.includes('A1')));

  if (groups.length === 0) {
    return null;
  }

  return (
    <section id="groups" className="py-16 sm:py-20 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-black uppercase tracking-wider mb-3 shadow-2xs">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span>Official WhatsApp & Batch Groups</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950 tracking-tight">
            Join Your Official Batch WhatsApp Group
          </h2>

          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            Apne respective level aur class schedule ke mutabiq official group join karein. Daily live Zoom lecture links, PDF notes, vocabulary lists aur class updates yahin share ki jati hain.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-stone-950 text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-200/80 border border-stone-300'
            }`}
          >
            All Groups ({groups.length})
          </button>
          <button
            onClick={() => setSelectedCategory('A1')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedCategory === 'A1'
                ? 'bg-stone-950 text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-200/80 border border-stone-300'
            }`}
          >
            Level A1 Batches
          </button>
          <button
            onClick={() => setSelectedCategory('A2')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedCategory === 'A2'
                ? 'bg-stone-950 text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-200/80 border border-stone-300'
            }`}
          >
            Level A2 & B1 Batches
          </button>
          <button
            onClick={() => setSelectedCategory('Germany Visa / Study')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              selectedCategory === 'Germany Visa / Study'
                ? 'bg-stone-950 text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-200/80 border border-stone-300'
            }`}
          >
            Germany Visa & Relocation
          </button>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGroups.map((group) => {
            const isCopied = copiedId === group.id;
            return (
              <div
                key={group.id}
                className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md bg-stone-900 text-white font-black text-[10px]">
                            {group.category}
                          </span>
                          {group.badge && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px]">
                              {group.badge}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Official
                          </span>
                        </div>
                        <h3 className="font-black text-base sm:text-lg text-stone-950 mt-1 leading-snug">
                          {group.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* "Yeh Group Kis Ke Liye Hai" Highlight Box (CRITICAL USER REQUEST) */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-stone-800 mb-4">
                    <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-900 mb-1">
                      <span>🎯</span>
                      <span>Yeh Group Kis Ke Liye Hai:</span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-stone-700 font-medium">
                      {group.targetAudience}
                    </p>
                  </div>

                  {/* Feature note / benefit */}
                  {group.memberCountNote && (
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-4">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{group.memberCountNote}</span>
                    </div>
                  )}

                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleCopyLink(group.link, group.id)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-stone-400" />
                        <span>Share / Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={group.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-sm transition-all inline-flex items-center gap-2 active:scale-[0.98]"
                  >
                    <span>Join WhatsApp Group</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

        {/* Registration Prompt below groups */}
        <div className="mt-10 p-5 sm:p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-extrabold text-stone-950 text-sm sm:text-base">
              Abhi tak registration form fill nahi kiya?
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              Zoom batch me apni seat confirm karne ke liye online student form submit karein.
            </p>
          </div>
          {onRegisterClick && (
            <button
              onClick={onRegisterClick}
              className="px-6 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-900 text-white font-bold text-xs sm:text-sm transition-all inline-flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>Submit Registration Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
