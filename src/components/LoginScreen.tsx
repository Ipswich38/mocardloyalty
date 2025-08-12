import { motion } from 'motion/react'
import { Eye, EyeOff, Sparkles, Users, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Separator } from './ui/separator'
import { LoginScreenProps } from '../types'

interface ExtendedLoginScreenProps extends LoginScreenProps {
  onShowNewRegistration?: () => void
}

export function LoginScreen({ 
  credentials, 
  setCredentials, 
  onLogin, 
  onShowRegistration, 
  onShowNewRegistration,
  isLoading = false 
}: ExtendedLoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(e)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-slate-800/95 border border-white/20 shadow-2xl shadow-black/50 rounded-3xl overflow-hidden">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div>
              <CardTitle className="text-2xl font-bold text-white mb-2">
                Welcome to MOCards
              </CardTitle>
              <p className="text-slate-400 text-sm">
                Your digital dental loyalty system
              </p>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="bg-slate-700/50 border-white/20 text-white placeholder:text-slate-400 h-12"
                  disabled={isLoading}
                />
              </div>
              
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="bg-slate-700/50 border-white/20 text-white placeholder:text-slate-400 h-12 pr-12"
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
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>


            {/* Registration Options */}
            {(onShowRegistration || onShowNewRegistration) && (
              <div className="mt-6 space-y-3">
                <Separator className="bg-slate-600/50" />
                <p className="text-center text-slate-400 text-sm">New to MOCards?</p>
                
                <div className="space-y-2">
                  {onShowRegistration && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onShowRegistration}
                      className="w-full bg-slate-700/30 border-slate-600 text-white hover:bg-slate-600/50 h-11"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Register with Control Number
                    </Button>
                  )}
                  
                  {onShowNewRegistration && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onShowNewRegistration}
                      className="w-full bg-slate-700/30 border-slate-600 text-white hover:bg-slate-600/50 h-11"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      New Client Registration
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-slate-600">Developed & Designed by</span>
            <span className="text-xs font-semibold text-blue-400">kreativloops</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}