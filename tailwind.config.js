/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"JetBrains Sans"', 'Inter', 'system-ui', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'Monaco', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'none': '0px',
        'sm': '6px',      // Small elements
        'md': '10px',     // Medium elements  
        'lg': '14px',     // Large elements
        'xl': '18px',     // Cards and major elements
        '2xl': '24px',    // Hero cards and primary containers
        '3xl': '32px',    // Feature cards and special containers
        'full': '9999px', // Pills and circular elements
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'slide-in-right': 'slideInRight 0.4s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient': 'gradient 6s ease infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
        scaleIn: {
          '0%': { 
            opacity: '0', 
            transform: 'scale(0.95)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'scale(1)' 
          },
        },
        slideInRight: {
          '0%': { 
            opacity: '0', 
            transform: 'translateX(20px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateX(0)' 
          },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' 
          },
        },
        gradient: {
          '0%, 100%': {
            backgroundPosition: '0% 50%'
          },
          '50%': {
            backgroundPosition: '100% 50%'
          },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      spacing: {
        '11': '44px', // Touch target minimum
        '13': '52px',
        '15': '60px',
        '17': '68px',
        '18': '72px',
        '19': '76px',
        '21': '84px',
        '22': '88px',
        '23': '92px',
        '25': '100px',
        '26': '104px',
        '27': '108px',
        '29': '116px',
        '30': '120px',
        '31': '124px',
        '33': '132px',
        '34': '136px',
        '35': '140px',
      },
      fontSize: {
        // iOS-inspired typography scale
        'xs': ['12px', { lineHeight: '16px' }],     // Small detail text
        'sm': ['14px', { lineHeight: '20px' }],     // Secondary text
        'base': ['16px', { lineHeight: '24px' }],   // Body text (iOS default)
        'lg': ['18px', { lineHeight: '28px' }],     // Large body text
        'xl': ['20px', { lineHeight: '32px' }],     // Small titles
        '2xl': ['24px', { lineHeight: '36px' }],    // Card titles
        '3xl': ['28px', { lineHeight: '40px' }],    // Section titles
        '4xl': ['32px', { lineHeight: '44px' }],    // Page titles
        '5xl': ['36px', { lineHeight: '48px' }],    // Hero titles
        '6xl': ['40px', { lineHeight: '52px' }],    // Large hero titles
        
        // Apple-specific text sizes
        'ios-caption1': ['12px', { lineHeight: '16px' }],
        'ios-caption2': ['11px', { lineHeight: '15px' }],
        'ios-footnote': ['13px', { lineHeight: '18px' }],
        'ios-subheadline': ['15px', { lineHeight: '21px' }],
        'ios-callout': ['16px', { lineHeight: '22px' }],
        'ios-body': ['17px', { lineHeight: '24px' }],
        'ios-headline': ['17px', { lineHeight: '24px', fontWeight: '600' }],
        'ios-title3': ['20px', { lineHeight: '28px', fontWeight: '400' }],
        'ios-title2': ['22px', { lineHeight: '30px', fontWeight: '600' }],
        'ios-title1': ['28px', { lineHeight: '36px', fontWeight: '700' }],
        'ios-large-title': ['34px', { lineHeight: '42px', fontWeight: '700' }],
      },
      backdropBlur: {
        '3xl': '64px',
      },
      boxShadow: {
        // Apple-inspired shadows
        'ios-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'ios-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'ios-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'ios-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'ios-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08)',
        'card-active': '0 4px 16px rgba(0, 0, 0, 0.16), 0 2px 8px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}