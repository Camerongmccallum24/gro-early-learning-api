'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PlaneTakeoff, CalendarCheck, Handshake, Box, House, Flag } from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeader from '@/components/SectionHeader';

const steps = [
  {
    title: '8 Weeks Before',
    icon: CalendarCheck,
    tasks: [
      'Accept job offer and confirm start date',
      'Complete GRO relocation benefit application',
      'Begin researching housing options online',
      'Notify current employer and arrange transition',
    ],
    support: ['HR provides relocation packet and dedicated support contact'],
  },
  {
    title: '6 Weeks Before',
    icon: Handshake,
    tasks: [
      'Schedule house-hunting trip (GRO covers expenses)',
      'Apply for rental properties or arrange viewings',
      'Research schools and enroll children',
      'Begin decluttering and organizing belongings',
    ],
    support: ['Temporary accommodation arranged for house-hunting trip'],
  },
  {
    title: '4 Weeks Before',
    icon: Box,
    tasks: [
      'Book moving company',
      'Arrange mail redirection and address changes',
      'Transfer utilities and internet services',
      'Organize pet transportation if needed',
    ],
    support: ['AU$5,000 relocation payment processed to your account'],
  },
  {
    title: '2 Weeks Before',
    icon: House,
    tasks: [
      'Confirm all moving arrangements',
      'Pack non-essential items',
      'Arrange temporary accommodation at destination',
      'Prepare important documents for easy access',
    ],
    support: ['GRO covers 14 days temporary accommodation costs'],
  },
  {
    title: 'Moving Week',
    icon: PlaneTakeoff,
    tasks: [
      'Complete final packing',
      'Coordinate with moving company',
      'Travel to new location',
      'Settle into temporary accommodation',
    ],
    support: ['HR check-in call and local orientation materials provided'],
  },
  {
    title: 'First Month',
    icon: Flag,
    tasks: [
      'Complete property settlement or rental setup',
      'Register with local services (GP, dentist, etc.)',
      'Enroll in local activities and community groups',
      'Begin your role at GRO Early Learning!',
    ],
    support: ['Monthly check-ins with HR to ensure smooth transition'],
  },
];

export default function MobileTimelineSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentRefs = itemRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <SectionWrapper className="md:hidden">
      <SectionHeader
        title="Your Moving Timeline & Checklist"
        subtitle="Plan your move with confidence. Here's your comprehensive timeline, with GRO's relocation support at every stage."
      />

      {/* Step Indicators */}
      <div className="flex justify-center space-x-2 mb-6">
        {steps.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-gro-teal scale-125' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <div className="space-y-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              data-index={index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl bg-white/90 border-l-4 border-gro-teal/40 shadow-md px-5 py-4"
            >
              <div className="flex items-center mb-2">
                <Icon className="h-6 w-6 text-gro-teal mr-2" />
                <h3 className="text-lg font-bold text-gro-darkgray">{step.title}</h3>
              </div>
              <div className="mb-2">
                <h4 className="text-gro-green text-sm font-semibold mb-1">Your Tasks:</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {step.tasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-gro-teal text-sm font-semibold mb-1">GRO Support:</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {step.support.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
} 