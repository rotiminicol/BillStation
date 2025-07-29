import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plane, MapPin, Calendar, Users, Search, ArrowRight, Clock, CheckCircle } from "lucide-react";
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
  from: string;
  to: string;
  date: string;
  passengers: number;
  price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const FlightBook = () => {
  const [loading, setLoading] = useState(true);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("");
  const [tripType, setTripType] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const { toast } = useToast();

  const popularDestinations = [
    { icon: Plane, label: "Lagos", value: "lagos", color: "from-blue-500 to-cyan-500" },
    { icon: Plane, label: "Abuja", value: "abuja", color: "from-green-500 to-emerald-500" },
    { icon: Plane, label: "Port Harcourt", value: "port-harcourt", color: "from-purple-500 to-pink-500" },
    { icon: Plane, label: "Kano", value: "kano", color: "from-orange-500 to-red-500" },
    { icon: Plane, label: "Enugu", value: "enugu", color: "from-indigo-500 to-purple-500" },
    { icon: Plane, label: "Calabar", value: "calabar", color: "from-teal-500 to-green-500" },
  ];

  const tripTypes = [
    { icon: Plane, label: "One Way", value: "one-way", color: "from-blue-500 to-cyan-500" },
    { icon: Plane, label: "Round Trip", value: "round-trip", color: "from-green-500 to-emerald-500" },
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
            from: "Lagos",
            to: "Abuja",
            date: "2024-01-20",
            passengers: 2,
            price: 450,
            status: "confirmed"
          },
          {
            id: "2",
            from: "Port Harcourt",
            to: "Lagos",
            date: "2024-01-25",
            passengers: 1,
            price: 320,
            status: "pending"
          },
          {
            id: "3",
            from: "Kano",
            to: "Enugu",
            date: "2024-01-30",
            passengers: 3,
            price: 680,
            status: "confirmed"
          }
        ];
        
        setRecentBookings(mockBookings);
      } catch (error) {
        console.error('Error fetching flight data:', error);
        toast({
          title: "Error",
          description: "Failed to load flight data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleFlightBooking = async () => {
    if (!fromLocation || !toLocation || !departureDate || !passengers || !tripType) {
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
        description: "Your flight has been booked successfully",
      });
      
      // Reset form
      setFromLocation("");
      setToLocation("");
      setDepartureDate("");
      setReturnDate("");
      setPassengers("");
      setTripType("");
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
          <Loader text="Loading flights..." />
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
            <h1 className="text-2xl font-bold text-gray-900">Flight Booking</h1>
            <p className="text-sm text-gray-600 mt-1">
              Book flights to destinations worldwide
            </p>
          </div>

          {/* Balance Card */}
          <MobileCard className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6">
            <div className="text-center mb-4">
              <p className="text-sm text-purple-100 mb-2">Available Balance</p>
              <h2 className="text-3xl font-bold">$3,250.00</h2>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-white/20">
              <div>
                <p className="text-xs text-purple-200">This Month</p>
                <p className="text-sm font-medium">$1,200.00</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-purple-200">Total Bookings</p>
                <p className="text-sm font-medium">24</p>
              </div>
            </div>
          </MobileCard>
        </div>

        {/* Trip Type Selection */}
        <div className="grid grid-cols-2 gap-3">
          {tripTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setTripType(type.value)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                tripType === type.value
                  ? 'bg-purple-50 border-2 border-purple-200'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                <type.icon className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">{type.label}</span>
            </button>
          ))}
        </div>

        {/* Popular Destinations */}
        <div className="grid grid-cols-3 gap-3">
          {popularDestinations.map((destination) => (
            <button
              key={destination.value}
              onClick={() => setToLocation(destination.value)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                toLocation === destination.value
                  ? 'bg-purple-50 border-2 border-purple-200'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                <destination.icon className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">{destination.label}</span>
            </button>
          ))}
        </div>

        {/* Booking Form */}
        {tripType && (
          <MobileCard>
            <MobileCard.Header>
              <MobileCard.Title>Book {tripType === 'one-way' ? 'One Way' : 'Round Trip'} Flight</MobileCard.Title>
            </MobileCard.Header>
            
            <MobileCard.Content className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from">From</Label>
                <Input
                  id="from"
                  placeholder="Departure city"
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="to">To</Label>
                <Input
                  id="to"
                  placeholder="Destination city"
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="departure">Departure</Label>
                  <Input
                    id="departure"
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                </div>
                
                {tripType === 'round-trip' && (
                  <div className="space-y-2">
                    <Label htmlFor="return">Return</Label>
                    <Input
                      id="return"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="passengers">Passengers</Label>
                <Select value={passengers} onValueChange={setPassengers}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select passengers" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                onClick={handleFlightBooking}
                disabled={isProcessing}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  "Search Flights"
                )}
              </Button>
            </MobileCard.Content>
          </MobileCard>
        )}

        {/* Recent Bookings */}
        <MobileCard>
          <MobileCard.Header>
            <MobileCard.Title>Recent Bookings</MobileCard.Title>
            <ViewAllButton category="flight" />
          </MobileCard.Header>
          
          <MobileCard.Content className="mt-4 space-y-4">
            {recentBookings.length > 0 ? (
              recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                      <Plane className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {booking.from} → {booking.to}
                      </p>
                      <p className="text-xs text-gray-500">{booking.date} • {booking.passengers} passengers</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(booking.price)}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Plane className="h-12 w-12 text-gray-400 mx-auto mb-3" />
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

export default FlightBook;
