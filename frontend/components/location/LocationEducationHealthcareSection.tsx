import { FC } from "react";
import { School } from "lucide-react";
import { getLocationTextColorClass } from "@/lib/locationColors";

interface LocationData {
  lifestyle: {
    education: {
      schools: string[];
      university: string;
    };
    healthcare: {
      hospital: string;
      medical: string;
    };
    recreation: string[];
  };
}

interface LocationEducationHealthcareSectionProps {
  locationData: LocationData;
  locationId?: string;
}

const LocationEducationHealthcareSection: FC<LocationEducationHealthcareSectionProps> = ({ 
  locationData,
  locationId = 'mount-isa'
}) => {
  const locationColorClass = getLocationTextColorClass(locationId);

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <School className={locationColorClass} width={64} height={64} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gro-darkblue mb-4">Education & Healthcare</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
            Access quality schooling and essential health services for you and your family.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-gro-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Education
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Schools</h4>
                <ul className="space-y-2">
                  {locationData.lifestyle.education.schools.map((school: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gro-teal rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{school}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Higher Education</h4>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gro-teal rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{locationData.lifestyle.education.university}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Healthcare */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-gro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Healthcare
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Hospital Services</h4>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gro-green rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{locationData.lifestyle.healthcare.hospital}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Medical Services</h4>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gro-green rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{locationData.lifestyle.healthcare.medical}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Recreation</h4>
                <ul className="space-y-2">
                  {locationData.lifestyle.recreation.map((activity: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gro-orange rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationEducationHealthcareSection; 