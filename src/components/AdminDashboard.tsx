import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Users, 
  UserPlus, 
  Settings, 
  BarChart3, 
  Shield, 
  Bell, 
  ChevronDown,
  LogOut,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Separator } from './ui/separator'
import { Badge } from './ui/badge'
import { AdminDashboardProps, Dentist, PendingRegistration, Redemption, ServiceTemplate, CrudState } from '../types'
import { APP_CONFIG } from '../lib/constants'
import { getInitials, formatDate, cn } from '../lib/utils'

type AdminSection = 'overview' | 'dentists' | 'registrations' | 'services' | 'perks' | 'analytics'

export function AdminDashboard({ admin, onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>('overview')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Mock data states
  const [dentists, setDentists] = useState<CrudState<Dentist>>({
    items: [],
    loading: false,
    error: null,
    selectedItem: null
  })

  const [pendingRegistrations, setPendingRegistrations] = useState<CrudState<PendingRegistration>>({
    items: [],
    loading: false,
    error: null,
    selectedItem: null
  })

  const [redemptions, setRedemptions] = useState<CrudState<Redemption>>({
    items: [],
    loading: false,
    error: null,
    selectedItem: null
  })

  const [services] = useState<CrudState<ServiceTemplate>>({
    items: [],
    loading: false,
    error: null,
    selectedItem: null
  })

  // const [perks] = useState<CrudState<Perk>>({
  //   items: [],
  //   loading: false,
  //   error: null,
  //   selectedItem: null
  // })

  // Mock data initialization
  useEffect(() => {
    // Initialize with mock data
    setDentists(prev => ({
      ...prev,
      items: [
        {
          id: 'dentist_001',
          username: 'dr.johnson',
          email: 'dr.johnson@clinic.com',
          role: 'dentist',
          isActive: true,
          createdAt: '2021-01-15',
          lastLogin: '2024-01-15',
          name: 'Dr. Sarah Johnson',
          phone: '(555) 234-5678',
          specialization: 'General Dentistry',
          licenseNumber: 'DDS-12345-CA',
          patients: ['patient_001', 'patient_002'],
        },
        {
          id: 'dentist_002',
          username: 'dr.smith',
          email: 'dr.smith@clinic.com',
          role: 'dentist',
          isActive: true,
          createdAt: '2021-03-20',
          lastLogin: '2024-01-14',
          name: 'Dr. Michael Smith',
          phone: '(555) 345-6789',
          specialization: 'Orthodontics',
          licenseNumber: 'DDS-67890-CA',
          patients: ['patient_003', 'patient_004'],
        }
      ]
    }))

    setPendingRegistrations(prev => ({
      ...prev,
      items: [
        {
          id: 'reg_001',
          fullName: 'John Doe',
          email: 'john.doe@email.com',
          phone: '(555) 123-4567',
          dateOfBirth: '1990-05-15',
          address: {
            street: '456 Oak St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '90210',
            country: 'United States'
          },
          emergencyContact: 'Jane Doe',
          emergencyPhone: '(555) 987-6543',
          password: 'hashed_password',
          createdAt: '2024-01-15T10:00:00Z',
          status: 'pending'
        }
      ]
    }))

    setRedemptions(prev => ({
      ...prev,
      items: [
        {
          id: 'red_001',
          patientId: 'patient_001',
          dentistId: 'dentist_001',
          serviceId: 'service_001',
          serviceName: 'Dental Cleaning',
          pointsUsed: 200,
          benefitType: 'oralProphylaxis',
          redemptionDate: '2024-01-15T14:30:00Z',
          status: 'completed',
          notes: 'Regular cleaning completed successfully'
        }
      ]
    }))
  }, [])

  const stats = [
    {
      icon: Users,
      label: 'Active Dentists',
      value: dentists.items.filter(d => d.isActive).length.toString(),
      subtext: 'Total registered',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-400/30'
    },
    {
      icon: Clock,
      label: 'Pending Registrations',
      value: pendingRegistrations.items.filter(r => r.status === 'pending').length.toString(),
      subtext: 'Awaiting approval',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-500/20 to-orange-500/20',
      borderColor: 'border-yellow-400/30'
    },
    {
      icon: Target,
      label: 'Completed Redemptions',
      value: redemptions.items.filter(r => r.status === 'completed').length.toString(),
      subtext: 'This month',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-400/30'
    },
    {
      icon: TrendingUp,
      label: 'Active Services',
      value: services.items.filter(s => s.isActive).length.toString(),
      subtext: 'Available',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-400/30'
    }
  ]

  const navigationItems = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'dentists', label: 'Dentists', icon: Users },
    { key: 'registrations', label: 'New Registrations', icon: UserPlus },
    { key: 'services', label: 'Services', icon: Settings },
    { key: 'perks', label: 'Perks & Benefits', icon: Target },
    { key: 'analytics', label: 'Analytics', icon: TrendingUp }
  ]

  const handleApproveRegistration = (id: string) => {
    setPendingRegistrations(prev => ({
      ...prev,
      items: prev.items.map(reg => 
        reg.id === id ? { ...reg, status: 'approved' as const } : reg
      )
    }))
  }

  const handleRejectRegistration = (id: string, reason: string) => {
    setPendingRegistrations(prev => ({
      ...prev,
      items: prev.items.map(reg => 
        reg.id === id ? { ...reg, status: 'rejected' as const, rejectionReason: reason } : reg
      )
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-800/95 border-b border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-sm">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-white text-lg">{APP_CONFIG.name} Admin</h1>
                <p className="text-xs text-slate-400">Administrative Dashboard</p>
              </div>
            </div>

            {/* User Info and Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:block text-right">
                <p className="text-white font-medium text-sm">Welcome, {admin.name}</p>
                <p className="text-xs text-slate-400">Administrator</p>
              </div>

              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-slate-700/80 w-10 h-10 rounded-xl"
              >
                <Bell className="w-5 h-5 text-white" />
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full" />
              </Button>

              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 hover:bg-slate-700/80 p-2 rounded-xl"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold">
                      {getInitials(admin.name)}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className={cn(
                    "w-4 h-4 text-white transition-transform duration-300",
                    isMenuOpen && "rotate-180"
                  )} />
                </Button>

                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-64 bg-slate-800/95 border border-white/20 rounded-2xl shadow-2xl"
                    >
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                              {getInitials(admin.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-white text-sm">{admin.name}</p>
                            <p className="text-xs text-slate-400">{admin.email}</p>
                          </div>
                        </div>
                        
                        <Separator className="bg-slate-700/80 mb-3" />
                        
                        <Button
                          variant="ghost"
                          onClick={onLogout}
                          className="w-full justify-start text-red-300 hover:bg-red-500/10 hover:text-red-200 h-11 rounded-xl"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign Out
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-slate-800/50 border-r border-white/10 min-h-screen p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon
              const isActive = activeSection === item.key
              return (
                <Button
                  key={item.key}
                  variant={isActive ? 'gradient' : 'ghost'}
                  onClick={() => setActiveSection(item.key as AdminSection)}
                  className={cn(
                    "w-full justify-start h-11 rounded-xl transition-all duration-200",
                    isActive 
                      ? "text-white shadow-sm" 
                      : "text-slate-300 hover:text-white hover:bg-white/8"
                  )}
                >
                  <IconComponent className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              )
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            {activeSection === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h1>
                  <p className="text-slate-400">Monitor system activity and manage operations</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Card className={cn(
                          "bg-slate-800/90 border transition-all duration-300 hover:bg-white/5 rounded-2xl",
                          stat.borderColor
                        )}>
                          <CardContent className="p-5">
                            <div className="flex items-center gap-4">
                              <div className={cn(
                                "w-12 h-12 rounded-xl border flex items-center justify-center bg-gradient-to-br shadow-sm",
                                stat.bgColor,
                                stat.borderColor
                              )}>
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="text-white font-bold text-2xl">{stat.value}</p>
                                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                                <p className="text-slate-500 text-xs">{stat.subtext}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Recent Activity */}
                <Card className="bg-slate-800/90 border border-white/10 rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-400" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <p className="text-white text-sm">New dentist registered: Dr. Michael Smith</p>
                        <span className="text-slate-400 text-xs ml-auto">2 hours ago</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl">
                        <div className="w-2 h-2 bg-blue-400 rounded-full" />
                        <p className="text-white text-sm">Service redemption completed by patient_001</p>
                        <span className="text-slate-400 text-xs ml-auto">4 hours ago</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                        <p className="text-white text-sm">New registration pending approval: John Doe</p>
                        <span className="text-slate-400 text-xs ml-auto">6 hours ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeSection === 'registrations' && (
              <motion.div
                key="registrations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">New Client Registrations</h1>
                    <p className="text-slate-400">Review and approve new client registrations</p>
                  </div>
                </div>

                <Card className="bg-slate-800/90 border border-white/10 rounded-2xl">
                  <CardContent className="p-6">
                    {pendingRegistrations.items.length === 0 ? (
                      <div className="text-center py-8">
                        <UserPlus className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                        <p className="text-slate-400">No pending registrations</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {pendingRegistrations.items.map((registration) => (
                          <div key={registration.id} className="bg-slate-700/30 rounded-xl p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-white font-semibold text-lg">{registration.fullName}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-sm">
                                  <div>
                                    <p className="text-slate-400">Email: <span className="text-white">{registration.email}</span></p>
                                    <p className="text-slate-400">Phone: <span className="text-white">{registration.phone}</span></p>
                                    <p className="text-slate-400">DOB: <span className="text-white">{formatDate(registration.dateOfBirth)}</span></p>
                                  </div>
                                  <div>
                                    <p className="text-slate-400">Emergency Contact: <span className="text-white">{registration.emergencyContact}</span></p>
                                    <p className="text-slate-400">Emergency Phone: <span className="text-white">{registration.emergencyPhone}</span></p>
                                    <p className="text-slate-400">Submitted: <span className="text-white">{formatDate(registration.createdAt)}</span></p>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <p className="text-slate-400 text-sm">Address:</p>
                                  <p className="text-white text-sm">
                                    {registration.address.street}, {registration.address.city}, {registration.address.state} {registration.address.zipCode}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 ml-4">
                                <Badge variant={registration.status === 'pending' ? 'default' : registration.status === 'approved' ? 'secondary' : 'destructive'}>
                                  {registration.status}
                                </Badge>
                              </div>
                            </div>
                            {registration.status === 'pending' && (
                              <div className="flex gap-2 mt-4">
                                <Button
                                  size="sm"
                                  onClick={() => handleApproveRegistration(registration.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleRejectRegistration(registration.id, 'Incomplete information')}
                                >
                                  <XCircle className="w-4 h-4 mr-2" />
                                  Reject
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Other sections would be implemented similarly */}
            {activeSection === 'dentists' && (
              <motion.div
                key="dentists"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">Manage Dentists</h1>
                  <p className="text-slate-400">Add, edit, and manage dentist accounts</p>
                </div>
                <Card className="bg-slate-800/90 border border-white/10 rounded-2xl">
                  <CardContent className="p-6">
                    <p className="text-slate-400 text-center py-8">Dentist management interface coming soon...</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800/50 border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-2">
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
            <button 
              onClick={() => window.open('/privacy', '_blank')}
              className="hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => window.open('/terms', '_blank')}
              className="hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-slate-600">Developed & Designed by</span>
            <span className="text-xs font-semibold text-blue-400">kreativloops</span>
          </div>
        </div>
      </footer>
    </div>
  )
}