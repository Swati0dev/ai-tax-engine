import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Georgia", "Cambria", "Times New Roman", "serif"]
      },
      fontSize: {
        display: ["clamp(3.5rem, 5vw + 1rem, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        h1: ["clamp(2.5rem, 4vw + 0.5rem, 3.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" }],
        h2: ["clamp(2rem, 3vw + 0.5rem, 2.75rem)", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        h3: ["clamp(1.5rem, 2vw + 0.5rem, 2rem)", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        h4: ["clamp(1.25rem, 1.5vw + 0.5rem, 1.5rem)", { lineHeight: "1.3", fontWeight: "700" }],
        h5: ["clamp(1.125rem, 1.2vw + 0.5rem, 1.25rem)", { lineHeight: "1.4", fontWeight: "700" }],
        h6: ["clamp(1rem, 1vw + 0.5rem, 1.125rem)", { lineHeight: "1.4", fontWeight: "700" }],
        lead: ["1.25rem", { lineHeight: "1.6" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75" }],
        body: ["clamp(1.03125rem, 1vw + 0.85rem, 1.125rem)", { lineHeight: "1.8" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        caption: ["0.75rem", { lineHeight: "1.5" }],
        label: ["0.875rem", { lineHeight: "1", fontWeight: "500" }],
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" }
        }
      },
      animation: {
        "pulse-slow": "pulse-slow 3s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
