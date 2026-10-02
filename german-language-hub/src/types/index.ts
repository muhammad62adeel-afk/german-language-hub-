export type GermanLevel = 'A1' | 'A2' | 'B1' | 'B2';

export type CurrentLevel = 'No German / Beginner' | 'A1' | 'A2' | 'B1' | 'B2';

export type Gender = 'Male' | 'Female' | 'Prefer not to say';

export type LearningReason =
  | 'Study in Germany (Bachelor / Master Degree)'
  | 'Ausbildung (Vocational Training in Germany)'
  | 'Opportunity Card (Chancenkarte / Job Search)'
  | 'Work Visa / Job Offer (IT, Engineering, Healthcare)'
  | 'Spouse / Family Reunion Visa (Ehegattennachzug)'
  | 'Medical Residency / Nursing (Approbation)'
  | 'Personal Interest & Cultural Learning'
  | 'Other Reasons';

export type ClassTimeSlot =
  | 'Morning Batch (10:00 AM – 11:00 AM)'
  | 'Night Batch (9:00 PM – 10:00 PM)';

export type HighestEducation =
  | 'Matric'
  | 'Intermediate'
  | 'Diploma'
  | 'Bachelor'
  | 'Master'
  | 'Other';

export interface StudentRegistration {
  id: string;
  fullName: string;
  age: number;
  gender: Gender;
  whatsappNumber: string;
  country: string;
  city: string;
  highestEducation?: HighestEducation | string;
  currentLevel: CurrentLevel;
  targetLevel: GermanLevel;
  learningReason: LearningReason;
  classTimeSlot: ClassTimeSlot;
  createdAt: string;
  paymentStatus: 'pending' | 'submitted' | 'verified';
  transactionId?: string;
  notes?: string;
}

export interface CourseDetail {
  id: GermanLevel;
  code: string;
  title: string;
  subtitle: string;
  summary: string;
  suitableFor: string;
  durationWeeks: number;
  hoursPerWeek: number;
  targetVocabulary: number;
  modules: string[];
  keyGrammar: string[];
  examReadiness: string;
  accentColor: string;
}
