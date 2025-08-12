import { motion } from 'motion/react'
import { CheckCircle2, Clock, Gift, Heart, Shield, Sparkles, Target, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { BenefitsTrackerProps, BenefitStatus } from '../types'
import { calculateBenefitsUsage, formatRelativeTime, cn } from '../lib/utils'

interface BenefitDisplay {
  key: string
  name: string
  icon: React.ElementType
  description: string
  category: 'essential' | 'preventive' | 'restorative' | 'cosmetic'
}

// Removed unused benefitIcons object as it's only used as a type

const benefitDisplayInfo: Record<string, BenefitDisplay> = {
  oralProphylaxis: {
    key: 'oralProphylaxis',
    name: 'Oral Prophylaxis',
    icon: Shield,
    description: 'Professional teeth cleaning and plaque removal',
    category: 'preventive'
  },
  toothExtraction: {
    key: 'toothExtraction',
    name: 'Tooth Extraction',
    icon: Zap,
    description: 'Safe removal of damaged or problematic teeth',
    category: 'restorative'
  },
  lightCureFilling: {
    key: 'lightCureFilling',
    name: 'Light Cure Filling',
    icon: Heart,
    description: 'Composite resin fillings for cavity treatment',
    category: 'restorative'
  },
  fluorideTreatment: {
    key: 'fluorideTreatment',
    name: 'Fluoride Treatment',
    icon: Sparkles,
    description: 'Topical fluoride application for enamel protection',
    category: 'preventive'
  }
}

const categoryStyles = {
  essential: {
    gradient: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-400/30',
    badge: 'bg-blue-500/20 text-blue-300 border-blue-400/30'
  },
  preventive: {
    gradient: 'from-green-500/20 to-emerald-500/20',
    border: 'border-green-400/30',
    badge: 'bg-green-500/20 text-green-300 border-green-400/30'
  },
  restorative: {
    gradient: 'from-orange-500/20 to-red-500/20',
    border: 'border-orange-400/30',
    badge: 'bg-orange-500/20 text-orange-300 border-orange-400/30'
  },
  cosmetic: {
    gradient: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-400/30',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-400/30'
  }
}

export function BenefitsTracker({ patient }: BenefitsTrackerProps) {
  const benefitsUsage = calculateBenefitsUsage(patient)
  const totalBenefits = Object.values(patient.dentalBenefits).reduce((sum, benefit) => sum + benefit.total, 0)
  const usedBenefits = Object.values(patient.dentalBenefits).reduce((sum, benefit) => sum + (benefit.total - benefit.remaining), 0)
  const remainingBenefits = totalBenefits - usedBenefits
  
  const isAllBenefitsUsed = remainingBenefits === 0

  const getBenefitStatus = (benefit: BenefitStatus) => {
    if (benefit.remaining === 0) return 'used'
    if (benefit.used && benefit.remaining > 0) return 'partial'
    return 'available'
  }

  const getBenefitStatusColor = (status: string) => {
    switch (status) {
      case 'used': return 'text-red-400'
      case 'partial': return 'text-yellow-400'
      case 'available': return 'text-green-400'
      default: return 'text-slate-400'
    }
  }

  const getBenefitStatusText = (status: string) => {
    switch (status) {
      case 'used': return 'Fully Used'
      case 'partial': return 'Partially Used'
      case 'available': return 'Available'
      default: return 'Unknown'
    }
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Benefits Overview Card */}
      <Card className="bg-slate-800/90 border border-white/10 rounded-3xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20  border border-white/20 flex items-center justify-center">
                <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-white text-lg sm:text-xl leading-tight">Dental Benefits</CardTitle>
                <p className="text-slate-400 text-xs sm:text-sm mt-0.5 sm:mt-1 leading-tight">
                  Track your annual dental benefits usage
                </p>
              </div>
            </div>
            <Badge variant="glass" className="text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-xl flex-shrink-0">
              {remainingBenefits} Left
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-5 sm:space-y-6 p-4 sm:p-6">
          {/* Progress Overview */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-300 truncate">Benefits Usage Progress</span>
              <span className="text-white font-medium flex-shrink-0 ml-2">{usedBenefits}/{totalBenefits} used</span>
            </div>
            
            <Progress
              value={benefitsUsage}
              className="h-2.5 sm:h-3 bg-slate-700/80 rounded-full"
              indicatorClassName={cn(
                "transition-all duration-1000 rounded-full",
                benefitsUsage < 50 
                  ? "bg-gradient-to-r from-green-500 to-emerald-500"
                  : benefitsUsage < 80
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                  : "bg-gradient-to-r from-orange-500 to-red-500"
              )}
            />
            
            <div className="flex justify-between text-xs text-slate-400">
              <span>0%</span>
              <span className="font-medium text-white">{benefitsUsage}%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Completion Message */}
          {isAllBenefitsUsed && (
            <motion.div
              className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 "
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-start gap-2.5 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Target className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-green-300 font-medium text-sm sm:text-base leading-tight">All Benefits Utilized!</h4>
                  <p className="text-green-400/80 text-xs sm:text-sm mt-1 leading-relaxed">
                    You've maximized your annual dental benefits. Great job on maintaining your oral health!
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Individual Benefits */}
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
        {Object.entries(patient.dentalBenefits).map(([benefitKey, benefitData], index) => {
          const displayInfo = benefitDisplayInfo[benefitKey]
          if (!displayInfo) return null

          const IconComponent = displayInfo.icon
          const status = getBenefitStatus(benefitData)
          const categoryStyle = categoryStyles[displayInfo.category]
          
          return (
            <motion.div
              key={benefitKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <Card className={cn(
                "bg-slate-800/90 border transition-all duration-300 hover:bg-white/8 active:bg-slate-700/80 rounded-3xl touch-manipulation",
                categoryStyle.border,
                status === 'used' && "opacity-60"
              )}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                      <div className={cn(
                        "w-10 h-10 sm:w-12 sm:h-12 rounded-xl  border flex items-center justify-center bg-gradient-to-br flex-shrink-0",
                        categoryStyle.gradient,
                        categoryStyle.border
                      )}>
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <h3 className={cn(
                          "font-semibold text-base sm:text-lg leading-tight",
                          status === 'used' ? "text-slate-400 line-through" : "text-white"
                        )}>
                          {displayInfo.name}
                        </h3>
                        <p className="text-slate-400 text-xs sm:text-sm mt-0.5 leading-tight">{displayInfo.description}</p>
                      </div>
                    </div>

                    <Badge
                      variant="outline"
                      className={cn(
                        " border text-xs px-2 py-0.5 rounded-xl flex-shrink-0 ml-2",
                        categoryStyle.badge
                      )}
                    >
                      {displayInfo.category}
                    </Badge>
                  </div>

                  <Separator className="my-3 sm:my-4 bg-slate-700/80" />

                  <div className="space-y-2.5 sm:space-y-3">
                    {/* Usage Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                        {status === 'used' ? (
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 flex-shrink-0" />
                        ) : status === 'partial' ? (
                          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                        )}
                        <span className={cn(
                          "text-xs sm:text-sm font-medium truncate",
                          getBenefitStatusColor(status)
                        )}>
                          {getBenefitStatusText(status)}
                        </span>
                      </div>
                      
                      <div className="text-right flex-shrink-0 ml-2">
                        <p className="text-white font-bold text-sm sm:text-base">
                          {benefitData.remaining}/{benefitData.total}
                        </p>
                        <p className="text-slate-400 text-xs">remaining</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <Progress
                      value={((benefitData.total - benefitData.remaining) / benefitData.total) * 100}
                      className="h-1.5 sm:h-2 bg-slate-700/80 rounded-full"
                      indicatorClassName={cn(
                        "transition-all duration-500 rounded-full",
                        status === 'used' 
                          ? "bg-red-500" 
                          : status === 'partial'
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      )}
                    />

                    {/* Last Used Info */}
                    {benefitData.lastUsed && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">Last used {formatRelativeTime(benefitData.lastUsed)}</span>
                      </div>
                    )}

                    {/* Expiry Date */}
                    {benefitData.expiryDate && (
                      <div className="flex items-center justify-between text-xs gap-2">
                        <span className="text-slate-400 flex-shrink-0">Expires:</span>
                        <span className="text-slate-300 truncate">
                          {new Date(benefitData.expiryDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Benefits Renewal Notice */}
      <motion.div
        className="mt-5 sm:mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10  border border-blue-400/20 rounded-3xl">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-500/20  border border-blue-400/30 flex items-center justify-center flex-shrink-0">
                <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              </div>
              
              <div className="space-y-2 min-w-0 flex-1">
                <h4 className="text-white font-semibold text-sm sm:text-base leading-tight">Annual Benefits Renewal</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Your dental benefits reset annually on January 1st. Plan your treatments 
                  accordingly to maximize your coverage throughout the year.
                </p>
                <div className="flex flex-wrap gap-2 mt-2 sm:mt-3">
                  <Badge variant="glass" className="text-xs px-2 py-1 rounded-xl">
                    Next Renewal: Jan 1, 2025
                  </Badge>
                  <Badge variant="outline" className="text-xs border-blue-400/30 text-blue-300 px-2 py-1 rounded-xl">
                    Coverage Year: 2024
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}