import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, CreditCard, User, CheckCircle, Eye, EyeOff, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Stepper } from '@/components/ui/stepper'
import { TransferCard } from '@/components/ui/transfer-card'
import { RecipientBadge } from '@/components/ui/recipient-badge'
import { SuccessModal } from '@/components/ui/success-modal'
import { PinInput } from '@/components/PinInput'
import { useNavigate } from 'react-router-dom'

interface TransferData {
  method: 'billstation' | 'bank' | null
  amount: string
  accountNumber: string
  bank: string
  recipientName: string
  isVerified: boolean
  charges: string
  reference: string
}

const banks = [
  'Access Bank',
  'Zenith Bank',
  'GT Bank',
  'First Bank',
  'UBA',
  'Stanbic IBTC',
  'Fidelity Bank',
  'Union Bank',
  'Ecobank',
  'Wema Bank'
]

const steps = ['Method', 'Details', 'Confirm', 'PIN', 'Done']

export default function Transfer() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [transferData, setTransferData] = useState<TransferData>({
    method: null,
    amount: '',
    accountNumber: '',
    bank: '',
    recipientName: '',
    isVerified: false,
    charges: '₦50',
    reference: ''
  })
  const [showPinInput, setShowPinInput] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [pinError, setPinError] = useState('')
  const [showAmount, setShowAmount] = useState(true)
  const [showBankSelector, setShowBankSelector] = useState(false)

  // Generate reference ID
  useEffect(() => {
    if (currentStep >= 2 && !transferData.reference) {
      const ref = 'TXN' + Date.now().toString().slice(-8)
      setTransferData(prev => ({ ...prev, reference: ref }))
    }
  }, [currentStep, transferData.reference])

  // Simulate account verification
  useEffect(() => {
    if (transferData.accountNumber.length === 10 && transferData.bank) {
      setIsVerifying(true)
      const timer = setTimeout(() => {
        setIsVerifying(false)
        setTransferData(prev => ({ 
          ...prev, 
          isVerified: true, 
          recipientName: 'John Doe' // Mock verification
        }))
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [transferData.accountNumber, transferData.bank])

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

  const handleMethodSelect = (method: 'billstation' | 'bank') => {
    setTransferData(prev => ({ ...prev, method }))
    setCurrentStep(1)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAmount(e.target.value)
    setTransferData(prev => ({ ...prev, amount: formatted }))
  }

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10)
    setTransferData(prev => ({ 
      ...prev, 
      accountNumber: value,
      isVerified: false,
      recipientName: ''
    }))
  }

  const handleContinue = () => {
    if (currentStep === 1) {
      if (transferData.amount && transferData.accountNumber && transferData.isVerified) {
        setCurrentStep(2)
      }
    } else if (currentStep === 2) {
      setShowPinInput(true)
    }
  }

  const handlePinComplete = (pin: string) => {
    setShowPinInput(false)
    setPinError('')
    
    // Simulate PIN verification
    if (pin === '1234') {
      setCurrentStep(4)
      setShowSuccessModal(true)
    } else {
      setPinError('Incorrect PIN. Please try again.')
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleGoHome = () => {
    setShowSuccessModal(false)
    navigate('/dashboard')
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return transferData.method !== null
      case 1:
        return transferData.amount && transferData.accountNumber && transferData.isVerified
      case 2:
        return true
      default:
        return false
    }
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
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-900">Transfer</h1>
            <p className="text-xs text-gray-600">Step {currentStep + 1} of {steps.length}</p>
          </div>
        </div>
      </div>

      {/* Mobile Stepper */}
      <div className="px-4 py-3 bg-white">
        <Stepper steps={steps} currentStep={currentStep} />
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Select Method */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Choose Transfer Method
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Select how you'd like to send money
                  </p>
                </div>

                <div className="space-y-3">
                  <TransferCard
                    title="BillStation Transfer"
                    description="Send money instantly to other BillStation users"
                    icon={<CreditCard className="w-5 h-5" />}
                    isSelected={transferData.method === 'billstation'}
                    onClick={() => handleMethodSelect('billstation')}
                  />
                  
                  <TransferCard
                    title="Bank Transfer"
                    description="Send money to any Nigerian bank account"
                    icon={<Building2 className="w-5 h-5" />}
                    isSelected={transferData.method === 'bank'}
                    onClick={() => handleMethodSelect('bank')}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Input Details */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Transfer Details
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Enter the transfer information
                  </p>
                </div>

                <Card className="border-0 shadow-sm">
                  <CardContent className="p-4 space-y-4">
                    {/* Amount Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Amount
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="₦0.00"
                          value={transferData.amount}
                          onChange={handleAmountChange}
                          className="text-lg font-semibold pr-12 h-12"
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

                    {/* Account Number Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Account Number
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter 10-digit account number"
                        value={transferData.accountNumber}
                        onChange={handleAccountNumberChange}
                        maxLength={10}
                        className="font-mono h-12"
                      />
                    </div>

                    {/* Bank Selection (only for bank transfers) */}
                    {transferData.method === 'bank' && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Bank
                        </label>
                        <button
                          onClick={() => setShowBankSelector(true)}
                          className="w-full h-12 rounded-md border border-input bg-background px-3 py-2 text-left text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          {transferData.bank || 'Select Bank'}
                        </button>
                      </div>
                    )}

                    {/* Account Verification Status */}
                    {transferData.accountNumber.length === 10 && transferData.bank && (
                      <div className="space-y-2">
                        {isVerifying ? (
                          <div className="flex items-center space-x-2 text-blue-600">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            <span className="text-sm">Verifying account...</span>
                          </div>
                        ) : transferData.isVerified ? (
                          <RecipientBadge
                            name={transferData.recipientName}
                            accountNumber={transferData.accountNumber}
                            bank={transferData.bank}
                            isVerified={true}
                          />
                        ) : (
                          <div className="text-red-600 text-sm">
                            Account verification failed. Please check the details.
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Confirm Transfer */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Confirm Transfer
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Review your transfer details
                  </p>
                </div>

                <TransferCard
                  title="Transfer Summary"
                  description=""
                  icon={<CheckCircle className="w-5 h-5" />}
                  variant="summary"
                  amount={transferData.amount}
                  recipient={transferData.recipientName}
                  bank={transferData.bank}
                  charges={transferData.charges}
                  reference={transferData.reference}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Action Button */}
      {currentStep < 3 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <Button
            onClick={handleContinue}
            disabled={!isStepValid()}
            className="w-full bg-[#0B63BC] hover:bg-[#0B63BC]/90 h-12 text-base font-medium"
          >
            {currentStep === 2 ? 'Continue to PIN' : 'Continue'}
          </Button>
        </div>
      )}

      {/* Bank Selector Bottom Sheet */}
      <AnimatePresence>
        {showBankSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowBankSelector(false)}
          >
            <motion.div
              variants={bottomSheetVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 max-h-[70vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Select Bank</h3>
                <button
                  onClick={() => setShowBankSelector(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="overflow-y-auto max-h-[60vh] space-y-1">
                {banks.map(bank => (
                  <button
                    key={bank}
                    onClick={() => {
                      setTransferData(prev => ({ ...prev, bank }))
                      setShowBankSelector(false)
                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-900">{bank}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
        amount={transferData.amount}
        recipient={transferData.recipientName}
        transactionId={transferData.reference}
        timestamp={new Date().toLocaleString()}
        onMakeAnother={() => {
          setShowSuccessModal(false)
          setCurrentStep(0)
          setTransferData({
            method: null,
            amount: '',
            accountNumber: '',
            bank: '',
            recipientName: '',
            isVerified: false,
            charges: '₦50',
            reference: ''
          })
        }}
        onGoHome={handleGoHome}
      />
    </div>
  )
}
