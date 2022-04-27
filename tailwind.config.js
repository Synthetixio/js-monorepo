module.exports = {
  prefix: "ui-",
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    },
    extend: {
      colors: {
        "yellow-700": "var(--color-yellow-700)",
        "yellow-600": "var(--color-yellow-600)",
        "yellow-500": "var(--color-yellow-500)",
        "yellow-400": "var(--color-yellow-400)",
        "yellow-300": "var(--color-yellow-300)",
        "yellow-200": "var(--color-yellow-200)",
        "yellow-100": "var(--color-yellow-100)",
        "black-700": "var(--color-black-700)",
        "black-600": "var(--color-black-600)",
        "black-500": "var(--color-black-500)",
        "black-400": "var(--color-black-400)",
        "black-300": "var(--color-black-300)",
        "black-200": "var(--color-black-200)",
        "black-100": "var(--color-black-100)",
        "red-700": "var(--color-red-700)",
        "red-600": "var(--color-red-600)",
        "red-500": "var(--color-red-500)",
        "red-400": "var(--color-red-400)",
        "red-300": "var(--color-red-300)",
        "red-200": "var(--color-red-200)",
        "red-100": "var(--color-red-100)",
        "green-700": "var(--color-green-700)",
        "green-600": "var(--color-green-600)",
        "green-500": "var(--color-green-500)",
        "green-400": "var(--color-green-400)",
        "green-300": "var(--color-green-300)",
        "green-200": "var(--color-green-200)",
        "green-100": "var(--color-green-100)"
      },
      borderRadius: {
        "2lg": "0.625rem"
      },
      container: {
        center: true,
        padding: "1rem"
      },
      minWidth: {
        "button-sm": "6.25rem",
        "button-md": "10rem",
        "button-lg": "13.125rem"
      }
    }
  },
  plugins: []
};
