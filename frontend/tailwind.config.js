/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Cores personalizadas
      colors: {
        'unimed-green': '#009A59',
        'unimed-green-dark': '#007A45',
        'unimed-green-light': '#E8F5E9',
        'unimed-white': '#FFFFFF',
        
        // Cores do alto contraste
        'high-contrast-bg': '#121214',
        'high-contrast-surface': '#1e1e20',
        'high-contrast-text': '#f0f0f0',
        'high-contrast-border': '#666666',
        
        // Cores principais
        'primary': '#d63384',
        'primary-dark': '#b82a6e',
        'primary-light': '#f06292',
        'secondary': '#888888',
      },
      
      // Fontes
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      
      // ✅ Sombras personalizadas
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'hover': '0 4px 16px rgba(214, 51, 132, 0.15)',
      },
      
      // ✅ Animações
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};