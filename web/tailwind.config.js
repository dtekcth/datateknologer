const theme = {
  // primary: "hsla(160, 22%, 46%)",
  primary: "#f77f00",
  "primary-focus": "#f78f00",
  accent: "hsla(357, 46%, 52%, 1.0)",
  purple: "hsla(255, 25%, 59%, 1)",
  green: "hsla(160, 22%, 46%)",
  warning: "hsl(32, 98%, 61%)",
  error: "hsla(357, 46%, 52%, 1.0)",
};

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  theme: {
    extend: {
      colors: {
        // purple: "hsl(255, 25%, 59%)",
        brand: "#f77f00",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...theme,
          muted: "hsl(216deg, 15%, 48%)",
          "base-content": "#e4e4e7",
          "base-100": "hsl(203deg, 33%, 15%)",
          "base-200": "hsl(203deg, 40%, 19%)",
          "base-300": "hsl(203deg, 23%, 22%)",
          "--border-btn": "0px",
        },
      },
    ],
  },
};
