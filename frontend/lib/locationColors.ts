/**
 * Utility functions for working with location-specific colors
 */

/**
 * Get the text color class for a location
 * @param locationId The location ID (mount-isa, moranbah, charters-towers)
 * @returns The Tailwind text color class for the location
 */
export function getLocationTextColorClass(locationId: string): string {
  switch (locationId) {
    case 'mount-isa':
      return 'text-gro-mount-isa';
    case 'moranbah':
      return 'text-gro-moranbah';
    case 'charters-towers':
      return 'text-gro-charters-towers';
    default:
      return 'text-gro-teal'; // Fallback to teal
  }
}

/**
 * Get the background color class for a location
 * @param locationId The location ID (mount-isa, moranbah, charters-towers)
 * @returns The Tailwind background color class for the location
 */
export function getLocationBgColorClass(locationId: string): string {
  switch (locationId) {
    case 'mount-isa':
      return 'bg-gro-mount-isa';
    case 'moranbah':
      return 'bg-gro-moranbah';
    case 'charters-towers':
      return 'bg-gro-charters-towers';
    default:
      return 'bg-gro-teal'; // Fallback to teal
  }
}

/**
 * Get the badge classes for a location
 * @param locationId The location ID (mount-isa, moranbah, charters-towers)
 * @returns The Tailwind classes for a badge with the location's color
 */
export function getLocationBadgeClasses(locationId: string): string {
  switch (locationId) {
    case 'mount-isa':
      return 'bg-gro-mount-isa/10 text-gro-mount-isa border-gro-mount-isa/20';
    case 'moranbah':
      return 'bg-gro-moranbah/10 text-gro-moranbah border-gro-moranbah/20';
    case 'charters-towers':
      return 'bg-gro-charters-towers/10 text-gro-charters-towers border-gro-charters-towers/20';
    default:
      return 'bg-gro-teal/10 text-gro-teal border-gro-teal/20';
  }
}

/**
 * Get the gradient classes for a location
 * @param locationId The location ID (mount-isa, moranbah, charters-towers)
 * @returns The Tailwind gradient classes for the location
 */
export function getLocationGradientClasses(locationId: string): string {
  switch (locationId) {
    case 'mount-isa':
      return 'from-gro-mount-isa to-gro-orange';
    case 'moranbah':
      return 'from-gro-moranbah to-gro-green';
    case 'charters-towers':
      return 'from-gro-charters-towers to-gro-blue';
    default:
      return 'from-gro-teal to-gro-green';
  }
}

/**
 * Get the color name for a location
 * @param locationId The location ID (mount-isa, moranbah, charters-towers)
 * @returns The CSS variable name for the location color
 */
export function getLocationColorName(locationId: string): string {
  switch (locationId) {
    case 'mount-isa':
      return 'gro-mount-isa';
    case 'moranbah':
      return 'gro-moranbah';
    case 'charters-towers':
      return 'gro-charters-towers';
    default:
      return 'gro-teal';
  }
} 