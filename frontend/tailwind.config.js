/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#111827", // Black primary color
        "primary-dark": "#030712",
        "primary-light": "#F3F4F6",
        secondary: "#1F2937", // Dark gray for text
        accent: "#10B981", // Green for success/action elements
        "light-bg": "#F9FAFB",
        "text-dark": "#111827",
        "text-light": "#F9FAFB",
        "text-muted": "#6B7280",
        "border": "#E5E7EB",
        "card-bg": "#FFFFFF",
        "error": "#EF4444",
        "warning": "#F59E0B",
        "success": "#10B981",
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'button': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'button-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'card': '0.5rem',
        'button': '0.375rem',
      },
      transitionProperty: {
        'default': 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
        'colors': 'background-color, border-color, color, fill, stroke',
        'shadow': 'box-shadow',
        'transform': 'transform',
      },
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'linear': 'linear',
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'default': '150ms',
        'fast': '100ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
    },
    fontFamily: {
      'sans': ['Inter', 'Poppins', 'Roboto', 'sans-serif'],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
  },
  plugins: [],
}

