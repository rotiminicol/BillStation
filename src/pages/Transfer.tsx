import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, CreditCard, User, CheckCircle, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Stepper } from '@/components/ui/stepper'
import { TransferCard } from '@/components/ui/transfer-card'
import { RecipientBadge } from '@/components/ui/recipient-badge'
import { SuccessModal } from '@/components/ui/success-modal'
import { PinInput } from '@/components/PinInput'
import DesktopLayout from '@/components/DesktopLayout'
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

const steps = ['Select Method', 'Input Details', 'Confirm Transfer', 'Enter PIN', 'Success']

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
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  }

  return (
    <DesktopLayout>
      <div className="min-h-screen bg-[#F6F6F8]">
        <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transfer Money</h1>
            <p className="text-gray-600">Send money to anyone, anywhere</p>
          </div>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            {/* Step 1: Select Method */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Choose Transfer Method
                  </h2>
                  <p className="text-gray-600">
                    Select how you'd like to send money
                  </p>
                </div>

                <div className="grid gap-4">
                  <TransferCard
                    title="BillStation Transfer"
                    description="Send money instantly to other BillStation users"
                    icon={<CreditCard className="w-6 h-6" />}
                    isSelected={transferData.method === 'billstation'}
                    onClick={() => handleMethodSelect('billstation')}
                  />
                  
                  <TransferCard
                    title="Bank Transfer"
                    description="Send money to any Nigerian bank account"
                    icon={<Building2 className="w-6 h-6" />}
                    isSelected={transferData.method === 'bank'}
                    onClick={() => handleMethodSelect('bank')}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Input Details */}
            {currentStep === 1 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Transfer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
                        className="text-lg font-semibold pr-12"
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
                      className="font-mono"
                    />
                  </div>

                  {/* Bank Selection (only for bank transfers) */}
                  {transferData.method === 'bank' && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Bank
                      </label>
                      <select
                        value={transferData.bank}
                        onChange={(e) => setTransferData(prev => ({ ...prev, bank: e.target.value }))}
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select Bank</option>
                        {banks.map(bank => (
                          <option key={bank} value={bank}>{bank}</option>
                        ))}
                      </select>
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
            )}

            {/* Step 3: Confirm Transfer */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Confirm Transfer
                  </h2>
                  <p className="text-gray-600">
                    Review your transfer details before proceeding
                  </p>
                </div>

                <TransferCard
                  title="Transfer Summary"
                  description=""
                  icon={<CheckCircle className="w-6 h-6" />}
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

        {/* Action Buttons */}
        {currentStep < 3 && (
          <div className="flex justify-end items-center mt-8 max-w-2xl mx-auto">
            <Button
              onClick={handleContinue}
              disabled={!isStepValid()}
              className="bg-[#0B63BC] hover:bg-[#0B63BC]/90"
            >
              {currentStep === 2 ? 'Continue to PIN' : 'Continue'}
            </Button>
          </div>
        )}
      </div>

      {/* PIN Input Modal */}
      {showPinInput && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Enter Your PIN
            </h3>
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
    </DesktopLayout>
  )
}
