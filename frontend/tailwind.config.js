/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gro-teal': 'var(--color-gro-teal)',
        'gro-orange': 'var(--color-gro-orange)',
        'gro-green': 'var(--color-gro-green)',
        'gro-blue': 'var(--color-gro-blue)',
        'gro-darkblue': 'var(--color-gro-darkblue)',
        'gro-gray': 'var(--color-gro-gray)',
        'gro-lightgray': 'var(--color-gro-lightgray)',
        'gro-darkgray': 'var(--color-gro-darkgray)',
        'gro-mount-isa': 'var(--color-gro-mount-isa)',
        'gro-moranbah': 'var(--color-gro-moranbah)',
        'gro-charters-towers': 'var(--color-gro-charters-towers)',
        foreground: 'var(--foreground)',
        background: 'var(--background)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-crimson)', 'ui-serif', 'serif'],
        mono: ['var(--font-roboto-mono)', 'ui-monospace', 'monospace'],
        heading: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-nunito)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Ensure consistent sizing for typography
        'xs': ['0.75rem', { lineHeight: '1rem' }],        // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],       // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],        // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],   // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],     // 36px
        '5xl': ['3rem', { lineHeight: '1' }],             // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],          // 60px
      },
    },
  },
  plugins: [],
}