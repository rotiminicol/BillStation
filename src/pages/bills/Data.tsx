import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Wifi, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  X,
  Phone,
  CreditCard,
  Clock,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SuccessModal } from '@/components/ui/success-modal'
import { PinInput } from '@/components/PinInput'
import DesktopLayout from '@/components/DesktopLayout'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'

interface DataData {
  provider: string
  phoneNumber: string
  bundle: string
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

const dataBundles = [
  { id: '1gb-1day', name: '1GB', duration: '1 Day', price: 200, validity: '24 hours' },
  { id: '2gb-3days', name: '2GB', duration: '3 Days', price: 500, validity: '72 hours' },
  { id: '5gb-7days', name: '5GB', duration: '7 Days', price: 1000, validity: '7 days' },
  { id: '10gb-14days', name: '10GB', duration: '14 Days', price: 2000, validity: '14 days' },
  { id: '20gb-30days', name: '20GB', duration: '30 Days', price: 3500, validity: '30 days' },
  { id: '50gb-30days', name: '50GB', duration: '30 Days', price: 8000, validity: '30 days' },
]

export default function Data() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [dataData, setDataData] = useState<DataData>({
    provider: '',
    phoneNumber: '',
    bundle: '',
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
    const ref = 'DAT' + Date.now().toString().slice(-8)
    setDataData(prev => ({ ...prev, reference: ref }))
  }, [])

  const formatPhoneNumber = (value: string) => {
    const numericValue = value.replace(/\D/g, '').slice(0, 11)
    if (numericValue.length >= 4) {
      return `${numericValue.slice(0, 4)} ${numericValue.slice(4, 7)} ${numericValue.slice(7, 11)}`
    }
    return numericValue
  }

  const handleProviderSelect = (provider: string) => {
    setDataData(prev => ({ ...prev, provider }))
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setDataData(prev => ({ ...prev, phoneNumber: formatted }))
  }

  const handleBundleSelect = (bundleId: string) => {
    const selectedBundle = dataBundles.find(b => b.id === bundleId)
    if (selectedBundle) {
      const formatted = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0
      }).format(selectedBundle.price)
      
      setDataData(prev => ({ 
        ...prev, 
        bundle: bundleId,
        amount: formatted
      }))
    }
  }

  const handleContinue = () => {
    if (!dataData.provider || !dataData.phoneNumber || !dataData.bundle) {
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
    return dataData.provider && dataData.phoneNumber && dataData.bundle
  }

  const getSelectedBundle = () => {
    return dataBundles.find(b => b.id === dataData.bundle)
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
                <h1 className="text-2xl font-bold text-gray-900">Data Bundle</h1>
                <p className="text-gray-600">Buy internet data bundles</p>
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
                    <Wifi className="w-5 h-5 mr-2 text-[#0B63BC]" />
                    Select Network
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {providers.map((provider) => (
                      <motion.div
                        key={provider.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all duration-300 border-2 ${
                            dataData.provider === provider.id
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

              {/* Phone Number Input */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-[#0B63BC]" />
                    Phone Number
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Enter phone number
                    </label>
                    <Input
                      type="tel"
                      placeholder="0801 234 5678"
                      value={dataData.phoneNumber}
                      onChange={handlePhoneNumberChange}
                      className="h-12 text-lg font-mono"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="saveNumber"
                      checked={dataData.isSaved}
                      onChange={(e) => setDataData(prev => ({ ...prev, isSaved: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="saveNumber" className="text-sm text-gray-600">
                      Save as frequent number
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Bundle Selection */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-[#0B63BC]" />
                    Select Bundle
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dataBundles.map((bundle) => (
                      <motion.div
                        key={bundle.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all duration-300 border-2 ${
                            dataData.bundle === bundle.id
                              ? 'border-[#0B63BC] bg-[#0B63BC]/5'
                              : 'border-gray-200 hover:border-[#0B63BC]/50'
                          }`}
                          onClick={() => handleBundleSelect(bundle.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-lg text-gray-900">{bundle.name}</h3>
                              <span className="text-sm text-gray-500">{bundle.duration}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{bundle.validity}</span>
                              </div>
                              <span className="font-bold text-[#0B63BC]">
                                ₦{bundle.price.toLocaleString()}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
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
                          <span className="text-gray-600">Network</span>
                          <span className="font-medium">{dataData.provider.toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone Number</span>
                          <span className="font-medium font-mono">{dataData.phoneNumber}</span>
                        </div>
                        {getSelectedBundle() && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Bundle</span>
                              <span className="font-medium">{getSelectedBundle()?.name} - {getSelectedBundle()?.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Validity</span>
                              <span className="font-medium">{getSelectedBundle()?.validity}</span>
                            </div>
                          </>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount</span>
                          <span className="font-bold text-lg">{dataData.amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service Fee</span>
                          <span className="font-medium">₦50</span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between">
                            <span className="font-semibold">Total</span>
                            <span className="font-bold text-lg text-[#0B63BC]">
                              {dataData.amount ? dataData.amount : '₦0'}
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
                        <Wifi className="h-8 w-8 text-gray-400" />
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
          amount={dataData.amount}
          recipient={dataData.phoneNumber}
          transactionId={dataData.reference}
          timestamp={new Date().toLocaleString()}
          onMakeAnother={() => {
            setShowSuccessModal(false)
            setDataData({
              provider: '',
              phoneNumber: '',
              bundle: '',
              amount: '',
              isSaved: false,
              reference: ''
            })
          }}
          onGoHome={handleGoHome}
        />
      </div>
    </DesktopLayout>
  )
} 