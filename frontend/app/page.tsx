import Header from '../components/Header';
import Hero from '../components/Hero';
import CareerLocations from '../components/CareerLocations';
import Footer from '../components/Footer';
import WhyJoinSection from '../components/WhyJoinSection';

const locations = [
  {
    title: 'Mount Isa Careers',
    description: "Discover opportunities in Queensland's largest mining city",
    href: '/locations/mount-isa',
  },
  {
    title: 'Moranbah Careers',
    description: 'Join our team in the heart of the Bowen Basin',
    href: '/locations/moranbah',
  },
  {
    title: 'Charters Towers Careers',
    description: 'Explore roles in our historic gold rush town center',
    href: '/locations/charters-towers',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero
          title="Build Your Career with GRO Early Learning"
          subtitle="Join our passionate team across Queensland's mining communities"
          backgroundImage="/GRO-Team.png"
          altText="GRO Early Learning team members working together in a modern educational environment"
          ctas={[
            {
              label: "View Current Openings",
              href: "/jobs",
              variant: "primary"
            },
            {
              label: "Learn About Us",
              href: "/about",
              variant: "secondary"
            }
          ]}
        />
        <CareerLocations locations={locations} />
        <WhyJoinSection />
      </main>
      <Footer />
    </div>
  );
}
