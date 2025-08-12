import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  DollarSign, 
  Star, 
  User, 
  FileText, 
  Filter,
  ChevronDown,
  Award,
  Activity,
  TrendingUp
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { ServiceHistoryProps, Service } from '../types'
import { SERVICE_CATEGORIES } from '../lib/constants'
import { formatCurrency, formatDate, formatRelativeTime, cn } from '../lib/utils'

type FilterType = 'all' | 'completed' | 'pending'

export function ServiceHistory({ patient }: ServiceHistoryProps) {
  const [filter, setFilter] = useState<FilterType>('all')
  const [expandedService, setExpandedService] = useState<string | null>(null)
  
  const completedServices = patient.services.filter(service => service.completed)
  const pendingServices = patient.services.filter(service => !service.completed)
  
  const totalPointsEarned = completedServices.reduce((total, service) => total + service.pointsEarned, 0)
  const totalSpent = completedServices.reduce((total, service) => total + service.cost, 0)
  
  const getFilteredServices = () => {
    switch (filter) {
      case 'completed':
        return completedServices
      case 'pending':
        return pendingServices
      default:
        return patient.services
    }
  }

  const filteredServices = getFilteredServices()

  const toggleServiceExpansion = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId)
  }

  const getServiceCategoryInfo = (category: Service['category']) => {
    return SERVICE_CATEGORIES[category] || {
      name: 'Other',
      description: 'Other dental services',
      color: 'from-gray-500 to-gray-600',
      icon: '🏥'
    }
  }

  if (patient.services.length === 0) {
    return (
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="bg-slate-800/90 border border-white/10 rounded-3xl">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20  border border-white/20 flex items-center justify-center">
              <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-white/60" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 leading-tight">No Service History</h3>
            <p className="text-slate-400 max-w-sm sm:max-w-md mx-auto text-sm sm:text-base leading-relaxed">
              Your dental service history will appear here once you start using our services. 
              Book your first appointment to get started!
            </p>
            <Button variant="gradient" className="mt-4 sm:mt-6 rounded-xl touch-manipulation">
              Book Appointment
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Service History Header */}
      <Card className="bg-slate-800/90 border border-white/10 rounded-3xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20  border border-white/20 flex items-center justify-center flex-shrink-0">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-white text-lg sm:text-xl leading-tight">Service History</CardTitle>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5 sm:mt-1 leading-tight">
                  Track your dental treatments and points earned
                </p>
              </div>
            </div>
            <Badge variant="glass" className="text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-xl flex-shrink-0">
              {patient.services.length} Services
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-5 sm:space-y-6 p-4 sm:p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <motion.div
              className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30  touch-manipulation"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-green-300 font-semibold text-base sm:text-lg leading-none">{completedServices.length}</p>
                  <p className="text-green-400/80 text-xs mt-0.5">Completed</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30  touch-manipulation"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-blue-300 font-semibold text-base sm:text-lg leading-none">{totalPointsEarned.toLocaleString()}</p>
                  <p className="text-blue-400/80 text-xs mt-0.5">Points Earned</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30  touch-manipulation"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-purple-300 font-semibold text-base sm:text-lg leading-none">{formatCurrency(totalSpent)}</p>
                  <p className="text-purple-400/80 text-xs mt-0.5">Total Spent</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === 'all' ? 'gradient' : 'glass'}
              size="sm"
              onClick={() => setFilter('all')}
              className="flex items-center gap-1.5 sm:gap-2 rounded-xl touch-manipulation text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9"
            >
              <Filter className="w-3 h-3 flex-shrink-0" />
              <span className="hidden xs:inline">All ({patient.services.length})</span>
              <span className="xs:hidden">All</span>
            </Button>
            <Button
              variant={filter === 'completed' ? 'gradient' : 'glass'}
              size="sm"
              onClick={() => setFilter('completed')}
              className="flex items-center gap-1.5 sm:gap-2 rounded-xl touch-manipulation text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9"
            >
              <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
              <span className="hidden xs:inline">Completed ({completedServices.length})</span>
              <span className="xs:hidden">Done</span>
            </Button>
            <Button
              variant={filter === 'pending' ? 'gradient' : 'glass'}
              size="sm"
              onClick={() => setFilter('pending')}
              className="flex items-center gap-1.5 sm:gap-2 rounded-xl touch-manipulation text-xs sm:text-sm px-2.5 sm:px-3 h-8 sm:h-9"
            >
              <Clock className="w-3 h-3 flex-shrink-0" />
              <span className="hidden xs:inline">Pending ({pendingServices.length})</span>
              <span className="xs:hidden">Pending</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Service List */}
      <div className="space-y-3 sm:space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, index) => {
            const categoryInfo = getServiceCategoryInfo(service.category)
            const isExpanded = expandedService === service.id
            
            return (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className={cn(
                  "bg-slate-800/90 border border-white/10 transition-all duration-300 hover:bg-white/8 active:bg-slate-700/80rounded-3xl touch-manipulation",
                  service.completed ? "border-green-500/30" : "border-orange-500/30"
                )}>
                  <CardContent className="p-4 sm:p-6">
                    <div 
                      className="cursor-pointer active:opacity-80 transition-opacity"
                      onClick={() => toggleServiceExpansion(service.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                          {/* Service Icon and Category */}
                          <div className={cn(
                            "w-10 h-10 sm:w-12 sm:h-12 rounded-xl  border flex items-center justify-center bg-gradient-to-br flex-shrink-0",
                            service.completed 
                              ? "from-green-500/20 to-emerald-500/20 border-green-400/30"
                              : "from-orange-500/20 to-amber-500/20 border-orange-400/30"
                          )}>
                            <span className="text-base sm:text-lg">{categoryInfo.icon}</span>
                          </div>

                          {/* Service Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2 gap-3">
                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-white text-base sm:text-lg mb-1 leading-tight">
                                  {service.name}
                                </h3>
                                {service.description && (
                                  <p className="text-slate-400 text-xs sm:text-sm leading-tight">{service.description}</p>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                                <Badge
                                  variant={service.completed ? "success" : "warning"}
                                  className="text-xs px-2 py-0.5 rounded-xl"
                                >
                                  {service.completed ? "Done" : "Scheduled"}
                                </Badge>
                                <ChevronDown className={cn(
                                  "w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 transition-transform duration-200",
                                  isExpanded && "rotate-180"
                                )} />
                              </div>
                            </div>

                            {/* Quick Info */}
                            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm overflow-x-auto">
                              <div className="flex items-center gap-1 text-slate-300 flex-shrink-0">
                                <DollarSign className="w-3 h-3" />
                                <span className="whitespace-nowrap">{formatCurrency(service.cost)}</span>
                              </div>
                              <div className="flex items-center gap-1 text-blue-300 flex-shrink-0">
                                <Star className="w-3 h-3" />
                                <span className="whitespace-nowrap">{service.pointsEarned} points</span>
                              </div>
                              {service.date && (
                                <div className="flex items-center gap-1 text-slate-400 flex-shrink-0">
                                  <Calendar className="w-3 h-3" />
                                  <span className="whitespace-nowrap">{formatRelativeTime(service.date)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <Separator className="my-3 sm:my-4 bg-slate-700/80" />
                          
                          <div className="space-y-3 sm:space-y-4">
                            {/* Detailed Information */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-400 flex-shrink-0">Service Category</span>
                                  <Badge variant="outline" className="border-white/20 text-white text-xs px-2 py-0.5 rounded-xl">
                                    {categoryInfo.name}
                                  </Badge>
                                </div>
                                
                                {service.provider && (
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-slate-400 flex-shrink-0">Provider</span>
                                    <div className="flex items-center gap-1 text-white min-w-0">
                                      <User className="w-3 h-3 flex-shrink-0" />
                                      <span className="truncate">{service.provider}</span>
                                    </div>
                                  </div>
                                )}

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-400 flex-shrink-0">Benefit Used</span>
                                  <Badge 
                                    variant={service.benefitUsed ? "success" : "outline"}
                                    className="text-xs px-2 py-0.5 rounded-xl"
                                  >
                                    {service.benefitUsed ? "Yes" : "No"}
                                  </Badge>
                                </div>
                              </div>

                              <div className="space-y-2">
                                {service.date && (
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="text-slate-400 flex-shrink-0">Service Date</span>
                                    <span className="text-white truncate">{formatDate(service.date)}</span>
                                  </div>
                                )}

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-400 flex-shrink-0">Points Earned</span>
                                  <div className="flex items-center gap-1 text-blue-300 font-medium">
                                    <Award className="w-3 h-3 flex-shrink-0" />
                                    <span>+{service.pointsEarned}</span>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-slate-400 flex-shrink-0">Total Cost</span>
                                  <span className="text-white font-medium">
                                    {formatCurrency(service.cost)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Notes */}
                            {service.notes && (
                              <div className="p-3 sm:p-4 rounded-2xl bg-slate-800/80 border border-white/10">
                                <div className="flex items-start gap-2.5">
                                  <FileText className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                  <div className="min-w-0 flex-1">
                                    <p className="text-slate-300 text-xs sm:text-sm font-medium mb-1">Notes</p>
                                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{service.notes}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Empty State for Filtered Results */}
      {filteredServices.length === 0 && (
        <Card className="bg-slate-800/90 border border-white/10 rounded-3xl">
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-r from-slate-500/20 to-slate-600/20  border border-white/20 flex items-center justify-center">
              <Filter className="w-5 h-5 sm:w-6 sm:h-6 text-white/60" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2 leading-tight">
              No {filter} services found
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Try adjusting your filter to see more services.
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}