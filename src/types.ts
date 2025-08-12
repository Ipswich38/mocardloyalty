// Core Data Types
export interface Patient extends User {
  name: string;
  phone: string;
  emergencyContact: string;
  emergencyPhone: string;
  membershipId: string;
  loyaltyPoints: number;
  level: number;
  membershipTier: MembershipTier;
  pointsToNextTier: number;
  dentalBenefits: DentalBenefits;
  services: Service[];
  memberSince: string;
  address?: PatientAddress;
  dateOfBirth?: string;
  lastVisit?: string;
  dentistId?: string;
}

export interface Dentist extends User {
  name: string;
  phone: string;
  specialization: string;
  licenseNumber: string;
  patients: string[];
  clinicId?: string;
  profileImage?: string;
}

export interface Admin extends User {
  name: string;
  permissions: AdminPermission[];
  lastActivity?: string;
}

export type AdminPermission = 
  | 'manage_dentists'
  | 'manage_patients'
  | 'manage_services'
  | 'view_analytics'
  | 'manage_redemptions'
  | 'system_settings';

export interface PatientAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface DentalBenefits {
  oralProphylaxis: BenefitStatus;
  toothExtraction: BenefitStatus;
  lightCureFilling: BenefitStatus;
  fluorideTreatment: BenefitStatus;
}

export interface BenefitStatus {
  used: boolean;
  remaining: number;
  total: number;
  lastUsed?: string;
  expiryDate?: string;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  cost: number;
  pointsEarned: number;
  completed: boolean;
  date?: string;
  benefitUsed: boolean;
  category: ServiceCategory;
  provider?: string;
  notes?: string;
}

// Authentication & Navigation
export interface Credentials {
  username: string;
  password: string;
}

export interface ClientRegistration {
  fullName: string;
  controlNumber: string;
  password: string;
  confirmPassword?: string;
}

export interface ClientData {
  orderNumber: string;
  email: string;
  billingName: string;
  billingPhone: string;
  created: string;
  hasRegistered: boolean;
  password?: string;
}

export type ViewType = 'login' | 'patient' | 'register' | 'new-register' | 'admin' | 'dentist';

export type UserRole = 'patient' | 'dentist' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

// UI Component Props
export interface LoginScreenProps {
  credentials: Credentials;
  setCredentials: (credentials: Credentials) => void;
  onLogin: (e: React.FormEvent) => void;
  onShowRegistration?: () => void;
  isLoading?: boolean;
}

export interface PatientDashboardProps {
  patient: Patient;
  onLogout: () => void;
}

export interface VirtualCardProps {
  patient: Patient;
  className?: string;
}

export interface BenefitsTrackerProps {
  patient: Patient;
  onBenefitUpdate?: (benefitKey: string, status: BenefitStatus) => void;
}

export interface ServiceHistoryProps {
  patient: Patient;
  onServiceUpdate?: (service: Service) => void;
}

// Tier System
export type MembershipTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface TierInfo {
  name: MembershipTier;
  color: string;
  gradient: string;
  minPoints: number;
  maxPoints?: number;
  benefits: string[];
  icon: string;
  multiplier: number;
  description: string;
}

export interface TierProgress {
  currentTier: MembershipTier;
  nextTier: MembershipTier | null;
  pointsToNext: number;
  progressPercentage: number;
}

// Service Categories
export type ServiceCategory = 
  | 'preventive' 
  | 'restorative' 
  | 'cosmetic' 
  | 'surgical' 
  | 'orthodontic' 
  | 'emergency';

// UI State Types
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ErrorState {
  hasError: boolean;
  message?: string;
  code?: string;
}

export interface NotificationState {
  show: boolean;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

// Theme System
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor?: string;
  enableAnimations: boolean;
  glassmorphism: boolean;
}

// Form Types
export interface LoginFormData extends Credentials {
  rememberMe?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface PatientApiResponse extends ApiResponse<Patient> {}

export interface ServiceApiResponse extends ApiResponse<Service[]> {}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = 
  Pick<T, Exclude<keyof T, Keys>> & 
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

// Component Base Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface InteractiveComponentProps extends BaseComponentProps {
  onClick?: () => void;
  onHover?: () => void;
  disabled?: boolean;
}

// Animation Types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  repeat?: boolean;
}

export interface MotionProps {
  initial?: object;
  animate?: object;
  exit?: object;
  transition?: AnimationConfig;
}

// Chart Data Types (for future analytics)
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface TimeSeriesData extends ChartDataPoint {
  timestamp: string;
}

// New Registration Types
export interface NewClientRegistration {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: PatientAddress;
  emergencyContact: string;
  emergencyPhone: string;
  password: string;
  dentistId?: string;
}

export interface PendingRegistration extends NewClientRegistration {
  id: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

// Redemption Types
export interface Redemption {
  id: string;
  patientId: string;
  dentistId: string;
  serviceId: string;
  serviceName: string;
  pointsUsed: number;
  benefitType?: string;
  redemptionDate: string;
  status: 'pending' | 'completed' | 'cancelled';
  notes?: string;
}

// Dashboard Props
export interface AdminDashboardProps {
  admin: Admin;
  onLogout: () => void;
}

export interface DentistDashboardProps {
  dentist: Dentist;
  onLogout: () => void;
}

// CRUD Operation Types
export type CrudOperation = 'create' | 'read' | 'update' | 'delete';

export interface CrudState<T> {
  items: T[];
  loading: boolean;
  error: string | null;
  selectedItem: T | null;
}

// Service Management for Admin
export interface ServiceTemplate {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  basePrice: number;
  pointsRequired: number;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Perk {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  tier: MembershipTier[];
  isActive: boolean;
  expiryDate?: string;
  createdAt: string;
}

// Export all types for easy importing
export type * from './types';