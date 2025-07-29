import { useState, useEffect } from "react";
import { Car, MapPin, Clock, Users, CreditCard, ArrowRight, CheckCircle } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";
import ViewAllButton from "@/components/ui/view-all-button";

interface ChauffeurBooking {
  id: string;
  type: string;
  destination: string;
  date: string;
  duration: string;
  passengers: number;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
}

const ChauffeurService = () => {
  const [loading, setLoading] = useState(true);
  const [serviceType, setServiceType] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [passengers, setPassengers] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentBookings, setRecentBookings] = useState<ChauffeurBooking[]>([]);
  const { toast } = useToast();

  const serviceTypes = [
    { icon: Car, label: "Airport Transfer", value: "airport", color: "from-blue-500 to-blue-600" },
    { icon: Car, label: "City Tour", value: "city-tour", color: "from-green-500 to-green-600" },
    { icon: Car, label: "Business Travel", value: "business", color: "from-purple-500 to-purple-600" },
    { icon: Car, label: "Wedding Service", value: "wedding", color: "from-pink-500 to-pink-600" },
  ];

  const popularDestinations = [
    { icon: MapPin, label: "Lagos Airport", value: "lagos-airport", color: "from-blue-500 to-cyan-500" },
    { icon: MapPin, label: "Abuja Airport", value: "abuja-airport", color: "from-green-500 to-emerald-500" },
    { icon: MapPin, label: "Port Harcourt", value: "port-harcourt", color: "from-purple-500 to-pink-500" },
    { icon: MapPin, label: "Kano Airport", value: "kano-airport", color: "from-orange-500 to-red-500" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock recent bookings data
        const mockBookings: ChauffeurBooking[] = [
          {
            id: "1",
            type: "Airport Transfer",
            destination: "Lagos Airport",
            date: "2024-01-15",
            duration: "2 hours",
            passengers: 2,
            amount: 15000,
            status: "confirmed"
          },
          {
            id: "2",
            type: "City Tour",
            destination: "Abuja City",
            date: "2024-01-20",
            duration: "4 hours",
            passengers: 4,
            amount: 25000,
            status: "confirmed"
          },
          {
            id: "3",
            type: "Business Travel",
            destination: "Port Harcourt",
            date: "2024-01-25",
            duration: "6 hours",
            passengers: 1,
            amount: 30000,
            status: "pending"
          }
        ];
        
        setRecentBookings(mockBookings);
      } catch (error) {
        console.error('Error fetching chauffeur service data:', error);
        toast({
          title: "Error",
          description: "Failed to load chauffeur service data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleBooking = async () => {
    if (!serviceType || !destination || !date || !duration || !passengers) {
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
        description: `Your ${serviceType} booking has been confirmed`,
      });
      
      // Reset form
      setServiceType("");
      setDestination("");
      setDate("");
      setDuration("");
      setPassengers("");
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
          <Loader text="Loading chauffeur services..." />
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
            <h1 className="text-2xl font-bold text-gray-900">Chauffeur Service</h1>
            <p className="text-sm text-gray-600 mt-1">
              Professional chauffeur services
            </p>
          </div>

          {/* Balance Card */}
          <MobileCard className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6">
            <div className="text-center mb-4">
              <p className="text-sm text-purple-100 mb-2">Available Balance</p>
              <h2 className="text-3xl font-bold">$2,850.00</h2>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-white/20">
              <div>
                <p className="text-xs text-purple-200">This Month</p>
                <p className="text-sm font-medium">$850.00</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-purple-200">Total Rides</p>
                <p className="text-sm font-medium">8</p>
              </div>
            </div>
          </MobileCard>
        </div>

        {/* Service Type Selection */}
        <div className="grid grid-cols-2 gap-3">
          {serviceTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setServiceType(type.value)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                serviceType === type.value
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
        <div className="grid grid-cols-2 gap-3">
          {popularDestinations.map((destination) => (
            <button
              key={destination.value}
              onClick={() => setDestination(destination.value)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                destination === destination.value
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
        {serviceType && (
          <MobileCard>
            <MobileCard.Header>
              <MobileCard.Title>Book {serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</MobileCard.Title>
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
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Hours</SelectItem>
                      <SelectItem value="4">4 Hours</SelectItem>
                      <SelectItem value="6">6 Hours</SelectItem>
                      <SelectItem value="8">8 Hours</SelectItem>
                      <SelectItem value="full-day">Full Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="passengers">Number of Passengers</Label>
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
                onClick={handleBooking}
                disabled={isProcessing}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
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
            <ViewAllButton category="chauffeur" />
          </MobileCard.Header>
          
          <MobileCard.Content className="mt-4 space-y-4">
            {recentBookings.length > 0 ? (
              recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                      <Car className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {booking.type} - {booking.destination}
                      </p>
                      <p className="text-xs text-gray-500">{booking.date} • {booking.duration} • {booking.passengers} passengers</p>
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
                <Car className="h-12 w-12 text-gray-400 mx-auto mb-3" />
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

export default ChauffeurService; 