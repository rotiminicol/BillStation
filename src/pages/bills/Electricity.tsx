import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  X,
  CreditCard,
  Building2,
  Calculator
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SuccessModal } from '@/components/ui/success-modal'
import { PinInput } from '@/components/PinInput'
import DesktopLayout from '@/components/DesktopLayout'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'

interface ElectricityData {
  provider: string
  meterNumber: string
  meterType: string
  amount: string
  reference: string
}

const providers = [
  { id: 'aedc', name: 'AEDC', color: 'from-blue-500 to-blue-600', logo: '⚡' },
  { id: 'ekedc', name: 'EKEDC', color: 'from-green-500 to-green-600', logo: '⚡' },
  { id: 'ikedc', name: 'IKEDC', color: 'from-purple-500 to-purple-600', logo: '⚡' },
  { id: 'phedc', name: 'PHEDC', color: 'from-red-500 to-red-600', logo: '⚡' },
  { id: 'bedc', name: 'BEDC', color: 'from-orange-500 to-orange-600', logo: '⚡' },
  { id: 'kedco', name: 'KEDCO', color: 'from-yellow-500 to-yellow-600', logo: '⚡' },
]

const meterTypes = [
  { id: 'prepaid', name: 'Prepaid', description: 'Pay for electricity in advance' },
  { id: 'postpaid', name: 'Postpaid', description: 'Pay for electricity after usage' },
]

const quickAmounts = [500, 1000, 2000, 5000, 10000, 20000]

export default function Electricity() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [electricityData, setElectricityData] = useState<ElectricityData>({
    provider: '',
    meterNumber: '',
    meterType: '',
    amount: '',
    reference: ''
  })
  const [showPinInput, setShowPinInput] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [pinError, setPinError] = useState('')
  const [showAmount, setShowAmount] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  // Generate reference ID
  useEffect(() => {
    const ref = 'ELEC' + Date.now().toString().slice(-8)
    setElectricityData(prev => ({ ...prev, reference: ref }))
  }, [])

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
    setElectricityData(prev => ({ ...prev, provider }))
  }

  const handleMeterTypeSelect = (meterType: string) => {
    setElectricityData(prev => ({ ...prev, meterType }))
  }

  const handleMeterNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 20)
    setElectricityData(prev => ({ ...prev, meterNumber: value }))
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAmount(e.target.value)
    setElectricityData(prev => ({ ...prev, amount: formatted }))
  }

  const handleQuickAmountSelect = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount)
    setElectricityData(prev => ({ ...prev, amount: formatted }))
  }

  const handleContinue = () => {
    if (!electricityData.provider || !electricityData.meterNumber || !electricityData.meterType || !electricityData.amount) {
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
    return electricityData.provider && electricityData.meterNumber && electricityData.meterType && electricityData.amount
  }

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }

  return (
    <DesktopLayout>
      <div className="min-h-screen bg-[#F6F6F8]">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/bills')}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Bills
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Electricity Payment</h1>
                <p className="text-gray-600">Pay your electricity bills instantly</p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Provider Selection */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-[#0B63BC]" />
                    Select Electricity Provider
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {providers.map((provider) => (
                      <motion.div
                        key={provider.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all duration-300 border-2 ${
                            electricityData.provider === provider.id
                              ? 'border-[#0B63BC] bg-[#0B63BC]/5'
                              : 'border-gray-200 hover:border-[#0B63BC]/50'
                          }`}
                          onClick={() => handleProviderSelect(provider.id)}
                        >
                          <CardContent className="p-4 text-center">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${provider.color} flex items-center justify-center mx-auto mb-3 text-white text-xl`}>
                              {provider.logo}
                            </div>
                            <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Meter Type Selection */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Calculator className="w-5 h-5 mr-2 text-[#0B63BC]" />
                    Meter Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {meterTypes.map((type) => (
                      <motion.div
                        key={type.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all duration-300 border-2 ${
                            electricityData.meterType === type.id
                              ? 'border-[#0B63BC] bg-[#0B63BC]/5'
                              : 'border-gray-200 hover:border-[#0B63BC]/50'
                          }`}
                          onClick={() => handleMeterTypeSelect(type.id)}
                        >
                          <CardContent className="p-4">
                            <h3 className="font-bold text-lg text-gray-900 mb-2">{type.name}</h3>
                            <p className="text-sm text-gray-600">{type.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Meter Number Input */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-[#0B63BC]" />
                    Meter Number
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Enter meter number
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your meter number"
                      value={electricityData.meterNumber}
                      onChange={handleMeterNumberChange}
                      className="h-12 text-lg font-mono"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Amount Selection */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-[#0B63BC]" />
                    Amount
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Enter amount
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="₦0.00"
                        value={electricityData.amount}
                        onChange={handleAmountChange}
                        className="h-12 text-lg font-semibold pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAmount(!showAmount)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                          className="h-10"
                        >
                          ₦{amount.toLocaleString()}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Summary */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg sticky top-6">
                <CardHeader>
                  <CardTitle className="text-xl">Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isFormValid() ? (
                    <>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Provider</span>
                          <span className="font-medium">{electricityData.provider.toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Meter Type</span>
                          <span className="font-medium capitalize">{electricityData.meterType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Meter Number</span>
                          <span className="font-medium font-mono">{electricityData.meterNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount</span>
                          <span className="font-bold text-lg">{electricityData.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service Fee</span>
                          <span className="font-medium">₦50</span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between">
                            <span className="font-semibold">Total</span>
                            <span className="font-bold text-lg text-[#0B63BC]">
                              {electricityData.amount ? electricityData.amount : '₦0'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleContinue}
                        disabled={!isFormValid()}
                        className="w-full bg-[#0B63BC] hover:bg-[#0B63BC]/90 h-12 text-lg font-semibold"
                      >
                        Continue to Payment
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">Fill in the details to see payment summary</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* PIN Input Modal */}
        {showPinInput && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
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
            </div>
          </div>
        )}

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
              meterNumber: '',
              meterType: '',
              amount: '',
              reference: ''
            })
          }}
          onGoHome={handleGoHome}
        />
      </div>
    </DesktopLayout>
  )
} 