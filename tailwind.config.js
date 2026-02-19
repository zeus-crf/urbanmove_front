/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        "primary-hover": "#1d4ed8",
        "bg-light": "#f8fafc",
        "glass-bg": "rgba(255, 255, 255, 0.7)",
        "glass-border": "rgba(255, 255, 255, 0.5)",
        "text-main": "#1e293b",
        "text-muted": "#64748b",
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
