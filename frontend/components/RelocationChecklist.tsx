'use client';

import { Download, CircleCheckBig } from 'lucide-react';
import { relocationData } from '@/data/relocationData';

type RelocationChecklistProps = {
  location: keyof typeof relocationData;
};

export function RelocationChecklist({ location }: RelocationChecklistProps) {
  const data = relocationData[location];
  const Icon = data.icon;

  return (
    <div className="rounded-lg border text-card-foreground bg-white shadow-lg max-w-3xl mx-auto">
      <div className="flex flex-col space-y-1.5 p-4">
        <h3 className="text-xl font-semibold flex items-center text-gro-darkblue">
          <Icon className="h-5 w-5 mr-2" />
          {data.title}
        </h3>
      </div>

      <div className="p-4 pt-0 space-y-6">
        <div>
          <h4 className="font-semibold text-gro-darkblue mb-3">Pre-Move Checklist</h4>
          <ul className="space-y-2">
            {data.checklist.map((item, i) => (
              <li key={i} className="flex items-start text-sm text-gray-700">
                <CircleCheckBig className="h-4 w-4 text-gro-green mr-2 mt-0.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gro-darkblue mb-3">Local Tips</h4>
          <ul className="space-y-2">
            {data.tips.map((tip, i) => (
              <li key={i} className="flex items-start text-sm text-gray-700">
                <div className="w-2 h-2 bg-gro-teal rounded-full mr-3 mt-2 flex-shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <a
          href={data.pdfUrl}
          className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-gro-orange text-white hover:bg-gro-orange/90 transition h-10 px-4 w-full"
        >
          <Download className="h-4 w-4" />
          Download Complete Guide (PDF)
        </a>

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">
            Our relocation team is here to help! Contact us for personalized assistance with your move.
          </p>
        </div>
      </div>
    </div>
  );
} 