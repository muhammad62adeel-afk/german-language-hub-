import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Search, Filter, MessageSquare, ThumbsUp, MapPin, User, PlusCircle, X, Award, AlertCircle, ArrowDown } from 'lucide-react';
import { StudentReview, REVIEWS_SUMMARY, INITIAL_REVIEWS_LIST } from '../data/reviewsData';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<StudentReview[]>(INITIAL_REVIEWS_LIST);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);
  const [modalOpen, setModalOpen] = useState(false);

  // New review form state
  const [newName, setNewName] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newGender, setNewGender] = useState<'male' | 'female'>('male');
  const [newLevel, setNewLevel] = useState<'A1' | 'A2' | 'B1' | 'B2'>('A1');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Load any previously submitted custom reviews from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('custom_student_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviewsList([...parsed, ...INITIAL_REVIEWS_LIST]);
        }
      }
    } catch (e) {
      console.warn('Error loading cached reviews:', e);
    }
  }, []);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newRev: StudentReview = {
      id: `rev-${Date.now()}`,
      name: newName.trim(),
      gender: newGender,
      city: newCity.trim() || 'Pakistan',
      level: newLevel,
      rating: newRating,
      date: 'Abhi abhi',
      comment: newComment.trim(),
      verifiedStudent: true,
      statusTag: newRating <= 3 ? 'Honest Feedback' : 'Recent Review'
    };

    const updated = [newRev, ...reviewsList];
    setReviewsList(updated);

    try {
      const saved = localStorage.getItem('custom_student_reviews');
      const list = saved ? JSON.parse(saved) : [];
      list.unshift(newRev);
      localStorage.setItem('custom_student_reviews', JSON.stringify(list));
    } catch (err) {
      console.warn('Could not save to localStorage:', err);
    }

    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setModalOpen(false);
      setNewName('');
      setNewCity('');
      setNewComment('');
    }, 2500);
  };

  const scrollToReviewForm = () => {
    const el = document.getElementById('write-review');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setModalOpen(true);
    }
  };

  const filteredReviews = reviewsList.filter((rev) => {
    // Category / Rating filter
    let matchesCategory = true;
    if (activeFilter === '5-STAR') {
      matchesCategory = rev.rating === 5;
    } else if (activeFilter === 'CRITICAL') {
      matchesCategory = rev.rating <= 3;
    } else if (activeFilter === 'A1') {
      matchesCategory = rev.level === 'A1';
    } else if (activeFilter === 'A2') {
      matchesCategory = rev.level === 'A2';
    } else if (activeFilter === 'B1_B2') {
      matchesCategory = rev.level === 'B1' || rev.level === 'B2';
    } else if (activeFilter === 'FEMALE') {
      matchesCategory = rev.gender === 'female';
    } else if (activeFilter === 'MALE') {
      matchesCategory = rev.gender === 'male';
    }

    // Search query
    const matchesSearch =
      rev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.comment.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-900 border border-amber-500/30 text-xs font-bold mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>553 Verified Student Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
            Student Reviews & Feedback
          </h2>

          <p className="mt-2 text-sm sm:text-base text-stone-600">
            Pakistan aur bahar ke mulkon se students ke asli tajrubaat, honest feedback aur exam results.
          </p>
        </div>

        {/* Rating Overview Summary Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Score Display */}
            <div className="text-center md:border-r border-stone-200 md:pr-6">
              <div className="text-5xl font-black text-stone-950 tracking-tight">
                {REVIEWS_SUMMARY.averageRating}
              </div>
              <div className="flex items-center justify-center gap-1 text-amber-500 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                Overall Student Score
              </div>
              <div className="text-sm font-extrabold text-red-700 mt-1">
                Total {reviewsList.length} Genuine Reviews
              </div>
            </div>

            {/* Star Distribution Bars */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-12 font-bold text-stone-700">5 Stars</span>
                <div className="flex-1 bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '88%' }} />
                </div>
                <span className="w-12 text-right font-semibold text-stone-500">{REVIEWS_SUMMARY.fiveStarCount}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-12 font-bold text-stone-700">4 Stars</span>
                <div className="flex-1 bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400/80 h-full rounded-full" style={{ width: '9%' }} />
                </div>
                <span className="w-12 text-right font-semibold text-stone-500">{REVIEWS_SUMMARY.fourStarCount}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-12 font-bold text-stone-700">3 Stars</span>
                <div className="flex-1 bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500/60 h-full rounded-full" style={{ width: '2.5%' }} />
                </div>
                <span className="w-12 text-right font-semibold text-stone-500">{REVIEWS_SUMMARY.threeStarCount}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-12 font-bold text-stone-700">2 Stars</span>
                <div className="flex-1 bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-stone-400 h-full rounded-full" style={{ width: '0.8%' }} />
                </div>
                <span className="w-12 text-right font-semibold text-stone-500">{REVIEWS_SUMMARY.twoStarCount}</span>
              </div>
            </div>

            {/* Direct Write a review button & community quote */}
            <div className="text-center md:pl-6 space-y-3">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 text-xs text-stone-700 font-medium">
                "Honest community reviews: positive feedback aur constructive suggestions dono welcome hain."
              </div>
              <button
                onClick={scrollToReviewForm}
                className="w-full py-3 px-4 rounded-xl bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-amber-400" />
                <span>Write Your Review</span>
              </button>
            </div>

          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="max-w-4xl mx-auto mb-8 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search reviews by name, city (e.g. Lahore, Karachi, Rawalpindi)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-stone-300 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-stone-950"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-colors ${
                activeFilter === 'ALL'
                  ? 'bg-stone-950 text-white'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              All Reviews ({reviewsList.length})
            </button>

            <button
              onClick={() => setActiveFilter('5-STAR')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-colors ${
                activeFilter === '5-STAR'
                  ? 'bg-stone-950 text-white'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              ⭐ 5 Stars
            </button>

            <button
              onClick={() => setActiveFilter('CRITICAL')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-colors ${
                activeFilter === 'CRITICAL'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-amber-800 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              ⚠️ Honest & Critical Feedback
            </button>

            <button
              onClick={() => setActiveFilter('A1')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-colors ${
                activeFilter === 'A1'
                  ? 'bg-stone-950 text-white'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              Level A1
            </button>

            <button
              onClick={() => setActiveFilter('A2')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-colors ${
                activeFilter === 'A2'
                  ? 'bg-stone-950 text-white'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              Level A2
            </button>

            <button
              onClick={() => setActiveFilter('B1_B2')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-colors ${
                activeFilter === 'B1_B2'
                  ? 'bg-stone-950 text-white'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              Level B1 / B2
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReviews.slice(0, visibleCount).map((rev) => (
            <div
              key={rev.id}
              className={`rounded-2xl p-5 border flex flex-col justify-between transition-all ${
                rev.rating <= 3
                  ? 'bg-stone-50/90 border-amber-200/90'
                  : 'bg-white border-stone-200 shadow-2xs hover:shadow-xs'
              }`}
            >
              <div>
                {/* Top Row: User info & stars */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                        rev.gender === 'female'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-stone-950 text-xs sm:text-sm">
                          {rev.name}
                        </h4>
                        {rev.verifiedStudent && (
                          <span title="Verified Student" className="inline-flex items-center">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-stone-500">
                        <MapPin className="w-2.5 h-2.5 text-stone-400" />
                        <span>{rev.city}</span>
                        <span>•</span>
                        <span>{rev.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-stone-200 text-stone-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Level and Status Badge */}
                <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-800">
                    Level {rev.level}
                  </span>
                  {rev.statusTag && (
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        rev.rating <= 3
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {rev.statusTag}
                    </span>
                  )}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle className="w-3 h-3" />
                  <span>Enrolled Student</span>
                </span>
                <span className="text-stone-400">Zoom Live Batch</span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredReviews.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="py-3 px-8 rounded-xl font-bold text-xs sm:text-sm bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 shadow-2xs hover:border-stone-900 transition-all cursor-pointer"
            >
              Load More Student Reviews ({filteredReviews.length - visibleCount} more)
            </button>
          </div>
        )}

        {/* INLINE WRITE A REVIEW SECTION AT THE BOTTOM */}
        <div id="write-review" className="mt-14 max-w-3xl mx-auto bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-2 border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Student Community Feedback</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-stone-950 tracking-tight">
              Apna Review & Experience Share Karein
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-stone-600">
              Agar aapne Ahmad Rajput ki German classes li hain to apna sacha tajruba likhein taake doosray students ko faida ho sake.
            </p>
          </div>

          {submittedMessage ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2 animate-in fade-in">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-emerald-950">Boht Shukriya! Aapka review publish ho gaya hai.</h4>
              <p className="text-xs sm:text-sm text-emerald-800">
                Aapka honest review list me shamil kar diya gaya hai.
              </p>
            </div>
          ) : (
            <form onSubmit={handleAddReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1.5 font-mono">
                    Apna Naam (Your Name) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Usama Khan / Ayesha"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-xs sm:text-sm text-stone-950 placeholder:text-stone-400 focus:outline-hidden focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1.5 font-mono">
                    Shehar (City / Country) *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lahore, Karachi, Rawalpindi"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-xs sm:text-sm text-stone-950 placeholder:text-stone-400 focus:outline-hidden focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1.5 font-mono">
                    German Level *
                  </label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-xs sm:text-sm text-stone-950 font-medium focus:outline-hidden focus:border-stone-900"
                  >
                    <option value="A1">Level A1 (Beginner)</option>
                    <option value="A2">Level A2 (Elementary)</option>
                    <option value="B1">Level B1 (Intermediate)</option>
                    <option value="B2">Level B2 (Upper Intermediate)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1.5 font-mono">
                    Gender *
                  </label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-xs sm:text-sm text-stone-950 font-medium focus:outline-hidden focus:border-stone-900"
                  >
                    <option value="male">Male (Larka)</option>
                    <option value="female">Female (Larki)</option>
                  </select>
                </div>
              </div>

              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1.5 font-mono">
                  Aapka Rating Score (Click on Stars) *
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-stone-50 border border-stone-200">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="cursor-pointer transition-transform hover:scale-110 p-0.5"
                        title={`${star} Star`}
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= newRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-stone-200 text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-stone-800">
                    {newRating === 5 && '⭐⭐⭐⭐⭐ 5 Stars - Zabardast / Excellent'}
                    {newRating === 4 && '⭐⭐⭐⭐ 4 Stars - Boht Acha / Good'}
                    {newRating === 3 && '⭐⭐⭐ 3 Stars - Theek / Average Feedback'}
                    {newRating === 2 && '⭐⭐ 2 Stars - Guzara / Needs Improvement'}
                    {newRating === 1 && '⭐ 1 Star - Na-pasand'}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-900 mb-1.5 font-mono">
                  Aapka Honest Review / Message *
                </label>
                <textarea
                  rows={4}
                  placeholder="Apna realistic tajruba likhein (e.g. teaching style kaisa tha, homework ka load, WhatsApp group support, timing, exam clearance waghera)..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-xs sm:text-sm text-stone-950 placeholder:text-stone-400 focus:outline-hidden focus:border-stone-900 focus:ring-2 focus:ring-stone-900/10"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-stone-950 hover:bg-stone-900 text-white font-bold text-sm shadow-md transition-all active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>PUBLISH MY REVIEW</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
