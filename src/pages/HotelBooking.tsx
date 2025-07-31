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
        title: "Booking Successful!",
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
        title: "Error",
        description: "Failed to process booking",
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

  const HotelBookingContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hotel Booking</h1>
          <p className="text-gray-600 mt-1">Book hotels and shortlets for your stay</p>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Booking Type Selection */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                Select Booking Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {bookingTypes.map((type) => (
                  <Card
                    key={type.value}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      bookingType === type.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setBookingType(type.value)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                        bookingType === type.value
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        <type.icon className="h-6 w-6" />
                      </div>
                      <h4 className="font-semibold text-gray-900">{type.label}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          {bookingType && (
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Book {bookingTypes.find(t => t.value === bookingType)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {popularDestinations.map((dest) => (
                        <SelectItem key={dest.value} value={dest.value}>
                          {dest.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="checkIn">Check-in Date</Label>
                    <Input
                      id="checkIn"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkOut">Check-out Date</Label>
                    <Input
                      id="checkOut"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleBooking}
                  disabled={isProcessing || !destination || !checkIn || !checkOut || !guests}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Book Now
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Bookings */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No recent bookings</p>
                  </div>
                ) : (
                  recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{booking.type}</p>
                          <p className="text-xs text-gray-500">{booking.destination}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 text-sm">{formatCurrency(booking.amount)}</p>
                        <Badge className={`mt-1 ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/flight-booking" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Book Flight
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/transactions" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  View History
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/chauffeur-service" className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Chauffeur Service
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  return (
    <DesktopLayout>
      <HotelBookingContent />
    </DesktopLayout>
  );
};

export default HotelBooking; 