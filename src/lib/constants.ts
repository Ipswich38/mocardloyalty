import { TierInfo, MembershipTier, Patient, Admin, Dentist } from '../types'

// Application Configuration
export const APP_CONFIG = {
  name: 'MOCards',
  version: '1.0.0',
  description: 'Digital Dental Loyalty Card System',
  company: 'MO Dental Care',
  supportEmail: 'support@mocards.com',
  supportPhone: '(555) 123-4567',
} as const

// API Configuration
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  retries: 3,
} as const

// Feature Flags
export const FEATURES = {
  enableDemoMode: import.meta.env.VITE_ENABLE_DEMO_MODE === 'true',
  enableAnimations: import.meta.env.VITE_ENABLE_ANIMATIONS !== 'false',
  enableNotifications: true,
  enableOfflineMode: false,
} as const

// Membership Tier Configuration
export const TIER_INFOS: Record<MembershipTier, TierInfo> = {
  Bronze: {
    name: 'Bronze',
    color: '#CD7F32',
    gradient: 'from-amber-500/80 via-orange-500/80 to-amber-600/80',
    minPoints: 0,
    maxPoints: 999,
    multiplier: 1.0,
    icon: '🥉',
    description: 'Start your loyalty journey with essential benefits',
    benefits: [
      'Basic appointment reminders',
      'Birthday discount (10%)',
      '1x points on all services',
      'Priority scheduling for regular appointments',
    ],
  },
  Silver: {
    name: 'Silver',
    color: '#C0C0C0',
    gradient: 'from-slate-400/80 via-slate-500/80 to-slate-600/80',
    minPoints: 1000,
    maxPoints: 2999,
    multiplier: 1.2,
    icon: '🥈',
    description: 'Enhanced benefits for our valued members',
    benefits: [
      'Extended appointment reminders',
      'Birthday discount (15%)',
      '1.2x points on all services',
      'Priority scheduling',
      'Complimentary consultation once per year',
    ],
  },
  Gold: {
    name: 'Gold',
    color: '#FFD700',
    gradient: 'from-yellow-400/80 via-yellow-500/80 to-amber-500/80',
    minPoints: 3000,
    maxPoints: 7499,
    multiplier: 1.5,
    icon: '🥇',
    description: 'Premium benefits for our loyal members',
    benefits: [
      'Premium appointment reminders',
      'Birthday discount (20%)',
      '1.5x points on all services',
      'Priority scheduling and expedited service',
      'Complimentary consultations (2x per year)',
      'Access to exclusive dental care packages',
      '10% discount on all cosmetic procedures',
    ],
  },
  Platinum: {
    name: 'Platinum',
    color: '#E5E4E2',
    gradient: 'from-purple-400/80 via-indigo-500/80 to-purple-600/80',
    minPoints: 7500,
    multiplier: 2.0,
    icon: '💎',
    description: 'Exclusive VIP treatment for our most valued members',
    benefits: [
      'VIP appointment reminders and concierge service',
      'Birthday discount (25%)',
      '2x points on all services',
      'Highest priority scheduling',
      'Unlimited complimentary consultations',
      'Exclusive access to new treatments',
      '15% discount on all cosmetic procedures',
      'Complimentary annual dental checkup',
      'Family member benefits extension',
    ],
  },
}

// Demo Credentials
export const DEMO_CREDENTIALS = {
  username: 'demo',
  password: 'password123',
} as const

// Multi-role Credentials
export const ROLE_CREDENTIALS = {
  patient: { username: 'patient', password: 'patient123' },
  dentist: { username: 'dentist', password: 'dentist123' },
  admin: { username: 'admin', password: 'admin123' },
} as const

