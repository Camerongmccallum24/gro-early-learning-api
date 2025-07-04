'use client';
import Link from 'next/link';
import { iconMap, LucideIconName } from '@/lib/icons';
import { useInViewAnimation } from '@/lib/hooks/useInViewAnimation';

type InvestmentCardProps = {
  title: string;
  amount: string;
  frequency: string;
  description: string;
  icon: LucideIconName;
  includes: string[];
  link: string;
  linkLabel: string;
  color: 'gro-green' | 'gro-teal' | 'gro-orange';
  index: number;
};

export default function InvestmentCard({
  title,
  amount,
  frequency,
  description,
  icon,
  includes,
  link,
  linkLabel,
  color,
  index,
}: InvestmentCardProps) {
  const { ref, isVisible } = useInViewAnimation();
  const Icon = iconMap[icon];

  return (
    <div
      ref={ref}
      className={`rounded-lg border bg-card text-card-foreground shadow-sm h-full overflow-hidden flex flex-col transition-all duration-700 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`absolute top-0 left-0 right-0 h-1 bg-${color}`} />
      <div className="flex flex-col space-y-1.5 p-4 text-center pb-4">
        <Icon className="h-12 w-12 text-gray-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gro-darkblue">{title}</h3>
        <div className="text-center">
          <div className="text-2xl font-bold text-gro-darkblue">{amount}</div>
          <div className="text-sm text-gray-600">{frequency}</div>
        </div>
      </div>

      <div className="p-4 pt-0 flex flex-col flex-1">
        <p className="text-sm text-gray-700 mb-4 text-center leading-relaxed">{description}</p>
        <div>
          <h5 className="text-sm font-semibold text-gray-800 mb-2">Includes:</h5>
          <ul className="space-y-2 mb-4">
            {includes.map((item, i) => (
              <li key={i} className="flex items-start text-xs text-gray-700">
                <span className="w-1.5 h-1.5 bg-gro-teal rounded-full mt-2 mr-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-auto">
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-1 text-xs text-white rounded hover:opacity-80 transition bg-${color}`}
            >
              {linkLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 