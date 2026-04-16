import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-jakarta)",
          "Plus Jakarta Sans",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      colors: {
        // Warm off-white palette — the core background system
        warm: {
          50: "#FAF9F6",
          100: "#F5F3EE",
          200: "#EDE9E0",
          300: "#DDD8CD",
          400: "#C8C1B4",
        },
      },
      boxShadow: {
        soft: "0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px -1px rgba(0,0,0,0.04)",
        card: "0 4px 24px -4px rgba(0,0,0,0.06), 0 1px 4px -1px rgba(0,0,0,0.03)",
        "card-hover":
          "0 8px 32px -8px rgba(0,0,0,0.10), 0 2px 8px -2px rgba(0,0,0,0.05)",
        lift: "0 16px 48px -8px rgba(0,0,0,0.14), 0 4px 16px -2px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
