import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  location: string;
  image?: string;
}

interface LocationTestimonialsProps {
  location: string;
}

const LocationTestimonials: FC<LocationTestimonialsProps> = ({ location }) => {
  const testimonials: Record<string, Testimonial[]> = {
    "mount-isa": [
      {
        name: "Sarah Mitchell",
        role: "Lead Educator",
        content: "Moving to Mount Isa was the best career decision I've made. The community is incredibly welcoming, and the support from GRO has been outstanding.",
        rating: 5,
        location: "Mount Isa"
      },
      {
        name: "James Rodriguez",
        role: "Early Childhood Teacher",
        content: "The outdoor lifestyle here is amazing. Lake Moondarra is perfect for weekend family activities, and the work-life balance is incredible.",
        rating: 5,
        location: "Mount Isa"
      }
    ],
    "moranbah": [
      {
        name: "Emma Thompson",
        role: "Centre Manager",
        content: "Moranbah offers excellent career growth opportunities. The mining community is very family-focused, making it perfect for raising children.",
        rating: 5,
        location: "Moranbah"
      },
      {
        name: "Michael Chen",
        role: "Educational Leader",
        content: "The facilities here are world-class, and the community support for families is exceptional. My children love the recreation centre!",
        rating: 5,
        location: "Moranbah"
      }
    ],
    "charters-towers": [
      {
        name: "Rebecca Harris",
        role: "Senior Educator",
        content: "The historic charm of Charters Towers combined with modern amenities creates a unique living experience. The cost of living is very reasonable too.",
        rating: 5,
        location: "Charters Towers"
      },
      {
        name: "David Wilson",
        role: "Assistant Director",
        content: "Being close to Townsville while enjoying small-town community feel is perfect. The educational opportunities here are excellent.",
        rating: 5,
        location: "Charters Towers"
      }
    ]
  };

  const locationTestimonials = testimonials[location] || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {locationTestimonials.map((testimonial, index) => (
        <Card key={index} className="bg-white shadow-lg border border-gray-100">
          <CardContent className="p-6">
            <div className="flex items-start mb-4">
              <Quote className="h-8 w-8 text-gro-teal mr-3 flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm italic mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gro-darkblue">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LocationTestimonials; 