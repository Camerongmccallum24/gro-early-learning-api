'use client';

import { CalendarCheck, Handshake, Box, House, PlaneTakeoff, Flag } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeader from '@/components/SectionHeader';
import clsx from 'clsx';

const TIMELINE = [
  {
    icon: CalendarCheck,
    title: '8 Weeks Before',
    tasks: [
      'Accept job offer and confirm start date',
      'Complete GRO relocation benefit application',
      'Begin researching housing options online',
      'Notify current employer and arrange transition'
    ],
    support: [
      'HR provides relocation packet and dedicated support contact'
    ]
  },
  {
    icon: Handshake,
    title: '6 Weeks Before',
    tasks: [
      'Schedule house-hunting trip (GRO covers expenses)',
      'Apply for rental properties or arrange viewings',
      'Research schools and enroll children',
      'Begin decluttering and organizing belongings'
    ],
    support: [
      'Temporary accommodation arranged for house-hunting trip'
    ]
  },
  {
    icon: Box,
    title: '4 Weeks Before',
    tasks: [
      'Book moving company (get quotes from GRO-recommended vendors)',
      'Arrange mail redirection and address changes',
      'Transfer utilities and internet services',
      'Organize pet transportation if needed'
    ],
    support: [
      'AU$5,000 relocation payment processed to your account'
    ]
  },
  {
    icon: House,
    title: '2 Weeks Before',
    tasks: [
      'Confirm all moving arrangements',
      'Pack non-essential items',
      'Arrange temporary accommodation at destination',
      'Prepare important documents for easy access'
    ],
    support: [
      'GRO covers 14 days temporary accommodation costs'
    ]
  },
  {
    icon: PlaneTakeoff,
    title: 'Moving Week',
    tasks: [
      'Complete final packing',
      'Coordinate with moving company',
      'Travel to new location',
      'Settle into temporary accommodation'
    ],
    support: [
      'HR check-in call and local orientation materials provided'
    ]
  },
  {
    icon: Flag,
    title: 'First Month',
    tasks: [
      'Complete property settlement or rental setup',
      'Register with local services (GP, dentist, etc.)',
      'Enroll in local activities and community groups',
      'Begin your role at GRO Early Learning!'
    ],
    support: [
      'Monthly check-ins with HR to ensure smooth transition'
    ]
  }
];

function TimelineItem({ item, index }: { item: (typeof TIMELINE)[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const Icon = item.icon;
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={clsx(
        'group flex flex-col relative z-10 transition-all duration-700 ease-out',
        isLeft ? 'md:col-start-1 md:items-end pr-0 md:pr-10' : 'md:col-start-2 md:items-start pl-0 md:pl-10',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="rounded-lg border text-card-foreground w-full max-w-xl shadow-lg border-gro-teal/30 border-l-4 bg-white/90">
        <div className="flex p-4 flex-row items-center space-y-0 pb-2">
          <Icon className="h-7 w-7 text-gro-teal mr-2" />
          <h3 className="tracking-tight text-xl font-bold text-gro-darkblue">{item.title}</h3>
        </div>
        <div className="p-4 pt-0">
          <div className="mb-2">
            <h4 className="font-semibold text-gro-green text-sm mb-1">Your Tasks:</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-2">
              {item.tasks.map((task, idx) => (
                <li key={idx}>{task}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gro-teal text-sm mb-1">GRO Support:</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-2">
              {item.support.map((sup, idx) => (
                <li key={idx}>{sup}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <span
        className="hidden md:block absolute left-1/2 w-5 h-5 bg-gro-teal border-4 border-white rounded-full shadow -translate-x-1/2"
        style={{ top: `calc(${index * 20}%)`, zIndex: 20 }}
      />
    </div>
  );
}

export default function MovingTimelineSection() {
  return (
    <SectionWrapper className="bg-gradient-to-br from-gro-green/10 to-gro-teal/10 hidden md:block">
      <SectionHeader
        title="Your Moving Timeline & Checklist"
        subtitle="Plan your move with confidence. Here's your comprehensive timeline, with GRO's relocation support at every stage."
      />
      <div className="relative">
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-1 bg-gro-teal/20 z-0 transform -translate-x-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
          {TIMELINE.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
} 