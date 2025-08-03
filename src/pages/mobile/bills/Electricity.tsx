import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap,
  ArrowLeft,
  X,
  CreditCard,
  Building2,
  Calculator
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { SuccessModal } from '@/components/ui/success-modal'
import { PinInput } from '@/components/PinInput'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'

interface ElectricityData {
  provider: string
  meterType: string
  meterNumber: string
  amount: string
  reference: string
}

const providers = [
  { id: 'aedc', name: 'AEDC', logo: '⚡', color: 'from-yellow-400 to-orange-500' },
  { id: 'ekedc', name: 'EKEDC', logo: '⚡', color: 'from-blue-500 to-purple-500' },
  { id: 'ikedc', name: 'IKEDC', logo: '⚡', color: 'from-green-500 to-emerald-500' },
  { id: 'phedc', name: 'PHEDC', logo: '⚡', color: 'from-red-500 to-pink-500' },
  { id: 'bedc', name: 'BEDC', logo: '⚡', color: 'from-indigo-500 to-blue-500' },
  { id: 'kedco', name: 'KEDCO', logo: '⚡', color: 'from-purple-500 to-indigo-500' },
]

const meterTypes = [
  { id: 'prepaid', name: 'Prepaid Meter', description: 'Pay for electricity in advance', icon: '🔋' },
  { id: 'postpaid', name: 'Postpaid Meter', description: 'Pay after consumption', icon: '📊' },
]

const quickAmounts = [
  { amount: '1000', label: '₦1,000' },
  { amount: '2000', label: '₦2,000' },
  { amount: '5000', label: '₦5,000' },
  { amount: '10000', label: '₦10,000' },
]

export default function Electricity() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [electricityData, setElectricityData] = useState<ElectricityData>({
    provider: '',
    meterType: '',
    meterNumber: '',
    amount: '',
    reference: '',
  })
  const [showPinInput, setShowPinInput] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [pinError, setPinError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Generate reference ID
    const ref = 'ELEC' + Date.now().toString().slice(-8)
    setElectricityData(prev => ({ ...prev, reference: ref }))
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

  const handleProviderSelect = (providerId: string) => {
    setElectricityData(prev => ({ ...prev, provider: providerId }))
  }

  const handleMeterTypeSelect = (typeId: string) => {
    setElectricityData(prev => ({ ...prev, meterType: typeId }))
  }

  const handleMeterNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 11)
    setElectricityData(prev => ({ ...prev, meterNumber: value }))
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setElectricityData(prev => ({ ...prev, amount: value }))
  }

  const handleQuickAmountSelect = (amount: string) => {
    setElectricityData(prev => ({ ...prev, amount: amount }))
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
          description: `Electricity payment of ${formatAmount(electricityData.amount)} processed successfully.`,
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
    return electricityData.provider && electricityData.meterType && electricityData.meterNumber && electricityData.amount
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
            <h1 className="text-lg font-semibold text-gray-900">Electricity Payment</h1>
            <p className="text-xs text-gray-600">Pay your electricity bills instantly</p>
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key="electricity-content"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Provider Selection */}
            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Select Provider</h3>
                    <p className="text-sm text-gray-600">Choose your electricity provider</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {providers.map((provider) => (
                    <motion.div
                      key={provider.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          electricityData.provider === provider.id
                            ? 'border-[#0B63BC] bg-[#0B63BC]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleProviderSelect(provider.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 bg-gradient-to-br ${provider.color} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
                            {provider.logo}
                          </div>
                          <span className="font-medium text-gray-900">{provider.name}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Meter Type Selection */}
            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Meter Type</h3>
                    <p className="text-sm text-gray-600">Select your meter type</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {meterTypes.map((type) => (
                    <motion.div
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          electricityData.meterType === type.id
                            ? 'border-[#0B63BC] bg-[#0B63BC]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleMeterTypeSelect(type.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                            {type.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{type.name}</h4>
                            <p className="text-sm text-gray-600">{type.description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Meter Number Input */}
            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Meter Number</h3>
                    <p className="text-sm text-gray-600">Enter your meter number</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meter Number
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter meter number"
                      value={electricityData.meterNumber}
                      onChange={handleMeterNumberChange}
                      className="h-12 text-lg"
                      maxLength={11}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter the 11-digit meter number
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amount Selection */}
            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Amount</h3>
                    <p className="text-sm text-gray-600">Enter payment amount</p>
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
                      value={electricityData.amount}
                      onChange={handleAmountChange}
                      className="h-12 text-lg"
                    />
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
                              electricityData.amount === item.amount
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
                    <span className="text-white/80">Provider:</span>
                    <span className="font-medium">
                      {providers.find(p => p.id === electricityData.provider)?.name || 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Meter Type:</span>
                    <span className="font-medium">
                      {meterTypes.find(t => t.id === electricityData.meterType)?.name || 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Meter Number:</span>
                    <span className="font-medium">{electricityData.meterNumber || 'Not entered'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Amount:</span>
                    <span className="font-medium">
                      {electricityData.amount ? formatAmount(electricityData.amount) : 'Not entered'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Reference:</span>
                    <span className="font-medium text-sm">{electricityData.reference}</span>
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
        amount={electricityData.amount}
        recipient={electricityData.meterNumber}
        transactionId={electricityData.reference}
        timestamp={new Date().toLocaleString()}
        onMakeAnother={() => {
          setShowSuccessModal(false)
          setElectricityData({
            provider: '',
            meterType: '',
            meterNumber: '',
            amount: '',
            reference: 'ELEC' + Date.now().toString().slice(-8),
          })
        }}
        onGoHome={handleGoHome}
      />
    </div>
  )
} 