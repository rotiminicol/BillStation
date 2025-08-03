import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  ArrowLeft,
  X,
  User,
  Building2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { SuccessModal } from '@/components/ui/success-modal'
import { PinInput } from '@/components/PinInput'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'

interface RentData {
  propertyType: string
  tenantName: string
  propertyAddress: string
  amount: string
  reference: string
}

const propertyTypes = [
  { 
    id: 'apartment', 
    name: 'Apartment', 
    logo: '🏢', 
    color: 'from-blue-600 to-blue-800', 
    description: 'Residential apartment units',
    minAmount: '50000',
    maxAmount: '500000'
  },
  { 
    id: 'house', 
    name: 'House', 
    logo: '🏠', 
    color: 'from-green-600 to-green-800', 
    description: 'Single family houses',
    minAmount: '100000',
    maxAmount: '1000000'
  },
  { 
    id: 'office', 
    name: 'Office Space', 
    logo: '🏢', 
    color: 'from-purple-600 to-purple-800', 
    description: 'Commercial office spaces',
    minAmount: '200000',
    maxAmount: '2000000'
  },
  { 
    id: 'shop', 
    name: 'Shop/Store', 
    logo: '🏪', 
    color: 'from-orange-600 to-orange-800', 
    description: 'Retail and commercial spaces',
    minAmount: '150000',
    maxAmount: '1500000'
  },
  { 
    id: 'warehouse', 
    name: 'Warehouse', 
    logo: '🏭', 
    color: 'from-gray-600 to-gray-800', 
    description: 'Industrial and storage spaces',
    minAmount: '300000',
    maxAmount: '3000000'
  },
]

const quickAmounts = [
  { amount: '50000', label: '₦50,000' },
  { amount: '100000', label: '₦100,000' },
  { amount: '200000', label: '₦200,000' },
  { amount: '500000', label: '₦500,000' },
  { amount: '1000000', label: '₦1,000,000' },
]

export default function Rent() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [rentData, setRentData] = useState<RentData>({
    propertyType: '',
    tenantName: '',
    propertyAddress: '',
    amount: '',
    reference: '',
  })
  const [showPinInput, setShowPinInput] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [pinError, setPinError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Generate reference ID
    const ref = 'RENT' + Date.now().toString().slice(-8)
    setRentData(prev => ({ ...prev, reference: ref }))
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

  const handlePropertyTypeSelect = (propertyTypeId: string) => {
    setRentData(prev => ({ ...prev, propertyType: propertyTypeId, amount: '' }))
  }

  const handleTenantNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRentData(prev => ({ ...prev, tenantName: e.target.value }))
  }

  const handlePropertyAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRentData(prev => ({ ...prev, propertyAddress: e.target.value }))
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setRentData(prev => ({ ...prev, amount: value }))
  }

  const handleQuickAmountSelect = (amount: string) => {
    setRentData(prev => ({ ...prev, amount: amount }))
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
          description: `Rent payment of ${formatAmount(rentData.amount)} processed successfully.`,
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
    if (!rentData.propertyType || !rentData.tenantName || !rentData.propertyAddress || !rentData.amount) return false
    
    const selectedProperty = propertyTypes.find(p => p.id === rentData.propertyType)
    if (!selectedProperty) return false
    
    const amount = parseInt(rentData.amount)
    const minAmount = parseInt(selectedProperty.minAmount)
    const maxAmount = parseInt(selectedProperty.maxAmount)
    
    return amount >= minAmount && amount <= maxAmount
  }

  const getSelectedProperty = () => {
    return propertyTypes.find(property => property.id === rentData.propertyType)
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
            <h1 className="text-lg font-semibold text-gray-900">Rent Payment</h1>
            <p className="text-xs text-gray-600">Pay your rent and property fees</p>
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key="rent-content"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Property Type Selection */}
            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-slate-500 rounded-lg flex items-center justify-center">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Select Property Type</h3>
                    <p className="text-sm text-gray-600">Choose the type of property</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {propertyTypes.map((property) => (
                    <motion.div
                      key={property.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          rentData.propertyType === property.id
                            ? 'border-[#0B63BC] bg-[#0B63BC]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handlePropertyTypeSelect(property.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 bg-gradient-to-br ${property.color} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
                            {property.logo}
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">{property.name}</span>
                            <p className="text-xs text-gray-600">{property.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              ₦{property.minAmount} - ₦{property.maxAmount}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tenant Details */}
            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Tenant Details</h3>
                    <p className="text-sm text-gray-600">Enter tenant and property information</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tenant Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter tenant's full name"
                      value={rentData.tenantName}
                      onChange={handleTenantNameChange}
                      className="h-12 text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Address
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter property address"
                      value={rentData.propertyAddress}
                      onChange={handlePropertyAddressChange}
                      className="h-12 text-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter the complete property address
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
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Rent Amount</h3>
                    <p className="text-sm text-gray-600">Enter the rent amount to pay</p>
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
                      value={rentData.amount}
                      onChange={handleAmountChange}
                      className="h-12 text-lg"
                    />
                    {getSelectedProperty() && (
                      <p className="text-xs text-gray-500 mt-1">
                        Min: ₦{getSelectedProperty()?.minAmount} | Max: ₦{getSelectedProperty()?.maxAmount}
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
                              rentData.amount === item.amount
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
                    <span className="text-white/80">Property Type:</span>
                    <span className="font-medium">
                      {getSelectedProperty()?.name || 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Tenant Name:</span>
                    <span className="font-medium">{rentData.tenantName || 'Not entered'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Property Address:</span>
                    <span className="font-medium">{rentData.propertyAddress || 'Not entered'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Amount:</span>
                    <span className="font-medium">
                      {rentData.amount ? formatAmount(rentData.amount) : 'Not entered'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Reference:</span>
                    <span className="font-medium text-sm">{rentData.reference}</span>
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
        amount={rentData.amount}
        recipient={rentData.tenantName}
        transactionId={rentData.reference}
        timestamp={new Date().toLocaleString()}
        onMakeAnother={() => {
          setShowSuccessModal(false)
          setRentData({
            propertyType: '',
            tenantName: '',
            propertyAddress: '',
            amount: '',
            reference: 'RENT' + Date.now().toString().slice(-8),
          })
        }}
        onGoHome={handleGoHome}
      />
    </div>
  )
} 