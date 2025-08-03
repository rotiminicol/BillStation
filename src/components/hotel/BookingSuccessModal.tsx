import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Building2, Calendar, Users, MapPin, Download, Share2, X, Clock, ArrowRight, CreditCard, Bed } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BookingData {
  hotelId: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  nights: number;
  specialRequests: string;
  pricing: {
    basePrice: number;
    serviceFee: number;
    tax: number;
    total: number;
  };
}

interface BookingSuccessModalProps {
  booking: BookingData;
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
  onShare: () => void;
  onViewHistory: () => void;
}

const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  booking,
  isOpen,
  onClose,
  onDownload,
  onShare,
  onViewHistory
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
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
            Your hotel booking has been successfully confirmed
          </p>
        </div>

        {/* Booking Details */}
        <Card className="mx-6 mb-6 border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white">
                  <Building2 className="h-5 w-5" />
                </div>
                <span>Booking Summary</span>
              </span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Confirmed
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Hotel</span>
              <span className="font-medium">{booking.hotelName}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Check-in</span>
              <span className="font-medium">{formatDate(booking.checkIn)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Check-out</span>
              <span className="font-medium">{formatDate(booking.checkOut)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Duration</span>
              <span className="font-medium">{booking.nights} night{booking.nights > 1 ? 's' : ''}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Guests</span>
              <span className="font-medium">{booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Rooms</span>
              <span className="font-medium">{booking.rooms} room{booking.rooms > 1 ? 's' : ''}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Base Price</span>
              <span className="font-medium">{formatCurrency(booking.pricing.basePrice)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Service Fee</span>
              <span className="font-medium">{formatCurrency(booking.pricing.serviceFee)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">{formatCurrency(booking.pricing.tax)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-semibold text-lg text-[#0B63BC]">
                {formatCurrency(booking.pricing.total)}
              </span>
            </div>

            {booking.specialRequests && (
              <div className="pt-2 border-t border-gray-100">
                <div className="flex justify-between items-start py-2">
                  <span className="text-gray-600">Special Requests</span>
                  <span className="font-medium text-sm text-gray-700 max-w-xs text-right">
                    {booking.specialRequests}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Important Information */}
        <div className="mx-6 mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-800">Important Information</p>
              <ul className="text-xs text-blue-600 mt-1 space-y-1">
                <li>• Check-in time: 2:00 PM</li>
                <li>• Check-out time: 11:00 AM</li>
                <li>• Please bring a valid ID for check-in</li>
                <li>• Cancellation policy: Free cancellation up to 24 hours before check-in</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 space-y-3">
          <Button
            onClick={onViewHistory}
            className="w-full bg-[#0B63BC] hover:bg-[#0B63BC]/90"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            View Booking History
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={onDownload}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50"
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
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookingSuccessModal; 