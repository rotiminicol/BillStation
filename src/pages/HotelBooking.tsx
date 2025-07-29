import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Building2, Calendar, Users, MapPin, CreditCard, ArrowRight, CheckCircle, Search, Star, Bed, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import DesktopLayout from "@/components/DesktopLayout";
import Navigation from "@/components/Navigation";
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Booking Confirmed!",
        description: `Your ${bookingType} booking in ${destination} has been confirmed`,
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
        description: "Failed to confirm booking. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
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

  return (
    <DesktopLayout>
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hotel Booking</h1>
            <p className="text-gray-600 mt-2">Book hotels and shortlets across Nigeria</p>
          </div>
          <ViewAllButton category="hotel" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-600" />
                  Booking Type
                </CardTitle>
                <CardDescription>Choose your accommodation type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookingTypes.map((type) => (
                    <div
                      key={type.value}
                      onClick={() => setBookingType(type.value)}
                      className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 hover:scale-105 ${
                        bookingType === type.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3`}>
                        <type.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{type.label}</h3>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Destinations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Popular Destinations
                </CardTitle>
                <CardDescription>Quick select popular cities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {popularDestinations.map((dest) => (
                    <div
                      key={dest.value}
                      onClick={() => setDestination(dest.value)}
                      className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 hover:scale-105 ${
                        destination === dest.value
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-2`}>
                        <dest.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm">{dest.label}</h3>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
                <CardDescription>Enter your booking information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="checkIn">Check-in Date</Label>
                    <Input
                      id="checkIn"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkOut">Check-out Date</Label>
                    <Input
                      id="checkOut"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5">5+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={handleBooking}
                  disabled={isProcessing || !bookingType || !destination || !checkIn || !checkOut || !guests}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Building2 className="h-4 w-4 mr-2" />
                      Book Now
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Recent Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center gap-3 p-3 rounded-lg border">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {booking.type[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{booking.type}</p>
                        <p className="text-sm text-gray-500">{booking.destination}</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {formatCurrency(booking.amount)}
                        </p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Spent</span>
                    <span className="font-semibold text-gray-900">₦58,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Bookings</span>
                    <span className="font-semibold text-gray-900">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Nights</span>
                    <span className="font-semibold text-gray-900">7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
};

export default HotelBooking; 