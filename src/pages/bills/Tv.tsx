import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Tv,
  ArrowLeft,
  CheckCircle,
  Eye,
  EyeOff,
  X,
  CreditCard,
  Shield,
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

interface TvData {
  provider: string
  smartCardNumber: string
  package: string
  amount: string
  reference: string
}

const providers = [
  { id: 'dstv', name: 'DStv', logo: '📺', color: 'from-blue-600 to-blue-800', description: 'Premium satellite TV' },
  { id: 'gotv', name: 'GOtv', logo: '📺', color: 'from-green-600 to-green-800', description: 'Digital terrestrial TV' },
  { id: 'startimes', name: 'StarTimes', logo: '📺', color: 'from-red-600 to-red-800', description: 'Digital TV services' },
  { id: 'tstv', name: 'TStv', logo: '📺', color: 'from-purple-600 to-purple-800', description: 'Satellite TV provider' },
]

const packages = {
  dstv: [
    { id: 'premium', name: 'DStv Premium', price: '24500', description: 'All channels including sports and movies', duration: '30 days' },
    { id: 'compact-plus', name: 'DStv Compact Plus', price: '16500', description: 'Popular channels and sports', duration: '30 days' },
    { id: 'compact', name: 'DStv Compact', price: '10500', description: 'Family entertainment package', duration: '30 days' },
    { id: 'confam', name: 'DStv Confam', price: '6200', description: 'Basic family package', duration: '30 days' },
    { id: 'yanga', name: 'DStv Yanga', price: '3100', description: 'Basic entertainment', duration: '30 days' },
    { id: 'padi', name: 'DStv Padi', price: '2100', description: 'Essential channels', duration: '30 days' },
  ],
  gotv: [
    { id: 'supa', name: 'GOtv Supa', price: '8200', description: 'Premium entertainment package', duration: '30 days' },
    { id: 'max', name: 'GOtv Max', price: '5600', description: 'Maximum entertainment', duration: '30 days' },
    { id: 'jolli', name: 'GOtv Jolli', price: '3300', description: 'Family entertainment', duration: '30 days' },
    { id: 'jinja', name: 'GOtv Jinja', price: '2200', description: 'Basic entertainment', duration: '30 days' },
    { id: 'lite', name: 'GOtv Lite', price: '1200', description: 'Essential channels', duration: '30 days' },
  ],
  startimes: [
    { id: 'nova', name: 'StarTimes Nova', price: '1800', description: 'Basic package', duration: '30 days' },
    { id: 'basic', name: 'StarTimes Basic', price: '2400', description: 'Standard package', duration: '30 days' },
    { id: 'smart', name: 'StarTimes Smart', price: '3600', description: 'Smart package', duration: '30 days' },
    { id: 'classic', name: 'StarTimes Classic', price: '4800', description: 'Classic package', duration: '30 days' },
    { id: 'premium', name: 'StarTimes Premium', price: '7200', description: 'Premium package', duration: '30 days' },
  ],
  tstv: [
    { id: 'basic', name: 'TStv Basic', price: '1500', description: 'Basic channels', duration: '30 days' },
    { id: 'standard', name: 'TStv Standard', price: '2500', description: 'Standard channels', duration: '30 days' },
    { id: 'premium', name: 'TStv Premium', price: '3500', description: 'Premium channels', duration: '30 days' },
  ],
}

