import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is this German language program really 100% Free?',
      a: 'Yes! All live training sessions for A1, A2, B1, and B2 are 100% Free of cost. This program is a social education initiative fully sponsored by Ahmed Rajput (Senior Software Engineer in Germany) so that hardworking students do not have to pay commercial fees of Rs. 40,000–70,000+ per level.'
    },
    {
      q: 'Classes kis app par hongi aur class ke timings kya hain?',
      a: 'Classes Zoom App par 100% live conduct ki jati hain. Har student ke liye daily 2 time slots available hain: (1) Subha 10:00 AM to 11:00 AM (Morning Batch) aur (2) Raat 9:00 PM to 10:00 PM (Night Batch). Registration form fill karte waqt aap apni sahulat ke mutabiq koi 1 time slot select kar sakte hain. WhatsApp group me daily link share kiya jata hai.'
    },
    {
      q: 'What are the exact durations for each level (A1, A2, B1, B2)?',
      a: 'Our course is structured for maximum mastery: Level A1 takes 2 Months, Level A2 takes 2 Months, Level B1 takes 3 Months, and Level B2 takes 3 Months. Total roadmap to full professional fluency is 10 months.'
    },
    {
      q: 'Will dedicated teachers guide us during the classes?',
      a: 'Yes! Specially hired qualified, certified, and experienced German language instructors conduct all live lectures. You can unmute your microphone to practice speaking, ask questions, and receive instant pronunciation feedback.'
    },
    {
      q: 'Agar main talented aur hardworking hoon toh kya team mujhe Germany aane me help karegi?',
      a: 'Bilkul! Agar aap regular hain aur dedicatedly German seekhte hain, toh Ahmed Rajput aur unki team aapko Germany aane me poori support karegi: Free Tuition Public Universities, Paid Ausbildung (with monthly stipend ~€1,000+), Opportunity Card (Chancenkarte), work visas, aur embassy interview coaching!'
    },
    {
      q: 'Will this prepare me for the official Goethe-Institut or TELC exam?',
      a: 'Yes! The curriculum strictly follows the Common European Framework of Reference for Languages (CEFR). Each level includes official Goethe and TELC mock exam drills covering Hören (Listening), Lesen (Reading), Schreiben (Writing), and Sprechen (Speaking).'
    },
    {
      q: 'What if I miss a live Zoom lecture?',
      a: 'All lecture notes, whiteboard summaries, audio recordings, and vocabulary lists are shared in your official batch WhatsApp group after every session so you never fall behind.'
    }
  ];

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-white border-b border-stone-200 text-stone-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-3.5 py-1 rounded-full border border-amber-300 mb-3 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-950 tracking-tight">
            Common Questions Answered
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            Clear facts regarding admissions, Zoom schedules, CEFR certification, and Germany relocation support.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-amber-50/40 border-amber-300 shadow-sm'
                    : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm sm:text-base text-stone-950 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center shrink-0 text-stone-500 shadow-2xs">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-amber-700" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/60 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
