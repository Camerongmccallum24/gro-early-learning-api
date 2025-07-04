import {
  GraduationCap,
  Award,
  Users,
  Book,
  Heart,
  Briefcase,
  Zap,
} from 'lucide-react';

export const iconMap = {
  'graduation-cap': GraduationCap,
  'award': Award,
  'users': Users,
  'book': Book,
  'heart': Heart,
  'briefcase': Briefcase,
  'zap': Zap,
};

export type LucideIconName = keyof typeof iconMap; 