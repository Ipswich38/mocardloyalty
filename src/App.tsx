import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { LoginScreen } from './components/LoginScreen'
import { PatientDashboard } from './components/PatientDashboard'
import { AdminDashboard } from './components/AdminDashboard'
import { DentistDashboard } from './components/DentistDashboard'
import { ClientRegistrationForm } from './components/ClientRegistration'
import { NewClientRegistrationForm } from './components/NewClientRegistration'
import { Credentials, ViewType, Patient, Admin, Dentist, UserRole, ClientRegistration as ClientRegistrationType, NewClientRegistration } from './types'
import { DEMO_CREDENTIALS, ROLE_CREDENTIALS, MOCK_PATIENT, MOCK_ADMIN, MOCK_DENTIST, THEME_CONFIG, STORAGE_KEYS, ERROR_MESSAGES } from './lib/constants'
import { storage, sleep } from './lib/utils'
import { findClientByCredentials, createPatientFromClient } from './lib/clientData'

export function App() {
  const [currentView, setCurrentView] = useState<ViewType>('login')
  const [credentials, setCredentials] = useState<Credentials>({ username: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [patient, setPatient] = useState<Patient | null>(null)
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [dentist, setDentist] = useState<Dentist | null>(null)
  
  

  // Initialize theme on app load
  useEffect(() => {
    const initializeTheme = () => {
      const savedTheme = storage.get(STORAGE_KEYS.theme, THEME_CONFIG.defaultMode)
      
      // Apply dark theme by default
      if (savedTheme === 'dark' || !document.documentElement.classList.contains('light')) {
        document.documentElement.classList.add('dark')
        document.documentElement.classList.remove('light')
      }
    }

    initializeTheme()

    // Check for existing session
    const lastLogin = storage.get(STORAGE_KEYS.lastLogin, null)
    if (lastLogin && new Date().getTime() - new Date(lastLogin).getTime() < 24 * 60 * 60 * 1000) {
      // Auto-login if last login was within 24 hours
      setPatient(MOCK_PATIENT)
      setCurrentView('patient')
    }
  }, [])

  const validateCredentials = (creds: Credentials): { valid: boolean; role?: UserRole; userData?: Patient | Admin | Dentist } => {
    // Check role-based credentials
    if (creds.username === ROLE_CREDENTIALS.patient.username && creds.password === ROLE_CREDENTIALS.patient.password) {
      return { valid: true, role: 'patient', userData: MOCK_PATIENT }
    }
    
    if (creds.username === ROLE_CREDENTIALS.admin.username && creds.password === ROLE_CREDENTIALS.admin.password) {
      return { valid: true, role: 'admin', userData: MOCK_ADMIN }
    }
    
    if (creds.username === ROLE_CREDENTIALS.dentist.username && creds.password === ROLE_CREDENTIALS.dentist.password) {
      return { valid: true, role: 'dentist', userData: MOCK_DENTIST }
    }

    // Legacy demo credentials (defaults to patient)
    if (creds.username === DEMO_CREDENTIALS.username && creds.password === DEMO_CREDENTIALS.password) {
      return { valid: true, role: 'patient', userData: MOCK_PATIENT }
    }

    return { valid: false }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password.')
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call delay
      await sleep(1500)
      
      const validation = validateCredentials(credentials)
      
      if (validation.valid && validation.role && validation.userData) {
        // Store login timestamp
        storage.set(STORAGE_KEYS.lastLogin, new Date().toISOString())
        
        // Set user data based on role
        
        switch (validation.role) {
          case 'patient':
            setPatient(validation.userData as Patient)
            setCurrentView('patient')
            break
          case 'admin':
            setAdmin(validation.userData as Admin)
            setCurrentView('admin')
            break
          case 'dentist':
            setDentist(validation.userData as Dentist)
            setCurrentView('dentist')
            break
        }
        
        // Clear credentials for security
        setCredentials({ username: '', password: '' })
      } else {
        setError(ERROR_MESSAGES.auth.invalidCredentials)
      }
    } catch (error) {
      console.error('Login error:', error)
      setError(ERROR_MESSAGES.auth.networkError)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClientRegistration = async (registration: ClientRegistrationType) => {
    setError(null)
    setIsLoading(true)
    
    try {
      // Simulate API call delay
      await sleep(2000)
      
      // Find client by name and control number
      const client = findClientByCredentials(registration.fullName, registration.controlNumber)
      
      if (!client) {
        setError('Client not found. Please check your name and control number.')
        return
      }
      
      if (client.hasRegistered) {
        setError('This account is already registered. Please use the login screen.')
        return
      }
      
      // Mark client as registered and store password
      client.hasRegistered = true
      client.password = registration.password
      
      // Create patient data from client
      const newPatient = createPatientFromClient(client)
      
      // Store registration info
      storage.set(`client_${client.orderNumber}`, {
        ...client,
        registeredAt: new Date().toISOString()
      })
      
      // Auto-login the newly registered client
      setPatient(newPatient)
      setCurrentView('patient')
      
    } catch (error) {
      console.error('Registration error:', error)
      setError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewClientRegistration = async (registration: NewClientRegistration) => {
    setError(null)
    setIsLoading(true)
    
    try {
      // Simulate API call delay
      await sleep(2000)
      
      // In a real app, this would submit to admin for approval
      console.log('New client registration submitted:', registration)
      
      // Show success message and redirect to login
      alert('Registration submitted successfully! Your account will be reviewed by our admin team. You will receive an email notification once approved.')
      setCurrentView('login')
      
    } catch (error) {
      console.error('Registration error:', error)
      setError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const showRegistration = () => {
    setCurrentView('register')
    setError(null)
  }

  const showNewClientRegistration = () => {
    setCurrentView('new-register')
    setError(null)
  }

  const backToLogin = () => {
    setCurrentView('login')
    setError(null)
  }

  const handleLogout = async () => {
    setIsLoading(true)
    
    try {
      // Simulate logout delay
      await sleep(500)
      
      // Clear stored data
      storage.remove(STORAGE_KEYS.lastLogin)
      storage.remove(STORAGE_KEYS.authToken)
      
      // Reset all state
      setPatient(null)
      setAdmin(null)
      setDentist(null)
      setCurrentView('login')
      setCredentials({ username: '', password: '' })
      setError(null)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCredentialsChange = (newCredentials: Credentials) => {
    setCredentials(newCredentials)
    // Clear error when user starts typing
    if (error) {
      setError(null)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900" style={{ minHeight: '100vh' }}>
      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-md"
          >
            <div className="bg-red-500/95 border border-red-400/30 text-white px-4 sm:px-6 py-3 rounded-lg shadow-2xl shadow-red-500/25 w-full">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-400 flex-shrink-0" />
                <p className="text-sm font-medium">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-red-200 hover:text-white active:scale-90 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center p-1 -m-1 rounded-md"
                >
                  ×
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Application Views */}
      <AnimatePresence mode="wait">
        {currentView === 'login' ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <LoginScreen
              credentials={credentials}
              setCredentials={handleCredentialsChange}
              onLogin={handleLogin}
              onShowRegistration={showRegistration}
              onShowNewRegistration={showNewClientRegistration}
              isLoading={isLoading}
            />
          </motion.div>
        ) : currentView === 'register' ? (
          <motion.div
            key="register"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <ClientRegistrationForm
              onRegister={handleClientRegistration}
              onBackToLogin={backToLogin}
              isLoading={isLoading}
            />
          </motion.div>
        ) : currentView === 'new-register' ? (
          <motion.div
            key="new-register"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <NewClientRegistrationForm
              onRegister={handleNewClientRegistration}
              onBackToLogin={backToLogin}
              isLoading={isLoading}
            />
          </motion.div>
        ) : currentView === 'patient' && patient ? (
          <motion.div
            key="patient-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <PatientDashboard
              patient={patient}
              onLogout={handleLogout}
            />
          </motion.div>
        ) : currentView === 'admin' && admin ? (
          <motion.div
            key="admin-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <AdminDashboard
              admin={admin}
              onLogout={handleLogout}
            />
          </motion.div>
        ) : currentView === 'dentist' && dentist ? (
          <motion.div
            key="dentist-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <DentistDashboard
              dentist={dentist}
              onLogout={handleLogout}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Global Loading Overlay */}
      <AnimatePresence>
        {isLoading && currentView === 'patient' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center"
          >
            <div className="bg-slate-800/95 border border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl mx-4">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                <p className="text-white font-medium">Please wait...</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}