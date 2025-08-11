/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
          DEFAULT: "#C4A484", // Warm beige/tan - Key Color
          foreground: "hsl(var(--primary-foreground))",
          50: '#faf8f5',
          100: '#f0ebe1',
          200: '#e6d7c3',
          300: '#dcc3a5',
          400: '#d2af87',
          500: '#C4A484',
          600: '#b8956f',
          700: '#a0825c',
          800: '#886f49',
          900: '#6b5536',
        },
        sage: {
          50: '#f4f6f4',
          100: '#e6ebe6',
          200: '#cdd7cd',
          300: '#b4c3b4',
          400: '#9baf9b',
          500: '#7A8471', // Main sage green accent
          600: '#6b7562',
          700: '#5c6653',
          800: '#4d5744',
          900: '#3e4835',
        },
        dustyPink: {
          50: '#faf6f6',
          100: '#f2e8e8',
          200: '#e5d1d1',
          300: '#d8baba',
          400: '#cba3a3',
          500: '#B8918C', // Main dusty pink accent
          600: '#a67f7a',
          700: '#946d68',
          800: '#825b56',
          900: '#704944',
        },
        lightGray: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#D4D4D8', // Secondary light gray accent
          600: '#71717a',
          700: '#52525b',
          800: '#3f3f46',
          900: '#27272a',
        },
        navyBlue: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#2C3E50', // Secondary navy blue accent
          600: '#1e2a38',
          700: '#19202b',
          800: '#14171f',
          900: '#0f1114',
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
    },
  },
  plugins: [],
}