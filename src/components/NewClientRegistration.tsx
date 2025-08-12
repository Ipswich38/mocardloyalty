import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, User, Shield, Eye, EyeOff } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { NewClientRegistration, PatientAddress } from '../types'
import { VALIDATION, ERROR_MESSAGES } from '../lib/constants'

interface NewClientRegistrationProps {
  onRegister: (registration: NewClientRegistration) => Promise<void>
  onBackToLogin: () => void
  isLoading?: boolean
}

export function NewClientRegistrationForm({ 
  onRegister, 
  onBackToLogin, 
  isLoading = false 
}: NewClientRegistrationProps) {
  const [formData, setFormData] = useState<NewClientRegistration>({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    emergencyContact: '',
    emergencyPhone: '',
    password: ''
  })

  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(1)

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = ERROR_MESSAGES.validation.required
      if (!formData.email.trim()) {
        newErrors.email = ERROR_MESSAGES.validation.required
      } else if (!VALIDATION.email.pattern.test(formData.email)) {
        newErrors.email = ERROR_MESSAGES.validation.invalidEmail
      }
      if (!formData.phone.trim()) {
        newErrors.phone = ERROR_MESSAGES.validation.required
      } else if (!VALIDATION.phone.pattern.test(formData.phone)) {
        newErrors.phone = ERROR_MESSAGES.validation.invalidPhone
      }
      if (!formData.dateOfBirth) newErrors.dateOfBirth = ERROR_MESSAGES.validation.required
    }

    if (step === 2) {
      if (!formData.address.street.trim()) newErrors.street = ERROR_MESSAGES.validation.required
      if (!formData.address.city.trim()) newErrors.city = ERROR_MESSAGES.validation.required
      if (!formData.address.state.trim()) newErrors.state = ERROR_MESSAGES.validation.required
      if (!formData.address.zipCode.trim()) newErrors.zipCode = ERROR_MESSAGES.validation.required
      if (!formData.emergencyContact.trim()) newErrors.emergencyContact = ERROR_MESSAGES.validation.required
      if (!formData.emergencyPhone.trim()) {
        newErrors.emergencyPhone = ERROR_MESSAGES.validation.required
      } else if (!VALIDATION.phone.pattern.test(formData.emergencyPhone)) {
        newErrors.emergencyPhone = ERROR_MESSAGES.validation.invalidPhone
      }
    }

    if (step === 3) {
      if (!formData.password) {
        newErrors.password = ERROR_MESSAGES.validation.required
      } else if (formData.password.length < VALIDATION.password.minLength) {
        newErrors.password = ERROR_MESSAGES.validation.passwordTooShort
      }
      if (!confirmPassword) {
        newErrors.confirmPassword = ERROR_MESSAGES.validation.required
      } else if (formData.password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
    setErrors({})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep(3)) return

    try {
      await onRegister(formData)
    } catch (error) {
      console.error('Registration error:', error)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const updateAddress = (field: keyof PatientAddress, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full max-w-md"
      >
        <Card className="bg-slate-800/95 border border-white/20 shadow-2xl shadow-black/50 rounded-3xl overflow-hidden">
          <CardHeader className="text-center space-y-4 pb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToLogin}
              className="absolute top-4 left-4 w-8 h-8 p-0 rounded-full hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
            </Button>
            
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div>
              <CardTitle className="text-2xl font-bold text-white mb-2">
                New Registration
              </CardTitle>
              <p className="text-slate-400 text-sm">
                Step {currentStep} of 3: {
                  currentStep === 1 ? 'Personal Information' :
                  currentStep === 2 ? 'Contact & Address' : 'Security'
                }
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-700/50 rounded-full h-2">
              <motion.div
                className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={(e) => updateFormData('fullName', e.target.value)}
                      className={`bg-slate-700/50 border-white/20 text-white placeholder:text-slate-400 h-12 ${errors.fullName ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className={`bg-slate-700/50 border-white/20 text-white placeholder:text-slate-400 h-12 ${errors.email ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className={`bg-slate-700/50 border-white/20 text-white placeholder:text-slate-400 h-12 ${errors.phone ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <Input
                      type="date"
                      placeholder="Date of Birth"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                      className={`bg-slate-700/50 border-white/20 text-white placeholder:text-slate-400 h-12 ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <Input
                      type="text"
                      placeholder="Street Address"
                      value={formData.address.street}
                      onChange={(e) => updateAddress('street', e.target.value)}
                      className={`bg-slate-700/50 border-white/20 text-white placeholder:text-slate-400 h-12 ${errors.street ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.street && <p className="text-red-400 text-sm mt-1">{errors.street}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Input
                        type="text"
                        placeholder="City"
                        value={formData.address.city}
                        onChange={(e) => updateAddress('city', e.target.value)}
                        className={`bg-slate-700/50 border-white/20 text-white placeholder:text-slate-400 h-12 ${errors.city ? 'border-red-500' : ''}`}
                        disabled={isLoading}
                      />
                      {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <Input
                        type="text"
                        placeholder="State"
                        value={formData.address.state}
                        onChange={(e) => updateAddress('state', e.target.value)}
                        className={`bg-slate-700/50 border-white/20 text-white placeholder:text-slate-400 h-12 ${errors.state ? 'border-red-500' : ''}`}
                        disabled={isLoading}
                      />
                      {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state}</p>}
                    </div>
                  </div>

                  <div>
                    <Input
                      type="text"
                      placeholder="ZIP Code"
                      value={formData.address.zipCode}
                      onChange={(e) => updateAddress('zipCode', e.target.value)}
                      className={`bg-slate-700/50 border-white/20 text-white placeholder:text-slate-400 h-12 ${errors.zipCode ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>}
                  </div>

                  <div>
                    <Input
                      type="text"
                      placeholder="Emergency Contact Name"
                      value={formData.emergencyContact}
                      onChange={(e) => updateFormData('emergencyContact', e.target.value)}
                      className={`bg-slate-700/50 border-white/20 text-white placeholder:text-slate-400 h-12 ${errors.emergencyContact ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.emergencyContact && <p className="text-red-400 text-sm mt-1">{errors.emergencyContact}</p>}
                  </div>

                  <div>
                    <Input
                      type="tel"
                      placeholder="Emergency Contact Phone"
                      value={formData.emergencyPhone}
                      onChange={(e) => updateFormData('emergencyPhone', e.target.value)}
                      className={`bg-slate-700/50 border-white/20 text-white placeholder:text-slate-400 h-12 ${errors.emergencyPhone ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    {errors.emergencyPhone && <p className="text-red-400 text-sm mt-1">{errors.emergencyPhone}</p>}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create Password"
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
                      className={`bg-slate-700/50 border-white/20 text-white placeholder:text-slate-400 h-12 pr-12 ${errors.password ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-600/50"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                    </Button>
                    {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                  </div>

                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`bg-slate-700/50 border-white/20 text-white placeholder:text-slate-400 h-12 pr-12 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-600/50"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                    </Button>
                    {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <div className="bg-slate-700/30 p-4 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white text-sm font-medium mb-1">Account Security & Privacy</p>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          Your registration will be reviewed by our admin team. You'll receive an email notification once approved.
                        </p>
                        <p className="text-slate-400 text-xs leading-relaxed mt-2">
                          By registering, you agree to our{' '}
                          <button 
                            onClick={() => window.open('/terms', '_blank')}
                            className="text-blue-400 hover:text-blue-300 underline"
                          >
                            Terms of Service
                          </button>
                          {' '}and{' '}
                          <button 
                            onClick={() => window.open('/privacy', '_blank')}
                            className="text-blue-400 hover:text-blue-300 underline"
                          >
                            Privacy Policy
                          </button>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex gap-3 pt-4">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleBack}
                    disabled={isLoading}
                    className="flex-1 h-12 text-white hover:bg-slate-700/50"
                  >
                    Back
                  </Button>
                )}
                
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={isLoading}
                    className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    {isLoading ? 'Creating Account...' : 'Complete Registration'}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="mt-8 text-center space-y-3">
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
            <button 
              onClick={() => window.open('/privacy', '_blank')}
              className="hover:text-purple-400 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => window.open('/terms', '_blank')}
              className="hover:text-purple-400 transition-colors"
            >
              Terms of Service
            </button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-slate-600">Developed & Designed by</span>
            <span className="text-xs font-semibold text-purple-400">kreativloops</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}