import { FC } from "react";
import { Truck } from "lucide-react";
import { getLocationTextColorClass } from "@/lib/locationColors";

interface LocationRelocationSectionProps {
  locationName: string;
  locationId: string;
}

const LocationRelocationSection: FC<LocationRelocationSectionProps> = ({ locationName, locationId }) => {
  const locationColorClass = getLocationTextColorClass(locationId);

  const relocationBenefits = [
    {
      icon: (
        <svg className="w-6 h-6 text-gro-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
        </svg>
      ),
      title: 'Housing Assistance',
      description: 'Support with finding suitable accommodation and temporary housing arrangements during your transition.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-gro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Relocation Allowance',
      description: 'Financial assistance to help cover moving costs and initial settling-in expenses.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-gro-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      title: 'Community Integration',
      description: 'Help connecting with local community groups, services, and establishing your new life in the area.'
    },
    {
      icon: (
        <svg className="w-6 h-6 text-gro-darkblue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
        </svg>
      ),
      title: 'Partner Support',
      description: 'Assistance for your partner in finding employment opportunities and career support in the new location.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Truck className={locationColorClass} width={64} height={64} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gro-darkblue mb-4">Relocation Support</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
            We&apos;re here to make your move to {locationName} as smooth as possible with comprehensive support and assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {relocationBenefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  {benefit.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-gro-teal rounded-full"></div>
              {locationName} Relocation Guide
            </h3>
            <h4 className="font-semibold text-gray-900 mb-4">Pre-Move Checklist</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gro-teal mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Research local housing options and costs
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gro-teal mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Connect with our relocation team
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gro-teal mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Arrange temporary accommodation
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gro-teal mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Transfer utilities and services
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-gro-teal mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Research schools and childcare options
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-gro-green rounded-full"></div>
              Local Tips
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Best Time to Move</h4>
                <p className="text-sm text-gray-600">April to September offers the most comfortable weather for relocating to {locationName}.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Getting Around</h4>
                <p className="text-sm text-gray-600">A reliable vehicle is essential for daily life and exploring the surrounding region.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Community Welcome</h4>
                <p className="text-sm text-gray-600">Join local clubs and community groups to quickly establish connections and friendships.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationRelocationSection; 