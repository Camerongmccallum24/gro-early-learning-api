import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ProfessionalDevelopmentSection from '@/components/ProfessionalDevelopmentSection';
import TrainingSection from '@/components/TrainingSection';
import CareerPathwaySection from '@/components/CareerPathwaySection';
import CareerLocations from '@/components/CareerLocations';

const heroData = {
  title: 'Professional Development',
  subtitle: 'Invest in your future with comprehensive training and clear career progression pathways',
  backgroundImage: '/GRO-Team.png',
  altText: 'Professional development training session at GRO Early Learning',
  ctas: [
    { label: 'View Career Paths', href: '#career-pathways', variant: 'primary' as const },
    { label: 'Apply Now', href: '/jobs', variant: 'secondary' as const }
  ]
};

export default function ProfessionalDevelopmentPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero {...heroData} gradientFrom="gro-teal" gradientTo="gro-orange" />
        
        <ProfessionalDevelopmentSection />
        
        <TrainingSection />
        
        <CareerPathwaySection />
        
        <CareerLocations 
          locations={[
            {
              title: 'Mount Isa Careers',
              description: 'Join our team in this vibrant mining community with excellent career opportunities and lifestyle benefits.',
              href: '/jobs?location=mount-isa'
            },
            {
              title: 'Moranbah Careers', 
              description: 'Be part of our growing centre in the heart of Queensland\'s mining region with competitive packages.',
              href: '/jobs?location=moranbah'
            },
            {
              title: 'Charters Towers Careers',
              description: 'Discover opportunities in this historic town with modern facilities and strong community connections.',
              href: '/jobs?location=charters-towers'
            }
          ]}
        />
      </main>
      <Footer />
    </div>
  );
} 