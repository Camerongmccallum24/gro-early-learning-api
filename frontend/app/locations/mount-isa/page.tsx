import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LocalBusinessSEO from '@/components/LocalBusinessSEO';
import LocationHero from '@/components/location/LocationHero';
import LocationCTA from '@/components/location/LocationCTA';
import LocationAboutSection from '@/components/location/LocationAboutSection';
import LocationCostOfLivingSection from '@/components/location/LocationCostOfLivingSection';
import LocationTestimonialsSection from '@/components/location/LocationTestimonialsSection';
import LocationRelocationSection from '@/components/location/LocationRelocationSection';
import LocationEducationHealthcareSection from '@/components/location/LocationEducationHealthcareSection';
import LocationMapSection from '@/components/location/LocationMapSection';
import LocationJobsSection from '@/components/location/LocationJobsSection';
import { locations } from '@/data/locationsData';

export default function MountIsaCareersPage() {
  const locationData = locations.find(loc => loc.id === 'mount-isa');

  if (!locationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Location Not Found</h1>
          <p className="text-gray-600">The requested location could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <LocalBusinessSEO location="Mount Isa" />
      <Header />
      
      <div className="min-h-screen">
        <LocationHero 
          locationName="Mount Isa"
          locationColor="mount-isa"
          description="Join our established Mount Isa team and build your career in early childhood education within one of Queensland's most iconic mining communities!"
        />

        <main>
          <LocationAboutSection 
            locationData={locationData}
            locationName="Mount Isa"
            locationId="mount-isa"
            description="Mount Isa is a vibrant mining town in northwest Queensland, known for its rich mining heritage, multicultural community, and excellent facilities. As a major regional hub, it offers excellent career opportunities and a unique outback lifestyle."
          />

          <LocationCostOfLivingSection 
            locationName="Mount Isa"
            locationId="mount-isa"
          />

          <LocationTestimonialsSection 
            locationName="Mount Isa"
            locationId="mount-isa"
          />

          <LocationRelocationSection 
            locationName="Mount Isa"
            locationId="mount-isa"
          />

          <LocationEducationHealthcareSection 
            locationData={locationData} 
            locationId="mount-isa"
          />

          <LocationMapSection 
            locationName="Mount Isa"
            mapUrl={locationData.mapUrl}
          />

          <LocationJobsSection 
            locationName="Mount Isa"
            locationId="mount-isa"
          />

          <LocationCTA 
            locationName="Mount Isa"
            locationColor="mount-isa"
            email={locationData.email}
            phone={locationData.phone}
          />
        </main>
      </div>
      
      <Footer />
    </>
  );
} 