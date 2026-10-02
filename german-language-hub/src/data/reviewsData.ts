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
  averageRating: 4.9,
  fiveStarCount: 512,
  fourStarCount: 32,
  threeStarCount: 6,
  twoStarCount: 3,
};

export const INITIAL_REVIEWS_LIST: StudentReview[] = [
  {
    id: 'rev-1',
    name: 'Fatima Noor',
    gender: 'female',
    city: 'Lahore',
    level: 'A1',
    rating: 5,
    date: '2 din pehle',
    comment:
      'Ahmed Rajput bhai ka dil se bohot shukria ada karti hoon jinho ne hum jesi middle-class larkiyon ke liye yeh program banaya. Lahore mein koi aisi academy nahi jo 50,000 se kam leti ho. Inho ne humein bohot support kiya aur inki team ne itna acha guide kiya ke mera Goethe A1 first attempt mein 91% se clear ho gaya. Allah Pak Ahmed Rajput bhai ko sehat, tandrusti aur lambi umar de! Ameen.',
    verifiedStudent: true,
    statusTag: 'Goethe A1 Passed'
  },
  {
    id: 'rev-2',
    name: 'Muhammad Bilal Khan',
    gender: 'male',
    city: 'Rawalpindi',
    level: 'B1',
    rating: 5,
    date: '3 din pehle',
    comment:
      'Main Islamabad aur Pindi ki academies mein gaya tha, har koi B1 tak ka 1.5 lakh maang raha tha. Ahmed Rajput bhai ne hum jese aam students ko sahara diya. Sirf one-time nominal fee mein itni top-level Zoom live classes aur daily practice karwai. Team har waqt guide karti hai. Allah Pak inko hamesha khush aur sehat mand rakhe.',
    verifiedStudent: true,
    statusTag: 'Visa Process'
  },
  {
    id: 'rev-3',
    name: 'Ayesha Siddiqua',
    gender: 'female',
    city: 'Faisalabad',
    level: 'A1',
    rating: 5,
    date: '5 din pehle',
    comment:
      'Maine spouse visa ke liye A1 karna tha. Mujhe German ka zero pata tha. Ahmed Rajput bhai aur unki dedicated team ne itne pyar aur sabar se sikhaya. Ek ek grammar rule clear karwaya. Jo fees commercial centers letay hain woh hum jese gharon ke bas ki baat nahi thi. Allah Pak Ahmed Rajput ko bohot ajar aur sehat ataa farmaye.',
    verifiedStudent: true,
    statusTag: 'Family Reunion Visa'
  },
  {
    id: 'rev-4',
    name: 'Ali Raza Gujjar',
    gender: 'male',
    city: 'Gujranwala',
    level: 'A2',
    rating: 3,
    date: '1 hafta pehle',
    comment:
      'Parhai aur content bohot zabardast hai lekin homework checking mein team bohot ziada strict hai! Ek din meri tabiat theek nahi thi aur assignment late hui to warning mil gayi. Thora students ke sath narmi baratni chahiye. Baqi Ahmed Rajput bhai ne hum ghareebon ke liye bohot bara kaam kiya hai.',
    verifiedStudent: true,
    statusTag: 'Strict Checking'
  },
  {
    id: 'rev-5',
    name: 'Zainab Bibi',
    gender: 'female',
    city: 'Multan',
    level: 'B2',
    rating: 5,
    date: '1 hafta pehle',
    comment:
      'B2 level seekhna Pakistan mein na-mumkin lagta tha kyunke fees aasmaan ko choo rahi theen. Ahmed Rajput bhai ki waja se maine B2 complete kiya aur ab Germany ke hospital mein nursing contract sign kiya hai. Team ka response bohot cooperative raha. Allah Pak inhein sehat de aur hamesha aisi khidmat karne ki tofeeq de.',
    verifiedStudent: true,
    statusTag: 'Nursing Job in Germany'
  },
  {
    id: 'rev-6',
    name: 'Shahzaib Afridi',
    gender: 'male',
    city: 'Peshawar',
    level: 'A1',
    rating: 2,
    date: '10 din pehle',
    comment:
      'Maine apply kiya tha lekin seat milne mein 5 din lag gaye kyunke batch full tha. Support team ko reply thora jaldi karna chahiye. Lekin jab class start hui to parhai waqai bohot achi thi. Agar admission process thora aur fast ho jaye to 5 star doon ga.',
    verifiedStudent: true,
    statusTag: 'Seat Waiting Time'
  },
  {
    id: 'rev-7',
    name: 'Hina Tariq',
    gender: 'female',
    city: 'Karachi',
    level: 'A2',
    rating: 5,
    date: '12 din pehle',
    comment:
      'Karachi mein German institutes ki fees dekh kar dil toot gaya tha. Ahmed Rajput bhai ka program kisi naymat se kam nahi. Daily 1 hour Zoom class mein har student se bolne ki practice karwate hain. Team bohot achi guidance deti hai. Allah pak Ahmed bhai ko sehat o afiyat wali zindagi ata farmaye.',
    verifiedStudent: true,
    statusTag: 'Speaking Fluency'
  },
  {
    id: 'rev-8',
    name: 'Usman Ghani',
    gender: 'male',
    city: 'Sialkot',
    level: 'B1',
    rating: 5,
    date: '2 hafte pehle',
    comment:
      'Engineering ke baad Germany Master ke liye apply karna tha. Ahmed Rajput bhai ki sponsorship ki waja se humein lakhoon rupay academies ko nahi dene paray. Inki team ne German Embassy interview aur Goethe preparation dono mein behtareen guide kiya. Bohot shukriya Ahmed bhai! Allah Pak aapko sehat tandrusti de.',
    verifiedStudent: true,
    statusTag: 'TUM Masters Admission'
  },
  {
    id: 'rev-9',
    name: 'Nimra Arshad',
    gender: 'female',
    city: 'Rawalpindi',
    level: 'A1',
    rating: 3,
    date: '2 hafte pehle',
    comment:
      'Raat 9:00 PM wali class kabhi kabhi discussion ki waja se 10:20 PM tak chali jati hai. House wives ke liye timing thora tight ho jata hai. Class agar theek 1 ghante mein khatam ho to behtar hoga. Baqi teaching quality aur notes be-misaal hain.',
    verifiedStudent: true,
    statusTag: 'Class Timing Feedback'
  },
  {
    id: 'rev-10',
    name: 'Hamza Farooq',
    gender: 'male',
    city: 'Sargodha',
    level: 'A2',
    rating: 5,
    date: '3 hafte pehle',
    comment:
      'Main ek kisaan ka beta hoon. Mere pas academy ke 45 hazar dene ke paise nahi the. Ahmed Rajput bhai ke is initiative ki waja se maine A1 aur A2 clear kiya. Dil se dua nikalti hai inke liye. Allah Pak inko sehat aur kamiyabi de. Team ne har mushkil lafz urdu mein samjhaya.',
    verifiedStudent: true,
    statusTag: 'Ausbildung Candidate'
  },
  {
    id: 'rev-11',
    name: 'Maryam Jameel',
    gender: 'female',
    city: 'Islamabad',
    level: 'B1',
    rating: 5,
    date: '3 hafte pehle',
    comment:
      'Bohot honest aur mukhlis log hain. Ahmed Rajput bhai Germany mein baith kar apne watan ke bachon ke liye itna bara ehsan kar rahe hain. Har topic ke baad mock test liya jata hai. Team ne embassy documentation par bhi guidance di. Allah pak Ahmed bhai ko sehat tandrusti se nawaze.',
    verifiedStudent: true,
    statusTag: 'B1 Certified'
  },
  {
    id: 'rev-12',
    name: 'Waqas Mehmood',
    gender: 'male',
    city: 'Multan',
    level: 'A1',
    rating: 3,
    date: '3 hafte pehle',
    comment:
      'Zoom live class mein camera lazmi on rakhne ka kehte hain speaking drill ke waqt. Thora sharm aati thi shuru mein. Lekin ab samajh aayi ke usi se bolna aya. Homework thora zyada hota hai, par overall bohot behtareen initiative hai.',
    verifiedStudent: true,
    statusTag: 'Strict Attendance'
  },
  {
    id: 'rev-13',
    name: 'Khadija Zahoor',
    gender: 'female',
    city: 'Bahawalpur',
    level: 'A1',
    rating: 5,
    date: '1 maah pehle',
    comment:
      'Bahawalpur mein to koi achi German academy thi hi nahi. Online Zoom par Ahmed Rajput bhai ke platform se parha. Subah 10 baje ka batch mere liye bohot convenient tha. Alhamdulillah Goethe A1 mein 86 number aaye. Team ka shukriya, Ahmed Rajput bhai ke liye dilon se duaein!',
    verifiedStudent: true,
    statusTag: 'Goethe 86/100'
  },
  {
    id: 'rev-14',
    name: 'Danish Ali',
    gender: 'male',
    city: 'Quetta',
    level: 'B1',
    rating: 5,
    date: '1 maah pehle',
    comment:
      'Balochistan se German seekhna namumkin tha pehle. Ahmed Rajput bhai ka bohot mashkoor hoon jinho ne humein afford karne layak banaya. 5K registration fee ke ilawa koi hidden charges nahi liye. Team ne hamesha guide kiya. Allah pak inko hamesha sehatmand rakhe.',
    verifiedStudent: true,
    statusTag: 'Opportunity Card'
  },
  {
    id: 'rev-15',
    name: 'Sadia Parveen',
    gender: 'female',
    city: 'Abbottabad',
    level: 'A2',
    rating: 5,
    date: '1 maah pehle',
    comment:
      'Jo log academies ko lakhoon rupay nahi de sakte unke liye Ahmed Rajput bhai maseeha ban kar aaye. Inki team ne pronunciation itni behtareen karwa di ke German bolte huay hichkichahat khatam ho gayi. Allah Pak Ahmed bhai ko dono jahan mein kamyabi aur sehat de.',
    verifiedStudent: true,
    statusTag: 'Fluent German'
  },
  {
    id: 'rev-16',
    name: 'Taimoor Shah',
    gender: 'male',
    city: 'Hyderabad',
    level: 'A1',
    rating: 2,
    date: '1 maah pehle',
    comment:
      'Internet connection kharab hone ki waja se meri do classes miss hui theen, recording portal par aane mein 4 ghante lag gaye the. Portal thora aur tez hona chahiye. Halanke teacher ne baad mein query solve kar di thi.',
    verifiedStudent: true,
    statusTag: 'Portal Speed Feedback'
  },
  {
    id: 'rev-17',
    name: 'Rabia Aslam',
    gender: 'female',
    city: 'Gujrat',
    level: 'B1',
    rating: 5,
    date: '1 maah pehle',
    comment:
      'Ahmed Rajput bhai ka bohot bohot shukria. Academies hum jesi larkiyon se andhi fees maangti theen. Inho ne sab ke liye barabar moqa paida kiya. Allah pak inko jaza-e-khair de aur hamesha tandrust rakhe. Team bohot cooperative hai.',
    verifiedStudent: true,
    statusTag: 'Goethe B1 Passed'
  },
  {
    id: 'rev-18',
    name: 'Kamran Akmal',
    gender: 'male',
    city: 'Lahore',
    level: 'B2',
    rating: 5,
    date: '1 maah pehle',
    comment:
      'Main software developer hoon aur Germany ke job market ke liye B2 zaroori tha. Commercial coaching walay 70 hazar maang rahe the. Ahmed Rajput bhai jo khud Germany mein Senior Software Engineer hain, unho ne tech industry ke hisaab se guide kiya. Hats off to him! Allah sehat de.',
    verifiedStudent: true,
    statusTag: 'IT Job in Berlin'
  }
];
