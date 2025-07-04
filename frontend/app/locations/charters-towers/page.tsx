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

export default function ChartersTowersCareersPage() {
  const locationData = locations.find(loc => loc.id === 'charters-towers');

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
      <LocalBusinessSEO location="Charters Towers" />
      <Header />
      
      <div className="min-h-screen">
        <LocationHero 
          locationName="Charters Towers"
          locationColor="charters-towers"
          description="Join our exciting Charters Towers team and build your career in early childhood education within this historic Queensland town with a bright future!"
        />

        <main>
          <LocationAboutSection 
            locationData={locationData}
            locationName="Charters Towers"
            locationId="charters-towers"
            description="Charters Towers is a historic gold mining town with a rich heritage and strong community spirit. Known for its Victorian architecture and friendly atmosphere, it offers an excellent quality of life with modern amenities and regional accessibility."
          />

          <LocationCostOfLivingSection 
            locationName="Charters Towers"
            locationId="charters-towers"
          />

          <LocationTestimonialsSection 
            locationName="Charters Towers"
            locationId="charters-towers"
          />

          <LocationRelocationSection 
            locationName="Charters Towers"
            locationId="charters-towers"
          />

          <LocationEducationHealthcareSection 
            locationData={locationData} 
            locationId="charters-towers"
          />

          <LocationMapSection 
            locationName="Charters Towers"
            mapUrl={locationData.mapUrl}
          />

          <LocationJobsSection 
            locationName="Charters Towers"
            locationId="charters-towers"
          />

          <LocationCTA 
            locationName="Charters Towers"
            locationColor="charters-towers"
            email={locationData.email}
            phone={locationData.phone}
          />
        </main>
      </div>
      
      <Footer />
    </>
  );
} 