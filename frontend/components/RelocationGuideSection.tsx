'use client';

import { useState } from 'react';
import SectionWrapper from '@/components/SectionWrapper';
import SectionHeader from '@/components/SectionHeader';
import { RelocationChecklist } from '@/components/RelocationChecklist';
import { relocationData } from '@/data/relocationData';

const locations = Object.keys(relocationData);

export default function RelocationGuideSection() {
  const [selected, setSelected] = useState(locations[0]);

  return (
    <SectionWrapper>
      <SectionHeader
        title="Location-Specific Relocation Guide"
        subtitle="Explore checklists and local tips tailored to your destination."
      />

      <div className="max-w-xl mx-auto my-6">
        <label className="block text-lg font-semibold mb-2 text-gro-darkblue">
          Select your relocation destination:
        </label>
        <select
          className="w-full p-3 border border-gray-300 rounded-md text-sm"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <RelocationChecklist location={selected as keyof typeof relocationData} />
    </SectionWrapper>
  );
} 