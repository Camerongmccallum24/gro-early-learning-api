'use client';

import { FC } from 'react';

const pathwayStages = [
  { id: 1, title: 'Assistant Educator', duration: '12–18 months', active: true },
  { id: 2, title: 'Lead Educator', duration: '12–18 months' },
  { id: 3, title: 'Senior Educator', duration: '12–18 months' },
  { id: 4, title: 'Centre Director', duration: '12–18 months' },
];

const CareerPathwaySection: FC = () => {
  return (
    <section id="career-pathways" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gro-darkblue">
            Your Career Pathway
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Clear progression from Assistant Educator to Centre Director with defined milestones,
            timelines, and salary ranges at each level.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {pathwayStages.map(({ id, title, duration, active }) => (
            <div
              key={id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out ${
                active
                  ? 'bg-gro-green/10 border-gro-green shadow-lg'
                  : 'bg-white border-gray-200 hover:border-gro-green/40'
              } hover:shadow-md`}
            >
              <div className="text-center">
                <div
                  className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center font-bold text-sm ${
                    active ? 'bg-gro-green text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {id}
                </div>
                <h4 className="font-semibold text-sm text-gray-800 mb-1 break-words">{title}</h4>
                <p className="text-xs text-gray-600">{duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerPathwaySection; 