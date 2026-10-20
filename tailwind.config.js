/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zivaro: {
          navy: "#071B33",
          midnight: "#102B49",
          slate: "#8293A8",
          ice: "#DCECF8",
          electric: "#65BFFF",
          bg: "#F7F9FC",
          white: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ['"Exo"', 'sans-serif'],
        exo: ['"Exo"', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.035em',
        'tighter-editorial': '-0.02em',
        'wide-editorial': '0.12em',
        'widest-editorial': '0.18em',
        'subscript': '0.24em',
      },
      boxShadow: {
        'glow-electric': '0 0 24px rgba(101, 191, 255, 0.4)',
        'glow-subtle': '0 0 16px rgba(101, 191, 255, 0.25)',
        'editorial-card': '0 8px 30px rgba(7, 27, 51, 0.05)',
        'editorial-hover': '0 16px 40px rgba(7, 27, 51, 0.09)',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}
