import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Car, MapPin, Clock, Users, CreditCard, ArrowRight, CheckCircle, TrendingUp, Activity } from "lucide-react";
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
        await new Promise(resolve => setTimeout(resolve, 1000));
        
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Booking Successful!",
        description: `Your ${serviceType} service has been confirmed`,
      });
      
      // Reset form
      setServiceType("");
      setDestination("");
      setDate("");
      setDuration("");
      setPassengers("");
      
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

  const ChauffeurServiceContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chauffeur Service</h1>
          <p className="text-gray-600 mt-1">Professional chauffeur services for your travel needs</p>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Service Type Selection */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Car className="h-5 w-5 text-blue-600" />
                Select Service Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {serviceTypes.map((service) => (
                  <Card
                    key={service.value}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      serviceType === service.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setServiceType(service.value)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                        serviceType === service.value
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        <service.icon className="h-6 w-6" />
                      </div>
                      <h4 className="font-semibold text-gray-900">{service.label}</h4>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Booking Form */}
          {serviceType && (
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Book {serviceTypes.find(s => s.value === serviceType)?.label}
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
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {["2 hours", "4 hours", "6 hours", "8 hours", "Full day"].map((dur) => (
                          <SelectItem key={dur} value={dur}>
                            {dur}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <Select value={passengers} onValueChange={setPassengers}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select number of passengers" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'Passenger' : 'Passengers'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleBooking}
                  disabled={isProcessing || !destination || !date || !duration || !passengers}
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
                      Book Service
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
                    <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No recent bookings</p>
                  </div>
                ) : (
                  recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Car className="h-5 w-5 text-blue-600" />
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
                <Link to="/hotel-booking" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Book Hotel
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/transactions" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  View History
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/flight-booking" className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Book Flight
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
      <ChauffeurServiceContent />
    </DesktopLayout>
  );
};

export default ChauffeurService; 