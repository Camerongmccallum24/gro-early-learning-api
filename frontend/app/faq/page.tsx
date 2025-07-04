import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeader from '@/components/SectionHeader';

const heroData = {
  title: 'Frequently Asked Questions',
  subtitle: 'Find answers to common questions about careers at GRO Early Learning',
  backgroundImage: '/GRO-Team.png',
  altText: 'GRO Early Learning educator helping children learn',
  ctas: [
    { label: 'Browse FAQs', href: '#faq', variant: 'primary' as const },
    { label: 'Contact Us', href: '/contact', variant: 'secondary' as const }
  ]
};

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero {...heroData} gradientFrom="gro-orange" gradientTo="gro-blue" />
        
        <div id="faq">
          <FaqSection />
        </div>

        {/* Additional Support */}
        <SectionWrapper className="bg-white">
          <SectionHeader
            title="Still Have Questions?"
            subtitle="We're here to help you with any additional questions about working at GRO Early Learning."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-gro-teal/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gro-darkblue">Email Support</h3>
              <p className="text-gro-gray mb-4">
                               Send us your questions and we&rsquo;ll get back to you within 24 hours.
              </p>
              <a
                href="mailto:careers@groearlylearning.com.au"
                className="text-gro-teal hover:text-gro-darkblue font-medium"
              >
                careers@groearlylearning.com.au
              </a>
            </div>
            
            <div className="text-center">
              <div className="bg-gro-orange/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gro-darkblue">Phone Support</h3>
              <p className="text-gro-gray mb-4">
                Speak directly with our recruitment team during business hours.
              </p>
              <a
                href="tel:1800-GRO-JOBS"
                className="text-gro-teal hover:text-gro-darkblue font-medium"
              >
                1800 GRO JOBS
              </a>
            </div>
            
            <div className="text-center">
              <div className="bg-gro-green/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gro-darkblue">Live Chat</h3>
              <p className="text-gro-gray mb-4">
                Chat with our team for immediate answers to your questions.
              </p>
              <button className="text-gro-teal hover:text-gro-darkblue font-medium">
                Start Live Chat
              </button>
            </div>
          </div>
        </SectionWrapper>

        {/* Resource Downloads */}
        <SectionWrapper className="bg-gradient-to-br from-gro-green/5 to-gro-teal/5">
          <SectionHeader
            title="Helpful Resources"
            subtitle="Download guides and information to help you learn more about GRO Early Learning."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <a
              href="/guides/career-guide.pdf"
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center mb-3">
                <div className="bg-gro-teal/10 rounded p-2 mr-3">
                  <span className="text-gro-teal">📋</span>
                </div>
                <h4 className="font-semibold text-gro-darkblue group-hover:text-gro-teal">
                  Career Guide
                </h4>
              </div>
              <p className="text-sm text-gro-gray">
                Complete guide to career opportunities and progression pathways at GRO.
              </p>
            </a>
            
            <a
              href="/guides/relocation-guide.pdf"
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center mb-3">
                <div className="bg-gro-orange/10 rounded p-2 mr-3">
                  <span className="text-gro-orange">🏠</span>
                </div>
                <h4 className="font-semibold text-gro-darkblue group-hover:text-gro-teal">
                  Relocation Guide
                </h4>
              </div>
              <p className="text-sm text-gro-gray">
                Everything you need to know about relocating to Queensland mining communities.
              </p>
            </a>
            
            <a
              href="/guides/benefits-summary.pdf"
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center mb-3">
                <div className="bg-gro-green/10 rounded p-2 mr-3">
                  <span className="text-gro-green">💰</span>
                </div>
                <h4 className="font-semibold text-gro-darkblue group-hover:text-gro-teal">
                  Benefits Summary
                </h4>
              </div>
              <p className="text-sm text-gro-gray">
                Detailed breakdown of salary, benefits, and professional development opportunities.
              </p>
            </a>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
} 