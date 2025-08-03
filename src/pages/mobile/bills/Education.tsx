import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  ArrowLeft,
  X,
  User,
  BookOpen
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { SuccessModal } from '@/components/ui/success-modal'
import { PinInput } from '@/components/PinInput'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'

interface EducationData {
  examType: string
  studentName: string
  examNumber: string
  amount: string
  reference: string
}

const examTypes = [
  { 
    id: 'waec', 
    name: 'WAEC', 
    logo: '📚', 
    color: 'from-blue-600 to-blue-800', 
    description: 'West African Examinations Council',
    fees: [
      { id: 'registration', name: 'Registration Fee', price: '18500', description: 'Complete registration for WAEC examination' },
      { id: 'result-checking', name: 'Result Checking', price: '2500', description: 'Check your WAEC result online' },
      { id: 'certificate', name: 'Certificate Collection', price: '5000', description: 'Collect your WAEC certificate' },
    ]
  },
  { 
    id: 'jamb', 
    name: 'JAMB', 
    logo: '📚', 
    color: 'from-green-600 to-green-800', 
    description: 'Joint Admissions and Matriculation Board',
    fees: [
      { id: 'registration', name: 'Registration Fee', price: '6500', description: 'Complete registration for JAMB examination' },
      { id: 'result-checking', name: 'Result Checking', price: '1500', description: 'Check your JAMB result online' },
      { id: 'change-of-course', name: 'Change of Course', price: '2500', description: 'Change your course or institution' },
    ]
  },
  { 
    id: 'neco', 
    name: 'NECO', 
    logo: '📚', 
    color: 'from-purple-600 to-purple-800', 
    description: 'National Examinations Council',
    fees: [
      { id: 'registration', name: 'Registration Fee', price: '16500', description: 'Complete registration for NECO examination' },
      { id: 'result-checking', name: 'Result Checking', price: '2000', description: 'Check your NECO result online' },
      { id: 'certificate', name: 'Certificate Collection', price: '4500', description: 'Collect your NECO certificate' },
    ]
  },
  { 
    id: 'nabteb', 
    name: 'NABTEB', 
    logo: '📚', 
    color: 'from-red-600 to-red-800', 
    description: 'National Business and Technical Examinations Board',
    fees: [
      { id: 'registration', name: 'Registration Fee', price: '14500', description: 'Complete registration for NABTEB examination' },
      { id: 'result-checking', name: 'Result Checking', price: '1800', description: 'Check your NABTEB result online' },
      { id: 'certificate', name: 'Certificate Collection', price: '4000', description: 'Collect your NABTEB certificate' },
    ]
  },
]

export default function Education() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [educationData, setEducationData] = useState<EducationData>({
    examType: '',
    studentName: '',
    examNumber: '',
    amount: '',
    reference: '',
  })
  const [showPinInput, setShowPinInput] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [pinError, setPinError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Generate reference ID
    const ref = 'EDU' + Date.now().toString().slice(-8)
    setEducationData(prev => ({ ...prev, reference: ref }))
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

  const handleExamTypeSelect = (examTypeId: string) => {
    setEducationData(prev => ({ ...prev, examType: examTypeId, amount: '' }))
  }

  const handleStudentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEducationData(prev => ({ ...prev, studentName: e.target.value }))
  }

  const handleExamNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10)
    setEducationData(prev => ({ ...prev, examNumber: value }))
  }

  const handleFeeSelect = (feeId: string) => {
    const selectedExam = examTypes.find(exam => exam.id === educationData.examType)
    const selectedFee = selectedExam?.fees.find(fee => fee.id === feeId)
    if (selectedFee) {
      setEducationData(prev => ({ 
        ...prev, 
        amount: selectedFee.price 
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
          description: `Education payment of ${formatAmount(educationData.amount)} processed successfully.`,
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
    return educationData.examType && educationData.studentName && educationData.examNumber && educationData.amount
  }

  const getSelectedExam = () => {
    return examTypes.find(exam => exam.id === educationData.examType)
  }

  const getSelectedFee = () => {
    const selectedExam = getSelectedExam()
    if (!selectedExam || !educationData.amount) return null
    return selectedExam.fees.find(fee => fee.price === educationData.amount)
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
            <h1 className="text-lg font-semibold text-gray-900">Education Payment</h1>
            <p className="text-xs text-gray-600">Pay for exams and educational services</p>
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key="education-content"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Exam Type Selection */}
            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Select Exam Type</h3>
                    <p className="text-sm text-gray-600">Choose the examination board</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {examTypes.map((exam) => (
                    <motion.div
                      key={exam.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          educationData.examType === exam.id
                            ? 'border-[#0B63BC] bg-[#0B63BC]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleExamTypeSelect(exam.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 bg-gradient-to-br ${exam.color} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
                            {exam.logo}
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">{exam.name}</span>
                            <p className="text-xs text-gray-600">{exam.description}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Student Details */}
            <Card className="border-0 shadow-lg bg-white rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Student Details</h3>
                    <p className="text-sm text-gray-600">Enter student information</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Student Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter student's full name"
                      value={educationData.studentName}
                      onChange={handleStudentNameChange}
                      className="h-12 text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exam Number
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter exam number"
                      value={educationData.examNumber}
                      onChange={handleExamNumberChange}
                      className="h-12 text-lg"
                      maxLength={10}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter the examination number
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fee Selection */}
            {educationData.examType && (
              <Card className="border-0 shadow-lg bg-white rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Select Fee Type</h3>
                      <p className="text-sm text-gray-600">Choose the service you want to pay for</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {getSelectedExam()?.fees.map((fee) => (
                      <motion.div
                        key={fee.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            educationData.amount === fee.price
                              ? 'border-[#0B63BC] bg-[#0B63BC]/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleFeeSelect(fee.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{fee.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{fee.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-[#0B63BC]">
                                {formatAmount(fee.price)}
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

            {/* Payment Summary */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-[#0B63BC] to-[#0B63BC]/90 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-4">Payment Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-white/80">Exam Type:</span>
                    <span className="font-medium">
                      {getSelectedExam()?.name || 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Student Name:</span>
                    <span className="font-medium">{educationData.studentName || 'Not entered'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Exam Number:</span>
                    <span className="font-medium">{educationData.examNumber || 'Not entered'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Fee Type:</span>
                    <span className="font-medium">
                      {getSelectedFee()?.name || 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Amount:</span>
                    <span className="font-medium">
                      {educationData.amount ? formatAmount(educationData.amount) : 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Reference:</span>
                    <span className="font-medium text-sm">{educationData.reference}</span>
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
        amount={educationData.amount}
        recipient={educationData.studentName}
        transactionId={educationData.reference}
        timestamp={new Date().toLocaleString()}
        onMakeAnother={() => {
          setShowSuccessModal(false)
          setEducationData({
            examType: '',
            studentName: '',
            examNumber: '',
            amount: '',
            reference: 'EDU' + Date.now().toString().slice(-8),
          })
        }}
        onGoHome={handleGoHome}
      />
    </div>
  )
} 