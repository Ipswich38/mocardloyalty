import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Bell, 
  ChevronDown, 
  LogOut, 
  Menu, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  MapPin,
  Sparkles,
  TrendingUp,
  Target,
  Star,
  X
} from 'lucide-react'
import { VirtualCard } from './VirtualCard'
import { BenefitsTracker } from './BenefitsTracker'
import { ServiceHistory } from './ServiceHistory'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'
import { PatientDashboardProps } from '../types'
import { APP_CONFIG, TIER_INFOS } from '../lib/constants'
import { 
  formatPhoneNumber, 
  formatDate, 
  formatNumber, 
  getInitials, 
  calculateTierProgress, 
  calculateBenefitsUsage,
  cn 
} from '../lib/utils'

export function PatientDashboard({ patient, onLogout }: PatientDashboardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<'overview' | 'benefits' | 'services'>('overview')
  
  const tierProgress = calculateTierProgress(patient.loyaltyPoints, TIER_INFOS)
  const benefitsUsage = calculateBenefitsUsage(patient)
  const completedServices = patient.services.filter(s => s.completed).length
  const tierInfo = TIER_INFOS[patient.membershipTier]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const stats = [
    {
      icon: TrendingUp,
      label: 'Loyalty Points',
      value: formatNumber(patient.loyaltyPoints),
      subtext: `Level ${patient.level}`,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-400/30'
    },
    {
      icon: Target,
      label: 'Benefits Used',
      value: `${benefitsUsage}%`,
      subtext: 'This year',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-400/30'
    },
    {
      icon: Star,
      label: 'Services',
      value: completedServices.toString(),
      subtext: 'Completed',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-400/30'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-800/95 border-b border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo and Brand */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-ios-sm">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
              <div className="min-w-0 flex-1 sm:flex-none">
                <h1 className="font-semibold text-white text-base sm:text-lg truncate">{APP_CONFIG.name}</h1>
                <p className="hidden sm:block text-xs text-slate-400 truncate">{APP_CONFIG.description}</p>
              </div>
            </div>

            {/* User Info and Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Welcome Message - Hidden on Mobile */}
              <div className="hidden lg:block text-right">
                <p className="text-white font-medium text-sm">Welcome back, {patient.name.split(' ')[0]}!</p>
                <p className="text-xs text-slate-400">{tierInfo.name} • Level {patient.level}</p>
              </div>

              {/* Notification Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-slate-700/80 active:bg-slate-700/90 transition-colors w-9 h-9 sm:w-10 sm:h-10 rounded-xl"
              >
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <motion.div 
                  className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full flex items-center justify-center shadow-sm"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full" />
                </motion.div>
              </Button>

              {/* User Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={toggleMenu}
                  className="flex items-center gap-1.5 sm:gap-2 hover:bg-slate-700/80 active:bg-slate-700/90 p-1.5 sm:p-2 rounded-xl transition-all duration-200"
                >
                  <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
                    <AvatarImage src="" alt={patient.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs sm:text-sm font-semibold">
                      {getInitials(patient.name)}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className={cn(
                    "w-3 h-3 sm:w-4 sm:h-4 text-white transition-transform duration-300 ease-out",
                    isMenuOpen && "rotate-180"
                  )} />
                </Button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute right-0 mt-2 w-60 sm:w-64 bg-slate-800/95 border border-white/20 rounded-3xl shadow-ios-2xl"
                    >
                      <div className="p-3 sm:p-4">
                        <div className="flex items-center gap-2.5 sm:gap-3 mb-3">
                          <Avatar className="w-9 h-9 sm:w-10 sm:h-10">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold">
                              {getInitials(patient.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-white text-sm truncate">{patient.name}</p>
                            <p className="text-xs text-slate-400 truncate">{patient.email}</p>
                          </div>
                        </div>
                        
                        <Separator className="bg-slate-700/80 mb-3" />
                        
                        <div className="space-y-1">
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-white hover:bg-slate-700/80 active:bg-slate-700/90 h-10 sm:h-11 rounded-xl transition-colors text-sm"
                          >
                            <User className="w-4 h-4 mr-2.5" />
                            Profile Settings
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={onLogout}
                            className="w-full justify-start text-red-300 hover:bg-red-500/10 hover:text-red-200 active:bg-red-500/15 h-10 sm:h-11 rounded-xl transition-all text-sm"
                          >
                            <LogOut className="w-4 h-4 mr-2.5" />
                            Sign Out
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-slate-700/80"
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="space-y-6 sm:space-y-8 max-w-lg mx-auto lg:max-w-4xl">
          {/* Welcome Section */}
          <motion.div
            className="text-center space-y-3 sm:space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-slate-800/80 border border-white/10 shadow-ios-sm">
              <motion.div 
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-xs sm:text-sm text-slate-300 font-medium">
                {patient.lastVisit ? `Last visit: ${formatDate(patient.lastVisit)}` : 'Welcome to MOCards!'}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Hello, {patient.name.split(' ')[0]}! 👋
            </h1>
            
            <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2">
              You're a <span className="text-white font-semibold">{patient.membershipTier}</span> member 
              with <span className="text-blue-400 font-semibold">{formatNumber(patient.loyaltyPoints)} points</span>.
              {tierProgress.nextTier && (
                <>
                  <br className="sm:hidden" />
                  <span className="sm:inline"> Just </span>
                  <span className="text-purple-400 font-semibold">{formatNumber(tierProgress.pointsToNext)} more points</span> to reach {tierProgress.nextTier}!
                </>
              )}
            </p>
          </motion.div>

          {/* Virtual Card Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <VirtualCard patient={patient} />
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                >
                  <Card className={cn(
                    "bg-slate-800/90 border cursor-pointer transition-all duration-300 hover:bg-white/8 hover:shadow-card-hover active:shadow-card-active rounded-3xl",
                    stat.borderColor,
                    "touch-manipulation"
                  )}>
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={cn(
                          "w-10 h-10 sm:w-12 sm:h-12 rounded-xl  border flex items-center justify-center bg-gradient-to-br shadow-ios-sm",
                          stat.bgColor,
                          stat.borderColor
                        )}>
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-white font-bold text-xl sm:text-2xl leading-none">{stat.value}</p>
                          <p className="text-slate-400 text-sm font-medium mt-0.5">{stat.label}</p>
                          <p className="text-slate-500 text-xs">{stat.subtext}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            className="flex justify-center px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="inline-flex rounded-3xl bg-slate-800/80 border border-white/10 p-1 shadow-ios-sm max-w-full overflow-hidden">
              {[
                { key: 'overview', label: 'Overview', shortLabel: 'Info', icon: Sparkles },
                { key: 'benefits', label: 'Benefits', shortLabel: 'Benefits', icon: Target },
                { key: 'services', label: 'Services', shortLabel: 'History', icon: Star }
              ].map((tab) => {
                const IconComponent = tab.icon
                const isActive = activeSection === tab.key
                return (
                  <Button
                    key={tab.key}
                    variant={isActive ? 'gradient' : 'ghost'}
                    size="sm"
                    onClick={() => setActiveSection(tab.key as 'overview' | 'benefits' | 'services')}
                    className={cn(
                      "flex items-center gap-1.5 sm:gap-2 transition-all duration-300 h-9 sm:h-10 px-3 sm:px-4 rounded-xl touch-manipulation",
                      isActive 
                        ? "text-white shadow-ios-sm" 
                        : "text-slate-400 hover:text-white hover:bg-white/8 active:bg-white/12"
                    )}
                  >
                    <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium hidden xs:inline">
                      {tab.label}
                    </span>
                    <span className="text-xs font-medium xs:hidden">
                      {tab.shortLabel}
                    </span>
                  </Button>
                )
              })}
            </div>
          </motion.div>

          {/* Content Sections */}
          <AnimatePresence mode="wait">
            {activeSection === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Patient Contact Info */}
                <Card className="bg-slate-800/90 border border-white/10 rounded-3xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-white flex items-center gap-2.5 text-lg">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-400" />
                      </div>
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center flex-shrink-0">
                            <Phone className="w-4 h-4 text-green-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-slate-400 text-sm font-medium">Phone</p>
                            <p className="text-white font-medium text-sm sm:text-base">{formatPhoneNumber(patient.phone)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-4 h-4 text-blue-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-slate-400 text-sm font-medium">Email</p>
                            <p className="text-white font-medium text-sm sm:text-base truncate">{patient.email}</p>
                          </div>
                        </div>

                        {patient.address && (
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <MapPin className="w-4 h-4 text-purple-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-slate-400 text-sm font-medium mb-1">Address</p>
                              <p className="text-white font-medium text-sm leading-relaxed">
                                {patient.address.street}<br />
                                {patient.address.city}, {patient.address.state} {patient.address.zipCode}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-red-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-slate-400 text-sm font-medium">Emergency Contact</p>
                            <p className="text-white font-medium text-sm sm:text-base">{patient.emergencyContact}</p>
                            <p className="text-slate-300 text-sm">{formatPhoneNumber(patient.emergencyPhone)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-4 h-4 text-orange-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-slate-400 text-sm font-medium">Member Since</p>
                            <p className="text-white font-medium text-sm sm:text-base">{formatDate(patient.memberSince)}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-cyan-500/15 flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-slate-400 text-sm font-medium">Membership ID</p>
                            <p className="text-white font-mono font-medium text-sm break-all">{patient.membershipId}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeSection === 'benefits' && (
              <motion.div
                key="benefits"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <BenefitsTracker patient={patient} />
              </motion.div>
            )}

            {activeSection === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ServiceHistory patient={patient} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-16 border-t border-white/10 bg-slate-800/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="font-semibold text-white">{APP_CONFIG.name}</span>
            </div>
            
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Your digital dental loyalty card system. Track your benefits, earn points, 
              and maintain your oral health with ease.
            </p>
            
            <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
              <span>{APP_CONFIG.company}</span>
              <span>•</span>
              <span>v{APP_CONFIG.version}</span>
              <span>•</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
            
            <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-slate-700/50">
              <span className="text-xs text-slate-600">Developed & Designed by</span>
              <span className="text-xs font-semibold text-blue-400">kreativloops</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}