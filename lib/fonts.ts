import { Inter } from "next/font/google";

// Configure the Inter font with proper subsets and display settings
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
  variable: "--font-inter",
});
