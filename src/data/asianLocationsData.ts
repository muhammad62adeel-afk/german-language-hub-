export interface AsianCountry {
  name: string;
  code: string; // phone prefix
  flag: string;
  region: 'South Asia' | 'Middle East' | 'Central Asia' | 'East Asia' | 'Southeast Asia' | 'Other';
}

export const ASIAN_COUNTRIES: AsianCountry[] = [
  // South Asia
  { name: 'Pakistan', code: '+92', flag: '🇵🇰', region: 'South Asia' },
  { name: 'India', code: '+91', flag: '🇮🇳', region: 'South Asia' },
  { name: 'Bangladesh', code: '+880', flag: '🇧🇩', region: 'South Asia' },
  { name: 'Afghanistan', code: '+93', flag: '🇦🇫', region: 'South Asia' },
  { name: 'Nepal', code: '+977', flag: '🇳🇵', region: 'South Asia' },
  { name: 'Sri Lanka', code: '+94', flag: '🇱🇰', region: 'South Asia' },
  { name: 'Maldives', code: '+960', flag: '🇲🇻', region: 'South Asia' },
  { name: 'Bhutan', code: '+975', flag: '🇧🇹', region: 'South Asia' },

  // Middle East / West Asia
  { name: 'United Arab Emirates (UAE)', code: '+971', flag: '🇦🇪', region: 'Middle East' },
  { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦', region: 'Middle East' },
  { name: 'Qatar', code: '+974', flag: '🇶🇦', region: 'Middle East' },
  { name: 'Oman', code: '+968', flag: '🇴🇲', region: 'Middle East' },
  { name: 'Kuwait', code: '+965', flag: '🇰🇼', region: 'Middle East' },
  { name: 'Bahrain', code: '+973', flag: '🇧🇭', region: 'Middle East' },
  { name: 'Turkey (Türkiye)', code: '+90', flag: '🇹🇷', region: 'Middle East' },
  { name: 'Iran', code: '+98', flag: '🇮🇷', region: 'Middle East' },
  { name: 'Iraq', code: '+964', flag: '🇮🇶', region: 'Middle East' },
  { name: 'Jordan', code: '+962', flag: '🇯🇴', region: 'Middle East' },
  { name: 'Lebanon', code: '+961', flag: '🇱🇧', region: 'Middle East' },
  { name: 'Yemen', code: '+967', flag: '🇾🇪', region: 'Middle East' },
  { name: 'Palestine', code: '+970', flag: '🇵🇸', region: 'Middle East' },
  { name: 'Syria', code: '+963', flag: '🇸🇾', region: 'Middle East' },
  { name: 'Cyprus', code: '+357', flag: '🇨🇾', region: 'Middle East' },
  { name: 'Azerbaijan', code: '+994', flag: '🇦🇿', region: 'Middle East' },
  { name: 'Georgia', code: '+995', flag: '🇬🇪', region: 'Middle East' },
  { name: 'Armenia', code: '+374', flag: '🇦🇲', region: 'Middle East' },

  // Southeast Asia
  { name: 'Malaysia', code: '+60', flag: '🇲🇾', region: 'Southeast Asia' },
  { name: 'Indonesia', code: '+62', flag: '🇮🇩', region: 'Southeast Asia' },
  { name: 'Singapore', code: '+65', flag: '🇸🇬', region: 'Southeast Asia' },
  { name: 'Thailand', code: '+66', flag: '🇹🇭', region: 'Southeast Asia' },
  { name: 'Philippines', code: '+63', flag: '🇵🇭', region: 'Southeast Asia' },
  { name: 'Vietnam', code: '+84', flag: '🇻🇳', region: 'Southeast Asia' },
  { name: 'Cambodia', code: '+855', flag: '🇰🇭', region: 'Southeast Asia' },
  { name: 'Myanmar (Burma)', code: '+95', flag: '🇲🇲', region: 'Southeast Asia' },
  { name: 'Brunei', code: '+673', flag: '🇧🇳', region: 'Southeast Asia' },
  { name: 'Laos', code: '+856', flag: '🇱🇦', region: 'Southeast Asia' },
  { name: 'Timor-Leste', code: '+670', flag: '🇹🇱', region: 'Southeast Asia' },

  // East Asia
  { name: 'China', code: '+86', flag: '🇨🇳', region: 'East Asia' },
  { name: 'Japan', code: '+81', flag: '🇯🇵', region: 'East Asia' },
  { name: 'South Korea', code: '+82', flag: '🇰🇷', region: 'East Asia' },
  { name: 'Hong Kong', code: '+852', flag: '🇭🇰', region: 'East Asia' },
  { name: 'Taiwan', code: '+886', flag: '🇹🇼', region: 'East Asia' },
  { name: 'Macau', code: '+853', flag: '🇲🇴', region: 'East Asia' },
  { name: 'Mongolia', code: '+976', flag: '🇲🇳', region: 'East Asia' },

  // Central Asia
  { name: 'Uzbekistan', code: '+998', flag: '🇺🇿', region: 'Central Asia' },
  { name: 'Kazakhstan', code: '+7', flag: '🇰🇿', region: 'Central Asia' },
  { name: 'Tajikistan', code: '+992', flag: '🇹🇯', region: 'Central Asia' },
  { name: 'Kyrgyzstan', code: '+996', flag: '🇰🇬', region: 'Central Asia' },
  { name: 'Turkmenistan', code: '+993', flag: '🇹🇲', region: 'Central Asia' },

  // Worldwide / Other
  { name: 'Other Country (Worldwide)', code: '+1', flag: '🌐', region: 'Other' },
];

export const CITIES_BY_COUNTRY: Record<string, string[]> = {
  Pakistan: [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Gujranwala',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Sargodha',
    'Bahawalpur',
    'Hyderabad',
    'Gujrat',
    'Abbottabad',
    'Wah Cantt',
    'Sheikhupura',
    'Mardan',
    'Kasur',
    'Rahim Yar Khan',
    'Sahiwal',
    'Okara',
    'Sukkur',
    'Larkana',
    'Nawabshah',
    'Mirpur Khas',
    'Jhang',
    'Chiniot',
    'Kamoke',
    'Hafizabad',
    'Mandi Bahauddin',
    'Muzaffarabad (AJK)',
    'Mirpur (AJK)',
    'Kotli (AJK)',
    'Rawalakot (AJK)',
    'Gilgit',
    'Skardu',
    'Swat / Mingora',
    'Dera Ghazi Khan',
    'Dera Ismail Khan',
    'Mansehra',
    'Haripur',
    'Kohat',
    'Bannu',
    'Nowshera',
    'Charsadda',
    'Attock',
    'Taxila',
    'Chakwal',
    'Jhelum',
    'Kharian',
    'Wazirabad',
    'Daska',
    'Burewala',
    'Vehari',
    'Khanewal',
    'Bahawalnagar',
    'Muzaffargarh',
    'Turbat',
    'Gwadar',
    'Khuzdar',
    'Hub',
    'Other City / Village'
  ],

  'United Arab Emirates (UAE)': [
    'Dubai',
    'Abu Dhabi',
    'Sharjah',
    'Ajman',
    'Ras Al Khaimah',
    'Fujairah',
    'Al Ain',
    'Umm Al Quwain',
    'Other City'
  ],

  'Saudi Arabia': [
    'Riyadh',
    'Jeddah',
    'Mecca (Makkah)',
    'Medina (Madinah)',
    'Dammam',
    'Khobar',
    'Dhahran',
    'Jubail',
    'Tabuk',
    'Taif',
    'Abha',
    'Khamis Mushait',
    'Yanbu',
    'Al Ahsa / Hofuf',
    'Najran',
    'Jazan',
    'Hail',
    'Buraidah',
    'Other City'
  ],

  Qatar: [
    'Doha',
    'Al Rayyan',
    'Al Wakrah',
    'Al Khor',
    'Lusail',
    'Umm Salal',
    'Other City'
  ],

  Oman: [
    'Muscat',
    'Salalah',
    'Sohar',
    'Nizwa',
    'Sur',
    'Seeb',
    'Ibri',
    'Other City'
  ],

  Kuwait: [
    'Kuwait City',
    'Hawally',
    'Salmiya',
    'Al Ahmadi',
    'Farwaniya',
    'Sabah Al Salem',
    'Jahra',
    'Other City'
  ],

  Bahrain: [
    'Manama',
    'Riffa',
    'Muharraq',
    'Hamad Town',
    'A\'ali',
    'Isa Town',
    'Other City'
  ],

  'Turkey (Türkiye)': [
    'Istanbul',
    'Ankara',
    'Izmir',
    'Bursa',
    'Antalya',
    'Adana',
    'Konya',
    'Gaziantep',
    'Trabzon',
    'Other City'
  ],

  Malaysia: [
    'Kuala Lumpur',
    'Penang / George Town',
    'Johor Bahru',
    'Shah Alam',
    'Petaling Jaya',
    'Ipoh',
    'Melaka',
    'Kota Kinabalu',
    'Kuching',
    'Other City'
  ],

  India: [
    'Delhi / New Delhi',
    'Mumbai',
    'Bengaluru (Bangalore)',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Surat',
    'Jaipur',
    'Lucknow',
    'Chandigarh',
    'Kochi',
    'Other City'
  ],

  Bangladesh: [
    'Dhaka',
    'Chittagong',
    'Sylhet',
    'Rajshahi',
    'Khulna',
    'Barisal',
    'Rangpur',
    'Comilla',
    'Mymensingh',
    'Other City'
  ],

  Afghanistan: [
    'Kabul',
    'Herat',
    'Mazar-i-Sharif',
    'Kandahar',
    'Jalalabad',
    'Kunduz',
    'Ghazni',
    'Other City'
  ],

  Iran: [
    'Tehran',
    'Mashhad',
    'Isfahan',
    'Shiraz',
    'Tabriz',
    'Karaj',
    'Qom',
    'Other City'
  ],

  Indonesia: [
    'Jakarta',
    'Surabaya',
    'Bandung',
    'Medan',
    'Bekasi',
    'Semarang',
    'Denpasar (Bali)',
    'Other City'
  ],

  China: [
    'Beijing',
    'Shanghai',
    'Guangzhou',
    'Shenzhen',
    'Chengdu',
    'Hangzhou',
    'Wuhan',
    'Xi\'an',
    'Other City'
  ],

  Japan: [
    'Tokyo',
    'Osaka',
    'Kyoto',
    'Yokohama',
    'Nagoya',
    'Sapporo',
    'Fukuoka',
    'Other City'
  ],

  'South Korea': [
    'Seoul',
    'Busan',
    'Incheon',
    'Daegu',
    'Daejeon',
    'Gwangju',
    'Other City'
  ],

  Nepal: [
    'Kathmandu',
    'Pokhara',
    'Lalitpur',
    'Biratnagar',
    'Bharatpur',
    'Other City'
  ],

  'Sri Lanka': [
    'Colombo',
    'Kandy',
    'Galle',
    'Jaffna',
    'Negombo',
    'Other City'
  ],

  Singapore: [
    'Singapore (Central)',
    'Jurong',
    'Woodlands',
    'Tampines',
    'Bedok',
    'Other Area'
  ],

  Thailand: [
    'Bangkok',
    'Chiang Mai',
    'Phuket',
    'Pattaya',
    'Nonthaburi',
    'Other City'
  ],

  Philippines: [
    'Manila',
    'Quezon City',
    'Davao City',
    'Cebu City',
    'Makati',
    'Taguig (BGC)',
    'Other City'
  ],

  Uzbekistan: [
    'Tashkent',
    'Samarkand',
    'Bukhara',
    'Namangan',
    'Andijan',
    'Other City'
  ],

  Kazakhstan: [
    'Almaty',
    'Astana',
    'Shymkent',
    'Karaganda',
    'Other City'
  ],

  Iraq: [
    'Baghdad',
    'Basra',
    'Erbil',
    'Mosul',
    'Sulaymaniyah',
    'Other City'
  ],

  Jordan: [
    'Amman',
    'Zarqa',
    'Irbid',
    'Aqaba',
    'Other City'
  ],

  Lebanon: [
    'Beirut',
    'Tripoli',
    'Sidon',
    'Byblos',
    'Other City'
  ],

  Maldives: [
    'Male',
    'Hulhumale',
    'Addu City',
    'Fuvahmulah',
    'Other Island'
  ]
};

export const DEFAULT_ASIAN_CITIES = [
  'Capital City',
  'Major City',
  'Other City / Town'
];
