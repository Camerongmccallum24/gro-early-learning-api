'use client';

import clsx from 'clsx';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  maxWidth?: string;
  className?: string;
};

export default function SectionHeader({
  title,
  subtitle,
  align = 'center',
  maxWidth = 'max-w-3xl',
  className = '',
}: SectionHeaderProps) {
  const alignment = align === 'left' ? 'text-left' : 'text-center';

  return (
    <div className={clsx('mb-8 md:mb-12', alignment, className)}>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4 text-gro-darkblue">
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            'text-base md:text-lg text-gro-gray font-sans leading-relaxed',
            maxWidth,
            align === 'center' && 'mx-auto'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
} 