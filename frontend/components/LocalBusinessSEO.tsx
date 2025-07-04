import { locations } from '@/data/locationsData';

interface LocalBusinessSEOProps {
  location: string;
}

export default function LocalBusinessSEO({ location }: LocalBusinessSEOProps) {
  const locationData = locations.find(loc => loc.name === location);

  if (!locationData) {
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `GRO Early Learning ${locationData.name}`,
    "description": locationData.description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": locationData.address,
      "addressLocality": locationData.name,
      "addressRegion": "QLD",
      "addressCountry": "AU"
    },
    "telephone": locationData.phone,
    "email": locationData.email,
    "url": `https://groearlylearning.com.au${locationData.href}`,
    "openingHours": [
      "Mo-Fr 06:30-18:30"
    ],
    "priceRange": "$$",
    "image": "/GRO-Logo.png",
    "logo": "/GRO-Logo.png",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": locationData.name === "Mount Isa" ? -20.7211523 : 
                     locationData.name === "Moranbah" ? -22.0011629 : -20.0707908,
        "longitude": locationData.name === "Mount Isa" ? 139.4917176 : 
                     locationData.name === "Moranbah" ? 148.0587996 : 146.2796241
      },
      "geoRadius": "50000"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    },
    "offers": {
      "@type": "Offer",
      "category": "Early Childhood Education",
      "priceCurrency": "AUD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
} 