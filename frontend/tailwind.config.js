/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sophisticated pastel color palette
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        pastel: {
          // Sophisticated pastel palette
          cyan: '#E0F7FA',        // Azul cian suave
          'cyan-light': '#F0FDFF', // Azul cian muy claro
          pink: '#FCE7F3',        // Rosa pastel (para compatibilidad)
          'rose-pale': '#FDF2F8',  // Rosa palo
          'rose-soft': '#FCE7F3',  // Rosa suave
          beige: '#F7F3E9',        // Beige
          'beige-warm': '#FAF7F0', // Beige cálido
          cream: '#FFFBF5',        // Color nata
          'cream-soft': '#FEF9F3', // Nata suave
          pearl: '#F8F6F0',       // Perla
          powder: '#F5F0F6',      // Polvo
          mint: '#F0FDF4',        // Verde menta
          lavender: '#F3E8FF',    // Lavanda
          rose: '#FCE7F3',        // Rosa (alias para compatibilidad)
          blush: '#FEF7F0',       // Rubor
          ivory: '#FFFEF7',       // Marfil
        },
        feminine: {
          // Vibrant feminine colors
          'rose-gold': '#F7CAC9',    // Oro rosa
          'dusty-rose': '#DCAE96',   // Rosa polvoriento
          'blush-pink': '#F8BBD9',   // Rosa rubor
          'soft-coral': '#FFB3BA',   // Coral suave
          'champagne': '#F7E7CE',    // Champagne
          'mauve': '#E0ACD5',        // Malva
          'lilac': '#C8A2C8',        // Lila
          'peach': '#FFCCCB',        // Durazno
          'sage': '#9CAF88',         // Salvia
          'lavender-gray': '#C4C3D0', // Lavanda gris
        },
        neutral: {
          warm: '#FEFCF9',
          soft: '#FAF8F5',
          elegant: '#F9F7F4',
        },
        accent: {
          gold: '#F7E6A3',
          'gold-light': '#FBF3D3',
          sage: '#E8F5E8',
          lavender: '#F3F0FF',
        }
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Poppins', 'sans-serif'],
        'sans': ['Poppins', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
        'script': ['Dancing Script', 'cursive'],
        'elegant': ['Cormorant Garamond', 'serif'],
        'heading': ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