// Mock Patient Data
export const MOCK_PATIENT: Patient = {
  id: 'patient_001',
  username: 'patient',
  email: 'maria.santos@email.com',
  role: 'patient',
  isActive: true,
  createdAt: '2022-03-15',
  lastLogin: '2024-01-15',
  name: 'Maria Santos',
  phone: '(555) 123-4567',
  emergencyContact: 'Carlos Santos',
  emergencyPhone: '(555) 987-6543',
  membershipId: 'MOCMAR789ABC',
  loyaltyPoints: 3250,
  level: 7,
  membershipTier: 'Gold',
  pointsToNextTier: 4250,
  memberSince: '2022-03-15',
  lastVisit: '2024-01-15',
  address: {
    street: '123 Main Street',
    city: 'Anytown',
    state: 'CA',
    zipCode: '90210',
    country: 'United States',
  },
  dateOfBirth: '1985-06-15',
  dentistId: 'dentist_001',
  dentalBenefits: {
    oralProphylaxis: {
      used: true,
      remaining: 1,
      total: 2,
      lastUsed: '2024-01-15',
      expiryDate: '2024-12-31',
    },
    toothExtraction: {
      used: false,
      remaining: 2,
      total: 2,
      expiryDate: '2024-12-31',
    },
    lightCureFilling: {
      used: true,
      remaining: 2,
      total: 3,
      lastUsed: '2023-11-20',
      expiryDate: '2024-12-31',
    },
    fluorideTreatment: {
      used: false,
      remaining: 4,
      total: 4,
      expiryDate: '2024-12-31',
    },
  },
  services: [
    {
      id: 'service_001',
      name: 'Dental Cleaning',
      description: 'Professional teeth cleaning and polishing',
      cost: 120,
      pointsEarned: 180,
      completed: true,
      date: '2024-01-15',
      benefitUsed: true,
      category: 'preventive',
      provider: 'Dr. Smith',
      notes: 'Regular cleaning, excellent oral hygiene',
    },
    {
      id: 'service_002',
      name: 'Composite Filling',
      description: 'Light-cure composite filling for upper molar',
      cost: 180,
      pointsEarned: 270,
      completed: true,
      date: '2023-11-20',
      benefitUsed: true,
      category: 'restorative',
      provider: 'Dr. Johnson',
      notes: 'Small cavity filled, good recovery',
    },
    {
      id: 'service_003',
      name: 'Teeth Whitening',
      description: 'Professional in-office teeth whitening treatment',
      cost: 350,
      pointsEarned: 525,
      completed: true,
      date: '2023-09-10',
      benefitUsed: false,
      category: 'cosmetic',
      provider: 'Dr. Smith',
      notes: 'Excellent whitening results, patient very satisfied',
    },
    {
      id: 'service_004',
      name: 'Dental Consultation',
      description: 'Comprehensive oral health examination',
      cost: 85,
      pointsEarned: 127,
      completed: true,
      date: '2023-06-15',
      benefitUsed: false,
      category: 'preventive',
      provider: 'Dr. Wilson',
      notes: 'Routine checkup, no issues found',
    },
    {
      id: 'service_005',
      name: 'Root Canal Treatment',
      description: 'Endodontic treatment for infected tooth',
      cost: 1200,
      pointsEarned: 1800,
      completed: false,
      benefitUsed: false,
      category: 'surgical',
      provider: 'Dr. Martinez',
      notes: 'Scheduled for next month, preliminary X-rays completed',
    },
    {
      id: 'service_006',
      name: 'Fluoride Treatment',
      description: 'Topical fluoride application for cavity prevention',
      cost: 45,
      pointsEarned: 67,
      completed: false,
      benefitUsed: false,
      category: 'preventive',
      provider: 'Dr. Smith',
      notes: 'Scheduled as follow-up to cleaning',
    },
  ],
}

// Service Categories Configuration
export const SERVICE_CATEGORIES = {
  preventive: {
    name: 'Preventive Care',
    description: 'Routine dental care to prevent problems',
    color: 'from-green-500 to-emerald-600',
    icon: '🛡️',
  },
  restorative: {
    name: 'Restorative',
    description: 'Treatments to restore damaged teeth',
    color: 'from-blue-500 to-cyan-600',
    icon: '🔧',
  },
  cosmetic: {
    name: 'Cosmetic',
    description: 'Treatments to improve smile appearance',
    color: 'from-pink-500 to-rose-600',
    icon: '✨',
  },
  surgical: {
    name: 'Surgical',
    description: 'Surgical dental procedures',
    color: 'from-red-500 to-orange-600',
    icon: '🏥',
  },
  orthodontic: {
    name: 'Orthodontic',
    description: 'Teeth alignment and bite correction',
    color: 'from-indigo-500 to-purple-600',
    icon: '🦷',
  },
  emergency: {
    name: 'Emergency',
    description: 'Urgent dental care',
    color: 'from-yellow-500 to-amber-600',
    icon: '🚨',
  },
} as const

