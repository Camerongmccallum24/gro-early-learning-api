'use client';

import Link from 'next/link';

type LocationCard = {
  title: string;
  description: string;
  href: string;
};

type CareerLocationsProps = {
  heading?: string;
  locations: LocationCard[];
};

export default function CareerLocations({
  heading = 'Explore Career Opportunities by Location',
  locations,
}: CareerLocationsProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gro-darkgray">{heading}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {locations.map((loc, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold mb-4 text-gro-darkgray">{loc.title}</h3>
              <p className="text-gray-600 mb-4">{loc.description}</p>
              <Link
                href={loc.href}
                className="text-gro-teal hover:underline font-medium inline-block transition-transform duration-200 hover:scale-105"
              >
                View {loc.title.split(' ')[0]} Jobs →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 