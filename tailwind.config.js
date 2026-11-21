/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F5F0E7',
          light: '#FAF7F2',
          dark: '#EDE5D8',
        },
        gold: {
          DEFAULT: '#C6A46A',
          light: '#DFCCA6',
          dark: '#B08E55',
          muted: '#D6C29E',
          accent: '#9E7D46',
          border: 'rgba(198, 164, 106, 0.3)',
        },
        charcoal: {
          DEFAULT: '#29251F',
          light: '#3D3830',
          muted: '#5A5348',
          deep: '#1A1814',
        },
        beige: {
          DEFAULT: '#E9DED1',
          light: '#F2EBE2',
          dark: '#DDD0C0',
        },
        taupe: {
          DEFAULT: '#958878',
          light: '#B0A494',
          dark: '#7A6E5F',
        },
        emerald: {
          DEFAULT: '#1B4332',
          brand: '#1B4332',
          light: '#2D6A4F',
          whatsapp: '#25D366',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 12px 35px -10px rgba(41, 37, 31, 0.06), 0 4px 6px -2px rgba(41, 37, 31, 0.02)',
        'luxury-hover': '0 20px 40px -10px rgba(198, 164, 106, 0.2), 0 8px 12px -3px rgba(41, 37, 31, 0.04)',
        'gold-glow': '0 0 30px rgba(198, 164, 106, 0.25)',
        'modal': '0 25px 60px -15px rgba(26, 24, 20, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};
