export interface ReferralOption {
  id: string;
  label: string;
  icon: string;
  description?: string;
  badge?: string;
}

export const REFERRAL_OPTIONS: ReferralOption[] = [
  {
    id: 'Friend or Family',
    label: 'Friend or Family Recommendation',
    icon: '👥',
    description: 'A friend or relative told me about the course',
    badge: 'Popular'
  },
  {
    id: 'Ahmed Rajput Batch Student',
    label: 'Current / Alumni Batch Student',
    icon: '🎓',
    description: 'Recommended by a student currently or previously enrolled in the batch',
    badge: 'Alumni'
  },
  {
    id: 'Google Search',
    label: 'Google Search',
    icon: '🔍',
    description: 'Searched for free German language courses online'
  },
  {
    id: 'YouTube',
    label: 'YouTube',
    icon: '▶️',
    description: 'Saw video, guidance lecture, or short on YouTube'
  },
  {
    id: 'Facebook',
    label: 'Facebook',
    icon: '📘',
    description: 'Post, group discussion, or page on Facebook'
  },
  {
    id: 'TikTok',
    label: 'TikTok',
    icon: '🎵',
    description: 'Saw video or clip about Ahmed Rajput program on TikTok'
  },
  {
    id: 'Twitter / X',
    label: 'Twitter / X',
    icon: '🐦',
    description: 'Tweet, thread, or post on Twitter / X'
  },
  {
    id: 'Instagram',
    label: 'Instagram',
    icon: '📸',
    description: 'Reel, story, or post on Instagram'
  },
  {
    id: 'WhatsApp Group / Community',
    label: 'WhatsApp Group or Status',
    icon: '💬',
    description: 'Forwarded message, status, or community group'
  },
  {
    id: 'Other Source',
    label: 'Other Source / Media',
    icon: '🌐',
    description: 'Blog, newspaper, campus notice, or other'
  }
];
