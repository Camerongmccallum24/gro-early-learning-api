import { FC } from "react";
import { getLocationGradientClasses, getLocationBgColorClass } from "@/lib/locationColors";

interface LocationCTAProps {
  locationName: string;
  locationColor: 'mount-isa' | 'moranbah' | 'charters-towers';
  email: string;
  phone: string;
}

const LocationCTA: FC<LocationCTAProps> = ({ 
  locationName, 
  locationColor, 
  email, 
  phone 
}) => {
  return (
    <section className={`bg-gradient-to-r ${getLocationGradientClasses(locationColor)} text-white text-center py-16 rounded-xl`}>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
        Ready to Grow Your Career in {locationName}?
      </h2>
      <p className="text-lg sm:text-xl lg:text-2xl opacity-95 max-w-3xl mx-auto mb-8">
        We&apos;re excited to hear from passionate educators and support staff. Connect with us to learn more about our team and how you can make a difference.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <a
          href={`mailto:${email}`}
          className="bg-gro-darkblue text-white px-8 py-4 rounded-full font-bold text-lg sm:text-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:bg-gro-darkblue/90"
        >
          Email Us
        </a>
        <a
          href={`tel:${phone}`}
          className={`${getLocationBgColorClass(locationColor)} text-white px-8 py-4 rounded-full font-bold text-lg sm:text-xl shadow-lg transform hover:scale-105 transition-all duration-300 hover:opacity-90`}
        >
          Call Us
        </a>
      </div>
    </section>
  );
};

export default LocationCTA; 