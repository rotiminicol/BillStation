import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Building2, Calendar, Users, MapPin, CreditCard, ArrowRight, CheckCircle, Search, Star, Bed } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";
import ViewAllButton from "@/components/ui/view-all-button";

interface Booking {
  id: string;
  type: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const HotelBooking = () => {
  const [loading, setLoading] = useState(true);
  const [bookingType, setBookingType] = useState("");
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const { toast } = useToast();

  const bookingTypes = [
    { icon: Building2, label: "Hotel", value: "hotel", color: "from-blue-500 to-blue-600" },
    { icon: Bed, label: "Shortlet", value: "shortlet", color: "from-green-500 to-green-600" },
  ];

  const popularDestinations = [
    { icon: MapPin, label: "Lagos", value: "lagos", color: "from-blue-500 to-cyan-500" },
    { icon: MapPin, label: "Abuja", value: "abuja", color: "from-green-500 to-emerald-500" },
    { icon: MapPin, label: "Port Harcourt", value: "port-harcourt", color: "from-purple-500 to-pink-500" },
    { icon: MapPin, label: "Kano", value: "kano", color: "from-orange-500 to-red-500" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock recent bookings data
        const mockBookings: Booking[] = [
          {
            id: "1",
            type: "Hotel",
            destination: "Lagos",
            checkIn: "2024-01-15",
            checkOut: "2024-01-18",
            guests: 2,
            amount: 25000,
            status: "confirmed"
          },
          {
            id: "2",
            type: "Shortlet",
            destination: "Abuja",
            checkIn: "2024-01-20",
            checkOut: "2024-01-22",
            guests: 1,
            amount: 15000,
            status: "confirmed"
          },
          {
            id: "3",
            type: "Hotel",
            destination: "Port Harcourt",
            checkIn: "2024-01-25",
            checkOut: "2024-01-27",
            guests: 3,
            amount: 18000,
            status: "pending"
          }
        ];
        
        setRecentBookings(mockBookings);
      } catch (error) {
        console.error('Error fetching hotel booking data:', error);
        toast({
          title: "Error",
          description: "Failed to load hotel booking data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleBooking = async () => {
    if (!bookingType || !destination || !checkIn || !checkOut || !guests) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate booking processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Booking Successful",
        description: `Your ${bookingType} booking has been confirmed`,
      });
      
      // Reset form
      setBookingType("");
      setDestination("");
      setCheckIn("");
      setCheckOut("");
      setGuests("");
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-full">
          <Loader text="Loading hotels..." />
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Hotel & Shortlet</h1>
            <p className="text-sm text-gray-600 mt-1">
              Book hotels and shortlets worldwide
            </p>
          </div>

          {/* Balance Card */}
          <MobileCard className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
            <div className="text-center mb-4">
              <p className="text-sm text-blue-100 mb-2">Available Balance</p>
              <h2 className="text-3xl font-bold">$3,250.00</h2>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-white/20">
              <div>
                <p className="text-xs text-blue-200">This Month</p>
                <p className="text-sm font-medium">$1,200.00</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-blue-200">Total Bookings</p>
                <p className="text-sm font-medium">12</p>
              </div>
            </div>
          </MobileCard>
        </div>

        {/* Booking Type Selection */}
        <div className="grid grid-cols-2 gap-3">
          {bookingTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setBookingType(type.value)}
                              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                  bookingType === type.value
                    ? 'bg-[#0B63BC]/10 border-2 border-[#0B63BC]/20'
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                }`}
            >
              <div className="w-12 h-12 rounded-full bg-[#0B63BC]/10 flex items-center justify-center mb-3">
                <type.icon className="h-5 w-5 text-[#0B63BC]" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">{type.label}</span>
            </button>
          ))}
        </div>

        {/* Popular Destinations */}
        <div className="grid grid-cols-2 gap-3">
          {popularDestinations.map((destination) => (
            <button
              key={destination.value}
              onClick={() => setDestination(destination.value)}
                              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                  destination === destination.value
                    ? 'bg-[#0B63BC]/10 border-2 border-[#0B63BC]/20'
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                }`}
            >
              <div className="w-12 h-12 rounded-full bg-[#0B63BC]/10 flex items-center justify-center mb-3">
                <destination.icon className="h-5 w-5 text-[#0B63BC]" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">{destination.label}</span>
            </button>
          ))}
        </div>

        {/* Booking Form */}
        {bookingType && (
          <MobileCard>
            <MobileCard.Header>
              <MobileCard.Title>Book {bookingType.charAt(0).toUpperCase() + bookingType.slice(1)}</MobileCard.Title>
            </MobileCard.Header>
            
            <MobileCard.Content className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  placeholder="Enter destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="checkIn">Check In</Label>
                  <Input
                    id="checkIn"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="checkOut">Check Out</Label>
                  <Input
                    id="checkOut"
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="guests">Number of Guests</Label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                onClick={handleBooking}
                disabled={isProcessing}
                className="w-full bg-[#0B63BC] hover:bg-[#0B63BC]/90 text-white"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  "Book Now"
                )}
              </Button>
            </MobileCard.Content>
          </MobileCard>
        )}

        {/* Recent Bookings */}
        <MobileCard>
          <MobileCard.Header>
            <MobileCard.Title>Recent Bookings</MobileCard.Title>
            <ViewAllButton category="hotel" />
          </MobileCard.Header>
          
          <MobileCard.Content className="mt-4 space-y-4">
            {recentBookings.length > 0 ? (
              recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#0B63BC]/10 rounded-full flex items-center justify-center mr-3">
                                              <Building2 className="h-5 w-5 text-[#0B63BC]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {booking.type} - {booking.destination}
                      </p>
                      <p className="text-xs text-gray-500">{booking.checkIn} to {booking.checkOut} • {booking.guests} guests</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(booking.amount)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No recent bookings</p>
                <p className="text-gray-400 text-xs mt-1">Your booking history will appear here</p>
              </div>
            )}
          </MobileCard.Content>
        </MobileCard>
      </div>
    </MobileLayout>
  );
};

export default HotelBooking; 