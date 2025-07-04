import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import MovingTimelineSection from '@/components/MovingTimelineSection';
import MobileTimelineSection from '@/components/MobileTimelineSection';
import RelocationGuideSection from '@/components/RelocationGuideSection';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeader from '@/components/SectionHeader';
import FeatureCard from '@/components/FeatureCard';
import { DollarSign, Home, Users, Phone } from 'lucide-react';
import Link from 'next/link';

const heroData = {
  title: 'Relocation Support',
  subtitle: 'Comprehensive assistance to make your move to Queensland smooth and stress-free',
  backgroundImage: '/GRO-Team.png',
  altText: 'Beautiful Queensland landscape with mining community',
  ctas: [
    { label: 'View Timeline', href: '#timeline', variant: 'primary' as const },
    { label: 'Download Guide', href: '/guides/relocation-guide.pdf', variant: 'secondary' as const }
  ]
};

const supportServices = [
  {
    icon: <DollarSign className="h-8 w-8 text-gro-teal mb-2" />,
    title: 'Financial Support',
    description: 'Up to $5,000 relocation payment to cover moving expenses, plus house-hunting trip costs covered by GRO.'
  },
  {
    icon: <Home className="h-8 w-8 text-gro-orange mb-2" />,
    title: 'Accommodation Assistance',
    description: '14 days temporary accommodation while you settle, plus help finding permanent housing in your new community.'
  },
  {
    icon: <Users className="h-8 w-8 text-gro-green mb-2" />,
    title: 'Community Integration',
    description: 'Local orientation sessions, community group introductions, and ongoing support to help you feel at home.'
  },
  {
    icon: <Phone className="h-8 w-8 text-gro-darkblue mb-2" />,
    title: 'Dedicated Support',
    description: 'Personal relocation coordinator and HR support throughout your entire moving process and beyond.'
  }
];

export default function RelocationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero {...heroData} gradientFrom="gro-green" gradientTo="gro-blue" />
        
        {/* Support Services */}
        <SectionWrapper className="bg-white">
          <SectionHeader
            title="Relocation Support Services"
            subtitle="Everything you need to make your move to Queensland successful."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {supportServices.map((service, index) => (
              <FeatureCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </SectionWrapper>

        {/* Timeline Sections */}
        <div id="timeline">
          <MovingTimelineSection />
          <MobileTimelineSection />
        </div>
        
        <RelocationGuideSection />

        {/* Contact CTA */}
        <SectionWrapper className="bg-gro-teal/5">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gro-darkblue">
              Ready to Start Your Relocation Journey?
            </h2>
            <p className="text-lg text-gro-gray mb-8 leading-relaxed">
              Our relocation team is here to support you every step of the way. Contact us to discuss 
              your specific needs and learn more about the opportunities waiting for you in Queensland.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/jobs"
                className="btn-touch focus-ring btn-gro-teal"
              >
                View Open Positions
              </Link>
              <a
                href="mailto:relocation@groearlylearning.com.au"
                className="btn-touch focus-ring btn-secondary"
              >
                Contact Relocation Team
              </a>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
} 