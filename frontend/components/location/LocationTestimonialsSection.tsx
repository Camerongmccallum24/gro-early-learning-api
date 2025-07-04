import { FC } from "react";
import { Users } from "lucide-react";
import LocationTestimonials from "./LocationTestimonials";
import { getLocationTextColorClass } from "@/lib/locationColors";

interface LocationTestimonialsSectionProps {
  locationName: string;
  locationId: string;
}

const LocationTestimonialsSection: FC<LocationTestimonialsSectionProps> = ({
  locationName,
  locationId
}) => {
  const locationColorClass = getLocationTextColorClass(locationId);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4 animate-fade-in">
            <Users className={locationColorClass} width={64} height={64} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gro-darkblue mb-4">What Our Team Says</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
            Hear from our {locationName} team members about their experience living and working here.
          </p>
        </div>

        <LocationTestimonials location={locationId} />
      </div>
    </section>
  );
};

export default LocationTestimonialsSection; 