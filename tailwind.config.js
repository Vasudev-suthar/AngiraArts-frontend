/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xxs': '280px',
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1250px',
      '2xl': '1436px',
      '3xl': '1600px',
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        raleway: ['var(--font-raleway)', 'sans-serif'],
        platypi: ['var(--font-platypi)', 'serif'],
      },
    },
  },
  plugins: [],
};




// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     screens: {
//       'xxs': '280px',
//       'xs': '400px',
//       'sm': '640px',
//       'md': '768px',
//       'lg': '1024px',
//       'xl': '1250px',
//       '2xl': '1536px',
//     },
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
//       },
//       fontFamily: {
//         raleway: ['var(--font-raleway)', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// };
