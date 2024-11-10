/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./index.css"],
  theme: {
    extend: {
      fontFamily: {
        "spaceGrotesk-bold": ["SpaceGrotesk-Bold", "sans-serif"],
        "spaceGrotesk-semibold": ["SpaceGrotesk-SemiBold", "sans-serif"],
        "spaceGrotesk-regular": ["SpaceGrotesk-Regular", "sans-serif"],
        "spaceGrotesk-light": ["SpaceGrotesk-Light", "sans-serif"],
        "spaceGrotesk-medium": ["SpaceGrotesk-Medium", "sans-serif"],
      },
    },
  },
  plugins: [],
};
