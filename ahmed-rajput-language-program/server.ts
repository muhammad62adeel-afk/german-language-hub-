import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// System Instruction for German Learning Counselor AI Bot
const AI_SYSTEM_INSTRUCTION = `You are "Ahmed Rajput Language Program AI Guide" (Ahmed Rajput Language Program Assistant), a warm, positive, friendly, and motivating counselor and guide for students.
Website: Ahmed Rajput Language Program
Program Sponsor: Ahmed Rajput (Software Engineer based in Germany).

CRITICAL LANGUAGE RULE:
- If the user asks in English (e.g. "What is the duration?", "How do classes work?", "Is it free?"), you MUST reply 100% in English!
- If the user asks in Roman Urdu (e.g. "Kitne mahine ka course hai?", "Zoom class kaise hoti hai?", "Kya fees hai?"), you MUST reply in natural, friendly Roman Urdu!
- If the user asks in Urdu script (e.g. "کلاسز کیسے ہوتی ہیں؟"), you MUST reply in Urdu script!
- Always be encouraging, polite, and directly answer their specific question.

Knowledge Base (STRICT RULES TO FOLLOW):
1. Course Durations:
   - Level A1: 2 Months (Beginner - Alphabets, greetings, numbers, basic daily sentences)
   - Level A2: 2 Months (Elementary - Routine tasks, family, shopping, work conversations)
   - Level B1: 3 Months (Intermediate - Independent speaker, job/study visa requirement, Goethe/TELC B1 prep)
   - Level B2: 3 Months (Upper-Intermediate - Professional fluency, German workplace, medical/engineering, Ausbildung & university)
   - Total roadmap: 10 months to complete professional German fluency!

2. Live Zoom App Classes & How they work:
   - All classes are held 100% LIVE on the Zoom App.
   - Interactive teaching: Teachers share their screens, display official course books and slides. Students can unmute their microphones to speak German live, ask direct questions, participate in breakout group dialogues, and get immediate pronunciation corrections.
   - Batch Times:
     * Morning Batch: 10:00 AM – 11:00 AM (PKT)
     * Night Batch: 09:00 PM – 10:00 PM (PKT)
   - WhatsApp groups provide daily class notes, homework, audio recordings, and instant teacher support.

3. Dedicated Qualified Teachers & Huge Benefits ("Idr Teacher Raka Ha"):
   - Qualified, certified, and experienced German language instructors are specially hired to teach students systematically.
   - Huge Benefit: Market me yehi courses Rs. 30,000 - 60,000+ per level charge kiye jaate hain, jabke yahan Ahmed Rajput ki taraf se 100% Free hain! Students ko professional teacher ka direct access milta hai.

4. Special Germany Relocation & Visa Support for Talented Students:
   - "Agar aap talented, dedicated aur mehnati hain, toh Ahmed Rajput aur unki professional team aapko Germany aane me poori support karegi!"
   - Support areas include:
     * Free Tuition Public University Admissions in Germany (Bachelors & Masters)
     * Ausbildung (Paid vocational training with monthly stipend ~€1,000+ per month)
     * Opportunity Card (Chancenkarte job seeker visa)
     * Direct Work Visas (IT, Engineers, Healthcare & Nurses)
     * German format CV / Lebenslauf and Motivation Letter drafting
     * Embassy visa interview preparation

5. 100% Free Registration:
   - Open to anyone from any country (Pakistan, India, UAE, Saudi Arabia, Gulf, Europe, etc.).
   - Just fill out the quick form on the homepage and submit.`;

