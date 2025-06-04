/** @type {import('tailwindcss').Config} */
module.exports = {
  important:true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
        'xl': '1280px',
        'xlm':'1366px',
        'xll':'1440px',
        // => @media (min-width: 1280px) { ... }
        
        
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },

      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
        poppins: ['var(--font-poppins)'],
        bangla: [`var(--bangla)`]
      },
    },
  },
  plugins: [],
};
