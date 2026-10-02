import React from 'react';
import { BookOpen, Award, GraduationCap, Building2, PlaneTakeoff, ChevronRight } from 'lucide-react';

export const GermanyRoadmapSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Learn German A1 to B2',
      desc: 'Enroll in our structured batches. Build vocabulary, phonics, grammar, and daily conversational skills.',
      badge: 'Current Step',
      icon: BookOpen,
      color: 'bg-amber-100 text-amber-800'
    },
    {
      num: '02',
      title: 'Goethe / TELC Certification',
      desc: 'Appear for the official exam at Goethe-Institut (Lahore/Karachi) or registered testing centers.',
      badge: 'Exam Stage',
      icon: Award,
      color: 'bg-red-100 text-red-800'
    },
    {
      num: '03',
      title: 'APS & University / Ausbildung Apply',
      desc: 'Get your APS certificate and submit applications to tuition-free German state universities or Ausbildung employers.',
      badge: 'Application',
      icon: GraduationCap,
      color: 'bg-stone-100 text-stone-800'
    },
    {
      num: '04',
      title: 'Blocked Account & Visa Interview',
      desc: 'Open your Sperrkonto (Expatrio / Coracle / Fintiba) and attend your German Embassy visa appointment.',
      badge: 'Visa Filing',
      icon: Building2,
      color: 'bg-emerald-100 text-emerald-800'
    },
    {
      num: '05',
      title: 'Flight to Germany & Welcome',
      desc: 'Land in Germany, register your address (Anmeldung), and start your new life in Europe.',
      badge: 'Success',
      icon: PlaneTakeoff,
      color: 'bg-blue-100 text-blue-800'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-500 bg-white px-3 py-1 rounded-full border border-stone-200">
            Proven Roadmap
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-950 mt-2 tracking-tight">
            Your 5-Step Path to Living in Germany
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            From zero German to stepping off the plane in Frankfurt, Munich, or Berlin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs flex flex-col justify-between relative group hover:border-stone-900 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-stone-400 font-mono">
                      {st.num}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${st.color}`}>
                      {st.badge}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-900 mb-3 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-red-600" />
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-stone-950">
                    {st.title}
                  </h3>

                  <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1 text-[11px] font-semibold text-stone-400">
                  <span>Step {i + 1} of 5</span>
                  {i < steps.length - 1 && <ChevronRight className="w-3.5 h-3.5 ml-auto text-stone-300" />}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
