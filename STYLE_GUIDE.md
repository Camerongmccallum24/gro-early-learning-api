# GRO Early Learning - Style Guide

## 📋 Table of Contents
- [Brand Colors](#brand-colors)
- [Typography](#typography)
- [Hero Components](#hero-components)
- [Button System](#button-system)
- [Card Components](#card-components)
- [Section Patterns](#section-patterns)
- [Layout Standards](#layout-standards)
- [Location-Specific Styling](#location-specific-styling)
- [Component Hierarchy](#component-hierarchy)
- [Responsive Design](#responsive-design)
- [Image Standards](#image-standards)

---

## 🎨 Brand Colors

### Primary Brand Colors
```css
--color-gro-teal: #00A8B5        /* Primary brand color */
--color-gro-orange: #F28C38      /* Secondary accent */
--color-gro-green: #4CAF50       /* Success/positive */
--color-gro-blue: #2196F3        /* Information/links */
--color-gro-darkblue: #1E3A8A    /* Headers/text */
```

<div style="display: flex; flex-wrap: wrap; gap: 12px; margin: 16px 0;">
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: 24px; height: 24px; background-color: #00A8B5; border-radius: 4px; border: 1px solid #ddd;"></div>
    <code>gro-teal: #00A8B5</code>
  </div>
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: 24px; height: 24px; background-color: #F28C38; border-radius: 4px; border: 1px solid #ddd;"></div>
    <code>gro-orange: #F28C38</code>
  </div>
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: 24px; height: 24px; background-color: #4CAF50; border-radius: 4px; border: 1px solid #ddd;"></div>
    <code>gro-green: #4CAF50</code>
  </div>
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: 24px; height: 24px; background-color: #2196F3; border-radius: 4px; border: 1px solid #ddd;"></div>
    <code>gro-blue: #2196F3</code>
  </div>
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: 24px; height: 24px; background-color: #1E3A8A; border-radius: 4px; border: 1px solid #ddd;"></div>
    <code>gro-darkblue: #1E3A8A</code>
  </div>
</div>

### Neutral Colors
```css
--color-gro-gray: #6B7280        /* Body text */
--color-gro-lightgray: #F3F4F6   /* Light backgrounds */
--color-gro-darkgray: #1F2937    /* Footer/navigation */
--foreground: #171717            /* Primary text */
--background: #ffffff            /* Page backgrounds */
```

<div style="display: flex; flex-wrap: wrap; gap: 12px; margin: 16px 0;">
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: 24px; height: 24px; background-color: #6B7280; border-radius: 4px; border: 1px solid #ddd;"></div>
    <code>gro-gray: #6B7280</code>
  </div>
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: 24px; height: 24px; background-color: #F3F4F6; border-radius: 4px; border: 1px solid #ddd;"></div>
    <code>gro-lightgray: #F3F4F6</code>
  </div>
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: 24px; height: 24px; background-color: #1F2937; border-radius: 4px; border: 1px solid #ddd;"></div>
    <code>gro-darkgray: #1F2937</code>
  </div>
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: 24px; height: 24px; background-color: #171717; border-radius: 4px; border: 1px solid #ddd;"></div>
    <code>foreground: #171717</code>
  </div>
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: 24px; height: 24px; background-color: #ffffff; border-radius: 4px; border: 1px solid #ddd;"></div>
    <code>background: #ffffff</code>
  </div>
</div>

### Color Usage Guidelines
- **Headers**: Use `text-gro-darkblue` for all major headings
- **Body Text**: Use `text-gro-gray` for paragraphs and descriptions
- **Backgrounds**: Always use white (`bg-white`) - no dark mode
- **Accents**: Use gradient combinations for visual interest
- **Buttons**: Use specific GRO variants (see Button System)

---

## 📝 Typography

### Font Hierarchy
```css
/* Fonts */
font-heading: Poppins (headings)
font-body: Nunito (body text)
font-sans: Inter (legacy)
font-serif: Crimson Text (legacy)
font-mono: Roboto Mono (code)
```

### Heading Scale
```css
/* Heading 1 */
h1, .h1 { @apply font-heading text-4xl font-bold; }

/* Heading 2 */
h2, .h2 { @apply font-heading text-3xl font-semibold; }

/* Heading 3 */
h3, .h3 { @apply font-heading text-2xl font-semibold; }

/* Heading 4 */
h4, .h4 { @apply font-heading text-xl font-semibold; }

/* Heading 5 */
h5, .h5 { @apply font-heading text-lg font-semibold; }

/* Heading 6 */
h6, .h6 { @apply font-heading text-base font-semibold; }
```

### Body Text
```css
/* Large body text - 18px */
.body-lg { @apply font-body text-lg; }

/* Regular body text - 16px */
.body-base { @apply font-body text-base; }

/* Small body text - 14px */
.body-sm { @apply font-body text-sm; }

/* Extra small text - 12px */
.body-xs { @apply font-body text-xs; }
```

### Typography Standards
- **All major headings**: Use `font-heading` and `text-gro-darkblue`
- **Body text**: Use `font-body` and `text-gro-gray`
- **Line height**: Use `leading-relaxed` for readability
- **Font weights**: `font-bold` for main headers, `font-semibold` for subheadings
- **Text colors**: `text-gro-darkblue` for headings, `text-gro-gray` for body text

---

## 🦸 Hero Components

### Standard Hero Pattern
```tsx
<Hero
  title="Page Title"
  subtitle="Descriptive subtitle text"
  backgroundImage="/GRO-Team.png"
  altText="Descriptive alt text"
  ctas={[
    { label: 'Primary Action', href: '/link', variant: 'primary' },
    { label: 'Secondary Action', href: '/link', variant: 'secondary' }
  ]}
  gradientFrom="gro-teal"
  gradientTo="gro-green"
/>
```

### Hero Standards
- **Background**: Always use `/GRO-Team.png` (consistent across all pages)
- **Overlay**: 20% black opacity (`bg-black bg-opacity-20`)
- **Height**: `h-[28rem] md:h-[36rem] lg:h-[42rem]`
- **Text**: White text with proper contrast
- **Gradients**: Use brand color combinations (see gradient map below)

### Gradient Combinations
```css
/* Available gradient combinations */
'gro-teal-gro-green': 'bg-gradient-to-br from-gro-teal/10 to-gro-green/10'
'gro-green-gro-orange': 'bg-gradient-to-br from-gro-green/10 to-gro-orange/10'
'gro-orange-gro-blue': 'bg-gradient-to-br from-gro-orange/10 to-gro-blue/10'
'gro-blue-gro-teal': 'bg-gradient-to-br from-gro-blue/10 to-gro-teal/10'
'gro-teal-gro-orange': 'bg-gradient-to-br from-gro-teal/10 to-gro-orange/10'
'gro-green-gro-blue': 'bg-gradient-to-br from-gro-green/10 to-gro-blue/10'
```

---

## 🔘 Button System

### Button Variants
```tsx
// Primary GRO buttons
<Button variant="gro">Default Orange</Button>
<Button variant="gro-teal">Teal</Button>
<Button variant="gro-green">Green</Button>
<Button variant="gro-darkblue">Dark Blue</Button>

// Standard variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
```

### Button Sizes
```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon">Icon Only</Button>
```

### Button Standards
- **Primary actions**: Use `gro-teal` variant
- **Secondary actions**: Use `secondary` variant
- **Hover effects**: Built-in lift effect (`hover:-translate-y-0.5`)
- **Focus states**: Proper ring focus for accessibility
- **Active states**: Scale down effect (`active:scale-95`)

### Legacy Button Classes (CSS)
```css
.btn-gro-teal: /* Teal buttons */
.btn-secondary: /* Secondary outline buttons */
.btn-touch: /* Base button spacing */
.focus-ring: /* Focus accessibility */
```

---

## 🃏 Card Components

### Standard Card Pattern
```tsx
<Card className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
  <CardHeader className="pb-4">
    <CardTitle className="text-xl sm:text-2xl font-semibold text-gro-darkblue">
      Card Title
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-gro-gray text-sm">Card content...</p>
  </CardContent>
</Card>
```

### Card Standards
- **Background**: Always white (`bg-white`)
- **Border radius**: `rounded-xl` for modern look
- **Shadow**: `shadow-lg` default, `hover:shadow-xl` on hover
- **Border**: `border border-gray-100` for subtle definition
- **Hover effects**: Lift animation (`hover:-translate-y-1`)
- **Padding**: `p-6` for content spacing
- **Transitions**: `transition-all duration-300` for smooth animations

### Feature Card Pattern
```tsx
<FeatureCard
  icon={<Icon className="h-8 w-8 text-gro-teal mb-2" />}
  title="Feature Title"
  description="Feature description text"
/>
```

---

## 📄 Section Patterns

### Section Wrapper Standard
```tsx
<SectionWrapper className="bg-white">
  <SectionHeader
    title="Section Title"
    subtitle="Section description text"
  />
  {/* Section content */}
</SectionWrapper>
```

### Background Patterns
```css
/* White sections */
className="bg-white"

/* Light gradient sections */
className="bg-gradient-to-br from-gro-green/5 to-gro-teal/5"
className="bg-gradient-to-br from-gro-orange/10 to-gro-teal/10"

/* Light gray sections */
className="bg-gro-lightgray"
```

### Section Header Pattern
```tsx
<SectionHeader
  title="Section Title"
  subtitle="Optional subtitle text"
  align="center" // or "left"
  maxWidth="max-w-3xl" // or other max-width
/>
```

---

## 📐 Layout Standards

### Container System
```css
/* Standard container */
.container mx-auto px-4 sm:px-6 lg:px-8

/* Section padding */
py-8 sm:py-12 md:py-16 lg:py-20

/* Content max widths */
max-w-3xl mx-auto  /* Text content */
max-w-4xl mx-auto  /* Forms */
max-w-6xl mx-auto  /* Card grids */
max-w-7xl mx-auto  /* Wide layouts */
```

### Grid Patterns
```css
/* Standard grids */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8

/* Location grids */
grid grid-cols-1 lg:grid-cols-2 gap-12
```

### Spacing System
```css
/* Margins */
mb-4 md:mb-6    /* Small spacing */
mb-8 md:mb-12   /* Medium spacing */
mb-12 md:mb-16  /* Large spacing */

/* Padding */
p-4 md:p-6      /* Card padding */
p-6 md:p-8      /* Section padding */
```

---

## 📍 Location-Specific Styling

### Location Color Schemes
```css
/* Location-specific base colors */
--color-gro-mount-isa: #F79939;      /* Mount Isa specific color */
--color-gro-moranbah: #8DC63F;        /* Moranbah specific color */
--color-gro-charters-towers: #80CAE5; /* Charters Towers specific color */
```

```tsx
// Mount Isa
locationColor: 'gro-mount-isa'
gradientFrom: 'gro-mount-isa'
gradientTo: 'gro-orange'
color: 'from-gro-mount-isa to-gro-orange'

// Moranbah  
locationColor: 'gro-moranbah'
gradientFrom: 'gro-moranbah'
gradientTo: 'gro-green'
color: 'from-gro-moranbah to-gro-green'

// Charters Towers
locationColor: 'gro-charters-towers'
gradientFrom: 'gro-charters-towers'
gradientTo: 'gro-blue'
color: 'from-gro-charters-towers to-gro-blue'
```

### Location Color Utility Functions

For consistent use of location colors, use the utility functions in `/lib/locationColors.ts`:

```tsx
// Import the utility functions
import { 
  getLocationTextColorClass, 
  getLocationBgColorClass,
  getLocationBadgeClasses,
  getLocationGradientClasses,
  getLocationColorName 
} from "@/lib/locationColors";

// Get text color class (e.g., 'text-gro-mount-isa')
const textColor = getLocationTextColorClass('mount-isa');

// Get background color class (e.g., 'bg-gro-mount-isa')
const bgColor = getLocationBgColorClass('mount-isa');

// Get badge classes (e.g., 'bg-gro-mount-isa/10 text-gro-mount-isa border-gro-mount-isa/20')
const badgeClasses = getLocationBadgeClasses('mount-isa');

// Get gradient classes (e.g., 'from-gro-mount-isa to-gro-orange')
const gradientClasses = getLocationGradientClasses('mount-isa');

// Get color name (e.g., 'gro-mount-isa')
const colorName = getLocationColorName('mount-isa');
```

### Location Hero Pattern
```tsx
<LocationHero 
  locationName="Location Name"
  locationColor="location-id"
  description="Location description..."
/>
```

### Location CTA Pattern
```tsx
<LocationCTA
  locationName="Location Name"
  locationColor="location-id"
  email="location@groearlylearning.com.au"
  phone="(07) XXXX XXXX"
/>
```

---

## 🏗️ Component Hierarchy

### Enhanced Location Components
```
LocationHero (custom hero with gradients)
├── Hero component with location-specific gradients
└── Standard CTA buttons

LocationEducationHealthcareSection
├── Hero pattern (School icon)
├── Enhanced cards with hover effects
└── Structured content lists

LocationRelocationSection  
├── Hero pattern (Home icon)
└── Delegates to RelocationGuide

LocationJobsSection
├── Hero pattern (Building2 icon)
└── Delegates to LocationJobBoard

LocationTestimonialsSection
├── Hero pattern (Users icon)
└── Delegates to LocationTestimonials

LocationMapSection
├── Hero pattern (MapPin icon)
└── Enhanced iframe styling
```

### Hero Section Pattern
```tsx
// Standard for all enhanced sections
<div className="text-center mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto">
  <div className="flex justify-center items-center text-4xl sm:text-5xl lg:text-6xl mb-4">
    <Icon className="text-gro-[color]" />
  </div>
  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gro-darkblue mb-4">
    Section Title
  </h2>
  <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
    Section description
  </p>
</div>
```

---

## 📱 Responsive Design

### Breakpoint System
```css
/* Mobile First Approach */
sm:   640px   /* Small screens */
md:   768px   /* Tablets */
lg:   1024px  /* Laptops */
xl:   1280px  /* Desktops */
2xl:  1536px  /* Large screens */
```

### Responsive Typography
```css
/* Hero titles */
text-3xl sm:text-4xl md:text-5xl lg:text-6xl

/* Section headers */
text-2xl md:text-3xl lg:text-4xl

/* Body text */
text-sm sm:text-base md:text-lg
```

### Responsive Spacing
```css
/* Padding */
py-8 sm:py-12 md:py-16 lg:py-20

/* Margins */
mb-4 sm:mb-6 md:mb-8 lg:mb-12

/* Gaps */
gap-4 sm:gap-6 md:gap-8
```

---

## 🖼️ Image Standards

### Hero Images
- **File**: `/GRO-Team.png` (consistent across all pages)
- **Size**: 1.3MB optimized
- **Dimensions**: High resolution team photo
- **Alt text**: Descriptive and contextual

### Component Images
```tsx
<Image
  src="/GRO-Team.png"
  alt="Descriptive alt text"
  fill
  priority
  quality={90}
  className="object-cover transition-all duration-500 ease-in-out scale-100 group-hover:scale-105"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### Image Standards
- **Format**: PNG for logos, JPG for photos
- **Optimization**: Use Next.js Image component
- **Responsive**: Proper sizes attribute
- **Accessibility**: Always include meaningful alt text
- **Hover effects**: Subtle scale on hover (`group-hover:scale-105`)

---

## ✅ Implementation Checklist

### Before Making Any Changes
- [ ] Review this style guide
- [ ] Identify which component pattern to use
- [ ] Check color usage guidelines
- [ ] Verify responsive requirements
- [ ] Ensure accessibility standards

### Component Standards
- [ ] Use `text-gro-darkblue` for headings
- [ ] Use `text-gro-gray` for body text
- [ ] Use white backgrounds (`bg-white`)
- [ ] Include hover animations
- [ ] Add proper focus states
- [ ] Test responsive breakpoints

### Quality Assurance
- [ ] Build completes without errors
- [ ] All images load correctly
- [ ] Hover effects work smoothly
- [ ] Mobile responsive design
- [ ] Accessibility standards met
- [ ] Color contrast sufficient

---

## 🎯 Key Design Principles

1. **Consistency**: Use established patterns and components
2. **Accessibility**: Proper contrast, focus states, and alt text
3. **Performance**: Optimized images and smooth animations
4. **Responsiveness**: Mobile-first responsive design
5. **Brand Alignment**: Consistent use of GRO colors and typography
6. **User Experience**: Clear hierarchy and intuitive navigation

---

*Last Updated: December 2024*
*Version: 2.0 (Enhanced Design System)* 