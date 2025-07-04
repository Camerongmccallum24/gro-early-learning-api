'use client';

import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import SectionWrapper from './SectionWrapper';
import SectionHeader from './SectionHeader';

const contactInfo = [
  {
    Icon: Phone,
    title: "Phone",
    details: ["+61 (07) 4743 9499"],
    color: "text-gro-green",
    bgColor: "bg-gro-green/10",
  },
  {
    Icon: Mail,
    title: "Email",
    details: ["careers@groearlylearning.com.au", "info@groearlylearning.com.au"],
    color: "text-gro-teal",
    bgColor: "bg-gro-teal/10",
  },
  {
    Icon: MapPin,
    title: "Head Office",
    details: ["60-62 West Street", "Mount Isa, QLD 4825"],
    color: "text-gro-orange",
    bgColor: "bg-gro-orange/10",
  },
  {
    Icon: Clock,
    title: "Business Hours",
    details: [
      "Monday - Friday: 8:00 AM - 5:00 PM",
      "Saturday - Sunday: Closed",
    ],
    color: "text-gro-darkblue",
    bgColor: "bg-gro-darkblue/10",
  },
];

const locations = [
  {
    name: 'Mount Isa',
    address: '60-62 West St, Mount Isa, QLD 4825',
    phone: '(07) 4743 9499',
    email: 'mountisa@groearlylearning.com.au'
  },
  {
    name: 'Moranbah',
    address: '164-166 Mills Ave, Moranbah, QLD 4744',
    phone: '(07) 4941 3988',
    email: 'moranbah@groearlylearning.com.au'
  },
  {
    name: 'Charters Towers',
    address: '1 Cavey Ct, Charters Towers, QLD 4820',
    phone: '(07) 4787 1188',
    email: 'charterstowers@groearlylearning.com.au'
  },
];

export default function ContactInfo() {
  return (
    <SectionWrapper className="bg-gradient-to-br from-gro-gray/5 to-gro-lightgray/5">
      <SectionHeader
        title="Get in Touch"
        subtitle="We're here to help with your career journey, answer questions, and provide support every step of the way."
      />
      
      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {contactInfo.map((info, idx) => (
          <ContactCard key={idx} info={info} />
        ))}
      </div>

      {/* Locations */}
      <div id="locations">
        <h3 className="text-2xl font-bold text-gro-darkblue text-center mb-8">Our Locations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {locations.map((location, idx) => (
            <LocationCard key={idx} location={location} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function ContactCard({ info }: { info: typeof contactInfo[0] }) {
  const { Icon, title, details, color, bgColor } = info;
  
  return (
    <div className="bg-white rounded-lg border shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 text-center">
      <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
        <Icon className={`h-8 w-8 ${color}`} />
      </div>
      <h3 className="font-semibold text-gro-darkblue mb-3">{title}</h3>
      {details.map((detail, i) => (
        <p key={i} className="text-sm text-gro-gray mb-1">
          {detail}
        </p>
      ))}
    </div>
  );
}

function LocationCard({ location }: { location: typeof locations[0] }) {
  return (
    <div className="bg-white rounded-lg border shadow-sm hover:shadow-lg transition-shadow duration-300 p-6">
      <h4 className="font-semibold text-gro-darkblue mb-3 text-lg">{location.name}</h4>
      <div className="space-y-2 text-sm text-gro-gray">
        <div className="flex items-start">
          <MapPin className="h-4 w-4 text-gro-orange mr-2 mt-0.5 flex-shrink-0" />
          <span>{location.address}</span>
        </div>
        <div className="flex items-center">
          <Phone className="h-4 w-4 text-gro-green mr-2 flex-shrink-0" />
          <a href={`tel:${location.phone.replace(/\s+/g, '')}`} className="hover:text-gro-teal">
            {location.phone}
          </a>
        </div>
        <div className="flex items-center">
          <Mail className="h-4 w-4 text-gro-teal mr-2 flex-shrink-0" />
          <a href={`mailto:${location.email}`} className="hover:text-gro-teal">
            {location.email}
          </a>
        </div>
      </div>
    </div>
  );
} 