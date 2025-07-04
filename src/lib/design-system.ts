// 🎨 COCCINELLE.AI - DESIGN SYSTEM
// Palette de couleurs multi-secteurs et guidelines UI/UX

export const DESIGN_SYSTEM = {
  // Couleurs principales Coccinelle.ai
  colors: {
    primary: {
      blue: '#2563EB',
      indigo: '#4F46E5',
      purple: '#9333EA'
    },
    
    // Couleurs par secteur
    sectors: {
      ecommerce: '#9333EA', // Purple
      healthcare: '#DC2626', // Red
      finance: '#4F46E5', // Indigo
      realestate: '#059669', // Green
      automotive: '#6B7280', // Gray
      education: '#F59E0B', // Yellow
      b2b: '#1F2937' // Dark Gray
    },
    
    // Couleurs Retell Enhanced
    retell: {
      fastTier: '#FFD700', // Gold
      chatWidget: '#00D4AA', // Teal
      customFunctions: '#FF6B6B' // Coral
    },
    
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
    semantic: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6'
    }
  },
  
  // Typography
  typography: {
    fonts: {
      primary: 'Inter, system-ui, sans-serif',
      secondary: 'Poppins, system-ui, sans-serif'
    },
    
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem'
    },
    
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    
    lineHeights: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    }
  },
  
  // Spacing
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem'
  },
  
  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px'
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000'
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  
  // Animations
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
};

// Utilitaires pour les secteurs
export const getSectorColor = (sector: string) => {
  return DESIGN_SYSTEM.colors.sectors[sector as keyof typeof DESIGN_SYSTEM.colors.sectors] || DESIGN_SYSTEM.colors.sectors.b2b;
};

export const getSectorGradient = (sector: string) => {
  const color = getSectorColor(sector);
  return `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`;
};

// Classes CSS utilitaires
export const CSS_CLASSES = {
  // Hero Section
  heroHeadline: 'text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight',
  heroSubheadline: 'text-lg md:text-xl lg:text-2xl text-neutral-600 leading-relaxed',
  
  // Section Titles
  sectionTitle: 'text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900',
  sectionSubtitle: 'text-lg md:text-xl text-neutral-600 mt-4',
  
  // Buttons
  buttonPrimary: 'bg-primary-blue hover:bg-primary-indigo text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl',
  buttonSecondary: 'border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300',
  buttonSector: (sector: string) => `bg-${sector} hover:bg-${sector}/90 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300`,
  
  // Cards
  card: 'bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-neutral-200',
  cardHover: 'transform hover:-translate-y-2',
  
  // Badges
  badge: 'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium',
  badgeSector: (sector: string) => `bg-${sector}/10 text-${sector} border border-${sector}/20`,
  
  // Gradients
  gradientPrimary: 'bg-gradient-to-br from-primary-blue via-primary-indigo to-primary-purple',
  gradientSector: (sector: string) => `bg-gradient-to-br from-${sector} to-${sector}/80`,
  
  // Animations
  fadeIn: 'animate-in fade-in duration-500',
  slideUp: 'animate-in slide-in-from-bottom-4 duration-500',
  scaleIn: 'animate-in zoom-in-95 duration-300'
};

// Configuration responsive
export const RESPONSIVE_CONFIG = {
  container: {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl'
  },
  
  grid: {
    sm: 'grid-cols-1',
    md: 'grid-cols-2',
    lg: 'grid-cols-3',
    xl: 'grid-cols-4'
  },
  
  spacing: {
    section: 'py-16 md:py-24 lg:py-32',
    container: 'px-4 md:px-6 lg:px-8'
  }
};

// Thèmes par secteur
export const SECTOR_THEMES = {
  ecommerce: {
    primary: DESIGN_SYSTEM.colors.sectors.ecommerce,
    secondary: '#A855F7',
    accent: '#F3E8FF',
    text: '#1F2937'
  },
  healthcare: {
    primary: DESIGN_SYSTEM.colors.sectors.healthcare,
    secondary: '#EF4444',
    accent: '#FEF2F2',
    text: '#1F2937'
  },
  finance: {
    primary: DESIGN_SYSTEM.colors.sectors.finance,
    secondary: '#6366F1',
    accent: '#EEF2FF',
    text: '#1F2937'
  },
  realestate: {
    primary: DESIGN_SYSTEM.colors.sectors.realestate,
    secondary: '#10B981',
    accent: '#ECFDF5',
    text: '#1F2937'
  },
  automotive: {
    primary: DESIGN_SYSTEM.colors.sectors.automotive,
    secondary: '#6B7280',
    accent: '#F9FAFB',
    text: '#1F2937'
  },
  education: {
    primary: DESIGN_SYSTEM.colors.sectors.education,
    secondary: '#F59E0B',
    accent: '#FFFBEB',
    text: '#1F2937'
  },
  b2b: {
    primary: DESIGN_SYSTEM.colors.sectors.b2b,
    secondary: '#374151',
    accent: '#F3F4F6',
    text: '#1F2937'
  }
};

// Export des utilitaires
export const getTheme = (sector: string) => SECTOR_THEMES[sector as keyof typeof SECTOR_THEMES] || SECTOR_THEMES.b2b; 