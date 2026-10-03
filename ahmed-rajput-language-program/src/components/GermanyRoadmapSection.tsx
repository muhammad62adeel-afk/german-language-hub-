import React from 'react';
import { BookOpen, Award, GraduationCap, Building2, PlaneTakeoff, ChevronRight, Compass } from 'lucide-react';

export const GermanyRoadmapSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'A1 to B2 Language Cohorts',
      desc: 'Join our structured live Zoom cohorts. Build German vocabulary, grammar, phonetics, and fluent conversational competence.',
      badge: 'Step 1 • Active',
      icon: BookOpen,
      iconColor: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    {
      num: '02',
      title: 'Goethe & TELC Examination',
      desc: 'Pass international CEFR testing at Goethe-Institut or certified testing centers to obtain recognized visa certificates.',
      badge: 'Step 2 • Certificate',
      icon: Award,
      iconColor: 'bg-red-100 text-red-800 border-red-300'
    },
    {
      num: '03',
      title: 'APS & University / Ausbildung',
      desc: 'Submit verified credentials to tuition-free state universities or secured paid vocational training programs (€1,000+/mo).',
      badge: 'Step 3 • Application',
      icon: GraduationCap,
      iconColor: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    {
      num: '04',
      title: 'Visa Filing & Sperrkonto',
      desc: 'Setup digital blocked account and complete official German Embassy appointment with full documentation review.',
      badge: 'Step 4 • Embassy',
      icon: Building2,
      iconColor: 'bg-purple-100 text-purple-800 border-purple-300'
    },
    {
      num: '05',
      title: 'Arrival in Germany: Career & Life',
      desc: 'Touchdown in Berlin, Frankfurt, or Munich. Register address (Anmeldung), and launch your European engineering or healthcare career.',
      badge: 'Step 5 • Welcome',
      icon: PlaneTakeoff,
      iconColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    }
  ];

  return (
    <section id="roadmap" className="py-16 sm:py-24 bg-white border-b border-stone-200 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-950 text-xs font-bold mb-3 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>DIRECT EUROPEAN MIGRATION PATHWAY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-950 tracking-tight">
            5-Stage Trajectory to Living in Germany
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600">
            From absolute beginner to stepping off the high-speed train in Frankfurt, Berlin, or Munich.
          </p>
        </div>

        {/* Feature Hero Card with Skyline Image */}
        <div className="mb-10 rounded-3xl overflow-hidden border border-stone-200 shadow-md relative">
          <img
            src="/src/assets/images/futuristic_germany_skyline_1790956143072.jpg"
            alt="German Skyline"
            className="w-full h-56 sm:h-72 md:h-80 object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/70 to-transparent flex items-center p-6 sm:p-10">
            <div className="max-w-xl text-left">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider">
                Destination: Federal Republic of Germany
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 leading-snug">
                High Quality of Life, Free Tuition & Global Engineering Careers
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 mt-2 leading-relaxed">
                Germany welcomes over 400,000 skilled professionals and students every year. Ahmed Rajput’s program equips you with the single most vital key: German language fluency.
              </p>
            </div>
          </div>
        </div>

        {/* 5-Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                className="bg-stone-50 hover:bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-stone-400">
                      PHASE {st.num}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-200 text-stone-800">
                      {st.badge}
                    </span>
                  </div>

                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 border shadow-xs ${st.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-stone-950 group-hover:text-red-600 transition-colors">
                    {st.title}
                  </h3>

                  <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Stage {i + 1} of 5</span>
                  {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-red-600 transition-colors" />}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
