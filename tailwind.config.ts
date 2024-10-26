// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--main-color)",
        "navy-blue": "var(--navy-blue)",
        "light-blue": "var(--light-blue)",
        "light-purple": "var(--light-purple)",
        orange: "var(--orange)",
        yellowish: "var(--yellowish)",
        text: "var(--text-color)",
      },
    },
  },
  plugins: [],
};
