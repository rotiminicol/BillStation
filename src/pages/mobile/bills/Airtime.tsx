import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Smartphone, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  X,
  Phone,
  CreditCard
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { SuccessModal } from '@/components/ui/success-modal'
import { PinInput } from '@/components/PinInput'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'

interface AirtimeData {
  provider: string
  phoneNumber: string
  amount: string
  isSaved: boolean
  reference: string
}

const providers = [
  { id: 'mtn', name: 'MTN', color: 'from-yellow-500 to-orange-500', logo: '🟡' },
  { id: 'airtel', name: 'Airtel', color: 'from-red-500 to-pink-500', logo: '🔴' },
  { id: 'glo', name: 'Glo', color: 'from-green-500 to-emerald-500', logo: '🟢' },
  { id: '9mobile', name: '9mobile', color: 'from-green-600 to-teal-600', logo: '🟢' },
]

const quickAmounts = [100, 200, 500, 1000, 2000, 5000]

export default function Airtime() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [airtimeData, setAirtimeData] = useState<AirtimeData>({
    provider: '',
    phoneNumber: '',
    amount: '',
    isSaved: false,
    reference: ''
  })
  const [showPinInput, setShowPinInput] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [pinError, setPinError] = useState('')
  const [showAmount, setShowAmount] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  // Generate reference ID
  useEffect(() => {
    const ref = 'AIR' + Date.now().toString().slice(-8)
    setAirtimeData(prev => ({ ...prev, reference: ref }))
  }, [])

  const formatPhoneNumber = (value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 11)
    if (numericValue.length >= 4) {
      return `${numericValue.slice(0, 4)} ${numericValue.slice(4, 7)} ${numericValue.slice(7, 11)}`
    }
    return numericValue
  }

  const formatAmount = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '')
    if (numericValue) {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0
      }).format(parseInt(numericValue))
    }
    return ''
  }

  const handleProviderSelect = (provider: string) => {
    setAirtimeData(prev => ({ ...prev, provider }))
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setAirtimeData(prev => ({ ...prev, phoneNumber: formatted }))
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAmount(e.target.value)
    setAirtimeData(prev => ({ ...prev, amount: formatted }))
  }

  const handleQuickAmountSelect = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount)
    setAirtimeData(prev => ({ ...prev, amount: formatted }))
  }

  const handleContinue = () => {
    if (!airtimeData.provider || !airtimeData.phoneNumber || !airtimeData.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }
    setShowPinInput(true)
  }

  const handlePinComplete = (pin: string) => {
    setShowPinInput(false)
    setPinError('')
    
    if (pin === '1234') {
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setShowSuccessModal(true)
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
    return airtimeData.provider && airtimeData.phoneNumber && airtimeData.amount
  }

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  const bottomSheetVariants = {
    hidden: { y: '100%' },
    visible: { y: 0 }
  }

  return (
    <div className="min-h-screen bg-[#F6F6F8] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/bills')}
            className="text-gray-600 hover:text-gray-900 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-gray-900">Airtime Recharge</h1>
            <p className="text-xs text-gray-600">Top-up any network instantly</p>
          </div>
          
          <div className="w-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key="airtime-content"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Provider Selection */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Smartphone className="w-5 h-5 mr-2 text-[#0B63BC]" />
                  Select Network
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {providers.map((provider) => (
                    <motion.div
                      key={provider.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all duration-300 border-2 ${
                          airtimeData.provider === provider.id
                            ? 'border-[#0B63BC] bg-[#0B63BC]/5'
                            : 'border-gray-200 hover:border-[#0B63BC]/50'
                        }`}
                        onClick={() => handleProviderSelect(provider.id)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${provider.color} flex items-center justify-center mx-auto mb-3 text-white text-xl`}>
                            {provider.logo}
                          </div>
                          <h3 className="font-semibold text-gray-900 text-sm">{provider.name}</h3>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Phone Number Input */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-[#0B63BC]" />
                  Phone Number
                </h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Enter phone number
                    </label>
                    <Input
                      type="tel"
                      placeholder="0801 234 5678"
                      value={airtimeData.phoneNumber}
                      onChange={handlePhoneNumberChange}
                      className="h-12 text-lg font-mono"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="saveNumber"
                      checked={airtimeData.isSaved}
                      onChange={(e) => setAirtimeData(prev => ({ ...prev, isSaved: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="saveNumber" className="text-sm text-gray-600">
                      Save as frequent number
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amount Selection */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-[#0B63BC]" />
                  Amount
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Enter amount
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="₦0.00"
                        value={airtimeData.amount}
                        onChange={handleAmountChange}
                        className="h-12 text-lg font-semibold pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAmount(!showAmount)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                      >
                        {showAmount ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Quick amounts
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {quickAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAmountSelect(amount)}
                          className="h-10 text-xs"
                        >
                          ₦{amount.toLocaleString()}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary */}
            {isFormValid() && (
              <Card className="border-0 shadow-sm bg-[#0B63BC]/5 border-[#0B63BC]/20">
                <CardContent className="p-4 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Payment Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Network</span>
                      <span className="font-medium">{airtimeData.provider.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone Number</span>
                      <span className="font-medium font-mono text-sm">{airtimeData.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-bold text-lg">{airtimeData.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Fee</span>
                      <span className="font-medium">₦50</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-lg text-[#0B63BC]">
                          {airtimeData.amount ? airtimeData.amount : '₦0'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Action Button */}
      {isFormValid() && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <Button
            onClick={handleContinue}
            disabled={!isFormValid()}
            className="w-full bg-[#0B63BC] hover:bg-[#0B63BC]/90 h-12 text-base font-medium"
          >
            Continue to Payment
          </Button>
        </div>
      )}

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
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Enter Your PIN</h3>
                <button
                  onClick={() => setShowPinInput(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
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
        amount={airtimeData.amount}
        recipient={airtimeData.phoneNumber}
        transactionId={airtimeData.reference}
        timestamp={new Date().toLocaleString()}
        onMakeAnother={() => {
          setShowSuccessModal(false)
          setAirtimeData({
            provider: '',
            phoneNumber: '',
            amount: '',
            isSaved: false,
            reference: ''
          })
        }}
        onGoHome={handleGoHome}
      />
    </div>
  )
} 