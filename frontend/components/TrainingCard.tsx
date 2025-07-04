'use client';

type TrainingCardProps = {
  title: string;
  duration: string;
  description: string;
};

export default function TrainingCard({ 
  title, 
  duration, 
  description 
}: TrainingCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 h-full">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gro-darkblue">
          {title}
        </h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gro-green/10 text-gro-green">
          {duration}
        </span>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
} 