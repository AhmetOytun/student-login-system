/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "inter": ["Inter-Regular", "sans-serif"],
        "inter-b": ["Inter-Bold", "sans-serif"],
        "inter-sb": ["Inter-SemiBold", "sans-serif"],
        "inter-m": ["Inter-Medium", "sans-serif"]
      },
    },
  },
  plugins: [],
}

