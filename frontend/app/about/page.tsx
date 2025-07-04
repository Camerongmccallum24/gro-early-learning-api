import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeader from '@/components/SectionHeader';
import FeatureCard from '@/components/FeatureCard';
import { Heart, Users, Award, Target } from 'lucide-react';

const heroData = {
  title: 'About GRO Early Learning',
  subtitle: 'Nurturing young minds through exceptional early childhood education in Queensland mining communities',
  backgroundImage: '/GRO-Team.png',
  altText: 'Children playing and learning at GRO Early Learning centre',
  ctas: [
    { label: 'Our Mission', href: '#mission', variant: 'primary' as const },
    { label: 'Join Our Team', href: '/jobs', variant: 'secondary' as const }
  ]
};

const missionValues = [
  {
    icon: <Heart className="h-8 w-8 text-gro-teal mb-2" />,
    title: 'Child-Centered Care',
    description: 'Every decision we make prioritizes the wellbeing, development, and happiness of the children in our care.'
  },
  {
    icon: <Users className="h-8 w-8 text-gro-orange mb-2" />,
    title: 'Community Connection',
    description: 'We build strong relationships with families and contribute positively to the mining communities we serve.'
  },
  {
    icon: <Award className="h-8 w-8 text-gro-green mb-2" />,
    title: 'Excellence in Education',
    description: 'Our qualified educators deliver high-quality, play-based learning experiences that prepare children for life.'
  },
  {
    icon: <Target className="h-8 w-8 text-gro-darkblue mb-2" />,
    title: 'Purpose-Driven',
    description: 'We are committed to making a meaningful difference in early childhood education across regional Queensland.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero {...heroData} gradientFrom="gro-teal" gradientTo="gro-green" />
        
        {/* Mission Section */}
        <SectionWrapper id="mission" className="bg-white">
          <SectionHeader
            title="Our Mission"
            subtitle="To provide exceptional early childhood education and care that nurtures each child&rsquo;s unique potential while supporting families in Queensland&rsquo;s mining communities."
          />
          
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg text-gro-gray leading-relaxed mb-6">
              GRO Early Learning was founded with a vision to bridge the gap in quality early childhood education 
              in regional Queensland. We understand the unique challenges facing families in mining communities and 
              are committed to providing world-class educational experiences that prepare children for a bright future.
            </p>
            <p className="text-lg text-gro-gray leading-relaxed">
              Our centers are more than just childcare facilities – they are vibrant learning communities where 
              children develop the social, emotional, and cognitive skills they need to thrive.
            </p>
          </div>
        </SectionWrapper>

        {/* Values Section */}
        <SectionWrapper className="bg-gradient-to-br from-gro-green/5 to-gro-teal/5">
          <SectionHeader
            title="Our Values"
            subtitle="The principles that guide everything we do at GRO Early Learning."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {missionValues.map((value, index) => (
              <FeatureCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </SectionWrapper>

        {/* Story Section */}
        <SectionWrapper className="bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gro-darkblue">
                Our Story
              </h2>
              <p className="text-gro-gray mb-4 leading-relaxed">
                GRO Early Learning began as a response to the growing need for quality early childhood 
                education in Queensland&rsquo;s mining regions. Our founders recognized that families in these 
                communities deserved access to the same high-quality educational opportunities available 
                in metropolitan areas.
              </p>
              <p className="text-gro-gray mb-4 leading-relaxed">
                Since our establishment, we have grown to serve multiple communities across Queensland, 
                each center designed to meet the specific needs of local families while maintaining our 
                commitment to educational excellence.
              </p>
              <p className="text-gro-gray leading-relaxed">
                Today, GRO Early Learning is proud to be a trusted partner for families and a valued 
                employer for passionate early childhood educators who want to make a real difference 
                in their communities.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gro-teal/10 rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-4 text-gro-darkblue">By the Numbers</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gro-gray">Centers Operating</span>
                    <span className="text-2xl font-bold text-gro-teal">12+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gro-gray">Children Served Daily</span>
                    <span className="text-2xl font-bold text-gro-teal">800+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gro-gray">Qualified Educators</span>
                    <span className="text-2xl font-bold text-gro-teal">150+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gro-gray">Years of Experience</span>
                    <span className="text-2xl font-bold text-gro-teal">10+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
} 