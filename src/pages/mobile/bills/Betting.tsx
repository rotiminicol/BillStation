import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Gamepad2,
  ArrowLeft,
  X,
  User,
  Wallet
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { SuccessModal } from '@/components/ui/success-modal'
import { PinInput } from '@/components/PinInput'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'

interface BettingData {
  platform: string
  accountId: string
  amount: string
  reference: string
}

const platforms = [
  { 
    id: 'bet9ja', 
    name: 'Bet9ja', 
    logo: '🎲', 
    color: 'from-green-600 to-green-800', 
    description: 'Premier sports betting platform',
    minAmount: '100',
    maxAmount: '1000000'
  },
  { 
    id: 'sportybet', 
    name: 'SportyBet', 
    logo: '⚽', 
    color: 'from-blue-600 to-blue-800', 
    description: 'Fast and reliable betting',
    minAmount: '100',
    maxAmount: '500000'
  },
  { 
    id: 'nairabet', 
    name: 'NairaBet', 
    logo: '🎯', 
    color: 'from-purple-600 to-purple-800', 
    description: 'Your trusted betting partner',
    minAmount: '100',
    maxAmount: '1000000'
  },
  { 
    id: 'betking', 
    name: 'BetKing', 
    logo: '👑', 
    color: 'from-yellow-600 to-orange-600', 
    description: 'King of sports betting',
    minAmount: '100',
    maxAmount: '1000000'
  },
  { 
    id: '1xbet', 
    name: '1xBet', 
    logo: '🎰', 
    color: 'from-red-600 to-red-800', 
    description: 'International betting platform',
    minAmount: '100',
    maxAmount: '2000000'
  },
]

const quickAmounts = [
  { amount: '500', label: '₦500' },
  { amount: '1000', label: '₦1,000' },
  { amount: '2000', label: '₦2,000' },
  { amount: '5000', label: '₦5,000' },
  { amount: '10000', label: '₦10,000' },
  { amount: '20000', label: '₦20,000' },
]

