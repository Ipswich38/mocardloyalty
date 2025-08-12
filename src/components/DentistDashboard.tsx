import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Users, 
  UserPlus, 
  Calendar, 
  CheckCircle, 
  Award,
  Bell, 
  Search,
  Edit,
  Eye,
  ChevronDown,
  LogOut,
  Stethoscope,
  TrendingUp,
  Heart,
  Activity
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Separator } from './ui/separator'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { DentistDashboardProps, Patient, Redemption, CrudState } from '../types'
import { APP_CONFIG, TIER_INFOS } from '../lib/constants'
import { getInitials, formatDate, formatPhoneNumber, cn } from '../lib/utils'

type DentistSection = 'overview' | 'patients' | 'appointments' | 'redemptions' | 'profile'

export function DentistDashboard({ dentist, onLogout }: DentistDashboardProps) {
  const [activeSection, setActiveSection] = useState<DentistSection>('overview')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data states
  const [patients, setPatients] = useState<CrudState<Patient>>({
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

  // Mock data initialization
  useEffect(() => {
    // Initialize with mock patient data
    setPatients(prev => ({
      ...prev,
      items: [
        {
          id: 'patient_001',
          username: 'maria.santos',
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
            country: 'United States'
          },
          dateOfBirth: '1985-06-15',
          dentistId: dentist.id,
          dentalBenefits: {
            oralProphylaxis: { used: true, remaining: 1, total: 2, lastUsed: '2024-01-15', expiryDate: '2024-12-31' },
            toothExtraction: { used: false, remaining: 2, total: 2, expiryDate: '2024-12-31' },
            lightCureFilling: { used: true, remaining: 2, total: 3, lastUsed: '2023-11-20', expiryDate: '2024-12-31' },
            fluorideTreatment: { used: false, remaining: 4, total: 4, expiryDate: '2024-12-31' }
          },
          services: [
            {
              id: 'service_001',
              name: 'Dental Cleaning',
              description: 'Professional teeth cleaning',
              cost: 120,
              pointsEarned: 180,
              completed: true,
              date: '2024-01-15',
              benefitUsed: true,
              category: 'preventive',
              provider: dentist.name
            }
          ]
        },
        {
          id: 'patient_002',
          username: 'john.doe',
          email: 'john.doe@email.com',
          role: 'patient',
          isActive: true,
          createdAt: '2023-01-15',
          lastLogin: '2024-01-14',
          name: 'John Doe',
          phone: '(555) 234-5678',
          emergencyContact: 'Jane Doe',
          emergencyPhone: '(555) 876-5432',
          membershipId: 'MOCJOH123XYZ',
          loyaltyPoints: 1500,
          level: 4,
          membershipTier: 'Silver',
          pointsToNextTier: 1500,
          memberSince: '2023-01-15',
          lastVisit: '2024-01-10',
          dateOfBirth: '1990-08-22',
          dentistId: dentist.id,
          dentalBenefits: {
            oralProphylaxis: { used: false, remaining: 2, total: 2, expiryDate: '2024-12-31' },
            toothExtraction: { used: false, remaining: 2, total: 2, expiryDate: '2024-12-31' },
            lightCureFilling: { used: false, remaining: 3, total: 3, expiryDate: '2024-12-31' },
            fluorideTreatment: { used: true, remaining: 3, total: 4, lastUsed: '2024-01-10', expiryDate: '2024-12-31' }
          },
          services: []
        }
      ]
    }))

    setRedemptions(prev => ({
      ...prev,
      items: [
        {
          id: 'red_001',
          patientId: 'patient_001',
          dentistId: dentist.id,
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
  }, [dentist.id, dentist.name])

  const stats = [
    {
      icon: Users,
      label: 'Total Patients',
      value: patients.items.length.toString(),
      subtext: 'Under your care',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-400/30'
    },
    {
      icon: Calendar,
      label: 'This Month',
      value: patients.items.filter(p => p.lastVisit && new Date(p.lastVisit).getMonth() === new Date().getMonth()).length.toString(),
      subtext: 'Patient visits',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-400/30'
    },
    {
      icon: CheckCircle,
      label: 'Redemptions',
      value: redemptions.items.filter(r => r.status === 'completed').length.toString(),
      subtext: 'Completed today',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-400/30'
    },
    {
      icon: Award,
      label: 'Points Redeemed',
      value: redemptions.items.reduce((sum, r) => sum + r.pointsUsed, 0).toString(),
      subtext: 'This month',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-500/20 to-orange-500/20',
      borderColor: 'border-yellow-400/30'
    }
  ]

  const navigationItems = [
    { key: 'overview', label: 'Overview', icon: Activity },
    { key: 'patients', label: 'My Patients', icon: Users },
    { key: 'appointments', label: 'Appointments', icon: Calendar },
    { key: 'redemptions', label: 'Redemptions', icon: Award },
    { key: 'profile', label: 'My Profile', icon: Stethoscope }
  ]


  const filteredPatients = patients.items.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.membershipId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-800/95 border-b border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-blue-600 shadow-sm">
                <Stethoscope className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-white text-lg">{APP_CONFIG.name} Practice</h1>
                <p className="text-xs text-slate-400">Dentist Dashboard</p>
              </div>
            </div>

            {/* User Info and Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:block text-right">
                <p className="text-white font-medium text-sm">Dr. {dentist.name}</p>
                <p className="text-xs text-slate-400">{dentist.specialization}</p>
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
                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white text-sm font-semibold">
                      {getInitials(dentist.name)}
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
                            <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-600 text-white font-semibold">
                              {getInitials(dentist.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-white text-sm">{dentist.name}</p>
                            <p className="text-xs text-slate-400">{dentist.email}</p>
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
                  onClick={() => setActiveSection(item.key as DentistSection)}
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
                  <h1 className="text-2xl font-bold text-white mb-2">Practice Overview</h1>
                  <p className="text-slate-400">Welcome back, Dr. {dentist.name.split(' ').pop()}</p>
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

                {/* Recent Patients */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-slate-800/90 border border-white/10 rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-400" />
                        Recent Patients
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {patients.items.slice(0, 3).map((patient) => (
                          <div key={patient.id} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-xl">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                {getInitials(patient.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-white font-medium text-sm">{patient.name}</p>
                              <p className="text-slate-400 text-xs">
                                {patient.lastVisit ? `Last visit: ${formatDate(patient.lastVisit)}` : 'No recent visits'}
                              </p>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {patient.membershipTier}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/90 border border-white/10 rounded-2xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        Practice Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Patient Satisfaction</span>
                          <span className="text-white">96%</span>
                        </div>
                        <Progress value={96} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Monthly Revenue</span>
                          <span className="text-white">$12,450</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Points Redeemed</span>
                          <span className="text-white">2,340</span>
                        </div>
                        <Progress value={65} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {activeSection === 'patients' && (
              <motion.div
                key="patients"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">My Patients</h1>
                    <p className="text-slate-400">Manage your patient database</p>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New Patient
                  </Button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search patients by name, email, or membership ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-800/50 border-white/20 text-white placeholder:text-slate-400 pl-10"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPatients.map((patient) => (
                    <Card key={patient.id} className="bg-slate-800/90 border border-white/10 rounded-2xl hover:bg-white/5 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className={cn(
                              "text-white font-semibold",
                              TIER_INFOS[patient.membershipTier].gradient.replace('from-', 'from-').replace(' to-', ' to-')
                            )}>
                              {getInitials(patient.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold truncate">{patient.name}</h3>
                            <p className="text-slate-400 text-sm truncate">{patient.email}</p>
                            <p className="text-slate-400 text-sm">{formatPhoneNumber(patient.phone)}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {patient.membershipTier}
                          </Badge>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Loyalty Points:</span>
                            <span className="text-white font-medium">{patient.loyaltyPoints.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Last Visit:</span>
                            <span className="text-white">
                              {patient.lastVisit ? formatDate(patient.lastVisit) : 'No visits'}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Other sections would be implemented similarly */}
            {activeSection === 'appointments' && (
              <motion.div
                key="appointments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">Appointments</h1>
                  <p className="text-slate-400">Manage patient appointments and schedules</p>
                </div>
                <Card className="bg-slate-800/90 border border-white/10 rounded-2xl">
                  <CardContent className="p-6">
                    <p className="text-slate-400 text-center py-8">Appointment management interface coming soon...</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeSection === 'redemptions' && (
              <motion.div
                key="redemptions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">Service Redemptions</h1>
                  <p className="text-slate-400">Process and manage patient benefit redemptions</p>
                </div>
                <Card className="bg-slate-800/90 border border-white/10 rounded-2xl">
                  <CardContent className="p-6">
                    <p className="text-slate-400 text-center py-8">Redemption management interface coming soon...</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800/50 border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-slate-600">Developed & Designed by</span>
            <span className="text-xs font-semibold text-green-400">kreativloops</span>
          </div>
        </div>
      </footer>
    </div>
  )
}