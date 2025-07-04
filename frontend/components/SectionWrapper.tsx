'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function SectionWrapper({ 
  children, 
  className = '',
  id 
}: SectionWrapperProps) {
  return (
    <section 
      id={id}
      className={clsx(
        'py-8 sm:py-12 md:py-16 lg:py-20',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
} 