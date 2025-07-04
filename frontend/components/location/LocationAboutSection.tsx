import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Heart } from "lucide-react";
import { getLocationTextColorClass, getLocationBadgeClasses } from "@/lib/locationColors";

interface LocationData {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  lifestyle: {
    population: string;
    climate: string;
    communityVibe: string;
    keyIndustries: string[];
    partnerEmploymentOpportunities: string;
    proximityToMajorHubs: string;
  };
}

interface LocationAboutSectionProps {
  locationData: LocationData;
  locationName: string;
  description: string;
  locationId?: string;
}

const LocationAboutSection: FC<LocationAboutSectionProps> = ({
  locationData,
  description,
  locationId = 'mount-isa'
}) => {
  const locationColorClass = getLocationTextColorClass(locationId);

  return (
    <section className="mb-16">
      <div className="text-center mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto">
        <div className="flex justify-center items-center mb-4">
          <Heart className={locationColorClass} width={64} height={64} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gro-darkblue mb-4">Vibrant Community</h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <Card className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl font-semibold text-gro-darkblue mb-4">About Our Centre</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gro-gray text-base mb-4">{locationData.description}</p>
            <div className="space-y-2">
              <div className="flex items-center text-gro-gray">
                <MapPin className={`h-4 w-4 mr-2 ${locationColorClass}`} />
                <span className="text-sm">{locationData.address}</span>
              </div>
              <div className="flex items-center text-gro-gray">
                <Phone className={`h-4 w-4 mr-2 ${locationColorClass}`} />
                <span className="text-sm font-medium hover:text-gro-teal">{locationData.phone}</span>
              </div>
              <div className="flex items-center text-gro-gray">
                <Mail className={`h-4 w-4 mr-2 ${locationColorClass}`} />
                <span className="text-sm font-medium hover:text-gro-teal">{locationData.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl font-semibold text-gro-darkblue mb-4">Community & Lifestyle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gro-darkblue mb-2">Population</h4>
                <p className="text-gro-gray text-sm">{locationData.lifestyle.population}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gro-darkblue mb-2">Climate</h4>
                <p className="text-gro-gray text-sm">{locationData.lifestyle.climate}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gro-darkblue mb-2">Community Vibe</h4>
                <p className="text-gro-gray text-sm">{locationData.lifestyle.communityVibe}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl sm:text-2xl font-semibold text-gro-darkblue mb-4">Economic Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gro-darkblue mb-2">Key Industries</h4>
                <div className="flex flex-wrap gap-2">
                  {locationData.lifestyle.keyIndustries.map((industry, idx) => (
                    <Badge key={idx} className={getLocationBadgeClasses(locationId)}>{industry}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gro-darkblue mb-2">Partner Employment</h4>
                <p className="text-gro-gray text-sm">{locationData.lifestyle.partnerEmploymentOpportunities}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gro-darkblue mb-2">Proximity to Major Hubs</h4>
                <p className="text-gro-gray text-sm">{locationData.lifestyle.proximityToMajorHubs}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LocationAboutSection; 