export default function Tv() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [tvData, setTvData] = useState<TvData>({
    provider: '',
    smartCardNumber: '',
    package: '',
    amount: '',
    reference: '',
  })
  const [showPinInput, setShowPinInput] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [pinError, setPinError] = useState('')
  const [showAmount, setShowAmount] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Generate reference ID
    const ref = 'TV' + Date.now().toString().slice(-8)
    setTvData(prev => ({ ...prev, reference: ref }))
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
    setTvData(prev => ({ ...prev, provider: providerId, package: '', amount: '' }))
  }

  const handleSmartCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10)
    setTvData(prev => ({ ...prev, smartCardNumber: value }))
  }

  const handlePackageSelect = (packageId: string) => {
    const selectedPackage = packages[tvData.provider as keyof typeof packages]?.find(p => p.id === packageId)
    if (selectedPackage) {
      setTvData(prev => ({ 
        ...prev, 
        package: packageId, 
        amount: selectedPackage.price 
      }))
    }
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
          description: `Cable TV payment of ${formatAmount(tvData.amount)} processed successfully.`,
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
    return tvData.provider && tvData.smartCardNumber && tvData.package && tvData.amount
  }

  const getSelectedPackage = () => {
    if (!tvData.provider || !tvData.package) return null
    return packages[tvData.provider as keyof typeof packages]?.find(p => p.id === tvData.package)
  }

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
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
              <Button variant="ghost" size="sm" onClick={() => navigate('/bills')} className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Bills
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Cable TV Payment</h1>
                <p className="text-gray-600">Subscribe to your favorite TV channels</p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Provider Selection */}
              <Card className="border-0 shadow-lg bg-white rounded-xl">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Tv className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Select Provider</CardTitle>
                      <p className="text-gray-600">Choose your cable TV provider</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {providers.map((provider) => (
                      <motion.div
                        key={provider.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            tvData.provider === provider.id
                              ? 'border-[#0B63BC] bg-[#0B63BC]/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleProviderSelect(provider.id)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 bg-gradient-to-br ${provider.color} rounded-xl flex items-center justify-center text-white text-xl font-bold`}>
                              {provider.logo}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                              <p className="text-sm text-gray-600">{provider.description}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Smart Card Number Input */}
              <Card className="border-0 shadow-lg bg-white rounded-xl">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Smart Card Number</CardTitle>
                      <p className="text-gray-600">Enter your decoder smart card number</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Smart Card Number
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter smart card number"
                        value={tvData.smartCardNumber}
                        onChange={handleSmartCardNumberChange}
                        className="h-12 text-lg"
                        maxLength={10}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter the 10-digit smart card number from your decoder
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Package Selection */}
              {tvData.provider && (
                <Card className="border-0 shadow-lg bg-white rounded-xl">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Select Package</CardTitle>
                        <p className="text-gray-600">Choose your subscription package</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {packages[tvData.provider as keyof typeof packages]?.map((pkg) => (
                        <motion.div
                          key={pkg.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div
                            className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                              tvData.package === pkg.id
                                ? 'border-[#0B63BC] bg-[#0B63BC]/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => handlePackageSelect(pkg.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{pkg.name}</h3>
                                <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                    {pkg.duration}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-[#0B63BC]">
                                  {formatAmount(pkg.price)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Payment Summary */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg bg-gradient-to-r from-[#0B63BC] to-[#0B63BC]/90 text-white sticky top-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-6">Payment Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-white/80">Provider:</span>
                      <span className="font-medium">
                        {providers.find(p => p.id === tvData.provider)?.name || 'Not selected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Smart Card:</span>
                      <span className="font-medium">{tvData.smartCardNumber || 'Not entered'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Package:</span>
                      <span className="font-medium">
                        {getSelectedPackage()?.name || 'Not selected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Duration:</span>
                      <span className="font-medium">
                        {getSelectedPackage()?.duration || 'Not selected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Amount:</span>
                      <span className="font-medium">
                        {tvData.amount ? formatAmount(tvData.amount) : 'Not selected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Reference:</span>
                      <span className="font-medium text-sm">{tvData.reference}</span>
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
            </div>
          </div>
        </div>

        {/* PIN Input Modal */}
        {showPinInput && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Enter Your PIN</h3>
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
          amount={tvData.amount}
          recipient={tvData.smartCardNumber}
          transactionId={tvData.reference}
          timestamp={new Date().toLocaleString()}
          onMakeAnother={() => {
            setShowSuccessModal(false)
            setTvData({
              provider: '',
              smartCardNumber: '',
              package: '',
              amount: '',
              reference: 'TV' + Date.now().toString().slice(-8),
            })
          }}
          onGoHome={handleGoHome}
        />
      </div>
    </DesktopLayout>
  )
} 