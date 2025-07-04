'use client';

import Image from 'next/image';
import Link from 'next/link';

type CTA = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
};

type HeroProps = {
  title: string;
  subtitle: string;
  backgroundImage: string;
  altText: string;
  ctas: CTA[];
  gradientFrom?: string;
  gradientTo?: string;
};

Hero.defaultProps = {
  gradientFrom: 'gro-teal',
  gradientTo: 'gro-green',
};

// Map gradient combinations to static Tailwind classes
const getGradientClasses = (from?: string, to?: string) => {
  const key = `${from}-${to}`;
  const gradientMap: Record<string, string> = {
    'gro-teal-gro-green': 'bg-gradient-to-br from-gro-teal/10 to-gro-green/10',
    'gro-green-gro-orange': 'bg-gradient-to-br from-gro-green/10 to-gro-orange/10',
    'gro-orange-gro-blue': 'bg-gradient-to-br from-gro-orange/10 to-gro-blue/10',
    'gro-blue-gro-teal': 'bg-gradient-to-br from-gro-blue/10 to-gro-teal/10',
    'gro-teal-gro-orange': 'bg-gradient-to-br from-gro-teal/10 to-gro-orange/10',
    'gro-green-gro-blue': 'bg-gradient-to-br from-gro-green/10 to-gro-blue/10',
    'gro-darkblue-gro-darkgray': 'bg-gradient-to-br from-gro-darkblue/10 to-gro-darkgray/10',
    'gro-gray-gro-lightgray': 'bg-gradient-to-br from-gro-gray/10 to-gro-lightgray/10',
  };
  
  return gradientMap[key] || 'bg-gradient-to-br from-gro-teal/10 to-gro-green/10';
};

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  altText,
  ctas = [],
  gradientFrom,
  gradientTo,
}: HeroProps) {
  const gradientClasses = getGradientClasses(gradientFrom, gradientTo);

  return (
    <section className="relative h-[28rem] md:h-[36rem] lg:h-[42rem] group">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-100">
        <Image
          src={backgroundImage}
          alt={altText}
          title={altText}
          fill
          priority
          quality={90}
          className="object-cover transition-all duration-500 ease-in-out scale-100 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${gradientClasses}`}></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 text-white max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-4 transition-all duration-300 group-hover:scale-105">
            {title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 font-light transition-opacity duration-300 group-hover:opacity-90">
            {subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {ctas.map(({ label, href, variant = 'primary' }, index) => (
              <Link
                key={index}
                href={href}
                className={`btn-touch focus-ring transition-transform transform hover:scale-105 ${
                  variant === 'primary'
                    ? 'btn-gro-teal'
                    : 'btn-secondary border-white text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 