function generateSmartBilingualReply(userMessage: string): string {
  const query = userMessage.toLowerCase().trim();

  // Detect if query is English
  const englishWords = [
    'what', 'how', 'when', 'why', 'where', 'who', 'which', 'is', 'are', 'can', 'do', 'does',
    'duration', 'time', 'timing', 'schedule', 'class', 'classes', 'teacher', 'teachers',
    'free', 'cost', 'fee', 'fees', 'money', 'register', 'apply', 'registration', 'germany',
    'support', 'visa', 'job', 'work', 'study', 'university', 'ausbildung', 'opportunity',
    'certificate', 'exam', 'hello', 'hi', 'hey', 'good morning', 'good evening', 'thank',
    'thanks', 'tell me', 'information', 'detail', 'details', 'beginner', 'learn', 'month', 'months'
  ];
  
  const urduWords = [
    'kya', 'kia', 'kaise', 'kese', 'kaisa', 'kis', 'kab', 'kyun', 'kion', 'kitna', 'kitne',
    'kitta', 'mahina', 'mahine', 'maheene', 'waqt', 'class', 'parhai', 'parhate', 'ustad',
    'sir', 'teacher', 'paisa', 'paise', 'fees', 'muft', 'free', 'faida', 'fyda', 'seekhna',
    'karna', 'hoga', 'hogi', 'aana', 'jana', 'support', 'madad', 'team', 'ahmed', 'rajput',
    'salam', 'assalam', 'aoa', 'kuch', 'batao', 'batayein', 'bataen', 'btain', 'shuru'
  ];

  let englishScore = 0;
  let urduScore = 0;

  for (const w of englishWords) {
    if (new RegExp(`\\b${w}\\b`, 'i').test(query)) englishScore++;
  }
  for (const w of urduWords) {
    if (new RegExp(`\\b${w}\\b`, 'i').test(query)) urduScore++;
  }

  const isEnglish = englishScore > urduScore || (englishScore > 0 && urduScore === 0);

  // 1. Duration / Levels Question
  if (
    query.includes('duration') || query.includes('time') || query.includes('month') ||
    query.includes('kitna') || query.includes('kitta') || query.includes('mahine') ||
    query.includes('how long') || query.includes('period') || query.includes('levels')
  ) {
    if (isEnglish) {
      return `🇩🇪 **German Course Levels & Exact Durations:**\n\n• **Level A1:** 2 Months (Beginner - alphabet, greetings, numbers, daily basics)\n• **Level A2:** 2 Months (Elementary - everyday conversations, family, shopping)\n• **Level B1:** 3 Months (Intermediate - independent speaking, visa & job requirement)\n• **Level B2:** 3 Months (Professional Fluency - workplace, Ausbildung & university)\n\n✨ **Total Duration:** In just **10 months**, you can go from zero to fluent! All classes are 100% Free on Zoom. You can register anytime on the website.`;
    }
    return `🇩🇪 **German Course Levels Aur Unka Duration:**\n\n• **Level A1:** 2 Mahine (Shuruati buniyaad, daily introduction, basic sentences)\n• **Level A2:** 2 Mahine (Rozmarrah ki guftagu, shopping, basic grammar)\n• **Level B1:** 3 Mahine (Visa aur job requirement, independent German speaking)\n• **Level B2:** 3 Mahine (Professional fluency, Ausbildung aur university admission)\n\n✨ **Total Duration:** Sirf **10 mahine** me aap zero se professional fluent ban saktay hain! Classes 100% Free Zoom app par hoti hain. Abhi website form se register karein!`;
  }

  // 2. Zoom Classes / How do classes work?
  if (
    query.includes('zoom') || query.includes('kaise hoti') || query.includes('kese hoti') ||
    query.includes('how does') || query.includes('how class') || query.includes('online class') ||
    query.includes('conduct') || query.includes('format') || query.includes('live')
  ) {
    if (isEnglish) {
      return `💻 **How Live Zoom Classes Work:**\n\n• **100% Live on Zoom:** Certified teachers share their screen, slides, and standard books live.\n• **Interactive Speaking:** You can unmute your microphone to practice speaking German directly with the teacher and classmates.\n• **Two Flexible Daily Batches:**\n  ☀️ **Morning Batch:** 10:00 AM – 11:00 AM (PKT)\n  🌙 **Night Batch:** 09:00 PM – 10:00 PM (PKT)\n• **WhatsApp Support:** Lecture materials, recordings, homework, and notes are provided in dedicated WhatsApp groups so you never miss a lesson!`;
    }
    return `💻 **Zoom App Live Classes Ka Tariqa:**\n\n• **100% Live Zoom App:** Classes Zoom par live hoti hain jahan teacher screen share kar ke standard German books aur grammar sikhate hain.\n• **Live Speaking Practice:** Aap apna mic on kar ke direct teacher ke sath German bolne ki practice karte hain aur sawalat pooch saktay hain.\n• **2 Flexible Batches:**\n  ☀️ **Morning Batch:** 10:00 AM – 11:00 AM (PKT)\n  🌙 **Night Batch:** 09:00 PM – 10:00 PM (PKT)\n• **WhatsApp Support:** Har batch ke WhatsApp group me notes, homework aur lecture guidelines share ki jaati hain!`;
  }

  // 3. Batch Timings / Schedule
  if (query.includes('timing') || query.includes('schedule') || query.includes('time table') || query.includes('waqt') || query.includes('kab hoti') || query.includes('batches')) {
    if (isEnglish) {
      return `⏰ **Class Timings & Batches:**\n\nWe offer two daily live batches on the Zoom app:\n\n1. ☀️ **Morning Batch:** 10:00 AM – 11:00 AM (Pakistan Standard Time)\n2. 🌙 **Night Batch:** 09:00 PM – 10:00 PM (Pakistan Standard Time)\n\nYou can choose whichever batch fits your daily schedule when filling out the free registration form on this website!`;
    }
    return `⏰ **Class Ke Timings Aur Batches:**\n\nZoom app par rozaana 2 batches hote hain:\n\n1. ☀️ **Morning Batch (Subha):** 10:00 AM – 11:00 AM (PKT)\n2. 🌙 **Night Batch (Raat):** 09:00 PM – 10:00 PM (PKT)\n\nAap registration form bharte waqt apni marzi ka koi bhi 1 batch select kar saktay hain!`;
  }

  // 4. Dedicated Teachers & Huge Benefits ("Idr teacher raka ha")
  if (
    query.includes('teacher') || query.includes('teachers') || query.includes('instructor') ||
    query.includes('ustad') || query.includes('sir') || query.includes('kon parhata') ||
    query.includes('who teaches') || query.includes('faida') || query.includes('fyda') || query.includes('benefit')
  ) {
    if (isEnglish) {
      return `👨‍🏫 **Qualified Teachers & Great Benefits:**\n\n• **Dedicated Hired Instructors:** We have specially hired qualified, certified, and experienced German language teachers to teach students step-by-step.\n• **Massive Benefit:** In private academies, A1 through B2 courses cost tens of thousands of rupees. Here, sponsored by Ahmed Rajput, everything is **100% Free**!\n• **Personalized Guidance:** Teachers correct your pronunciation, give direct feedback, and prepare you thoroughly for international Goethe & TELC examinations!`;
    }
    return `👨‍🏫 **Dedicated Teachers Aur Bada Faida (Idr Teacher Raka Ha):**\n\n• **Qualified Teachers:** Hum ne specially certified aur experienced German teachers hire kiye huay hain jo aapko zero se aakhir tak step-by-step sikhate hain.\n• **Bohat Bada Faida:** Market me yehi courses Rs. 30,000 se 60,000+ ke hotay hain, jabke yahan Ahmed Rajput ki taraf se **100% Free** hain!\n• **Direct Attention:** Teacher aapki pronunciation theek karate hain aur Goethe / TELC exams ki mukammal tayyari karwayi jaati hai!`;
  }

  // 5. Germany Support / Talented Students Relocation & Visa Support
  if (
    query.includes('germany') || query.includes('support') || query.includes('talent') ||
    query.includes('visa') || query.includes('ausbildung') || query.includes('job') ||
    query.includes('chancenkarte') || query.includes('study') || query.includes('help')
  ) {
    if (isEnglish) {
      return `🚀 **Team Germany Support for Talented Students:**\n\nYes, absolutely! If you are dedicated, hardworking, and talented, **Ahmed Rajput and his team will fully support your relocation to Germany**!\n\n**Support Areas Include:**\n1. 🎓 **Study in Germany:** Guidance for tuition-free public university admissions (Bachelors & Masters).\n2. 💼 **Ausbildung:** Paid vocational training with a monthly stipend of ~€1,000+.\n3. 🛂 **Opportunity Card (Chancenkarte):** Job search visa pathways.\n4. 🩺 **Work Visas:** Direct opportunities for IT, Engineers, Nurses, and Healthcare professionals.\n5. 📄 **CV & Interview Prep:** Europass German CV formatting and Embassy interview coaching!\n\nLearn German diligently, and our team will guide your way to Germany! ✨`;
    }
    return `🚀 **Talented Students Ke Liye Germany Support:**\n\nBilkul! Agar aap mehnati aur talented hain, toh **Ahmed Rajput aur unki professional team aapko Germany aane me poori support karegi**:\n\n1. 🎓 **Study in Germany:** Tuition-free public universities me admission guidance.\n2. 💼 **Ausbildung:** Paid vocational training jisme har mahine ~€1,000+ stipend milta hai.\n3. 🛂 **Opportunity Card (Chancenkarte):** Job search visa guidance.\n4. 🩺 **Work Visas:** IT, Engineers, aur Nurses/Healthcare ke liye work visa support.\n5. 📄 **CV & Embassy Prep:** German format CV aur visa interview coaching!\n\nAap mehnat se German seekhein, Germany aane ka rasta hamari team guide karegi! ✨`;
  }

  // 6. Free of Cost / Fees / Charges
  if (
    query.includes('free') || query.includes('fee') || query.includes('fees') ||
    query.includes('cost') || query.includes('price') || query.includes('charge') ||
    query.includes('paisa') || query.includes('paise') || query.includes('kitne paise')
  ) {
    if (isEnglish) {
      return `🎉 **100% Free of Cost! No Hidden Fees:**\n\nThis entire German language program (A1, A2, B1, B2) is **completely free of cost**. It is a social community initiative fully sponsored by **Ahmed Rajput**, a Software Engineer living and working in Germany.\n\nYou do NOT have to pay any admission or tuition fee. Simply fill out the registration form on our website to get your Zoom batch link!`;
    }
    return `🎉 **100% Bilkul Free! Koi Fees Nahi:**\n\nYeh mukammal German Language Program (A1, A2, B1, B2) **bilkul 100% Free** hai. Koi admission fee ya monthly charges nahi hain. Yeh program **Ahmed Rajput** (Software Engineer in Germany) ki taraf se bilkul muft sponsor kiya gaya hai.\n\nAap abhi website par form fill karein aur foran apna free Zoom batch access hasil karein!`;
  }

  // 7. How to Register / Join / Apply
  if (
    query.includes('register') || query.includes('join') || query.includes('apply') ||
    query.includes('admission') || query.includes('enroll') || query.includes('dakhla') ||
    query.includes('kaise join') || query.includes('how to join')
  ) {
    if (isEnglish) {
      return `📝 **How to Register in 3 Simple Steps:**\n\n1. Scroll to the **Registration Form** on this website.\n2. Enter your Name, WhatsApp number, City, and select your Target Level (A1, A2, B1, or B2).\n3. Pick your preferred Zoom batch time (Morning 10 AM or Night 9 PM) and click **Submit Registration**.\n\nYou will receive immediate confirmation and access to your official WhatsApp class group!`;
    }
    return `📝 **Register Karne Ka Asaan Tariqa:**\n\n1. Website par thora niche scroll kar ke **Registration Form** par jayein.\n2. Apna Name, WhatsApp number, City enter karein aur apna German Level (A1, A2, B1, B2) chunein.\n3. Apni pasand ka Zoom Batch (Morning 10 AM ya Night 9 PM) select kar ke **Register** dabayein.\n\nAapko foran registration ID mil jayegi aur class WhatsApp group me add kar diya jayega!`;
  }

  // 8. Beginner / New Student / Zero knowledge
  if (query.includes('beginner') || query.includes('zero') || query.includes('shuru') || query.includes('start') || query.includes('kuch nahi aata') || query.includes('new student')) {
    if (isEnglish) {
      return `🌱 **Start with Level A1 (No Prior German Needed):**\n\nIf you have never studied German before, don't worry at all! You should enroll in **Level A1**. Our certified teachers start from absolute scratch: the German alphabet, basic sounds, pronunciation, and simple daily conversation.\n\nIn just 2 months of A1, you will be able to introduce yourself, read basic signs, and talk about everyday things!`;
    }
    return `🌱 **Level A1 Se Start Karein (Pehle Kuch Aana Zaroori Nahi):**\n\nAgar aapne pehle kabhi German nahi parhi toh bilkul fikar na karein! Aap **Level A1** me enroll hon. Hamare qualified teachers bilkul zero se sikhate hain: alphabets, greetings, numbers aur aasan daily sentences.\n\n2 mahine me aapka A1 complete ho jayega aur aap confidently buniyaadi German bolna seekh jayenge!`;
  }

  // 9. Greetings
  if (query.includes('hello') || query.includes('hi') || query.includes('salam') || query.includes('aoa') || query.includes('hey') || query.includes('guten tag')) {
    if (isEnglish) {
      return `Guten Tag! Hello! 🇩🇪\n\nWelcome to the **Ahmed Rajput German Language Program**! I am your AI Guide.\n\n• **Course Durations:** A1 (2 Months), A2 (2 Months), B1 (3 Months), B2 (3 Months).\n• **Classes:** 100% Free live on Zoom App (Morning 10 AM & Night 9 PM).\n• **Germany Support:** Our team supports talented students for study, Ausbildung, and visas in Germany!\n\nHow can I help you today? Feel free to ask any question in English or Roman Urdu! ✨`;
    }
    return `Guten Tag! Assalam-o-Alaikum! 🇩🇪\n\n**Ahmed Rajput German Language Program** me khushamdeed! Main aapka AI Guide hoon.\n\n• **Course Durations:** A1 (2 Mahine), A2 (2 Mahine), B1 (3 Mahine), B2 (3 Mahine).\n• **Classes:** Zoom App par live hoti hain (Morning 10 AM aur Night 9 PM).\n• **Idr Teacher Raka Ha:** Qualified instructors live sikhate hain aur yeh 100% Free hai!\n• **Germany Support:** Talented students ko team Germany aane me poori support karti hai.\n\nAap kis cheez ke baare me janna chahte hain? ✨`;
  }

  // Default Fallback
  if (isEnglish) {
    return `Great question! 🇩🇪\n\nIn the **Ahmed Rajput German Language Program**:\n• **Course Durations:** A1 (2 Months), A2 (2 Months), B1 (3 Months), B2 (3 Months) — 10 months total to complete fluency.\n• **Classes:** Held live on Zoom with certified teachers, screen sharing, and live mic speaking practice.\n• **Timings:** Morning Batch (10:00 AM – 11:00 AM PKT) & Night Batch (09:00 PM – 10:00 PM PKT).\n• **Germany Support:** Hardworking and talented students receive complete support from Ahmed Rajput's team for German university admissions, Ausbildung, and visas!\n• **Cost:** 100% Free of charge.\n\nWould you like more details on a specific level, or help registering? ✨`;
  }

  return `Bohat acha sawal hai! 🇩🇪\n\n**Ahmed Rajput German Language Program** me:\n• **Course Durations:** A1 (2 Mahine), A2 (2 Mahine), B1 (3 Mahine), B2 (3 Mahine) — total 10 mahine me full fluency.\n• **Classes:** Zoom app par live conduct hoti hain, teacher screen share kar ke live bolna sikhate hain.\n• **Timings:** Subha 10:00 AM – 11:00 AM aur Raat 09:00 PM – 10:00 PM.\n• **Teachers:** Dedicated certified teachers hired hain jo har student ko step-by-step guide karte hain.\n• **Germany Support:** Agar aap talented hain toh Ahmed Rajput aur unki team aapko Germany aane me poori support karegi (Study, Ausbildung, Chancenkarte, Work Visa)!\n• **Fees:** 100% Free hai.\n\nAap kisi specific level ya timing ke baare me mazeed pooch sakte hain! ✨`;
}

