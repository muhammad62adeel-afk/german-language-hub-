export interface StudentReview {
  id: string;
  name: string;
  gender: 'male' | 'female';
  city: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  rating: number; // 1 to 5
  date: string;
  comment: string;
  verifiedStudent: boolean;
  statusTag?: string;
}

export const REVIEWS_SUMMARY = {
  totalCount: 553,
  averageRating: 4.8,
  fiveStarCount: 489,
  fourStarCount: 48,
  threeStarCount: 12,
  twoStarCount: 4,
};

export const INITIAL_REVIEWS_LIST: StudentReview[] = [
  {
    id: 'rev-1',
    name: 'Fatima Zahra',
    gender: 'female',
    city: 'Lahore',
    level: 'A1',
    rating: 5,
    date: 'Kal',
    comment:
      'Goethe A1 first attempt me 88 marks k sath clear ho gaya. Grammar tables aur daily practice boht helpful rahi.',
    verifiedStudent: true,
    statusTag: 'Goethe 88/100'
  },
  {
    id: 'rev-2',
    name: 'Hamza Tariq',
    gender: 'male',
    city: 'Rawalpindi',
    level: 'A2',
    rating: 4,
    date: '2 din pehle',
    comment:
      'Teacher boht acha parhate hain, night batch ki timing office k baad perfect set hui. Shuru me pace thora fast laga tha but baad me flow ban gaya.',
    verifiedStudent: true,
    statusTag: 'Night Batch Student'
  },
  {
    id: 'rev-3',
    name: 'Bilawal Shah',
    gender: 'male',
    city: 'Karachi',
    level: 'A1',
    rating: 3,
    date: '3 din pehle',
    comment:
      'Teaching quality achi thi lekin daily homework kafi zyada hota ha. Job k sath daily 2 ghante assignment karna mushkil ho jata ha. Agar thora homework kam karein to working logon k liye zyada behtar hoga.',
    verifiedStudent: true,
    statusTag: 'Homework Feedback'
  },
  {
    id: 'rev-4',
    name: 'Maryam Naveed',
    gender: 'female',
    city: 'Islamabad',
    level: 'B1',
    rating: 5,
    date: '4 din pehle',
    comment:
      'B1 clear ho gaya! Speaking drills kafi achi karwai jati hain, interview aur viva ki hesitation bilkul khatam ho gayi.',
    verifiedStudent: true,
    statusTag: 'B1 Certified'
  },
  {
    id: 'rev-5',
    name: 'Usman Ali',
    gender: 'male',
    city: 'Faisalabad',
    level: 'A1',
    rating: 4,
    date: '5 din pehle',
    comment:
      'Course content aur notes 10/10 thay. Sirf ek issue aya k 2 baar barish ki waja se zoom reconnect karna para. Baqi recording dekh k cover kar liya tha, overall worth it ha.',
    verifiedStudent: true,
    statusTag: 'A1 Batch'
  },
  {
    id: 'rev-6',
    name: 'Zeeshan Butt',
    gender: 'male',
    city: 'Gujranwala',
    level: 'A2',
    rating: 5,
    date: '6 din pehle',
    comment:
      '5000 fee bilkul genuine ha. Private academies 35k se 50k maang rahi theen aur parhai bhi formality hoti ha. Idhar teacher har ek query answer karte hain.',
    verifiedStudent: true,
    statusTag: 'A2 Completed'
  },
  {
    id: 'rev-7',
    name: 'Daniyal Khan',
    gender: 'male',
    city: 'Peshawar',
    level: 'A1',
    rating: 3,
    date: '1 hafta pehle',
    comment:
      'Maine form submit kiya tha to WhatsApp par confirmation message aane me 2 din lag gaye thay. Admissions team ko reply time thora fast karna chahiye. Halanke jab class shuru hui to parhai zabardast thi.',
    verifiedStudent: true,
    statusTag: 'Support Response'
  },
  {
    id: 'rev-8',
    name: 'Nimra Sheikh',
    gender: 'female',
    city: 'Multan',
    level: 'B1',
    rating: 5,
    date: '1 hafta pehle',
    comment:
      'Spouse visa k liye mujhe German seekhni thi. Pehle lagta tha German boht tough hogi, lekin teacher ne Urdu aur English dono me examples de kar boht asaan bana diya. Mock tests se exam ka darr khatam ho gaya.',
    verifiedStudent: true,
    statusTag: 'Family Reunion Visa'
  },
  {
    id: 'rev-9',
    name: 'Saad Mehmood',
    gender: 'male',
    city: 'Sialkot',
    level: 'A1',
    rating: 4,
    date: '10 din pehle',
    comment:
      'Subah 10:00 AM wala batch theek tha. Weekend pe thori jaldi ho jata ha par course routine achi bani rehti ha.',
    verifiedStudent: true,
    statusTag: 'Morning Batch'
  },
  {
    id: 'rev-10',
    name: 'Ayesha Akram',
    gender: 'female',
    city: 'Bahawalpur',
    level: 'A2',
    rating: 5,
    date: '12 din pehle',
    comment:
      'Pronunciation pe teacher boht focus karwate hain. Camera on rakhna shuru me thora awkward laga tha lekin usi se bolne ka confidence aya.',
    verifiedStudent: true,
    statusTag: 'Speaking Confidence'
  },
  {
    id: 'rev-11',
    name: 'Arslan Ahmed',
    gender: 'male',
    city: 'Sargodha',
    level: 'B1',
    rating: 3,
    date: '2 hafte pehle',
    comment:
      'Listening audios k liye thora aur material hona chahiye tha B1 exam prep me. Reading aur writing to boht achi karwai, bus listening part thora tricky tha.',
    verifiedStudent: true,
    statusTag: 'Curriculum Feedback'
  },
  {
    id: 'rev-12',
    name: 'Tayyaba Noor',
    gender: 'female',
    city: 'Gujrat',
    level: 'A1',
    rating: 5,
    date: '2 hafte pehle',
    comment:
      'Commercial academies se 10 guna behtar. Har topic k baad quiz hoti thi jis se revision boht asaan rahi.',
    verifiedStudent: true,
    statusTag: 'A1 Passed'
  },
  {
    id: 'rev-13',
    name: 'Kashif Raza',
    gender: 'male',
    city: 'Dubai / Expat',
    level: 'B2',
    rating: 4,
    date: '2 hafte pehle',
    comment:
      'Opportunity Card (Chancenkarte) k liye preparation ki. Teacher Germany k practical standard k hisaab se sikhate hain jo visa interview me boht help karta ha. Homework zyada hota ha but result-oriented ha.',
    verifiedStudent: true,
    statusTag: 'Chancenkarte Visa'
  },
  {
    id: 'rev-14',
    name: 'Zainab Bibi',
    gender: 'female',
    city: 'Sahiwal',
    level: 'A1',
    rating: 5,
    date: '3 hafte pehle',
    comment:
      'Goethe exam pass ho gaya. Sirf 5000 fee me itna honest aur quality material milna boht bari baat ha.',
    verifiedStudent: true,
    statusTag: 'Exam Cleared'
  },
  {
    id: 'rev-15',
    name: 'Mohsin Raza',
    gender: 'male',
    city: 'Hyderabad',
    level: 'A1',
    rating: 4,
    date: '3 hafte pehle',
    comment:
      'Teacher ka explanation style boht simple aur humble ha. 1 ghante ka lecture poora utilize hota ha bina kisi faaltoo bat k.',
    verifiedStudent: true,
    statusTag: 'Verified Student'
  },
  {
    id: 'rev-16',
    name: 'Waleed Javed',
    gender: 'male',
    city: 'Lahore',
    level: 'A2',
    rating: 3,
    date: '3 hafte pehle',
    comment:
      'Class me shuru me kuch students microphone unmute rakh kar disturb kar rahe thay. Baad me teacher ne strict mic rules laga diye to theek hua. Baqi parhai 100% achi ha.',
    verifiedStudent: true,
    statusTag: 'Class Management'
  },
  {
    id: 'rev-17',
    name: 'Sana Khalid',
    gender: 'female',
    city: 'Rahim Yar Khan',
    level: 'B1',
    rating: 5,
    date: '1 maah pehle',
    comment:
      'Home-based larkiyon k liye Zoom classes sab se safe aur best option hain. Bahar kisi academy janay ki zaroorat nahi pari.',
    verifiedStudent: true,
    statusTag: 'Online Zoom'
  },
  {
    id: 'rev-18',
    name: 'Farhan Qureshi',
    gender: 'male',
    city: 'Karachi',
    level: 'A2',
    rating: 5,
    date: '1 maah pehle',
    comment:
      'Institutes me 45 hazar fees mangtay hain. Yahan 5000 registration fee me daily Zoom lectures aur PDF worksheets sab mil gaya. Paisa wasool ha.',
    verifiedStudent: true,
    statusTag: 'Affordable Option'
  }
];
