import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import LeadershipTeam from '@/components/LeadershipTeam';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeader from '@/components/SectionHeader';
import { leadershipTeamData } from '@/data/teamData';
import Link from 'next/link';

const heroData = {
  title: 'Meet Our Team',
  subtitle: 'Passionate leaders and educators dedicated to exceptional early childhood education',
  backgroundImage: '/GRO-Team.png',
  altText: 'GRO Early Learning team members working together',
  ctas: [
    { label: 'Join Our Team', href: '/jobs', variant: 'primary' as const },
    { label: 'Our Culture', href: '#culture', variant: 'secondary' as const }
  ]
};

export default function OurTeamPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero {...heroData} gradientFrom="gro-blue" gradientTo="gro-teal" />
        
        <LeadershipTeam members={leadershipTeamData} />

        {/* Culture Section */}
        <SectionWrapper id="culture" className="bg-gradient-to-br from-gro-green/5 to-gro-teal/5">
          <SectionHeader
            title="Our Culture"
            subtitle="A supportive, collaborative environment where every team member can thrive and make a meaningful impact."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-gro-teal/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gro-teal">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gro-darkblue">Innovation</h3>
              <p className="text-gro-gray leading-relaxed">
                We encourage creative thinking and new approaches to early childhood education, 
                always looking for ways to improve outcomes for children and families.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gro-orange/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gro-orange">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gro-darkblue">Collaboration</h3>
              <p className="text-gro-gray leading-relaxed">
                Our team works together across all levels, sharing knowledge and supporting 
                each other to achieve our common goals and deliver exceptional care.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gro-green/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-gro-green">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gro-darkblue">Growth</h3>
              <p className="text-gro-gray leading-relaxed">
                We invest in our people through continuous learning opportunities, mentorship, 
                and clear career progression paths that help everyone reach their potential.
              </p>
            </div>
          </div>
        </SectionWrapper>

        {/* Join Team CTA */}
        <SectionWrapper className="bg-white">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gro-darkblue">
              Ready to Join Our Team?
            </h2>
            <p className="text-lg text-gro-gray mb-8 leading-relaxed">
                           We&rsquo;re always looking for passionate educators who share our commitment to 
              excellence in early childhood education. Discover your next career opportunity with GRO.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/jobs"
                className="btn-touch focus-ring btn-gro-teal"
              >
                View Open Positions
              </Link>
              <Link
                href="/benefits"
                className="btn-touch focus-ring btn-secondary"
              >
                Learn About Benefits
              </Link>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  );
} 