// Persistent database file path
const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.resolve(DATA_DIR, 'registrations.json');
const ANNOUNCEMENTS_FILE = path.resolve(DATA_DIR, 'announcements.json');
const GROUPS_FILE = path.resolve(DATA_DIR, 'groups.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Default initial community groups
const DEFAULT_GROUPS = [
  {
    id: 'grp-a1-morning-batch',
    title: 'German A1 - Morning Batch (10:00 AM – 11:00 AM)',
    link: 'https://chat.whatsapp.com/JdK89ExampleA1M',
    targetAudience: 'Yeh group un tamam registered students ke liye hai jinhone Morning Batch (10 AM to 11 AM) select kiya hai. Daily live Zoom meeting link, class slides, vocabulary lists aur homework yahin share kiya jata hai.',
    category: 'A1',
    platform: 'whatsapp',
    badge: 'Morning Slot (10 AM)',
    memberCountNote: 'Daily Zoom Links & Slides',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'grp-a1-night-batch',
    title: 'German A1 - Night Batch (09:00 PM – 10:00 PM)',
    link: 'https://chat.whatsapp.com/LpQ23ExampleA1N',
    targetAudience: 'Yeh group raat ke 09:00 PM to 10:00 PM batch ke students ke liye hai (Job holders aur university students). Daily evening Zoom lecture link aur recordings yahan aati hain.',
    category: 'A1',
    platform: 'whatsapp',
    badge: 'Night Slot (9 PM)',
    memberCountNote: 'Daily Zoom Links & Slides',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'grp-a2-b1-intermediate',
    title: 'German A2 & B1 - Intermediate Cohort',
    link: 'https://chat.whatsapp.com/MwX91ExampleA2B1',
    targetAudience: 'Un students ke liye jinhone A1 complete kar liya hai aur ab Goethe / TELC B1 certification ya professional fluency ke liye prepare kar rahe hain.',
    category: 'A2',
    platform: 'whatsapp',
    badge: 'Goethe / TELC Prep',
    memberCountNote: 'Exam Prep & Speaking Practice',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'grp-germany-study-chancenkarte',
    title: 'Germany Study Visa, Ausbildung & Chancenkarte Hub',
    link: 'https://chat.whatsapp.com/ZxY77ExampleReloc',
    targetAudience: 'Un sabhi students aur professionals ke liye jo Germany me Bachelor/Master, Ausbildung (Apprenticeship), ya Opportunity Card (Chancenkarte) par move hona chahte hain aur visa/document guidance chahte hain.',
    category: 'Germany Visa / Study',
    platform: 'whatsapp',
    badge: 'Relocation & Visa Mentorship',
    memberCountNote: 'Ahmed Rajput Guidance',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Helper to read groups from file
function getGroupsData(): any[] {
  try {
    if (fs.existsSync(GROUPS_FILE)) {
      const content = fs.readFileSync(GROUPS_FILE, 'utf-8');
      const parsed = JSON.parse(content || '[]');
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    fs.writeFileSync(GROUPS_FILE, JSON.stringify(DEFAULT_GROUPS, null, 2), 'utf-8');
    return DEFAULT_GROUPS;
  } catch (err) {
    console.error('Error reading groups from DB:', err);
    return DEFAULT_GROUPS;
  }
}

// Helper to save groups to file
function saveGroupsData(data: any[]): void {
  try {
    fs.writeFileSync(GROUPS_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving groups to DB:', err);
  }
}

// Default initial announcement
const DEFAULT_ANNOUNCEMENTS = [
  {
    id: 'ann-batch-oct15',
    title: '15 October New Batch Classes Start',
    description: 'Admissions open for German A1, A2, B1 & B2! Live interactive Zoom sessions with certified teachers. 100% free under Ahmed Rajput Language Program.',
    deadlineDate: '2026-10-15',
    posterImage: '',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Helper to read announcements from file
function getAnnouncementsData(): any[] {
  try {
    if (fs.existsSync(ANNOUNCEMENTS_FILE)) {
      const content = fs.readFileSync(ANNOUNCEMENTS_FILE, 'utf-8');
      const parsed = JSON.parse(content || '[]');
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    // Seed default
    fs.writeFileSync(ANNOUNCEMENTS_FILE, JSON.stringify(DEFAULT_ANNOUNCEMENTS, null, 2), 'utf-8');
    return DEFAULT_ANNOUNCEMENTS;
  } catch (err) {
    console.error('Error reading announcements from DB:', err);
    return DEFAULT_ANNOUNCEMENTS;
  }
}

// Helper to save announcements to file
function saveAnnouncementsData(data: any[]): void {
  try {
    fs.writeFileSync(ANNOUNCEMENTS_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving announcements to DB:', err);
  }
}

// Helper to read registrations from file
function getRegistrations(): any[] {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content || '[]');
    }
  } catch (err) {
    console.error('Error reading registrations from DB:', err);
  }
  return [];
}

// Helper to save registrations to file
function saveRegistrations(data: any[]): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving registrations to DB:', err);
  }
}

// Optional Supabase Sync if user configures SUPABASE_URL and SUPABASE_KEY in Vercel / env
async function syncToSupabase(record: any): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return; // Supabase not configured, skip
  }

  try {
    const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(record)
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      console.warn('Supabase sync notice:', res.status, errText);
    }
  } catch (err: any) {
    console.warn('Supabase sync skipped / network issue:', err?.message);
  }
}

// API: Verify Admin Password
app.post('/api/admin/verify', (req, res) => {
  const { password } = req.body || {};
  const expectedPassword = process.env.ADMIN_PASSWORD || 'admin0062';

  if (password === expectedPassword) {
    return res.status(200).json({ success: true, authenticated: true });
  }
  return res.status(401).json({ success: false, error: 'Incorrect admin password' });
});

// API: Get All Registrations
app.get('/api/registrations', (req, res) => {
  try {
    const list = getRegistrations();
    return res.status(200).json({
      success: true,
      totalCount: list.length,
      maxCapacity: 10000,
      registrations: list
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

// API: Delete Registration
app.delete('/api/registrations/:id', (req, res) => {
  try {
    const id = req.params.id;
    const list = getRegistrations();
    const updated = list.filter((item: any) => item.id !== id);
    saveRegistrations(updated);
    return res.status(200).json({ success: true, message: 'Registration deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to delete registration' });
  }
});

// API: Get All Announcements
app.get('/api/announcements', (req, res) => {
  try {
    const list = getAnnouncementsData();
    return res.status(200).json({
      success: true,
      announcements: list
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch announcements' });
  }
});

// API: Create or Update Announcement
app.post('/api/announcements', (req, res) => {
  try {
    const payload = req.body;
    const list = getAnnouncementsData();
    
    // Check if updating existing
    const existingIndex = list.findIndex((a) => a.id === payload.id);
    if (existingIndex >= 0) {
      list[existingIndex] = {
        ...list[existingIndex],
        ...payload,
        updatedAt: new Date().toISOString()
      };
    } else {
      const newAnn = {
        id: payload.id || `ann-${Date.now()}`,
        title: payload.title || 'New Batch Announcement',
        description: payload.description || '',
        deadlineDate: payload.deadlineDate || '',
        posterImage: payload.posterImage || '',
        isActive: payload.isActive ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      list.unshift(newAnn);
    }

    saveAnnouncementsData(list);
    return res.status(200).json({ success: true, announcements: list });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to save announcement' });
  }
});

// API: Delete Announcement
app.delete('/api/announcements/:id', (req, res) => {
  try {
    const id = req.params.id;
    const list = getAnnouncementsData();
    const filtered = list.filter((a) => a.id !== id);
    saveAnnouncementsData(filtered);
    return res.status(200).json({ success: true, announcements: filtered });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to delete announcement' });
  }
});

// API: Get All Community / WhatsApp Groups
app.get('/api/groups', (req, res) => {
  try {
    const list = getGroupsData();
    return res.status(200).json({
      success: true,
      groups: list
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch community groups' });
  }
});

// API: Create or Update Community / WhatsApp Group
app.post('/api/groups', (req, res) => {
  try {
    const payload = req.body;
    if (!payload.title || !payload.link || !payload.targetAudience) {
      return res.status(400).json({ error: 'Title, group link, and target audience (Group kis ke liye hai) are required.' });
    }

    const list = getGroupsData();
    const existingIndex = list.findIndex((g: any) => g.id === payload.id);

    if (existingIndex >= 0) {
      list[existingIndex] = {
        ...list[existingIndex],
        ...payload,
        updatedAt: new Date().toISOString()
      };
    } else {
      const newGroup = {
        id: payload.id || `grp-${Date.now()}`,
        title: payload.title,
        link: payload.link,
        targetAudience: payload.targetAudience,
        category: payload.category || 'All Levels',
        platform: payload.platform || 'whatsapp',
        badge: payload.badge || 'Official Batch',
        memberCountNote: payload.memberCountNote || 'Daily Zoom Links & Slides',
        isActive: payload.isActive ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      list.unshift(newGroup);
    }

    saveGroupsData(list);
    return res.status(200).json({ success: true, groups: list });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to save community group' });
  }
});

// API: Delete Community / WhatsApp Group
app.delete('/api/groups/:id', (req, res) => {
  try {
    const id = req.params.id;
    const list = getGroupsData();
    const filtered = list.filter((g: any) => g.id !== id);
    saveGroupsData(filtered);
    return res.status(200).json({ success: true, groups: filtered });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to delete community group' });
  }
});

// Helper to send formatted Telegram registration notification
async function sendTelegramRegistrationNotification(data: any): Promise<{ success: boolean; error?: string }> {
  const token = process.env.TELEGRAM_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('Telegram notification skipped: TELEGRAM_TOKEN or TELEGRAM_CHAT_ID not configured in environment variables.');
    return { success: false, error: 'Telegram credentials missing from environment' };
  }

  const fullName = data.fullName || data.name || 'N/A';
  const age = data.age || 'N/A';
  const gender = data.gender || 'N/A';
  const mobileNumber = data.whatsappNumber || data.whatsapp || data.mobile || data.phone || 'N/A';
  const country = data.country || 'N/A';
  const city = data.city || 'N/A';
  const highestEducation = data.highestEducation || data.education || 'N/A';
  const currentGermanLevel = data.currentLevel || data.currentGermanLevel || 'No German / Beginner';
  const courseLevel = data.targetLevel || data.courseLevel || data.level || 'A1';
  const batchTime = data.classTimeSlot || data.batchTime || data.batch || 'Morning Batch (10:00 AM – 11:00 AM)';
  const purpose = data.learningReason || data.purpose || 'Study in Germany';
  const referralSource = data.referralSource || data.referral || data.heardFrom || 'Not Specified';
  const registrationId = data.id || `DE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const submissionDate = data.createdAt ? new Date(data.createdAt).toLocaleString() : new Date().toLocaleString();

  const message = `🎓 *NEW STUDENT REGISTRATION* 🇩🇪
━━━━━━━━━━━━━━━━━━━━━
👤 *Full Name:* ${fullName}
🎂 *Age:* ${age}
⚧ *Gender:* ${gender}
📱 *Mobile / WhatsApp:* ${mobileNumber}
🌍 *Country:* ${country}
🏙️ *City:* ${city}
🎓 *Highest Education:* ${highestEducation}
🗣️ *Current German Level:* ${currentGermanLevel}
📚 *Target Course Level:* Level ${courseLevel}
⏰ *Batch Time:* ${batchTime}
🎯 *Purpose (Why Learn German):* ${purpose}
📢 *Heard About Us From:* ${referralSource}
━━━━━━━━━━━━━━━━━━━━━
🆔 *Registration ID:* \`${registrationId}\`
📅 *Date & Time:* ${submissionDate}
⚡ *Live Zoom App Classes Sponsored by Ahmed Rajput*`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const result: any = await response.json();
    if (!response.ok || !result.ok) {
      console.error('Telegram notification error:', result);
      return { success: false, error: result.description || 'Failed to send Telegram message' };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Network error dispatching Telegram notification:', err?.message);
    return { success: false, error: err?.message };
  }
}

// Dedicated API Route: /api/telegram (Direct Endpoint for Telegram Dispatch)
app.post('/api/telegram', async (req, res) => {
  try {
    const body = req.body || {};
    const regId = body.id || `DE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord = {
      id: regId,
      fullName: body.fullName || body.name || 'N/A',
      age: body.age || 20,
      gender: body.gender || 'Male',
      whatsappNumber: body.whatsappNumber || body.whatsapp || body.phone || 'N/A',
      country: body.country || 'Pakistan',
      city: body.city || 'N/A',
      highestEducation: body.highestEducation || 'Intermediate',
      currentLevel: body.currentLevel || 'No German / Beginner',
      targetLevel: body.targetLevel || body.level || 'A1',
      classTimeSlot: body.classTimeSlot || body.batch || 'Morning Batch (10:00 AM – 11:00 AM)',
      learningReason: body.learningReason || body.purpose || 'Study in Germany',
      referralSource: body.referralSource || body.referral || body.heardFrom || 'Not Specified',
      createdAt: body.createdAt || new Date().toISOString(),
      paymentStatus: 'pending'
    };

    // 1. Save to Database so admissions desk retains full data
    const currentList = getRegistrations();
    const updatedList = [newRecord, ...currentList.filter(item => item.id !== regId)];
    saveRegistrations(updatedList);
    syncToSupabase(newRecord).catch(() => {});

    // 2. Dispatch to Telegram
    const tgResult = await sendTelegramRegistrationNotification(newRecord);

    return res.status(200).json({
      success: true,
      telegramDelivered: tgResult.success,
      telegramError: tgResult.error,
      registration: newRecord
    });
  } catch (err: any) {
    console.error('Error in /api/telegram endpoint:', err?.message);
    return res.status(500).json({ success: false, error: err?.message || 'Failed to process registration' });
  }
});

// API Route: /api/notify (Saves to Database + Sends Telegram notification)
app.post('/api/notify', async (req, res) => {
  try {
    const body = req.body || {};
    const studentName = body.fullName || body.name || 'N/A';
    const studentWhatsapp = body.whatsapp || body.whatsappNumber || 'N/A';
    const studentCity = body.city || 'N/A';
    const studentLevel = body.level || body.targetLevel || body.germanLevel || 'A1';
    const studentBatch = body.batch || body.classTimeSlot || body.zoomBatch || 'Morning Batch (10:00 AM – 11:00 AM)';
    const studentPurpose = body.purpose || body.learningReason || body.learningPurpose || 'Study in Germany (Bachelor / Master Degree)';

    const regId = body.id || `DE-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord = {
      id: regId,
      fullName: studentName,
      age: body.age || 20,
      gender: body.gender || 'Male',
      whatsappNumber: studentWhatsapp,
      country: body.country || 'Pakistan',
      city: studentCity,
      highestEducation: body.highestEducation || 'Intermediate',
      currentLevel: body.currentLevel || 'No German / Beginner',
      targetLevel: studentLevel,
      classTimeSlot: studentBatch,
      learningReason: studentPurpose,
      referralSource: body.referralSource || body.referral || body.heardFrom || 'Not Specified',
      createdAt: body.createdAt || new Date().toISOString(),
      paymentStatus: 'pending'
    };

    // 1. SAVE TO DATABASE (Capacity for 2000+ submissions)
    const currentList = getRegistrations();
    // Prepend to top of list
    const updatedList = [newRecord, ...currentList.filter(item => item.id !== regId)];
    saveRegistrations(updatedList);

    // 2. ASYNC SYNC TO SUPABASE IF CONFIGURED
    syncToSupabase(newRecord).catch(() => {});

    // 3. SEND TELEGRAM NOTIFICATION via helper
    const tgResult = await sendTelegramRegistrationNotification(newRecord);

    return res.status(200).json({
      ok: true,
      success: true,
      message: 'Registration saved successfully',
      telegramDelivered: tgResult.success,
      registration: newRecord
    });
  } catch (error: any) {
    console.error('Error handling /api/notify:', error?.message);
    return res.status(500).json({ error: 'failed' });
  }
});

// AI Chat Bot Assistant Endpoint: /api/chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        // Format conversation history for Gemini generateContent
        const contents: any[] = [];
        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item.sender === 'user' && item.text) {
              contents.push({ role: 'user', parts: [{ text: item.text }] });
            } else if (item.sender === 'bot' && item.text) {
              contents.push({ role: 'model', parts: [{ text: item.text }] });
            }
          }
        }
        contents.push({ role: 'user', parts: [{ text: message }] });

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction: AI_SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        const replyText = response.text?.trim();
        if (replyText) {
          return res.status(200).json({ reply: replyText });
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call returned error, using smart fallback guide:', geminiError?.message);
      }
    }

    // High-quality smart bilingual reply
    const fallbackReply = generateSmartBilingualReply(message);
    return res.status(200).json({ reply: fallbackReply });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    return res.status(200).json({
      reply: 'Bohat shukriya! Ahmed Rajput German Language Program me A1 (2 Months), A2 (2 Months), B1 (3 Months), B2 (3 Months) ki classes Zoom app par 100% Free hoti hain. Talented students ko Germany aane me team poora support karti hai. Mazeed maloomat ke liye form fill karein!'
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Application server running on port ${PORT}`);
  });
}

startServer();
