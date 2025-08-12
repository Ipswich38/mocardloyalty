import { motion } from 'motion/react'
import { Calendar, Crown, Sparkles, Star } from 'lucide-react'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { VirtualCardProps } from '../types'
import { TIER_INFOS, APP_CONFIG } from '../lib/constants'
import { calculateTierProgress, formatDate, formatNumber, cn } from '../lib/utils'

export function VirtualCard({ patient, className }: VirtualCardProps) {
  const tierInfo = TIER_INFOS[patient.membershipTier]
  const tierProgress = calculateTierProgress(patient.loyaltyPoints, TIER_INFOS)

  return (
    <motion.div
      className={cn("relative group w-full max-w-sm mx-auto", className)}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ 
        scale: 1.02,
        y: -4,
      }}
      whileTap={{ 
        scale: 0.98,
        y: 2,
      }}
    >
      <Card className={cn(
        "relative overflow-hidden border-0 shadow-ios-2xl  transition-all duration-700",
        "bg-gradient-to-br rounded-3xl",
        tierInfo.gradient,
        "hover:shadow-card-hover active:shadow-card-active",
        // Mobile-first optimizations
        "aspect-[1.6/1] min-h-[200px] sm:min-h-[220px]",
        "touch-manipulation select-none"
      )}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16">
            <div className="w-full h-full rounded-full bg-slate-600/80 blur-3xl" />
          </div>
          <div className="absolute bottom-0 left-0 w-24 h-24 transform -translate-x-12 translate-y-12">
            <div className="w-full h-full rounded-full bg-slate-600/80 blur-2xl" />
          </div>
        </div>

        {/* Card Header */}
        <div className="relative p-4 sm:p-6 pb-3 sm:pb-4">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            {/* Logo and App Name */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-600/80">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-white text-base sm:text-lg leading-tight">{APP_CONFIG.name}</h2>
                <p className="text-white/75 text-xs sm:text-sm leading-tight">Digital Loyalty Card</p>
              </div>
            </div>

            {/* Tier Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
            >
              <Badge variant="tier" className="bg-white/25  border-white/30 text-white font-semibold px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-xl shadow-ios-sm">
                <span className="mr-1 text-sm">{tierInfo.icon}</span>
                <span className="hidden xs:inline">{tierInfo.name}</span>
                <span className="xs:hidden">{tierInfo.name.charAt(0)}</span>
              </Badge>
            </motion.div>
          </div>

          {/* Level Indicator */}
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/80" />
            <span className="text-white/80 text-xs sm:text-sm font-medium">Level {patient.level}</span>
            <div className="flex gap-0.5 sm:gap-1 ml-1 sm:ml-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-2.5 h-2.5 sm:w-3 sm:h-3 transition-all duration-300",
                    i < Math.min(patient.level, 5) 
                      ? "text-yellow-300 fill-yellow-300 drop-shadow-sm" 
                      : "text-white/25"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="relative px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 sm:space-y-5">
          {/* Membership ID */}
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1 font-medium">Card Number</p>
            <p className="text-white font-mono text-sm sm:text-base lg:text-lg tracking-wider break-all">
              {patient.membershipId.match(/.{1,4}/g)?.join(' ')}
            </p>
          </div>

          {/* Cardholder Name */}
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1 font-medium">Cardholder</p>
            <p className="text-white font-semibold text-lg sm:text-xl uppercase tracking-wide leading-tight">
              {patient.name}
            </p>
          </div>

          {/* Points Display */}
          <div>
            <div className="flex items-end justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1 font-medium">Loyalty Points</p>
                <motion.p 
                  className="text-white font-bold text-2xl sm:text-3xl leading-none"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
                >
                  {formatNumber(patient.loyaltyPoints)}
                </motion.p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-white/60 text-xs font-medium mb-1">Member Since</p>
                <div className="flex items-center justify-end gap-1 text-white/80 text-xs sm:text-sm">
                  <Calendar className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{formatDate(patient.memberSince)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tier Progress */}
          {tierProgress.nextTier && (
            <motion.div
              className="space-y-2.5 sm:space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                  <p className="text-white/80 text-xs sm:text-sm font-medium truncate">
                    Progress to {tierProgress.nextTier}
                  </p>
                  <span className="text-white/60 text-sm flex-shrink-0">
                    {TIER_INFOS[tierProgress.nextTier].icon}
                  </span>
                </div>
                <p className="text-white/80 text-xs sm:text-sm font-medium flex-shrink-0">
                  {formatNumber(tierProgress.pointsToNext)} to go
                </p>
              </div>
              
              <Progress
                value={tierProgress.progressPercentage}
                className="h-1.5 sm:h-2 bg-slate-700/90 rounded-full overflow-hidden"
                indicatorClassName="bg-gradient-to-r from-white via-white/90 to-white/80 transition-all duration-1000 ease-out rounded-full shadow-sm"
              />
              
              <p className="text-white/50 text-xs text-center font-medium">
                {tierProgress.progressPercentage}% complete
              </p>
            </motion.div>
          )}

          {/* Platinum Achievement */}
          {patient.membershipTier === 'Platinum' && (
            <motion.div
              className="p-3 sm:p-4 rounded-2xl bg-slate-700/80 border border-white/20 shadow-ios-sm"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            >
              <div className="flex items-center gap-2 sm:gap-3 text-white mb-2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center shadow-sm">
                  <Crown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-semibold">Platinum Elite Member</span>
              </div>
              <p className="text-white/75 text-xs leading-relaxed">
                You've reached the highest tier! Enjoy exclusive VIP benefits.
              </p>
            </motion.div>
          )}
        </div>

        {/* Holographic Effect */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Glow Effect on Hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10" />
      </Card>
    </motion.div>
  )
}