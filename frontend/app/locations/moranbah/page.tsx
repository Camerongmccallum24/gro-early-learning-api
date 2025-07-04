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

export default function MoranbahCareersPage() {
  const locationData = locations.find(loc => loc.id === 'moranbah');

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
      <LocalBusinessSEO location="Moranbah" />
      <Header />
      
      <div className="min-h-screen">
        <LocationHero 
          locationName="Moranbah"
          locationColor="moranbah"
          description="Join our dynamic Moranbah team and build your career in early childhood education within one of Queensland's most vibrant mining communities!"
        />

        <main>
          <LocationAboutSection 
            locationData={locationData}
            locationName="Moranbah"
            locationId="moranbah"
            description="Moranbah is a thriving mining town in the heart of Queensland's Bowen Basin, known for its strong community spirit, excellent facilities, and proximity to some of the world's largest coal mines. Opening in January 2026, our new centre will serve this growing community."
          />

          <LocationCostOfLivingSection 
            locationName="Moranbah"
            locationId="moranbah"
          />

          <LocationTestimonialsSection 
            locationName="Moranbah"
            locationId="moranbah"
          />

          <LocationRelocationSection 
            locationName="Moranbah"
            locationId="moranbah"
          />

          <LocationEducationHealthcareSection 
            locationData={locationData} 
            locationId="moranbah"
          />

          <LocationMapSection 
            locationName="Moranbah"
            mapUrl={locationData.mapUrl}
          />

          <LocationJobsSection 
            locationName="Moranbah"
            locationId="moranbah"
          />

          <LocationCTA 
            locationName="Moranbah"
            locationColor="moranbah"
            email={locationData.email}
            phone={locationData.phone}
          />
        </main>
      </div>
      
      <Footer />
    </>
  );
} 