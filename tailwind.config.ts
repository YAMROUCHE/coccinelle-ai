import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs principales Coccinelle.ai
        primary: {
          blue: '#2563EB',
          indigo: '#4F46E5',
          purple: '#9333EA'
        },
        
        // Couleurs par secteur
        ecommerce: '#9333EA',
        healthcare: '#DC2626',
        finance: '#4F46E5',
        realestate: '#059669',
        automotive: '#6B7280',
        education: '#F59E0B',
        b2b: '#1F2937',
        
        // Couleurs Retell Enhanced
        'fast-tier': '#FFD700',
        'chat-widget': '#00D4AA',
        'custom-functions': '#FF6B6B',
        
        // Couleurs neutres
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        },
        
        // Couleurs sémantiques
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
      },
      
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        secondary: ['Poppins', 'system-ui', 'sans-serif']
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        }
      },
      
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2563EB 0%, #4F46E5 50%, #9333EA 100%)',
        'gradient-ecommerce': 'linear-gradient(135deg, #9333EA 0%, #A855F7 100%)',
        'gradient-healthcare': 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
        'gradient-finance': 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
        'gradient-realestate': 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
        'gradient-automotive': 'linear-gradient(135deg, #6B7280 0%, #6B7280 100%)',
        'gradient-education': 'linear-gradient(135deg, #F59E0B 0%, #F59E0B 100%)',
        'gradient-b2b': 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
      }
    },
  },
  plugins: [],
};

export default config; 