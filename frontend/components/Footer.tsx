'use client';

import Link from 'next/link';
import Image from 'next/image';

const socialLinks = [
  {
    href: '#',
    label: 'Visit our Facebook page',
    icon: (
      <svg
        className="h-7 w-7"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    className: 'text-gro-teal hover:text-gro-green',
  },
  {
    href: '#',
    label: 'Visit our Instagram page',
    icon: (
      <svg
        className="h-7 w-7"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
      </svg>
    ),
    className: 'text-gro-orange hover:text-gro-green',
  },
  {
    href: '#',
    label: 'Visit our LinkedIn page',
    icon: (
      <svg
        className="h-7 w-7"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    className: 'text-gro-darkgray hover:text-gro-green',
  },
];

const quickLinks = [
  { href: '/jobs', label: 'Current Openings' },
  { href: '/about', label: 'About Us' },
  { href: '/our-team', label: 'Our Team' },
  { href: '/benefits', label: 'Benefits' },
  { href: '/professional-development', label: 'Professional Development' },
  { href: '/relocation', label: 'Relocation' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQs' },
];

const centres = [
  {
    name: 'Mount Isa Careers',
    href: '/locations/mount-isa',
    address: '60-62 West St, Mount Isa, QLD 4825',
    mapQuery: 'Mount+Isa+QLD+4825',
    phone: '(07) 4743 9499',
  },
  {
    name: 'Moranbah Careers',
    href: '/locations/moranbah',
    address: '164-166 Mills Ave, Moranbah, QLD 4744',
    mapQuery: 'Moranbah+QLD+4744',
    phone: '(07) 4941 3988',
  },
  {
    name: 'Charters Towers Careers',
    href: '/locations/charters-towers',
    address: '1 Cavey Ct, Charters Towers, QLD 4820',
    mapQuery: 'Charters+Towers+QLD+4820',
    phone: '(07) 4787 1188',
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-8 pb-4 w-full">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-6">
          {/* Brand Section */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center mb-3">
              <Image
                src="/GRO-Logo.png"
                alt="GRO Early Learning"
                width={80}
                height={80}
                className="object-cover h-20 w-auto"
              />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
              GRO Early Learning is dedicated to nurturing young minds through
              play-based learning and compassionate care.
            </p>
            <div className="flex space-x-4 justify-center pt-1">
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  aria-label={item.label}
                  className={`${item.className} transform hover:scale-125 transition-all duration-300 hover:shadow-lg p-1`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3 text-gro-darkblue">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    className="text-gray-600 hover:text-gro-teal transition-colors text-sm"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Centre Locations */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3 text-gro-darkblue">
              Our Centres
            </h3>
            <div className="space-y-4">
              {centres.map((centre, index) => (
                <div key={centre.href} className={`${index > 0 ? 'pt-3 border-t border-gray-100' : ''}`}>
                  <Link
                    className="text-gray-700 hover:text-gro-teal transition-colors font-medium block text-sm mb-1"
                    href={centre.href}
                  >
                    {centre.name}
                  </Link>
                  <a
                    href={`https://maps.google.com/?q=${centre.mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-500 hover:text-gro-teal transition-colors inline-flex items-start justify-center max-w-full mb-1"
                  >
                    <svg
                      className="lucide lucide-map-pin h-3 w-3 mr-1 mt-0.5 flex-shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span className="break-words text-xs leading-tight">
                      {centre.address}
                    </span>
                  </a>
                  <div className="flex items-center justify-center">
                    <a
                      href={`tel:${centre.phone.replace(/\s+/g, '')}`}
                      className="text-xs text-gray-500 hover:text-gro-teal flex items-center"
                    >
                      <svg
                        className="lucide lucide-phone h-3 w-3 mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      {centre.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-4">
          <p className="text-center text-gray-500 text-xs">
            © 2025 GRO Early Learning. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 