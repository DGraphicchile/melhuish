/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--color-primary))',
          light: 'hsl(var(--color-primary-light))',
        },
        accent: {
          DEFAULT: 'hsl(var(--color-accent))',
          hover: 'hsl(var(--color-accent-hover))',
        },
        cyan: {
          DEFAULT: 'hsl(var(--color-cyan))',
          light: 'hsl(var(--color-cyan-light))',
        },
        secondary: 'hsl(var(--color-secondary))',
        text: {
          DEFAULT: 'hsl(var(--color-text))',
          light: 'hsl(var(--color-text-light))',
        },
        border: 'hsl(var(--color-border))',
        bg: {
          DEFAULT: 'hsl(var(--color-bg))',
          alt: 'hsl(var(--color-bg-alt))',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        sans: ['var(--font-body)'],
      },
      boxShadow: {
        'glow': '0 0 20px -5px hsl(var(--color-accent) / 0.25)',
        'glow-cyan': '0 0 20px -5px hsl(var(--color-cyan) / 0.3)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
