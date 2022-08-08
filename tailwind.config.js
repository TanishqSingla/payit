module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-grey": "#121212",
        primary: "#6200ee",
        "primary-variant": "#3700B3",
        secondary: "#03DAC6",
        "secondary-variant": "#180786",
        background: "#fff",
        surface: "#fff",
        error: "#b00020",
        onPrimary: "#fff",
        onSecondary: "#000",
        onBackground: "#000",
        onSurface: "#000",
        onError: "#fff",
      },
      boxShadow: {
        surface: ["0 1px 3px rgba(0,0,0,0.12)", "0 1px 2px rgba(0,0,0,0.24)"],
      },
      height: {
        formContainerHeight: "calc(100vh - 10em)",
      },
    },
  },
  plugins: [],
};
