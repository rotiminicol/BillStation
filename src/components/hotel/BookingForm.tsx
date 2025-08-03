import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Calculator, CreditCard, CheckCircle, Info } from 'lucide-react';

interface Hotel {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  type: 'hotel' | 'shortlet';
}

interface BookingFormProps {
  selectedHotel: Hotel;
  onBook: (bookingData: any) => void;
  loading: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({
  selectedHotel,
  onBook,
  loading
}) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const [rooms, setRooms] = useState('1');
  const [specialRequests, setSpecialRequests] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const numRooms = parseInt(rooms) || 1;
    const basePrice = selectedHotel.price * nights * numRooms;
    const serviceFee = basePrice * 0.05; // 5% service fee
    const tax = basePrice * 0.075; // 7.5% tax
    return {
      basePrice,
      serviceFee,
      tax,
      total: basePrice + serviceFee + tax,
      nights
    };
  };

  const total = calculateTotal();
  const isValid = checkIn && checkOut && guests && total.nights > 0;

  const getMinCheckOutDate = () => {
    if (!checkIn) return '';
    const minDate = new Date(checkIn);
    minDate.setDate(minDate.getDate() + 1);
    return minDate.toISOString().split('T')[0];
  };

  const getMaxCheckInDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 365); // 1 year from now
    return maxDate.toISOString().split('T')[0];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const bookingData = {
      hotelId: selectedHotel.id,
      hotelName: selectedHotel.name,
      checkIn,
      checkOut,
      guests: parseInt(guests),
      rooms: parseInt(rooms),
      nights: total.nights,
      specialRequests,
      pricing: total
    };

    onBook(bookingData);
  };

  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#0B63BC]/10 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-[#0B63BC]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Book {selectedHotel.name}
            </h3>
            <p className="text-sm text-gray-500">
              Complete your booking details
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkIn">Check-in Date</Label>
              <Input
                id="checkIn"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                max={getMaxCheckInDate()}
                className="h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkOut">Check-out Date</Label>
              <Input
                id="checkOut"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={getMinCheckOutDate()}
                className="h-12"
                required
              />
            </div>
          </div>

          {/* Guests and Rooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="guests">Number of Guests</Label>
              <Select value={guests} onValueChange={setGuests}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rooms">Number of Rooms</Label>
              <Select value={rooms} onValueChange={setRooms}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Room' : 'Rooms'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <textarea
              id="specialRequests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="Any special requests or preferences..."
              className="w-full h-20 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#0B63BC] focus:border-transparent"
            />
          </div>

          {/* Price Estimation */}
          {isValid && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3"
            >
              <div className="flex items-center space-x-2">
                <Calculator className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Price Breakdown</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-800">
                    {formatCurrency(selectedHotel.price)} × {total.nights} nights × {rooms} room{rooms !== '1' ? 's' : ''}
                  </span>
                  <span className="font-medium">{formatCurrency(total.basePrice)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-800">Service Fee (5%)</span>
                  <span className="font-medium">{formatCurrency(total.serviceFee)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-800">Tax (7.5%)</span>
                  <span className="font-medium">{formatCurrency(total.tax)}</span>
                </div>
                
                <div className="pt-2 border-t border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-800">Total Amount</span>
                    <span className="text-lg font-bold text-[#0B63BC]">
                      {formatCurrency(total.total)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Validation Message */}
          {checkIn && checkOut && total.nights === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <Info className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-800">
                  Check-out date must be after check-in date
                </span>
              </div>
            </motion.div>
          )}

          {/* Book Button */}
          <motion.button
            type="submit"
            disabled={loading || !isValid}
            className={`w-full h-12 rounded-lg font-semibold transition-all duration-200 ${
              isValid && !loading
                ? 'bg-[#0B63BC] hover:bg-[#0B63BC]/90 text-white shadow-lg'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={isValid && !loading ? { scale: 1.02 } : {}}
            whileTap={isValid && !loading ? { scale: 0.98 } : {}}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <CreditCard className="h-5 w-5" />
                Book Now - {formatCurrency(total.total)}
              </div>
            )}
          </motion.button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm; 