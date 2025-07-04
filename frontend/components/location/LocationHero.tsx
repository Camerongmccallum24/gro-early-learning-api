import Hero from '@/components/Hero';
import { getLocationColorName } from '@/lib/locationColors';

interface LocationHeroProps {
  locationName: string;
  locationColor: string;
  description: string;
}

export default function LocationHero({ locationName, locationColor }: LocationHeroProps) {
  // Map location colors to gradient combinations using the utility function
  const getGradientProps = (colorId: string) => {
    const locationColor = getLocationColorName(colorId);
    
    switch (colorId) {
      case 'mount-isa':
        return { 
          gradientFrom: locationColor, 
          gradientTo: 'gro-orange',
          locationColor: locationColor
        };
      case 'moranbah':
        return { 
          gradientFrom: locationColor, 
          gradientTo: 'gro-green',
          locationColor: locationColor
        };
      case 'charters-towers':
        return { 
          gradientFrom: locationColor, 
          gradientTo: 'gro-blue',
          locationColor: locationColor
        };
      default:
        return { 
          gradientFrom: 'gro-teal', 
          gradientTo: 'gro-green',
          locationColor: 'gro-teal'
        };
    }
  };

  const gradientProps = getGradientProps(locationColor);

  return (
    <Hero
      title={`${locationName}: Your Career at GRO Early Learning`}
      subtitle={`Discover the opportunities waiting for you and your family in one of Queensland's unique communities`}
      backgroundImage="/GRO-Team.png"
      altText={`GRO Early Learning team in ${locationName}`}
      ctas={[
        {
          label: 'View Job Opportunities',
          href: '/jobs',
          variant: 'primary'
        },
        {
          label: 'Contact Us',
          href: '/contact',
          variant: 'secondary'
        }
      ]}
      {...gradientProps}
    />
  );
} 