/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pahadi: {
          offwhite: '#FAF6F0',
          paper: '#F4EFE6',
          sand: '#EAE4D8',
          border: '#E5DFC9',
          sage: {
            DEFAULT: '#DDE8D5',
            light: '#EEF4EA',
            dark: '#C3CCA6',
            muted: '#3B5441',
          },
          green: {
            DEFAULT: '#1B3626',
            light: '#274A36',
            dark: '#122419',
            muted: '#2C4C38',
            accent: '#5B7A66',
          },
          terracotta: {
            DEFAULT: '#B85D3B',
            hover: '#9C4B2B',
            light: '#F7EFEA',
          },
          brown: {
            DEFAULT: '#664936',
            light: '#82624D',
            dark: '#473223',
            muted: '#8C6C58',
          },
          red: {
            DEFAULT: '#B85D3B',
            hover: '#9C4B2B',
            light: '#F7EFEA',
          },
          charcoal: {
            DEFAULT: '#1C241E',
            muted: '#455248',
            light: '#6E7A71',
          },
          gold: {
            DEFAULT: '#D49B35',
            light: '#F0CF7D',
            dark: '#9E701B',
          }
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        playfair: ['Playfair Display', 'Georgia', 'serif'],
        poppins: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        helvetica: ['Plus Jakarta Sans', 'Helvetica', 'sans-serif'],
      },
      boxShadow: {
        'pahadi-sm': '0 2px 8px -2px rgba(27, 54, 38, 0.05)',
        'pahadi-md': '0 8px 24px -4px rgba(27, 54, 38, 0.07)',
        'pahadi-lg': '0 16px 40px -8px rgba(27, 54, 38, 0.12)',
        'pahadi-gold': '0 4px 20px -2px rgba(184, 93, 59, 0.25)',
        'kumaon-card': '0 4px 20px 0 rgba(27, 54, 38, 0.06)',
      },
      backgroundImage: {
        'himalayan-gradient': 'linear-gradient(180deg, rgba(27,54,38,0.95) 0%, rgba(18,36,25,0.98) 100%)',
        'gold-shimmer': 'linear-gradient(135deg, #B85D3B 0%, #D49B35 50%, #9C4B2B 100%)',
        'paper-texture': 'radial-gradient(#664936 0.5px, transparent 0.5px)',
      }
    },
  },
  plugins: [],
}
