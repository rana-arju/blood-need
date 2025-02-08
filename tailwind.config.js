/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#FF0000",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fall-1": {
          "0%": { transform: "translateY(-50px) rotate(0deg)", opacity: 0 },
          "50%": { opacity: 1 },
          "100%": {
            transform: "translateY(100vh) rotate(360deg)",
            opacity: 0,
          },
        },
        "fall-2": {
          "0%": { transform: "translateY(-50px) rotate(0deg)", opacity: 0 },
          "50%": { opacity: 1 },
          "100%": {
            transform: "translateY(100vh) rotate(-360deg)",
            opacity: 0,
          },
        },
        "fall-3": {
          "0%": { transform: "translateY(-50px) rotate(0deg)", opacity: 0 },
          "50%": { opacity: 1 },
          "100%": {
            transform: "translateY(100vh) rotate(180deg)",
            opacity: 0,
          },
        },
        "fall-4": {
          "0%": { transform: "translateY(-50px) rotate(0deg)", opacity: 0 },
          "50%": { opacity: 1 },
          "100%": {
            transform: "translateY(100vh) rotate(-180deg)",
            opacity: 0,
          },
        },
        "fall-5": {
          "0%": { transform: "translateY(-50px) rotate(0deg)", opacity: 0 },
          "50%": { opacity: 1 },
          "100%": {
            transform: "translateY(100vh) rotate(90deg)",
            opacity: 0,
          },
        },
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fall-1": "fall-1 5s linear infinite",
        "fall-2": "fall-2 7s linear infinite",
        "fall-3": "fall-3 6s linear infinite",
        "fall-4": "fall-4 8s linear infinite",
        "fall-5": "fall-5 9s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};



module.exports = config; // ✅ Use CommonJS syntax
