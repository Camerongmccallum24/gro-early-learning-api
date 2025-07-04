import { FC } from "react";
import { Building2 } from "lucide-react";
import { getLocationTextColorClass } from "@/lib/locationColors";
import LocationJobBoard from "@/components/LocationJobBoard";

interface LocationJobsSectionProps {
  locationName: string;
  locationId: string;
}

const LocationJobsSection: FC<LocationJobsSectionProps> = ({
  locationName,
  locationId
}) => {
  const locationColorClass = getLocationTextColorClass(locationId);

  return (
    <section id="jobs" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Building2 className={locationColorClass} width={64} height={64} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gro-darkblue mb-4">Current Job Opportunities</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
            Explore the rewarding career paths available at GRO Early Learning in {locationName}.
          </p>
        </div>

        <LocationJobBoard location={locationId} />
      </div>
    </section>
  );
};

export default LocationJobsSection; 