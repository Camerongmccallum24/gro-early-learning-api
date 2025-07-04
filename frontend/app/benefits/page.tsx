import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeader from '@/components/SectionHeader';
import FeatureCard from '@/components/FeatureCard';
import QueenslandAdvantage from '@/components/QueenslandAdvantage';
import { 
  DollarSign, 
  Heart, 
  GraduationCap, 
  Calendar, 
  Shield, 
  Users,
  MapPin,
  Plane,
  Home,
  Coffee
} from 'lucide-react';

const heroData = {
  title: 'Benefits & Rewards',
  subtitle: 'Comprehensive benefits package designed to support your career and lifestyle',
  backgroundImage: '/GRO-Team.png',
  altText: 'Happy GRO Early Learning educator with children',
  ctas: [
    { label: 'View Positions', href: '/jobs', variant: 'primary' as const },
    { label: 'Relocation Support', href: '/relocation', variant: 'secondary' as const }
  ]
};

const corebenefits = [
  {
    icon: <DollarSign className="h-8 w-8 text-gro-teal mb-2" />,
    title: 'Competitive Salary',
    description: 'Above-market salaries with mining allowances and regional benefits, often 20-30% higher than metropolitan roles.'
  },
  {
    icon: <Heart className="h-8 w-8 text-gro-orange mb-2" />,
    title: 'Health & Wellbeing',
    description: 'Comprehensive health insurance, mental health support, and employee assistance programs for you and your family.'
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-gro-green mb-2" />,
    title: 'Professional Development',
    description: '$2,500 annual education budget plus $1,200 for professional development, conferences, and specialized training.'
  },
  {
    icon: <Calendar className="h-8 w-8 text-gro-darkblue mb-2" />,
    title: 'Work-Life Balance',
    description: 'Flexible scheduling, generous leave entitlements, and family-friendly policies that support your personal life.'
  },
  {
    icon: <Shield className="h-8 w-8 text-gro-teal mb-2" />,
    title: 'Job Security',
    description: 'Stable employment in growing communities with opportunities for permanent residency and long-term career growth.'
  },
  {
    icon: <Users className="h-8 w-8 text-gro-orange mb-2" />,
    title: 'Mentorship Program',
    description: 'Ongoing support from experienced educators with monthly one-on-one sessions and career pathway guidance.'
  }
];

const relocationBenefits = [
  {
    icon: <Plane className="h-8 w-8 text-gro-teal mb-2" />,
    title: 'Relocation Assistance',
    description: 'Up to $5,000 relocation payment plus house-hunting trip expenses and moving support.'
  },
  {
    icon: <Home className="h-8 w-8 text-gro-green mb-2" />,
    title: 'Accommodation Support',
    description: '14 days temporary accommodation plus assistance finding permanent housing in your new community.'
  },
  {
    icon: <MapPin className="h-8 w-8 text-gro-orange mb-2" />,
    title: 'Settlement Services',
    description: 'Local orientation, community connections, and ongoing support to help you settle into your new home.'
  },
  {
    icon: <Coffee className="h-8 w-8 text-gro-darkblue mb-2" />,
    title: 'Community Integration',
    description: 'Introduction to local groups, activities, and services to help you build connections in your new community.'
  }
];

export default function BenefitsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero {...heroData} gradientFrom="gro-green" gradientTo="gro-orange" />
        
        {/* Core Benefits */}
        <SectionWrapper className="bg-white">
          <SectionHeader
            title="Core Benefits Package"
            subtitle="Everything you need to thrive in your career and personal life."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {corebenefits.map((benefit, index) => (
              <FeatureCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </SectionWrapper>

        {/* Relocation Benefits */}
        <SectionWrapper className="bg-gradient-to-br from-gro-green/5 to-gro-teal/5">
          <SectionHeader
            title="Relocation Support"
            subtitle="Comprehensive assistance to make your move to Queensland smooth and stress-free."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
            {relocationBenefits.map((benefit, index) => (
              <FeatureCard
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>

          <div className="text-center">
            <a
              href="/relocation"
              className="btn-touch focus-ring btn-gro-teal"
            >
              Learn More About Relocation
            </a>
          </div>
        </SectionWrapper>

        {/* Queensland Advantage */}
        <QueenslandAdvantage />

        {/* Salary Breakdown */}
        <SectionWrapper className="bg-white">
          <SectionHeader
            title="Salary & Compensation"
            subtitle="Transparent, competitive compensation with regional benefits."
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gro-teal/5 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gro-darkblue">Assistant Educator</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gro-gray">Base Salary</span>
                    <span className="font-semibold text-gro-darkblue">$55,000 - $65,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gro-gray">Regional Allowance</span>
                    <span className="font-semibold text-gro-teal">$8,000 - $12,000</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold text-gro-darkblue">Total Package</span>
                    <span className="font-bold text-gro-teal">$63,000 - $77,000</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gro-green/5 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-gro-darkblue">Lead Educator</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gro-gray">Base Salary</span>
                    <span className="font-semibold text-gro-darkblue">$70,000 - $85,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gro-gray">Regional Allowance</span>
                    <span className="font-semibold text-gro-green">$12,000 - $18,000</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-semibold text-gro-darkblue">Total Package</span>
                    <span className="font-bold text-gro-green">$82,000 - $103,000</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center bg-gro-orange/5 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-2 text-gro-darkblue">Additional Benefits Value</h4>
              <p className="text-gro-gray mb-3">
                Health insurance, professional development, and other benefits add an estimated 
                <span className="font-semibold text-gro-orange"> $8,000 - $12,000 </span>
                annual value to your total compensation package.
              </p>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
} 