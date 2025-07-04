'use client';

import Link from 'next/link';
import { DollarSign, House, Users, Heart, MapPin, Plane } from 'lucide-react';

import FeatureCard from '@/components/FeatureCard';
import SectionHeader from '@/components/SectionHeader';

const advantages = [
  {
    icon: <DollarSign className="h-8 w-8 text-gro-teal mb-2 group-hover:-translate-y-0.5 transition-transform duration-200" />,
    title: 'Higher Total Compensation',
    description:
      'Our Queensland packages include mining allowances and regional benefits, often 20–30% higher than metropolitan roles, with lower living costs.',
  },
  {
    icon: <House className="h-8 w-8 text-gro-orange mb-2 group-hover:-translate-y-0.5 transition-transform duration-200" />,
    title: 'Better Lifestyle Value',
    description:
      'Your salary goes further with affordable housing, shorter commutes, and access to outdoor recreation right outside your door.',
  },
  {
    icon: <Users className="h-8 w-8 text-gro-green mb-2 group-hover:-translate-y-0.5 transition-transform duration-200" />,
    title: 'Tight-Knit Communities',
    description:
      'Join close-knit mining communities with strong social connections, excellent support networks, and genuine friendships.',
  },
  {
    icon: <Heart className="h-8 w-8 text-gro-darkgray mb-2 group-hover:-translate-y-0.5 transition-transform duration-200" />,
    title: 'Work-Life Balance',
    description:
      'Escape the city stress with better work-life balance, outdoor adventures, and more time for what matters most.',
  },
  {
    icon: <MapPin className="h-8 w-8 text-gro-teal mb-2 group-hover:-translate-y-0.5 transition-transform duration-200" />,
    title: 'Natural Beauty Access',
    description:
      'Live surrounded by stunning landscapes, national parks, and unique Queensland experiences unavailable in cities.',
  },
  {
    icon: <Plane className="h-8 w-8 text-gro-orange mb-2 group-hover:-translate-y-0.5 transition-transform duration-200" />,
    title: 'Fast-Track Career Growth',
    description:
      'Accelerate your career with leadership opportunities and professional development in growing regional centers.',
  },
];

export default function QueenslandAdvantage() {
  return (
    <section className="py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="The Queensland Advantage"
          subtitle="Your GRO benefits are enhanced by Queensland's unique lifestyle opportunities. Discover how working in our mining communities delivers exceptional value beyond traditional compensation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {advantages.map((item, idx) => (
            <FeatureCard
              key={idx}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        <div className="text-center mt-10 md:mt-14">
          <p className="text-sm md:text-base text-muted mb-4">
            Ready to discover your total lifestyle value in Queensland?
          </p>
          <Link
            href="/relocation"
            className="inline-flex items-center px-6 py-3 btn-touch btn-gro-teal focus-ring text-sm md:text-base"
          >
            Explore Queensland Living
          </Link>
        </div>
      </div>
    </section>
  );
} 