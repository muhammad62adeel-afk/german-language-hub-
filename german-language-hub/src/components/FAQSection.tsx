import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the PKR 5,000 registration fee for?',
      a: 'The PKR 5,000 is a one-time fee per level that covers lifetime portal access, digital grammar PDF books, vocabulary flashcard sets, interactive homework review, and maintenance of our batch server infrastructure. Ahmed Rajput sponsors the core teaching curriculum so that students do not have to pay typical commercial fees of PKR 40,000+ per level.'
    },
    {
      q: 'Classes kis app par hongi aur class ke timings kya hain?',
      a: 'Classes Zoom App par live conduct ki jati hain. Har student ke liye daily 2 time slots available hain: (1) Suba 10:00 AM to 11:00 AM (Morning Batch) aur (2) Raat 9:00 PM to 10:00 PM (Night Batch). Registration form fill karte waqt aap apni sahulat ke mutabiq koi 1 time slot select kar sakte hain. Zoom meeting link aur daily lecture password aapke registered mobile contact par provide kiya jata hai.'
    },
    {
      q: 'How will I attend the classes and practice sessions?',
      a: 'All live interactive lectures are conducted exclusively on the Zoom App. You have the choice between two batch timings: Morning (10:00 AM – 11:00 AM PKT) or Night (09:00 PM – 10:00 PM PKT). You can attend comfortably from your smartphone or laptop.'
    },
    {
      q: 'What if I miss a live class?',
      a: 'All lecture recordings, whiteboard notes, and vocabulary lists are uploaded to the student portal within 3 hours after every session, allowing you to catch up easily on your mobile phone.'
    },
    {
      q: 'Will this prepare me for the official Goethe-Institut or TELC exam?',
      a: 'Yes! The curriculum strictly follows the Common European Framework of Reference for Languages (CEFR). Each level includes official Goethe and TELC mock exam practice drills covering all four modules: Hören (Listening), Lesen (Reading), Schreiben (Writing), and Sprechen (Speaking).'
    },
    {
      q: 'I need German A1 for German Embassy Spouse Visa. Is this sufficient?',
      a: 'Absolutely. Level A1 is tailored specifically to the requirements of the German Embassy "Start Deutsch 1" exam for family reunion and spouse visas. Many of our students have cleared Goethe A1 on their first attempt.'
    },
    {
      q: 'Which level is required for Ausbildung or German Master’s degrees?',
      a: 'For Ausbildung (vocational training), most employers require B1 or B2. For English-taught Master’s degrees, German A1 or A2 is recommended for daily living, while German-taught Master’s programs require B2 or TestDaF.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-700 bg-stone-100 px-3 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Clear answers about admissions, fees, batch schedules, and Goethe certification.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-stone-200 rounded-2xl overflow-hidden bg-stone-50/50 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-stone-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-100/80 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-red-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3 animate-in fade-in">
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
