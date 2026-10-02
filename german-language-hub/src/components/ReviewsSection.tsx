import React, { useState } from 'react';
import { Star, CheckCircle, Search, Filter, MessageSquare, ThumbsUp, MapPin, User, PlusCircle, X, Award, AlertCircle } from 'lucide-react';
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
      statusTag: 'Recently Submitted'
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setModalOpen(false);
      setNewName('');
      setNewCity('');
      setNewComment('');
    }, 1500);
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
            Pakistan aur Germany se bacha bachio ke asli aur sachi raye Ahmed Rajput aur unki team ke baray mein.
          </p>
        </div>

        {/* Rating Overview Summary Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Score Display */}
            <div className="text-center md:border-r border-stone-200 md:pr-6">
              <div className="text-5xl font-black text-stone-950 tracking-tight">
                4.9
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
                Total 553 Reviews
              </div>
            </div>

            {/* Star Distribution Bars */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-12 font-bold text-stone-700">5 Stars</span>
                <div className="flex-1 bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '92%' }} />
                </div>
                <span className="w-12 text-right font-semibold text-stone-500">512</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-12 font-bold text-stone-700">4 Stars</span>
                <div className="flex-1 bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400/80 h-full rounded-full" style={{ width: '6%' }} />
                </div>
                <span className="w-12 text-right font-semibold text-stone-500">32</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-12 font-bold text-stone-700">3 Stars</span>
                <div className="flex-1 bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500/60 h-full rounded-full" style={{ width: '1.2%' }} />
                </div>
                <span className="w-12 text-right font-semibold text-stone-500">6</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-12 font-bold text-stone-700">2 Stars</span>
                <div className="flex-1 bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-stone-400 h-full rounded-full" style={{ width: '0.8%' }} />
                </div>
                <span className="w-12 text-right font-semibold text-stone-500">3</span>
              </div>
            </div>

            {/* Direct Write a review button & community quote */}
            <div className="text-center md:pl-6 space-y-3">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 text-xs text-stone-700 font-medium">
                "98% students ne kaha ke unhein commercial academy se behtar aur sasta standard mila."
              </div>
              <button
                onClick={() => setModalOpen(true)}
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
              placeholder="Search student reviews by name, city (e.g. Lahore, Karachi, Rawalpindi)..."
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
              All Reviews (553)
            </button>

            <button
              onClick={() => setActiveFilter('5-STAR')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-colors ${
                activeFilter === '5-STAR'
                  ? 'bg-stone-950 text-white'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              ⭐ 5 Stars (512)
            </button>

            <button
              onClick={() => setActiveFilter('CRITICAL')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-colors ${
                activeFilter === 'CRITICAL'
                  ? 'bg-red-700 text-white'
                  : 'bg-white text-red-700 border border-red-200 hover:bg-red-50'
              }`}
            >
              ⚠️ Critical & Suggestions (9)
            </button>

            <button
              onClick={() => setActiveFilter('FEMALE')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-colors ${
                activeFilter === 'FEMALE'
                  ? 'bg-stone-950 text-white'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              Female Students
            </button>

            <button
              onClick={() => setActiveFilter('MALE')}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap cursor-pointer transition-colors ${
                activeFilter === 'MALE'
                  ? 'bg-stone-950 text-white'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              Male Students
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
                  ? 'bg-stone-50/90 border-amber-200'
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
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="py-3 px-8 rounded-xl font-bold text-xs sm:text-sm bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 shadow-2xs hover:border-stone-900 transition-all cursor-pointer"
            >
              Load More Student Reviews ({filteredReviews.length - visibleCount} more)
            </button>
          </div>
        )}

      </div>

      {/* Write Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-stone-950 mb-1">
              Submit Your Review
            </h3>
            <p className="text-xs text-stone-600 mb-5">
              Share your genuine experience with Ahmed Rajput's German Language program.
            </p>

            {submittedMessage ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-950">Shukria! Aapka review add ho gaya hai.</h4>
                <p className="text-xs text-emerald-800">
                  Aapki raye doosre students ke liye bohot mufeed saabit hogi.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ayesha Malik / Hamza"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:ring-1 focus:ring-stone-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lahore, Karachi, Rawalpindi"
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:ring-1 focus:ring-stone-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Gender *
                    </label>
                    <select
                      value={newGender}
                      onChange={(e) => setNewGender(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-hidden"
                    >
                      <option value="male">Male (Larka)</option>
                      <option value="female">Female (Larki)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      Level Studied *
                    </label>
                    <select
                      value={newLevel}
                      onChange={(e) => setNewLevel(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-hidden"
                    >
                      <option value="A1">Level A1</option>
                      <option value="A2">Level A2</option>
                      <option value="B1">Level B1</option>
                      <option value="B2">Level B2</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Rating (Stars) *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-stone-200 text-stone-200'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-stone-600 ml-2">
                      {newRating} / 5 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    Your Review / Message *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Apna tajruba likhein (e.g. Ahmed Rajput bhai ka shukria, parhai ka standard, team ki guidance, suggestions waghera)..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-hidden focus:ring-1 focus:ring-stone-950"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  Publish Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
