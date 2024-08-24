import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.tsx", "./src/lib/**/*.tsx"],
  theme: {
    extend: {
      backgroundColor: {
        foreground: "rgb(var(--color-foreground-rgb))",
        background: "rgb(var(--color-background-rgb))",
      },
    },
  },
  plugins: [],
};
export default config;
