'use client';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';
import InvestmentCard from './InvestmentCard';

const investmentData = [
  {
    title: 'Formal Education',
    amount: '$2,500',
    frequency: 'per year',
    description: 'Tuition assistance for ECE qualifications',
    icon: 'graduation-cap' as const,
    includes: [
      'Diploma and degree programs',
      'ACECQA approved courses',
      'Professional certifications',
      'Exam and assessment fees',
    ],
    link: '/more-info/formal-education',
    linkLabel: 'Learn More',
    color: 'gro-green' as const,
  },
  {
    title: 'Professional Development',
    amount: '$1,200',
    frequency: 'per year',
    description: 'Workshops, conferences, and specialized training',
    icon: 'award' as const,
    includes: [
      'Industry conferences and seminars',
      'Skills-based workshops',
      'Leadership development programs',
      'Online learning platforms',
    ],
    link: '/more-info/professional-development',
    linkLabel: 'Learn More',
    color: 'gro-teal' as const,
  },
  {
    title: 'Mentorship Program',
    amount: 'Included',
    frequency: 'ongoing',
    description: 'Personal development with experienced mentors',
    icon: 'users' as const,
    includes: [
      'Monthly one-on-one sessions',
      'Goal setting and planning',
      'Career pathway guidance',
      'Performance coaching',
    ],
    link: '/more-info/mentorship',
    linkLabel: 'Learn More',
    color: 'gro-orange' as const,
  },
];

export default function ProfessionalDevelopmentSection() {
  return (
    <SectionWrapper className="bg-white">
      <SectionHeader
        title="Your Professional Development Investment"
        subtitle="We invest significantly in your growth with dedicated budgets for education, training, and mentorship — because your success is our success."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-12">
        {investmentData.map((item, index) => (
          <InvestmentCard key={index} index={index} {...item} />
        ))}
      </div>
    </SectionWrapper>
  );
} 