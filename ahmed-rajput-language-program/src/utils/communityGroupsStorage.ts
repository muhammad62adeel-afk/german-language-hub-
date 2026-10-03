import { CommunityGroup } from '../types';

export const COMMUNITY_GROUPS_STORAGE_KEY = 'ahmed_rajput_community_groups';

export const DEFAULT_COMMUNITY_GROUPS: CommunityGroup[] = [
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

export const getCommunityGroups = (): CommunityGroup[] => {
  if (typeof window === 'undefined') return DEFAULT_COMMUNITY_GROUPS;
  try {
    const raw = localStorage.getItem(COMMUNITY_GROUPS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(COMMUNITY_GROUPS_STORAGE_KEY, JSON.stringify(DEFAULT_COMMUNITY_GROUPS));
      return DEFAULT_COMMUNITY_GROUPS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_COMMUNITY_GROUPS;
  } catch (err) {
    console.error('Error reading community groups from localStorage:', err);
    return DEFAULT_COMMUNITY_GROUPS;
  }
};

export const saveCommunityGroups = (groups: CommunityGroup[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(COMMUNITY_GROUPS_STORAGE_KEY, JSON.stringify(groups));
    window.dispatchEvent(new CustomEvent('community-groups-updated'));
  } catch (err) {
    console.error('Error saving community groups to localStorage:', err);
  }
};

export const getActiveCommunityGroups = (): CommunityGroup[] => {
  const all = getCommunityGroups();
  return all.filter((g) => g.isActive);
};
