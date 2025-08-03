import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Car,
  ArrowLeft,
  CheckCircle,
  Eye,
  EyeOff,
  X,
  CreditCard,
  Shield,
  Clock,
  Zap,
  User,
  MapPin
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SuccessModal } from '@/components/ui/success-modal'
import { PinInput } from '@/components/PinInput'
import DesktopLayout from '@/components/DesktopLayout'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'

interface TransportData {
  serviceType: string
  passengerName: string
  destination: string
  amount: string
  reference: string
}

const serviceTypes = [
  { 
    id: 'uber', 
    name: 'Uber', 
    logo: '🚗', 
    color: 'from-black to-gray-800', 
    description: 'Ride-hailing service',
    minAmount: '500',
    maxAmount: '50000'
  },
  { 
    id: 'bolt', 
    name: 'Bolt', 
    logo: '⚡', 
    color: 'from-green-600 to-green-800', 
    description: 'Fast and reliable rides',
    minAmount: '400',
    maxAmount: '45000'
  },
  { 
    id: 'taxify', 
    name: 'Taxify', 
    logo: '🚕', 
    color: 'from-blue-600 to-blue-800', 
    description: 'Premium taxi service',
    minAmount: '600',
    maxAmount: '60000'
  },
  { 
    id: 'public', 
    name: 'Public Transport', 
    logo: '🚌', 
    color: 'from-red-600 to-red-800', 
    description: 'Bus and train tickets',
    minAmount: '100',
    maxAmount: '5000'
  },
  { 
    id: 'airport', 
    name: 'Airport Transfer', 
    logo: '✈️', 
    color: 'from-purple-600 to-purple-800', 
    description: 'Airport shuttle service',
    minAmount: '2000',
    maxAmount: '100000'
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

export default function Transport() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [transportData, setTransportData] = useState<TransportData>({
    serviceType: '',
    passengerName: '',
    destination: '',
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
    const ref = 'TRANS' + Date.now().toString().slice(-8)
    setTransportData(prev => ({ ...prev, reference: ref }))
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

  const handleServiceTypeSelect = (serviceTypeId: string) => {
    setTransportData(prev => ({ ...prev, serviceType: serviceTypeId, amount: '' }))
  }

  const handlePassengerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransportData(prev => ({ ...prev, passengerName: e.target.value }))
  }

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransportData(prev => ({ ...prev, destination: e.target.value }))
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTransportData(prev => ({ ...prev, amount: value }))
  }

  const handleQuickAmountSelect = (amount: string) => {
    setTransportData(prev => ({ ...prev, amount: amount }))
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
          description: `Transport payment of ${formatAmount(transportData.amount)} processed successfully.`,
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
    if (!transportData.serviceType || !transportData.passengerName || !transportData.destination || !transportData.amount) return false
    
    const selectedService = serviceTypes.find(s => s.id === transportData.serviceType)
    if (!selectedService) return false
    
    const amount = parseInt(transportData.amount)
    const minAmount = parseInt(selectedService.minAmount)
    const maxAmount = parseInt(selectedService.maxAmount)
    
    return amount >= minAmount && amount <= maxAmount
  }

  const getSelectedService = () => {
    return serviceTypes.find(service => service.id === transportData.serviceType)
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
                <h1 className="text-2xl font-bold text-gray-900">Transport Payment</h1>
                <p className="text-gray-600">Pay for rides and transport services</p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Service Type Selection */}
              <Card className="border-0 shadow-lg bg-white rounded-xl">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Car className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Select Transport Service</CardTitle>
                      <p className="text-gray-600">Choose your preferred transport service</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {serviceTypes.map((service) => (
                      <motion.div
                        key={service.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            transportData.serviceType === service.id
                              ? 'border-[#0B63BC] bg-[#0B63BC]/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleServiceTypeSelect(service.id)}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-white text-xl font-bold`}>
                              {service.logo}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{service.name}</h3>
                              <p className="text-sm text-gray-600">{service.description}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                ₦{service.minAmount} - ₦{service.maxAmount}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Passenger Details */}
              <Card className="border-0 shadow-lg bg-white rounded-xl">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Passenger Details</CardTitle>
                      <p className="text-gray-600">Enter passenger and trip information</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Passenger Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter passenger's full name"
                        value={transportData.passengerName}
                        onChange={handlePassengerNameChange}
                        className="h-12 text-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Destination
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter destination address"
                        value={transportData.destination}
                        onChange={handleDestinationChange}
                        className="h-12 text-lg"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter the complete destination address
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Amount Selection */}
              <Card className="border-0 shadow-lg bg-white rounded-xl">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Trip Amount</CardTitle>
                      <p className="text-gray-600">Enter the transport fare amount</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount (₦)
                      </label>
                      <Input
                        type="text"
                        placeholder="0.00"
                        value={transportData.amount}
                        onChange={handleAmountChange}
                        className="h-12 text-lg"
                      />
                      {getSelectedService() && (
                        <p className="text-xs text-gray-500 mt-1">
                          Min: ₦{getSelectedService()?.minAmount} | Max: ₦{getSelectedService()?.maxAmount}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-3">Quick Amounts</p>
                      <div className="grid grid-cols-3 gap-3">
                        {quickAmounts.map((item) => (
                          <motion.div
                            key={item.amount}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div
                              className={`p-3 rounded-lg border-2 cursor-pointer text-center transition-all ${
                                transportData.amount === item.amount
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
            </div>

            {/* Payment Summary */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-lg bg-gradient-to-r from-[#0B63BC] to-[#0B63BC]/90 text-white sticky top-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-6">Payment Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-white/80">Service:</span>
                      <span className="font-medium">
                        {getSelectedService()?.name || 'Not selected'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Passenger:</span>
                      <span className="font-medium">{transportData.passengerName || 'Not entered'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Destination:</span>
                      <span className="font-medium">{transportData.destination || 'Not entered'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Amount:</span>
                      <span className="font-medium">
                        {transportData.amount ? formatAmount(transportData.amount) : 'Not entered'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/80">Reference:</span>
                      <span className="font-medium text-sm">{transportData.reference}</span>
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
          amount={transportData.amount}
          recipient={transportData.passengerName}
          transactionId={transportData.reference}
          timestamp={new Date().toLocaleString()}
          onMakeAnother={() => {
            setShowSuccessModal(false)
            setTransportData({
              serviceType: '',
              passengerName: '',
              destination: '',
              amount: '',
              reference: 'TRANS' + Date.now().toString().slice(-8),
            })
          }}
          onGoHome={handleGoHome}
        />
      </div>
    </DesktopLayout>
  )
} 