// Animation Configuration
export const ANIMATIONS = {
  durations: {
    fast: 0.15,
    normal: 0.2,
    slow: 0.3,
    slower: 0.5,
  },
  easings: {
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const

// Default Motion Props
export const DEFAULT_MOTION_PROPS = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { 
    duration: ANIMATIONS.durations.slow, 
    ease: ANIMATIONS.easings.easeOut 
  },
} as const

// Notification Configuration
export const NOTIFICATION_CONFIG = {
  duration: {
    short: 3000,
    medium: 5000,
    long: 7000,
  },
  position: {
    top: 'top-4',
    bottom: 'bottom-4',
    center: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  },
} as const

// Validation Rules
export const VALIDATION = {
  password: {
    minLength: 6,
    maxLength: 50,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  },
  phone: {
    pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  membershipId: {
    pattern: /^MOC[A-Z]{3}[A-Z0-9]{6}$/,
  },
} as const

// Error Messages
export const ERROR_MESSAGES = {
  auth: {
    invalidCredentials: 'Invalid username or password. Please try again.',
    sessionExpired: 'Your session has expired. Please log in again.',
    networkError: 'Network error. Please check your connection and try again.',
  },
  validation: {
    required: 'This field is required.',
    invalidEmail: 'Please enter a valid email address.',
    invalidPhone: 'Please enter a valid phone number.',
    passwordTooShort: 'Password must be at least 6 characters long.',
    passwordTooWeak: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  },
  general: {
    unexpected: 'An unexpected error occurred. Please try again.',
    loading: 'Loading...',
    noData: 'No data available.',
  },
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  auth: {
    loginSuccess: 'Welcome back! Login successful.',
    logoutSuccess: 'You have been logged out successfully.',
  },
  general: {
    updateSuccess: 'Information updated successfully.',
    saveSuccess: 'Changes saved successfully.',
  },
} as const

// Theme Configuration
export const THEME_CONFIG = {
  defaultMode: 'dark' as const,
  storageKey: 'mocards-theme',
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  theme: 'mocards-theme',
  userPreferences: 'mocards-preferences',
  authToken: 'mocards-auth-token',
  lastLogin: 'mocards-last-login',
  demoMode: 'mocards-demo-mode',
} as const

// Date Formats
export const DATE_FORMATS = {
  short: 'MM/DD/YYYY',
  long: 'MMMM DD, YYYY',
  time: 'HH:mm:ss',
  datetime: 'MM/DD/YYYY HH:mm:ss',
  iso: 'YYYY-MM-DDTHH:mm:ss.sssZ',
} as const

// Currency Configuration
export const CURRENCY_CONFIG = {
  code: 'USD',
  symbol: '$',
  locale: 'en-US',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
} as const

// Contact Information
export const CONTACT_INFO = {
  address: {
    street: '123 Dental Plaza',
    suite: 'Suite 200',
    city: 'Healthcare City',
    state: 'CA',
    zipCode: '90210',
    country: 'United States',
  },
  phone: {
    main: '(555) 123-4567',
    emergency: '(555) 911-HELP',
    fax: '(555) 123-4568',
  },
  email: {
    info: 'info@mocards.com',
    support: 'support@mocards.com',
    billing: 'billing@mocards.com',
  },
  hours: {
    weekdays: '8:00 AM - 6:00 PM',
    saturday: '9:00 AM - 3:00 PM',
    sunday: 'Closed',
    emergency: '24/7 Emergency Line Available',
  },
} as const

// Mock Dentist Data
export const MOCK_DENTIST: Dentist = {
  id: 'dentist_001',
  username: 'dentist',
  email: 'dr.johnson@dentalclinic.com',
  role: 'dentist',
  isActive: true,
  createdAt: '2021-01-15',
  lastLogin: '2024-01-15',
  name: 'Dr. Sarah Johnson',
  phone: '(555) 234-5678',
  specialization: 'General Dentistry',
  licenseNumber: 'DDS-12345-CA',
  patients: ['patient_001', 'patient_002', 'patient_003'],
  clinicId: 'clinic_001',
}

// Mock Admin Data  
export const MOCK_ADMIN: Admin = {
  id: 'admin_001',
  username: 'admin',
  email: 'admin@mocards.com',
  role: 'admin',
  isActive: true,
  createdAt: '2020-01-01',
  lastLogin: '2024-01-15',
  name: 'System Administrator',
  permissions: [
    'manage_dentists',
    'manage_patients',
    'manage_services',
    'view_analytics',
    'manage_redemptions',
    'system_settings'
  ],
  lastActivity: '2024-01-15T10:30:00Z',
}