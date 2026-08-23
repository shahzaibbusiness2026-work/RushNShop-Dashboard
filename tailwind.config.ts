import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        rush: {
          sidebar: "#0d1117",
          sidebarHover: "#161b22",
          sidebarActive: "#1a2234",
          cardDark: "#151b26",
          accent: "#22c55e",
          accentHover: "#16a34a",
          accentGlow: "#4ade80",
          neonGreen: "#10b981",
          lime: "#84cc16",
        }
      },
      boxShadow: {
        'rush-glow': '0 0 20px -5px rgba(34, 197, 94, 0.4)',
        'card-subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
};
export default config;
