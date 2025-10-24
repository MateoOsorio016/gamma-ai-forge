import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        // Gamma Brand Colors
        gamma: {
          dark: "hsl(var(--gamma-dark))",
          neon: "hsl(var(--gamma-neon))",  
          light: "hsl(var(--gamma-light))",
        },
        
        // Semantic Colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-accent": "var(--gradient-accent)",
        "gradient-hero": "var(--gradient-hero)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        strong: "var(--shadow-strong)",
        neon: "var(--shadow-neon)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "pulse-neon": {
          "0%, 100%": { boxShadow: "var(--shadow-neon)" },
          "50%": { boxShadow: "0 0 40px hsl(var(--gamma-neon) / 0.6)" },
        },
        "spider-drop": {
          "0%": {
            transform: "translateY(-100px)",
            opacity: "0",
          },
          "20%": {
            opacity: "1",
          },
          "40%": {
            transform: "translateY(0px)",
          },
          "100%": {
            transform: "translateY(0px)",
            opacity: "1",
          },
        },
        "spider-swing": {
          "0%, 100%": {
            transform: "rotate(-8deg)",
          },
          "50%": {
            transform: "rotate(8deg)",
          },
        },
        "witch-fly": {
          "0%": {
            transform: "translateX(-150%) translateY(50px) rotate(-15deg)",
            opacity: "0",
          },
          "15%": {
            opacity: "1",
          },
          "45%": {
            transform: "translateX(50%) translateY(-20px) rotate(-5deg)",
          },
          "55%": {
            transform: "translateX(50%) translateY(0px) rotate(0deg)",
          },
          "100%": {
            transform: "translateX(50%) translateY(0px) rotate(0deg)",
            opacity: "1",
          },
        },
        "float-witch": {
          "0%, 100%": {
            transform: "translateY(0px) rotate(-2deg)",
          },
          "50%": {
            transform: "translateY(-10px) rotate(2deg)",
          },
        },
        "web-appear": {
          "0%": {
            opacity: "0",
            transform: "scale(0.8)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "glow-pulse": {
          "0%, 100%": {
            filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))",
          },
          "50%": {
            filter: "drop-shadow(0 0 20px rgba(168, 85, 247, 0.8))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        "spider-drop": "spider-drop 3s ease-out forwards",
        "spider-swing": "spider-swing 4s ease-in-out infinite 3s",
        "witch-fly": "witch-fly 4s ease-in-out forwards",
        "float-witch": "float-witch 3s ease-in-out infinite 4s",
        "web-appear": "web-appear 1s ease-out forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
