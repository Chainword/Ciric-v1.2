module.exports = {
  content: {
    files: ["./index.html", "./src/**/*.{js,jsx}"],
    safelist: ["sm:grid-cols-2", "md:grid-cols-2", "lg:grid-cols-3"],
  },
  theme: {
    extend: {
      // Définition personnalisée des breakpoints pour coller à ta grille CSS :
      screens: {
        md: "767px",    // Tablette à partir de 767px
        lg: "992px",    // Desktop à partir de 992px
      },
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        "secondary-hover": "var(--secondary-color-hover)",
        tertiary: "var(--tertiary-color)",
        "tertiary-hover": "var(--tertiary-color-hover)",
        "card-bg": "var(--card-bg)",
        "card-bg-hover": "var(--card-bg-hover)",
        "gray-500": "var(--gray-500)",
        "gray-600": "var(--gray-600)",
        "gray-700": "var(--gray-700)",
        "gray-800": "var(--gray-800)",
        "gray-900": "var(--gray-900)",
        white: "var(--white)",
        black: "var(--black)",
        transparent: "var(--transparent)",
      },
      fontFamily: {
        base: "var(--font-base)",
        heading: "var(--font-heading)",
      },
      fontSize: {
        sm: "var(--font-size-sm)",
        base: "var(--font-size-base)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
      },
    },
  },
  plugins: [],
};
