import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Plane, Hotel, Car, Crown, Calendar, MapPin, Download, Share2, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TravelBooking {
  id: string;
  service: string;
  provider: string;
  from: string;
  to: string;
  date: string;
  time?: string;
  passengers: string;
  price: number;
  bookingId: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface TravelSuccessModalProps {
  booking: TravelBooking;
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  onShare: () => void;
}

const TravelSuccessModal: React.FC<TravelSuccessModalProps> = ({
  booking,
  isOpen,
  onClose,
  onDownload,
  onShare
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'flights':
        return <Plane className="h-6 w-6" />;
      case 'hotels':
        return <Hotel className="h-6 w-6" />;
      case 'transport':
        return <Car className="h-6 w-6" />;
      case 'private-jet':
        return <Crown className="h-6 w-6" />;
      default:
        return <Plane className="h-6 w-6" />;
    }
  };

  const getServiceColor = (service: string) => {
    switch (service) {
      case 'flights':
        return 'from-blue-500 to-blue-600';
      case 'hotels':
        return 'from-green-500 to-green-600';
      case 'transport':
        return 'from-orange-500 to-orange-600';
      case 'private-jet':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Header */}
        <div className="relative p-6 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4"
          >
            <CheckCircle className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600">
            Your {booking.service} has been successfully booked
          </p>
        </div>

        {/* Booking Details */}
        <Card className="mx-6 mb-6 border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${getServiceColor(booking.service)} flex items-center justify-center text-white`}>
                  {getServiceIcon(booking.service)}
                </div>
                <span>Booking Details</span>
              </span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {booking.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Provider</span>
              <span className="font-medium">{booking.provider}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Route</span>
              <span className="font-medium">{booking.from} → {booking.to}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">{booking.date}</span>
            </div>
            
            {booking.time && (
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Time</span>
                <span className="font-medium">{booking.time}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Passengers</span>
              <span className="font-medium">{booking.passengers}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-semibold text-lg text-[#0B63BC]">
                {formatCurrency(booking.price)}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Booking ID</span>
              <span className="font-mono text-sm text-gray-500">{booking.bookingId}</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="p-6 space-y-3">
          <Button
            onClick={onDownload}
            className="w-full bg-[#0B63BC] hover:bg-[#0B63BC]/90"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={onShare}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            
            <Button
              onClick={onClose}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
            >
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TravelSuccessModal; 