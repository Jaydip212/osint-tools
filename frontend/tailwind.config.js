/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0e27',
          darker: '#050811',
          green: '#00ff00',
          cyan: '#00ffff',
          purple: '#9d4edd',
          red: '#ff006e',
          yellow: '#ffbe0b',
        },
      },
      fontFamily: {
        mono: ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}

