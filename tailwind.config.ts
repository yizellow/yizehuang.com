import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import scrollbar from "tailwind-scrollbar";

const config: Partial<Config> = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./content/**/*.{md,yml,json}",
  ],
  plugins: [typography, scrollbar],
};

export default config;
