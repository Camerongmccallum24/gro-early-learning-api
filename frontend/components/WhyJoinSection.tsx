'use client';

import { Heart, GraduationCap, Users, Award } from 'lucide-react';

const features = [
  {
    icon: <Heart className="h-10 w-10 md:h-12 md:w-12 text-gro-teal" />,
    title: 'Child-Focused Approach',
    description:
      'Our philosophy places children at the center of our practice, creating engaging environments where they can play, explore, and learn.',
  },
  {
    icon: <GraduationCap className="h-10 w-10 md:h-12 md:w-12 text-gro-orange" />,
    title: 'Professional Growth',
    description:
      'We invest in our educators through ongoing training, mentorship programs, and clear career advancement pathways.',
  },
  {
    icon: <Users className="h-10 w-10 md:h-12 md:w-12 text-gro-green" />,
    title: 'Collaborative Community',
    description:
      'Join a supportive team that values your contribution and celebrates diversity, inclusion, and collaboration.',
  },
  {
    icon: <Award className="h-10 w-10 md:h-12 md:w-12 text-gro-darkblue" />,
    title: 'Quality Education',
    description:
      'Be part of a team committed to providing high-quality early childhood education based on the Early Years Learning Framework.',
  },
];

export default function WhyJoinSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-gro-lightgray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4 text-gro-darkblue px-2">
            Why Join GRO Early Learning?
          </h2>
          <p className="text-gro-gray max-w-2xl mx-auto text-sm sm:text-base px-4 font-sans">
            We&apos;re building a team of passionate educators who share our commitment to providing exceptional early childhood education.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gro-darkblue font-serif">
                {feature.title}
              </h3>
              <p className="text-gro-gray text-sm sm:text-base font-sans">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 