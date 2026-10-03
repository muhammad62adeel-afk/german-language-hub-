import { GoogleGenAI } from '@google/genai';

const AI_SYSTEM_INSTRUCTION = `You are "German Hub AI Guide" (Ahmed Rajput German Language Program Assistant), a warm, positive, friendly, and motivating counselor and guide for students.
Website: germanlanguagehub.online
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

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

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
        console.warn('Gemini API call notice in api/chat:', geminiError?.message);
      }
    }

    const fallbackReply = generateSmartBilingualReply(message);
    return res.status(200).json({ reply: fallbackReply });
  } catch (err: any) {
    console.error('Error in api/chat handler:', err);
    return res.status(200).json({
      reply: 'Bohat shukriya! Ahmed Rajput German Language Program me A1 (2 Months), A2 (2 Months), B1 (3 Months), B2 (3 Months) ki classes Zoom app par 100% Free hoti hain. Talented students ko Germany aane me team poora support karti hai. Mazeed maloomat ke liye form fill karein!'
    });
  }
}
