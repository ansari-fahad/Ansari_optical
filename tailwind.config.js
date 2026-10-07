/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#060607',
          900: '#0c0c0e',
          800: '#151518',
          700: '#222226',
        },
        ivory: {
          50: '#faf9f6',
          100: '#f5f4ef',
          200: '#e8e6de',
          300: '#d7d4c8',
        }
      },
      fontFamily: {
        serif: ['"Italiana"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
      },
      letterSpacing: {
        'widest-xl': '0.25em',
        'widest-2xl': '0.35em',
      },
    },
  },
  plugins: [],
}
