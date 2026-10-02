import { CourseDetail, GermanLevel } from '../types';

export const COURSES_DATA: Record<GermanLevel, CourseDetail> = {
  A1: {
    id: 'A1',
    code: 'GER-A1',
    title: 'A1 — Beginner',
    subtitle: 'For students starting German from zero.',
    summary: 'Master the fundamentals of the German language. Learn pronunciation, everyday greetings, basic dialogues, and build strong confidence from scratch.',
    suitableFor: 'Complete beginners with no prior knowledge of German. Perfect for spouse visa applicants, new students, and those exploring German studies.',
    durationWeeks: 8,
    hoursPerWeek: 6,
    targetVocabulary: 650,
    modules: [
      'Alphabet, Phonics & German Pronunciation rules',
      'Personal introductions, origins, professions & family',
      'Daily routines, numbers, time & shopping for groceries',
      'Ordering in cafes & restaurants, traditional German food',
      'Home, apartments, furniture & basic directions in a city',
      'Goethe-Zertifikat A1: Hören, Lesen, Schreiben, Sprechen format'
    ],
    keyGrammar: [
      'Articles (der, die, das) & Plural forms',
      'Nominative & Accusative cases',
      'Verb conjugation in Present tense (Präsens)',
      'Modal verbs: können, müssen, möchten',
      'Sentence structure: W-Fragen & Ja/Nein questions'
    ],
    examReadiness: 'Prepares you for the Goethe-Zertifikat A1: Start Deutsch 1 (Embassy Spouse Visa & initial university requirement).',
    accentColor: 'border-amber-500/80 bg-amber-500/5 text-amber-600'
  },
  A2: {
    id: 'A2',
    code: 'GER-A2',
    title: 'A2 — Elementary',
    subtitle: 'For students who already understand basic German.',
    summary: 'Expand your practical conversational skills. Communicate in standard situations, talk about past experiences, describe surroundings, and write simple letters.',
    suitableFor: 'Students who completed A1 or studied basic German and want to bridge toward fluent conversational competence.',
    durationWeeks: 8,
    hoursPerWeek: 6,
    targetVocabulary: 1300,
    modules: [
      'Travel, transport, booking train tickets (Deutsche Bahn) & hotels',
      'Health, doctors appointments & describing bodily symptoms',
      'Work environment, office tasks & sending formal emails',
      'Festivals, German culture, weather & vacation planning',
      'Media, news snippets, advertisements & social life',
      'Goethe / TELC A2 mock exams & audio listening drills'
    ],
    keyGrammar: [
      'Dative case & Dative prepositions (aus, bei, mit, nach, von, zu)',
      'Past tense: Perfekt with haben & sein',
      'Simple past (Präteritum) of sein, haben & modal verbs',
      'Reflexive verbs & personal pronouns in Accusative/Dative',
      'Subordinate clauses with "weil", "dass", "wenn"'
    ],
    examReadiness: 'Prepares you for Goethe-Zertifikat A2 / TELC Deutsch A2 (Required for student visa prep & everyday survival).',
    accentColor: 'border-red-600/80 bg-red-600/5 text-red-600'
  },
  B1: {
    id: 'B1',
    code: 'GER-B1',
    title: 'B1 — Intermediate',
    subtitle: 'For students who want to improve communication and everyday German.',
    summary: 'Achieve true independence in German. Understand main points of clear standard input, express opinions, formulate arguments, and handle almost all situations while travelling or living in Germany.',
    suitableFor: 'Students aiming for Ausbildung in Germany, Opportunity Card (Chancenkarte), German university admissions, and solid career readiness.',
    durationWeeks: 10,
    hoursPerWeek: 8,
    targetVocabulary: 2600,
    modules: [
      'Education systems, vocational paths (Ausbildung) & university life',
      'German workplace etiquette, job interviews & formal CV (Lebenslauf)',
      'Environmental issues, technology & global themes',
      'Expressing hopes, dreams, complaints & giving diplomatic feedback',
      'Full B1 Goethe / TELC 4-module simulated testing and scoring'
    ],
    keyGrammar: [
      'Genitive case & Two-way prepositions (Wechselpräpositionen)',
      'Subjunctive II (Konjunktiv II) for politeness, wishes & hypothetical scenarios',
      'Passive voice (Passiv Präsens & Präteritum)',
      'Relative clauses (Relativsätze) in all cases',
      'Conjunctions & Connectors: obwohl, trotzdem, entweder...oder'
    ],
    examReadiness: 'Prepares you for Goethe-Zertifikat B1 / TELC B1 (Official benchmark for German Citizenship, Ausbildung, & Chancenkarte).',
    accentColor: 'border-stone-900 bg-stone-900/5 text-stone-900'
  },
  B2: {
    id: 'B2',
    code: 'GER-B2',
    title: 'B2 — Upper Intermediate',
    subtitle: 'For students who want stronger German communication and advanced language skills.',
    summary: 'Attain high-level proficiency for academic and professional environments. Understand complex texts on concrete and abstract topics, interact with native speakers fluently, and produce clear, detailed arguments.',
    suitableFor: 'Software Engineers, Doctors, Nurses, Engineers, and Master students aiming for German-taught programs or direct corporate jobs in Germany.',
    durationWeeks: 12,
    hoursPerWeek: 8,
    targetVocabulary: 4200,
    modules: [
      'Advanced professional discussions & technical presentations',
      'Scientific articles, analytical essays & academic debates',
      'Nuanced idioms, colloquial expressions & regional accents',
      'Negotiations, corporate disputes & contract vocabulary',
      'Intensive Goethe / TELC B2 full-length timed mock exams'
    ],
    keyGrammar: [
      'Advanced passive constructions (Passiversatzformen & Zustandspassiv)',
      'Noun-Verb combinations (Nomen-Verb-Verbindungen)',
      'Subjunctive I (Konjunktiv I) for indirect speech & formal press',
      'Participle constructions & nominalization styles',
      'Complex multi-part connectors (je...desto, zwar...aber, sowohl...als auch)'
    ],
    examReadiness: 'Prepares you for Goethe-Zertifikat B2 / TELC B2 / TestDaF entry (Required for professional licensing, healthcare approbation & German university admission).',
    accentColor: 'border-amber-600 bg-amber-600/5 text-amber-700'
  }
};

export const LEARNING_REASONS = [
  'Study in Germany (Bachelor / Master Degree)',
  'Ausbildung (Vocational Training in Germany)',
  'Opportunity Card (Chancenkarte / Job Search)',
  'Work Visa / Job Offer (IT, Engineering, Healthcare)',
  'Spouse / Family Reunion Visa (Ehegattennachzug)',
  'Medical Residency / Nursing (Approbation)',
  'Personal Interest & Cultural Learning',
  'Other Reasons'
] as const;

export const PAKISTAN_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Gujranwala',
  'Sialkot',
  'Quetta',
  'Sargodha',
  'Bahawalpur',
  'Hyderabad',
  'Gujrat',
  'Abbottabad',
  'Wah Cantt',
  'Other City'
];
