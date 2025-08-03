import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Building2, Calendar, Users, MapPin, CreditCard, ArrowRight, CheckCircle, Search, Star, Bed, TrendingUp, Activity, Filter, Heart, Eye } from "lucide-react";
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
import HotelCard from "@/components/hotel/HotelCard";
import BookingForm from "@/components/hotel/BookingForm";
import BookingSuccessModal from "@/components/hotel/BookingSuccessModal";

interface Hotel {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  price: number;
  originalPrice?: number;
  amenities: string[];
  type: 'hotel' | 'shortlet';
  description: string;
  distance: string;
  available: boolean;
}

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

const HotelBooking = () => {
  const [bookingType, setBookingType] = useState("");
  const [destination, setDestination] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<BookingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
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

  // Mock hotel data
  const mockHotels: Hotel[] = [
    {
      id: "1",
      name: "Lagos Continental Hotel",
      image: "/hotel1.jpg",
      rating: 4.5,
      reviewCount: 1247,
      location: "Victoria Island, Lagos",
      price: 45000,
      originalPrice: 55000,
      amenities: ["Wifi", "Parking", "Restaurant", "Pool", "Gym", "AC"],
      type: "hotel",
      description: "Luxury 5-star hotel with stunning ocean views and world-class amenities.",
      distance: "2.5 km from center",
      available: true
    },
    {
      id: "2",
      name: "Abuja Luxury Suites",
      image: "/hotel2.jpg",
      rating: 4.8,
      reviewCount: 892,
      location: "Central Business District, Abuja",
      price: 38000,
      amenities: ["Wifi", "Parking", "Restaurant", "Gym", "AC", "Security"],
      type: "hotel",
      description: "Modern luxury suites in the heart of Abuja's business district.",
      distance: "1.8 km from center",
      available: true
    },
    {
      id: "3",
      name: "Port Harcourt Executive Lodge",
      image: "/hotel3.jpg",
      rating: 4.2,
      reviewCount: 567,
      location: "GRA, Port Harcourt",
      price: 28000,
      originalPrice: 32000,
      amenities: ["Wifi", "Parking", "Restaurant", "AC"],
      type: "hotel",
      description: "Comfortable executive lodge with excellent service and amenities.",
      distance: "3.2 km from center",
      available: true
    },
    {
      id: "4",
      name: "Lagos Premium Shortlet",
      image: "/shortlet1.jpg",
      rating: 4.6,
      reviewCount: 423,
      location: "Lekki, Lagos",
      price: 25000,
      amenities: ["Wifi", "Parking", "Kitchen", "AC", "Laundry"],
      type: "shortlet",
      description: "Premium shortlet apartment with full kitchen and modern amenities.",
      distance: "4.1 km from center",
      available: true
    },
    {
      id: "5",
      name: "Abuja Cozy Shortlet",
      image: "/shortlet2.jpg",
      rating: 4.4,
      reviewCount: 298,
      location: "Wuse Zone 2, Abuja",
      price: 18000,
      amenities: ["Wifi", "Kitchen", "AC", "Security"],
      type: "shortlet",
      description: "Cozy and comfortable shortlet perfect for business or leisure.",
      distance: "2.7 km from center",
      available: true
    },
    {
      id: "6",
      name: "Kano Heritage Hotel",
      image: "/hotel4.jpg",
      rating: 4.3,
      reviewCount: 345,
      location: "Central Kano",
      price: 22000,
      amenities: ["Wifi", "Parking", "Restaurant", "AC"],
      type: "hotel",
      description: "Heritage hotel combining traditional charm with modern comfort.",
      distance: "1.5 km from center",
      available: false
    }
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
        setHotels(mockHotels);
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

  const handleHotelSelect = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setShowBookingForm(true);
  };

  const handleBooking = async (bookingData: BookingData) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setCurrentBooking(bookingData);
      setShowSuccessModal(true);
      setShowBookingForm(false);
      
      toast({
        title: "Booking Successful!",
        description: `Your booking at ${bookingData.hotelName} has been confirmed`,
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process booking",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setCurrentBooking(null);
    setSelectedHotel(null);
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your booking receipt is being downloaded.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Shared!",
      description: "Your booking details have been shared.",
    });
  };

  const handleViewHistory = () => {
    toast({
      title: "Redirecting...",
      description: "Taking you to booking history.",
    });
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesType = !bookingType || hotel.type === bookingType;
    const matchesDestination = !destination || destination === "all" || hotel.location.toLowerCase().includes(destination.toLowerCase());
    const matchesSearch = !searchTerm || hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) || hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesDestination && matchesSearch;
  });

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
          <h1 className="text-3xl font-bold text-gray-900">Hotel & Shortlet Booking</h1>
          <p className="text-gray-600 mt-1">Find and book the perfect accommodation for your stay</p>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Search and Filters */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Search className="h-5 w-5 text-[#0B63BC]" />
                Search & Filter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Booking Type Selection */}
              <div className="space-y-3">
                <Label>Booking Type</Label>
                <div className="grid grid-cols-2 gap-4">
                  {bookingTypes.map((type) => (
                    <Card
                      key={type.value}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                        bookingType === type.value
                          ? "border-[#0B63BC] bg-blue-50"
                          : "border-gray-200 hover:border-[#0B63BC]/30"
                      }`}
                      onClick={() => setBookingType(type.value)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                          bookingType === type.value
                            ? "bg-[#0B63BC] text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          <type.icon className="h-6 w-6" />
                        </div>
                        <h4 className="font-semibold text-gray-900">{type.label}</h4>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Destination and Search */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Destinations</SelectItem>
                      {popularDestinations.map((dest) => (
                        <SelectItem key={dest.value} value={dest.label}>
                          {dest.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="search">Search Hotels</Label>
                  <Input
                    id="search"
                    placeholder="Search by name or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hotel Listings */}
          {!showBookingForm && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Available Properties ({filteredHotels.length})
                </h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              {filteredHotels.length === 0 ? (
                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-12 text-center">
                    <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No hotels found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search criteria</p>
                    <Button onClick={() => {
                      setBookingType("");
                      setDestination("");
                      setSearchTerm("");
                    }}>
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {filteredHotels.map((hotel, index) => (
                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                      onSelect={handleHotelSelect}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Booking Form */}
          {showBookingForm && selectedHotel && (
            <BookingForm
              selectedHotel={selectedHotel}
              onBook={handleBooking}
              loading={loading}
            />
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

      {/* Success Modal */}
      {currentBooking && (
        <BookingSuccessModal
          booking={currentBooking}
          isOpen={showSuccessModal}
          onClose={handleSuccessModalClose}
          onDownload={handleDownload}
          onShare={handleShare}
          onViewHistory={handleViewHistory}
        />
      )}
    </div>
  );

  return (
    <DesktopLayout>
      <HotelBookingContent />
    </DesktopLayout>
  );
};

export default HotelBooking; 