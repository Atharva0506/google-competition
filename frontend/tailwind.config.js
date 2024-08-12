/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: 'var(--color-primary-text)',
        secondary: 'var(--color-secondary-text)'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ 
      nocompatible: true, 
      options: { 
        colors: {
          thumb: 'var(--color-primary-text)',
          track: 'var(--color-background)'
        }
      }
    }),
  ],
}