export default function Betting() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [bettingData, setBettingData] = useState<BettingData>({
    platform: '',
    accountId: '',
    amount: '',
    reference: '',
  })
  const [showPinInput, setShowPinInput] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [pinError, setPinError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Generate reference ID
    const ref = 'BET' + Date.now().toString().slice(-8)
    setBettingData(prev => ({ ...prev, reference: ref }))
  }, [])

  const formatAmount = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '')
    if (numericValue === '') return ''
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(parseInt(numericValue))
  }

  const handlePlatformSelect = (platformId: string) => {
    setBettingData(prev => ({ ...prev, platform: platformId, amount: '' }))
  }

  const handleAccountIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBettingData(prev => ({ ...prev, accountId: e.target.value }))
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBettingData(prev => ({ ...prev, amount: value }))
  }

  const handleQuickAmountSelect = (amount: string) => {
    setBettingData(prev => ({ ...prev, amount: amount }))
  }

  const handleContinue = () => {
    if (!isFormValid()) return
    
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setShowPinInput(true)
    }, 1000)
  }

  const handlePinComplete = (pin: string) => {
    if (pin === '1234') {
      setShowPinInput(false)
      setPinError('')
      
      // Simulate payment processing
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setShowSuccessModal(true)
        toast({
          title: 'Payment Successful!',
          description: `Betting wallet top-up of ${formatAmount(bettingData.amount)} processed successfully.`,
        })
      }, 2000)
    } else {
      setPinError('Incorrect PIN. Please try again.')
    }
  }

  const handleGoHome = () => {
    setShowSuccessModal(false)
    navigate('/dashboard')
  }

  const isFormValid = () => {
    if (!bettingData.platform || !bettingData.accountId || !bettingData.amount) return false
    
    const selectedPlatform = platforms.find(p => p.id === bettingData.platform)
    if (!selectedPlatform) return false
    
    const amount = parseInt(bettingData.amount)
    const minAmount = parseInt(selectedPlatform.minAmount)
    const maxAmount = parseInt(selectedPlatform.maxAmount)
    
    return amount >= minAmount && amount <= maxAmount
  }

  const getSelectedPlatform = () => {
    return platforms.find(platform => platform.id === bettingData.platform)
  }

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  const bottomSheetVariants = {
    hidden: { y: '100%' },
    visible: { y: 0 },
  }

  return (
    <div className="min-h-screen bg-[#F6F6F8] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate('/bills')} className="text-gray-600 hover:text-gray-900 p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-gray-900">Betting Wallet Top-up</h1>
            <p className="text-xs text-gray-600">Fund your betting account instantly</p>
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key="betting-content"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Platform Selection */}
            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Select Platform</h3>
                    <p className="text-sm text-gray-600">Choose your betting platform</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {platforms.map((platform) => (
                    <motion.div
                      key={platform.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          bettingData.platform === platform.id
                            ? 'border-[#0B63BC] bg-[#0B63BC]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handlePlatformSelect(platform.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 bg-gradient-to-br ${platform.color} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
                            {platform.logo}
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">{platform.name}</span>
                            <p className="text-xs text-gray-600">{platform.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              ₦{platform.minAmount} - ₦{platform.maxAmount}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Account Details */}
            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Account Details</h3>
                    <p className="text-sm text-gray-600">Enter your betting account information</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account ID/Username
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your account ID or username"
                      value={bettingData.accountId}
                      onChange={handleAccountIdChange}
                      className="h-12 text-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter your betting account ID or username
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amount Selection */}
            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Top-up Amount</h3>
                    <p className="text-sm text-gray-600">Enter the amount to add to your wallet</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (₦)
                    </label>
                    <Input
                      type="text"
                      placeholder="0.00"
                      value={bettingData.amount}
                      onChange={handleAmountChange}
                      className="h-12 text-lg"
                    />
                    {getSelectedPlatform() && (
                      <p className="text-xs text-gray-500 mt-1">
                        Min: ₦{getSelectedPlatform()?.minAmount} | Max: ₦{getSelectedPlatform()?.maxAmount}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Quick Amounts</p>
                    <div className="grid grid-cols-2 gap-3">
                      {quickAmounts.map((item) => (
                        <motion.div
                          key={item.amount}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            className={`p-3 rounded-lg border-2 cursor-pointer text-center transition-all ${
                              bettingData.amount === item.amount
                                ? 'border-[#0B63BC] bg-[#0B63BC]/5 text-[#0B63BC]'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => handleQuickAmountSelect(item.amount)}
                          >
                            <span className="font-medium">{item.label}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-[#0B63BC] to-[#0B63BC]/90 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-4">Payment Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-white/80">Platform:</span>
                    <span className="font-medium">
                      {getSelectedPlatform()?.name || 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Account ID:</span>
                    <span className="font-medium">{bettingData.accountId || 'Not entered'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Amount:</span>
                    <span className="font-medium">
                      {bettingData.amount ? formatAmount(bettingData.amount) : 'Not entered'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Reference:</span>
                    <span className="font-medium text-sm">{bettingData.reference}</span>
                  </div>
                </div>

                <Button
                  onClick={handleContinue}
                  disabled={!isFormValid() || isProcessing}
                  className="w-full h-12 bg-white text-[#0B63BC] hover:bg-white/90 font-semibold"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-[#0B63BC] border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Continue to Payment'
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PIN Input Bottom Sheet */}
      <AnimatePresence>
        {showPinInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowPinInput(false)}
          >
            <motion.div
              variants={bottomSheetVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Enter Your PIN</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPinInput(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <PinInput
                onComplete={handlePinComplete}
                onClose={() => setShowPinInput(false)}
                error={pinError}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        amount={bettingData.amount}
        recipient={bettingData.accountId}
        transactionId={bettingData.reference}
        timestamp={new Date().toLocaleString()}
        onMakeAnother={() => {
          setShowSuccessModal(false)
          setBettingData({
            platform: '',
            accountId: '',
            amount: '',
            reference: 'BET' + Date.now().toString().slice(-8),
          })
        }}
        onGoHome={handleGoHome}
      />
    </div>
  )
} 