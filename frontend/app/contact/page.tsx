import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import ContactInfo from '@/components/ContactInfo';
import SectionWrapper from '@/components/SectionWrapper';

const heroData = {
  title: 'Contact Us',
  subtitle: 'Get in touch with our team. We\'re here to help with your career journey and answer any questions you may have.',
  backgroundImage: '/GRO-Team.png',
  altText: 'GRO Early Learning team ready to help with your inquiries',
  ctas: [
    { label: 'Send Message', href: '#contact-form', variant: 'primary' as const },
    { label: 'View Locations', href: '#locations', variant: 'secondary' as const }
  ]
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero {...heroData} gradientFrom="gro-darkblue" gradientTo="gro-darkgray" />
        
        {/* Contact Information */}
        <ContactInfo />
        
        {/* Contact Form & Quick Links */}
        <SectionWrapper id="contact-form" className="bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-7xl mx-auto">
            <ContactForm />
            <div className="space-y-6">
              {/* Quick Links */}
              <div className="bg-white rounded-lg border shadow-sm p-6">
                <h3 className="text-xl font-bold text-gro-darkblue mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <QuickLink href="/jobs">Browse Current Job Openings</QuickLink>
                  <QuickLink href="/professional-development">View Training Programs</QuickLink>
                  <QuickLink href="/benefits">Explore Benefits Package</QuickLink>
                  <QuickLink href="/relocation">Relocation Support</QuickLink>
                  <QuickLink href="/faq">Frequently Asked Questions</QuickLink>
                </div>
              </div>
              
              {/* Office Hours */}
              <div className="bg-gro-teal/5 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gro-darkblue mb-4">Office Hours</h3>
                <div className="space-y-2 text-sm text-gro-gray">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday - Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
                <p className="text-xs text-gro-gray mt-4">
                  All times are in Australian Eastern Standard Time (AEST)
                </p>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
}

function QuickLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="flex items-center w-full p-3 text-left rounded-md border border-gray-200 hover:border-gro-teal hover:bg-gro-teal/5 transition-colors group"
    >
      <span className="text-sm text-gro-darkblue group-hover:text-gro-teal">
        {children}
      </span>
    </a>
  );
} 