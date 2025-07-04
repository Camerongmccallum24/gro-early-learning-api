import { FC } from "react";
import { Calculator } from "lucide-react";
import { locations } from '@/data/locationsData';
import { getLocationTextColorClass } from "@/lib/locationColors";

interface LocationCostOfLivingSectionProps {
  locationName: string;
  locationId: string;
}

const LocationCostOfLivingSection: FC<LocationCostOfLivingSectionProps> = ({ locationName, locationId }) => {
  const locationData = locations.find(loc => loc.id === locationId);
  const locationColorClass = getLocationTextColorClass(locationId);

  if (!locationData) {
    return null;
  }

  const { costOfLiving } = locationData;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Calculator className={locationColorClass} width={64} height={64} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gro-darkblue mb-4">Cost of Living & Calculator</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
            Get an understanding of what it would cost to live and work in {locationName}. Our cost of living calculator helps you make an informed decision.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Cost of Living Calculator */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Cost of Living Calculator</h3>
              <p className="text-sm text-gray-600">Based on {locationName}</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Rent (2 bedroom)</span>
                <span className="font-semibold text-gray-900">{costOfLiving.averageRent.twoBedroom}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Utilities (monthly)</span>
                <span className="font-semibold text-gray-900">{costOfLiving.utilities}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Groceries (weekly)</span>
                <span className="font-semibold text-gray-900">{costOfLiving.groceries}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Fuel (per litre)</span>
                <span className="font-semibold text-gray-900">{costOfLiving.fuel}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-700">Transport</span>
                <span className="font-semibold text-gray-900">{costOfLiving.publicTransport}</span>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Overall Rating:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    costOfLiving.overallCostRating === 'High' ? 'bg-red-100 text-red-800' :
                    costOfLiving.overallCostRating === 'Moderate to High' ? 'bg-orange-100 text-orange-800' :
                    costOfLiving.overallCostRating === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {costOfLiving.overallCostRating}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Amenities */}
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-gro-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-3 4h2m-2 0v-2m0 2v2" />
                </svg>
                Shopping & Dining
              </h3>
              <ul className="space-y-2">
                {locationData.lifestyle.shopping.map((shop, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-gro-teal rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{shop}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-gro-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Transport & Access
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-700">Airport:</span>
                  <p className="text-gray-600 text-sm">{locationData.lifestyle.transport.airport}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Rail:</span>
                  <p className="text-gray-600 text-sm">{locationData.lifestyle.transport.rail}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700">Local Transport:</span>
                  <p className="text-gray-600 text-sm">{locationData.lifestyle.transport.local}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Cost Considerations</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {costOfLiving.notes}
              </p>
              {costOfLiving.statsSource && (
                <p className="text-xs text-gray-500 mt-3">
                  <span className="font-medium">Source:</span> {costOfLiving.statsSource}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationCostOfLivingSection; 