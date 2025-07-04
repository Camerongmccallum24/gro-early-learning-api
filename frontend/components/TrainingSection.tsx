'use client';

import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';
import TrainingCard from './TrainingCard';
import { useInViewAnimation } from '@/lib/hooks/useInViewAnimation';

const trainingData = [
  {
    title: 'Foundational Certificate',
    duration: '2 weeks',
    description: 'Introduction to early childhood education with hands-on learning.',
  },
  {
    title: 'Leadership Accelerator',
    duration: '1 month',
    description: 'Sharpen management skills for lead educator roles.',
  },
  {
    title: 'Inclusion & Diversity',
    duration: '3 weeks',
    description: 'Training for supporting diverse learners and inclusive practices.',
  },
];

type TrainingCardWrapperProps = {
  title: string;
  duration: string;
  description: string;
  index: number;
};

function TrainingCardWrapper({ title, duration, description, index }: TrainingCardWrapperProps) {
  const { ref, isVisible } = useInViewAnimation();

  return (
    <div
      ref={ref}
      className={`transition-opacity transform duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <TrainingCard title={title} duration={duration} description={description} />
    </div>
  );
}

export default function TrainingSection() {
  return (
    <SectionWrapper className="bg-gradient-to-br from-gro-green/5 to-gro-teal/5">
      <SectionHeader
        title="Comprehensive Training Programs"
        subtitle="Invest in your future with our extensive training programs designed to advance your skills and accelerate your career growth in early childhood education."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
        {trainingData.map((item, index) => (
          <TrainingCardWrapper key={index} index={index} {...item} />
        ))}
      </div>
    </SectionWrapper>
  );
} 