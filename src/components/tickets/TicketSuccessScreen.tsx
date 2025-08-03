import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Share2, Download, Calendar, Home, Ticket, QrCode } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TicketPurchase {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  city: string;
  tierName: string;
  quantity: number;
  totalAmount: number;
  buyerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  transactionId: string;
  purchaseDate: string;
}

interface TicketSuccessScreenProps {
  purchase: TicketPurchase;
  onViewTickets: () => void;
  onGoHome: () => void;
  onShare: () => void;
  onDownload: () => void;
}

const TicketSuccessScreen: React.FC<TicketSuccessScreenProps> = ({
  purchase,
  onViewTickets,
  onGoHome,
  onShare,
  onDownload
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
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
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: Math.cos(i * 45) * 120,
                y: Math.sin(i * 45) * 120
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
          Tickets Purchased Successfully!
        </h1>
        <p className="text-gray-600">
          Your tickets have been confirmed and sent to your email
        </p>
      </motion.div>

      {/* Ticket Details */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Ticket className="w-5 h-5 text-[#0B63BC]" />
                <span>Ticket Details</span>
              </span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Confirmed
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Event Info */}
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
              <h3 className="font-bold text-lg mb-1">{purchase.eventTitle}</h3>
              <div className="flex items-center space-x-4 text-sm opacity-90">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{formatDate(purchase.eventDate)}</span>
                </div>
                <div className="flex items-center">
                  <span>{purchase.eventTime}</span>
                </div>
              </div>
              <p className="text-sm opacity-90 mt-1">
                {purchase.venue}, {purchase.city}
              </p>
            </div>

            {/* Purchase Details */}
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Ticket Type</span>
                <span className="font-medium">{purchase.tierName}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Quantity</span>
                <span className="font-medium">{purchase.quantity} ticket(s)</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-semibold text-lg text-[#0B63BC]">
                  {formatCurrency(purchase.totalAmount)}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Buyer</span>
                <span className="font-medium">
                  {purchase.buyerInfo.firstName} {purchase.buyerInfo.lastName}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Email</span>
                <span className="font-medium">{purchase.buyerInfo.email}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-mono text-sm text-gray-500">
                  {purchase.transactionId}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Purchase Date</span>
                <span className="font-medium">{purchase.purchaseDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* QR Code Placeholder */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <QrCode className="w-16 h-16 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">
              Show this QR code at the venue entrance
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        variants={itemVariants}
        className="space-y-3"
      >
        <Button
          onClick={onViewTickets}
          className="w-full bg-[#0B63BC] hover:bg-[#0B63BC]/90"
          size="lg"
        >
          <Ticket className="w-4 h-4 mr-2" />
          View My Tickets
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onDownload}
            variant="outline"
            className="border-[#0B63BC] text-[#0B63BC] hover:bg-[#0B63BC] hover:text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          
          <Button
            onClick={onShare}
            variant="outline"
            className="border-gray-300 hover:bg-gray-50"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
        
        <Button
          onClick={onGoHome}
          variant="outline"
          className="w-full border-gray-300 hover:bg-gray-50"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
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
              <li>• Tickets sent to {purchase.buyerInfo.email}</li>
              <li>• Arrive 30 minutes before the event</li>
              <li>• Bring a valid ID for verification</li>
              <li>• Contact support if you need assistance</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TicketSuccessScreen; 