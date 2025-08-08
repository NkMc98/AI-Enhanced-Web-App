// /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce': 'bounce 1s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        sm: '4px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      colors: {
        gray: {
          850: '#1f2937',
          950: '#111827'
        }
      }
    },
  },
  plugins: [],
}