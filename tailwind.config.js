module.exports = {
  mode: "jit",
  content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        gray: { 100: "#f3f4f6", 400: "#b2b2b2", 900: "#111827", "900_d8": "#1b1f22d8", "900_e5": "#13232fe5" },
        blue_gray: {
          300: "#9ca3af",
          700: "#4b5563",
          800: "#374151",
          900: "#1f2937",
          "300_01": "#a0b3b0",
          "300_3f": "#a0b3b03f",
        },
        white: { A700: "#ffffff", A700_7f: "#ffffff7f" },
        blue: { A200: "#3b82f6" },
        green: { 400: "#4ade80", A700: "#22c55e" },
        amber: { 600: "#eab308" },
        red: { 800: "#c52222" },
        teal: { 400: "#1ab188" },
        colors: "#37464e",
        colors1: "#1ab188 ",
      },
      boxShadow: {
        xs: "0px 0px  1px 0px #000000",
        sm: "0px 4px  10px 4px #13232f4c",
        bs: "inset 0px 0px  1px 1px #ffffff",
      },
      fontFamily: { titilliumweb: "Titillium Web", inter: "Inter" },
      textShadow: { ts: "0px 4px  4px #0000003f" },
      backgroundImage: { gradient: "radial-gradient(90deg, #0000003f,#00000000)" },
      opacity: { 0.5: 0.5 },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
