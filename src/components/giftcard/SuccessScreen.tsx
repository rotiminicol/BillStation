import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Share2, Gift, Mail, Download, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GiftCardPurchase {
  brand: string;
  amount: string;
  recipient: string;
  message?: string;
  transactionId: string;
  timestamp: string;
}

interface SuccessScreenProps {
  purchase: GiftCardPurchase;
  onBuyAnother: () => void;
  onGoHome: () => void;
  onShareReceipt: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  purchase,
  onBuyAnother,
  onGoHome,
  onShareReceipt
}) => {
  const getBrandColor = (brand: string) => {
    const colors: { [key: string]: string } = {
      'amazon': 'from-orange-500 to-yellow-500',
      'apple': 'from-gray-500 to-gray-700',
      'google-play': 'from-green-500 to-blue-500',
      'steam': 'from-blue-500 to-purple-500',
      'netflix': 'from-red-500 to-pink-500',
      'spotify': 'from-green-500 to-emerald-500'
    };
    return colors[brand] || 'from-blue-500 to-purple-500';
  };

  const getBrandLabel = (brand: string) => {
    const labels: { [key: string]: string } = {
      'amazon': 'Amazon',
      'apple': 'Apple',
      'google-play': 'Google Play',
      'steam': 'Steam',
      'netflix': 'Netflix',
      'spotify': 'Spotify'
    };
    return labels[brand] || brand;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const confettiVariants = {
    hidden: { scale: 0, rotate: 0 },
    visible: {
      scale: [0, 1.2, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Success Header */}
      <motion.div
        variants={itemVariants}
        className="text-center"
      >
        {/* Confetti Animation */}
        <motion.div
          variants={confettiVariants}
          className="relative mb-6"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          
          {/* Confetti particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.cos(i * 60) * 100,
                y: Math.sin(i * 60) * 100
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                ease: "easeOut"
              }}
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
            />
          ))}
        </motion.div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gift Card Sent Successfully!
        </h1>
        <p className="text-gray-600">
          Your gift card has been delivered to {purchase.recipient}
        </p>
      </motion.div>

      {/* Receipt Card */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Gift className="w-5 h-5 text-[#0B63BC]" />
                <span>Purchase Receipt</span>
              </span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Delivered
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Brand Info */}
            <div className={`p-4 rounded-lg bg-gradient-to-r ${getBrandColor(purchase.brand)} text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{getBrandLabel(purchase.brand)} Gift Card</h3>
                  <p className="text-sm opacity-90">Instant delivery</p>
                </div>
                <Gift className="w-8 h-8" />
              </div>
            </div>

            {/* Purchase Details */}
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Amount</span>
                <span className="font-semibold text-lg">{purchase.amount}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Recipient</span>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{purchase.recipient}</span>
                </div>
              </div>
              
              {purchase.message && (
                <div className="flex justify-between items-start py-2 border-b border-gray-100">
                  <span className="text-gray-600">Message</span>
                  <span className="font-medium text-right max-w-xs">{purchase.message}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-mono text-sm text-gray-500">{purchase.transactionId}</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Date & Time</span>
                <span className="font-medium">{purchase.timestamp}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        variants={itemVariants}
        className="space-y-3"
      >
        <Button
          onClick={onShareReceipt}
          className="w-full bg-[#0B63BC] hover:bg-[#0B63BC]/90"
          size="lg"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Receipt
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onBuyAnother}
            variant="outline"
            className="border-[#0B63BC] text-[#0B63BC] hover:bg-[#0B63BC] hover:text-white"
          >
            <Gift className="w-4 h-4 mr-2" />
            Buy Another
          </Button>
          
          <Button
            onClick={onGoHome}
            variant="outline"
            className="border-gray-300 hover:bg-gray-50"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </div>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        variants={itemVariants}
        className="p-4 bg-blue-50 rounded-lg border border-blue-200"
      >
        <div className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">What happens next?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Gift card code sent to {purchase.recipient}</li>
              <li>• Recipient can redeem immediately</li>
              <li>• No expiration date on gift cards</li>
              <li>• 24/7 customer support available</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SuccessScreen; 