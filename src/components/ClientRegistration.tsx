import { useState } from 'react'
import { ClientRegistration } from '../types'

interface ClientRegistrationProps {
  onRegister: (registration: ClientRegistration) => void
  onBackToLogin: () => void
  isLoading?: boolean
}

export function ClientRegistrationForm({ onRegister, onBackToLogin, isLoading = false }: ClientRegistrationProps) {
  const [registration, setRegistration] = useState<ClientRegistration>({
    fullName: '',
    controlNumber: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset errors
    setErrors({})
    const newErrors: Record<string, string> = {}

    // Validation
    if (!registration.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    if (!registration.controlNumber.trim()) {
      newErrors.controlNumber = 'Control number is required'
    }
    if (!registration.password) {
      newErrors.password = 'Password is required'
    } else if (registration.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters'
    }
    if (registration.password !== registration.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onRegister(registration)
  }

  const handleInputChange = (field: keyof ClientRegistration) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistration({
      ...registration,
      [field]: e.target.value
    })
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white text-black p-8 rounded-lg max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">MOCards Client Registration</h1>
          <p className="text-gray-600 text-sm">Set up your account with your control number</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={registration.fullName}
              onChange={handleInputChange('fullName')}
              className={`w-full p-3 border rounded focus:outline-none focus:border-blue-500 ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name as registered"
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Control Number</label>
            <input
              type="text"
              value={registration.controlNumber}
              onChange={handleInputChange('controlNumber')}
              className={`w-full p-3 border rounded focus:outline-none focus:border-blue-500 ${
                errors.controlNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., #1075"
            />
            {errors.controlNumber && <p className="text-red-500 text-xs mt-1">{errors.controlNumber}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Set Your Password</label>
            <input
              type="password"
              value={registration.password}
              onChange={handleInputChange('password')}
              className={`w-full p-3 border rounded focus:outline-none focus:border-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Choose a secure password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              value={registration.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              className={`w-full p-3 border rounded focus:outline-none focus:border-blue-500 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {isLoading ? 'Setting up account...' : 'Complete Registration'}
          </button>

          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full bg-gray-500 text-white p-3 rounded hover:bg-gray-600"
          >
            Back to Login
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded">
          <p className="text-sm font-medium mb-2 text-blue-800">Need your control number?</p>
          <p className="text-xs text-blue-700 leading-relaxed">
            Your control number is the order number provided when you purchased your MOCards membership 
            (e.g., #1075). Contact support if you need assistance.
          </p>
        </div>
        
        {/* Footer */}
        <div className="mt-6 text-center space-y-3">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <button 
              onClick={() => window.open('/privacy', '_blank')}
              className="hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => window.open('/terms', '_blank')}
              className="hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-gray-600">Developed & Designed by</span>
            <span className="text-xs font-semibold text-blue-600">kreativloops</span>
          </div>
        </div>
      </div>
    </div>
  )
}