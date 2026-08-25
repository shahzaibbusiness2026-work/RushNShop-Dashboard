import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      xs: '380px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['var(--font-heading)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        rush: {
          sidebar: '#0d1117',
          sidebarHover: '#161b22',
          sidebarActive: '#1a2234',
          cardDark: '#0f1420',
          accent: '#10b981',
          accentHover: '#059669',
          accentGlow: '#34d399',
          neonGreen: '#10b981',
          lime: '#10b981',
        },
      },
      boxShadow: {
        'rush-glow': '0 0 20px -5px rgba(16, 185, 129, 0.3)',
        'card-subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};
export default config;
