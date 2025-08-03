import * as React from "react"
import { CheckCircle, Share2, Download, Home, Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./button"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  amount: string
  recipient: string
  transactionId: string
  timestamp: string
  onMakeAnother?: () => void
  onGoHome?: () => void
}

export function SuccessModal({
  isOpen,
  onClose,
  amount,
  recipient,
  transactionId,
  timestamp,
  onMakeAnother,
  onGoHome
}: SuccessModalProps) {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }

  const confettiVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Transfer Successful',
        text: `Successfully transferred ${amount} to ${recipient}`,
        url: window.location.href
      })
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`Transfer successful: ${amount} to ${recipient}`)
    }
  }

  const handleDownload = () => {
    // Generate receipt as image or PDF
    const receiptData = {
      amount,
      recipient,
      transactionId,
      timestamp,
      type: 'Transfer Receipt'
    }
    
    // This would typically generate a PDF or image
    console.log('Downloading receipt:', receiptData)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 w-full max-w-md mx-auto"
          >
            {/* Confetti Animation */}
            <div className="relative">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  variants={confettiVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: i * 0.1 }}
                  className="absolute w-2 h-2 bg-[#0B63BC] rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${10 + (i % 2) * 20}%`
                  }}
                />
              ))}
            </div>

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-green-600" />
              </motion.div>
            </div>

            {/* Success Message */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Transfer Successful!
              </h2>
              <p className="text-gray-600">
                Your money has been sent successfully
              </p>
            </div>

            {/* Transfer Details */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Amount</span>
                <span className="text-lg font-bold text-gray-900">{amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Recipient</span>
                <span className="text-sm font-medium text-gray-900">{recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Transaction ID</span>
                <span className="text-sm font-mono text-gray-900">{transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Date & Time</span>
                <span className="text-sm text-gray-900">{timestamp}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="flex-1"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Receipt
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={onMakeAnother}
                  className="flex-1"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Another Transfer
                </Button>
                <Button
                  onClick={() => {
                    onClose()
                    onGoHome?.()
                  }}
                  className="flex-1 bg-[#0B63BC] hover:bg-[#0B63BC]/90"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go Home
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 