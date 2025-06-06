import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        charcoal: "#333333",
        blue: {
          500: "#3b82f6",
          600: "#2563eb",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        heading: ["var(--font-amara)", "sans-serif"],
        display: ["var(--font-amara)", "sans-serif"],
        sans: ["var(--font-cabinet)", "sans-serif"],
        body: ["var(--font-cabinet)", "sans-serif"],
      },
      fontSize: {
        'h1': ['32px', {
          lineHeight: '36px',
          letterSpacing: '-0.05em',
          fontWeight: '700',
        }],
        'h2': ['24px', {
          lineHeight: '30px',
          letterSpacing: '-0.03em',
          fontWeight: '500',
        }],
        'h3': ['20px', {
          lineHeight: '26px',
          letterSpacing: '-0.02em',
          fontWeight: '400',
        }],
        'body': ['16px', {
          lineHeight: '24px',
          fontWeight: '400',
        }],
        'body-sm': ['14px', {
          lineHeight: '20px',
          fontWeight: '400',
        }],
        'body-xs': ['12px', {
          lineHeight: '16px',
          fontWeight: '400',
        }],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}
export default config
