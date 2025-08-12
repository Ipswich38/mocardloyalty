import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { MembershipTier, TierInfo, TierProgress, Patient } from "../types"

/**
 * Utility function to merge Tailwind classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format currency values consistently
 */
export const formatCurrency = (amount: number): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
    }).format(amount)
  } catch (error) {
    // Fallback to manual formatting if PHP currency is not supported
    return `₱${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }
}

/**
 * Format dates consistently
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/**
 * Format relative time (e.g., "2 days ago")
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) return 'Today'
  if (diffInDays === 1) return 'Yesterday'
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
  
  return `${Math.floor(diffInDays / 365)} years ago`
}

/**
 * Format phone numbers
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length !== 10) return phone
  
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`
  }
  
  return phone
}

/**
 * Calculate tier progress information
 */
export const calculateTierProgress = (
  currentPoints: number,
  tierInfos: Record<MembershipTier, TierInfo>
): TierProgress => {
  const tiers: MembershipTier[] = ['Bronze', 'Silver', 'Gold', 'Platinum']
  
  // Find current tier
  let currentTier: MembershipTier = 'Bronze'
  for (const tier of tiers) {
    if (currentPoints >= tierInfos[tier].minPoints) {
      currentTier = tier
    }
  }
  
  // Find next tier
  const currentTierIndex = tiers.indexOf(currentTier)
  const nextTier = currentTierIndex < tiers.length - 1 ? tiers[currentTierIndex + 1] : null
  
  // Calculate points to next tier
  let pointsToNext = 0
  let progressPercentage = 100
  
  if (nextTier) {
    const nextTierPoints = tierInfos[nextTier].minPoints
    const currentTierPoints = tierInfos[currentTier].minPoints
    pointsToNext = nextTierPoints - currentPoints
    progressPercentage = ((currentPoints - currentTierPoints) / (nextTierPoints - currentTierPoints)) * 100
  }
  
  return {
    currentTier,
    nextTier,
    pointsToNext,
    progressPercentage: Math.round(progressPercentage)
  }
}

/**
 * Generate membership ID
 */
export const generateMembershipId = (name: string): string => {
  const prefix = 'MOC'
  const namePart = name.substring(0, 3).toUpperCase()
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}${namePart}${randomPart}`
}

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone format
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  return phoneRegex.test(phone)
}

/**
 * Get contrast color (white or black) for given background color
 */
export const getContrastColor = (backgroundColor: string): string => {
  // Remove # if present
  const color = backgroundColor.replace('#', '')
  
  // Convert to RGB
  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  
  return luminance > 0.5 ? '#000000' : '#ffffff'
}

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => {
        inThrottle = false
      }, limit)
    }
  }
}

/**
 * Generate random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * Deep clone object
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T
  if (obj instanceof Object) {
    const clonedObj = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}

/**
 * Check if device is mobile
 */
export const isMobile = (): boolean => {
  return window.innerWidth < 768
}

/**
 * Check if device is tablet
 */
export const isTablet = (): boolean => {
  return window.innerWidth >= 768 && window.innerWidth < 1024
}

/**
 * Check if device is desktop
 */
export const isDesktop = (): boolean => {
  return window.innerWidth >= 1024
}

/**
 * Get tier color class for styling
 */
export const getTierColorClass = (tier: MembershipTier): string => {
  const colorClasses = {
    Bronze: 'from-amber-500/80 via-orange-500/80 to-amber-600/80',
    Silver: 'from-slate-400/80 via-slate-500/80 to-slate-600/80',
    Gold: 'from-yellow-400/80 via-yellow-500/80 to-amber-500/80',
    Platinum: 'from-purple-400/80 via-indigo-500/80 to-purple-600/80'
  }
  
  return colorClasses[tier]
}

/**
 * Calculate benefits usage percentage
 */
export const calculateBenefitsUsage = (patient: Patient): number => {
  const benefits = Object.values(patient.dentalBenefits)
  const totalBenefits = benefits.reduce((sum, benefit) => sum + benefit.total, 0)
  const usedBenefits = benefits.reduce((sum, benefit) => sum + (benefit.total - benefit.remaining), 0)
  
  if (totalBenefits === 0) return 0
  
  return Math.round((usedBenefits / totalBenefits) * 100)
}

/**
 * Format large numbers (e.g., 1.2K, 3.4M)
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

/**
 * Get initials from name
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

/**
 * Sleep function for async delays
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Local storage helpers with error handling
 */
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return defaultValue
    }
  },
  
  set: <T>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Error writing to localStorage:', error)
      return false
    }
  },
  
  remove: (key: string): boolean => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error('Error removing from localStorage:', error)
      return false
    }
  },
  
  clear: (): boolean => {
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }
}