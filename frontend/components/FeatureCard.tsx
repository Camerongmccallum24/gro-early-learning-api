'use client';

import { ReactNode } from 'react';

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-lg border bg-white text-gro-darkblue shadow-sm h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-l-4 border-l-transparent hover:border-l-gro-teal group p-4">
      <div className="flex flex-col space-y-1.5 pb-3">
        <div className="flex justify-start">
          {icon}
        </div>
        <h3 className="tracking-tight text-lg font-semibold font-serif">
          {title}
        </h3>
      </div>
      <div className="pt-0">
        <p className="text-sm leading-relaxed text-gro-gray font-sans">
          {description}
        </p>
      </div>
    </div>
  );
} 