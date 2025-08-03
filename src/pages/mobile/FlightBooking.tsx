import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Plane, Hotel, Car, Activity, CheckCircle, ArrowRight, Calendar, MapPin, Users, Search, DollarSign, Shield, Clock, Globe, Star, TrendingUp, Crown, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import TravelTabs from "@/components/travel/TravelTabs";
import BookingResultCard from "@/components/travel/BookingResultCard";
import TravelSuccessModal from "@/components/travel/TravelSuccessModal";
import { PinInput } from "@/components/PinInput";

import { useToast } from "@/hooks/use-toast";

interface BookingResult {
  id: string;
  name: string;
  logo: string;
  rating: number;
  price: number;
  originalPrice?: number;
  duration?: string;
  departureTime?: string;
  arrivalTime?: string;
  stops?: number;
  type: 'flight' | 'hotel' | 'transport' | 'private-jet';
  features: string[];
  description: string;
  color: string;
}

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

const MobileFlightBooking = () => {
  const [activeTab, setActiveTab] = useState<'flights' | 'private-jet' | 'hotels' | 'transport'>('flights');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<BookingResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showPinInput, setShowPinInput] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingResult | null>(null);
  const [currentBooking, setCurrentBooking] = useState<TravelBooking | null>(null);
  const [pinError, setPinError] = useState('');
  const { toast } = useToast();

  const popularDestinations = [
    { name: "Lagos", code: "LOS", country: "Nigeria", image: "🌆" },
    { name: "Abuja", code: "ABV", country: "Nigeria", image: "🏛️" },
    { name: "Port Harcourt", code: "PHC", country: "Nigeria", image: "🌊" },
    { name: "Kano", code: "KAN", country: "Nigeria", image: "🏺" },
    { name: "Dubai", code: "DXB", country: "UAE", image: "🏙️" },
    { name: "London", code: "LHR", country: "UK", image: "🇬🇧" },
    { name: "New York", code: "JFK", country: "USA", image: "🗽" },
    { name: "Paris", code: "CDG", country: "France", image: "🗼" },
  ];

  const airlines = [
    { name: "Air Peace", logo: "✈️", rating: 4.5, color: "from-blue-500 to-blue-600", description: "Nigeria's leading airline" },
    { name: "Arik Air", logo: "🛩️", rating: 4.2, color: "from-green-500 to-green-600", description: "Premium domestic flights" },
    { name: "Ethiopian Airlines", logo: "✈️", rating: 4.7, color: "from-yellow-500 to-yellow-600", description: "International connections" },
    { name: "Emirates", logo: "🛫", rating: 4.8, color: "from-red-500 to-red-600", description: "Luxury travel experience" },
    { name: "British Airways", logo: "✈️", rating: 4.6, color: "from-indigo-500 to-indigo-600", description: "European excellence" },
    { name: "Lufthansa", logo: "🛬", rating: 4.4, color: "from-purple-500 to-purple-600", description: "German precision" },
  ];

  const hotels = [
    { name: "Eko Hotels & Suites", logo: "🏨", rating: 4.6, color: "from-green-500 to-green-600", description: "Luxury 5-star hotel" },
    { name: "Sheraton Lagos Hotel", logo: "🏢", rating: 4.4, color: "from-blue-500 to-blue-600", description: "Business-friendly hotel" },
    { name: "Radisson Blu Hotel", logo: "🏩", rating: 4.5, color: "from-purple-500 to-purple-600", description: "Premium accommodation" },
    { name: "Hilton Lagos", logo: "🏨", rating: 4.7, color: "from-red-500 to-red-600", description: "International luxury" },
  ];

  const transportServices = [
    { name: "Uber Premium", logo: "🚗", rating: 4.3, color: "from-orange-500 to-orange-600", description: "Premium ride service" },
    { name: "Bolt Business", logo: "🚙", rating: 4.2, color: "from-green-500 to-green-600", description: "Business travel solution" },
    { name: "Lagos Taxi Service", logo: "🚕", rating: 4.1, color: "from-yellow-500 to-yellow-600", description: "Local taxi service" },
    { name: "Private Chauffeur", logo: "🚐", rating: 4.8, color: "from-purple-500 to-purple-600", description: "Luxury chauffeur service" },
  ];

  const privateJets = [
    { name: "NetJets", logo: "🛩️", rating: 4.9, color: "from-purple-500 to-purple-600", description: "Premium private jet service" },
    { name: "Wheels Up", logo: "✈️", rating: 4.7, color: "from-blue-500 to-blue-600", description: "Luxury jet charter" },
    { name: "VistaJet", logo: "🛫", rating: 4.8, color: "from-red-500 to-red-600", description: "Global private aviation" },
    { name: "Flexjet", logo: "🛬", rating: 4.6, color: "from-green-500 to-green-600", description: "Fractional jet ownership" },
  ];

  const generateMockResults = (service: string, searchData: any): BookingResult[] => {
    let baseResults: any[] = [];
    
    switch (service) {
      case 'flights':
        baseResults = airlines;
        break;
      case 'hotels':
        baseResults = hotels;
        break;
      case 'transport':
        baseResults = transportServices;
        break;
      case 'private-jet':
        baseResults = privateJets;
        break;
      default:
        baseResults = airlines;
    }

    return baseResults.map((item, index) => ({
      id: `${service}-${index + 1}`,
      name: item.name,
      logo: item.logo,
      rating: item.rating + (Math.random() * 0.3 - 0.15),
      price: Math.floor(Math.random() * 500000) + 50000,
      originalPrice: Math.random() > 0.7 ? Math.floor(Math.random() * 600000) + 60000 : undefined,
      duration: service === 'flights' ? `${Math.floor(Math.random() * 8) + 2}h ${Math.floor(Math.random() * 30)}m` : undefined,
      departureTime: service === 'flights' ? `${Math.floor(Math.random() * 12) + 6}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      arrivalTime: service === 'flights' ? `${Math.floor(Math.random() * 12) + 6}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` : undefined,
      stops: service === 'flights' ? Math.floor(Math.random() * 2) : undefined,
      type: service as 'flight' | 'hotel' | 'transport' | 'private-jet',
      features: getFeaturesForService(service),
      description: item.description,
      color: item.color
    }));
  };

  const getFeaturesForService = (service: string): string[] => {
    switch (service) {
      case 'flights':
        return ['Free WiFi', 'In-flight entertainment', 'Meal included', 'Priority boarding'];
      case 'hotels':
        return ['Free WiFi', 'Swimming pool', 'Spa & wellness', 'Restaurant'];
      case 'transport':
        return ['Air conditioning', 'Professional driver', 'GPS tracking', '24/7 support'];
      case 'private-jet':
        return ['VIP lounge access', 'Custom catering', 'Flexible scheduling', 'Concierge service'];
      default:
        return ['Premium service', '24/7 support'];
    }
  };

  const handleSearch = (searchData: any) => {
    setLoading(true);
    setShowResults(false);
    
    setTimeout(() => {
      const results = generateMockResults(activeTab, searchData);
      setSearchResults(results);
      setShowResults(true);
      setLoading(false);
      
      toast({
        title: "Search Complete!",
        description: `Found ${results.length} available options for your ${activeTab} search.`,
      });
    }, 2000);
  };

  const handleBook = (result: BookingResult) => {
    setSelectedBooking(result);
    setShowPinInput(true);
  };

  const handlePinComplete = async (pin: string) => {
    if (pin === '1234') {
      setShowPinInput(false);
      setPinError('');
      
      setTimeout(() => {
        const booking: TravelBooking = {
          id: `booking-${Date.now()}`,
          service: activeTab,
          provider: selectedBooking?.name || '',
          from: 'Lagos',
          to: 'Abuja',
          date: new Date().toLocaleDateString(),
          time: selectedBooking?.departureTime,
          passengers: '1',
          price: selectedBooking?.price || 0,
          bookingId: `BK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
          status: 'confirmed'
        };
        
        setCurrentBooking(booking);
        setShowSuccessModal(true);
        
        toast({
          title: "Booking Confirmed!",
          description: "Your travel booking has been successfully confirmed.",
        });
      }, 1500);
    } else {
      setPinError('Incorrect PIN. Please try again.');
    }
  };

  const handlePinClose = () => {
    setShowPinInput(false);
    setPinError('');
    setSelectedBooking(null);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setCurrentBooking(null);
    setSelectedBooking(null);
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

  return (
    <MobileLayout>
      <div className="min-h-screen bg-[#F6F6F8]">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/dashboard" className="p-2">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Travel & Booking
                </h1>
                <p className="text-sm text-gray-500">Book your next adventure</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Travel Tabs Component */}
          <TravelTabs
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab as 'flights' | 'private-jet' | 'hotels' | 'transport');
              setShowResults(false);
              setSearchResults([]);
            }}
            onSearch={handleSearch}
            loading={loading}
          />

          {/* Search Results */}
          {showResults && searchResults.length > 0 && (
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Search className="h-4 w-4 text-[#0B63BC]" />
                  Available {activeTab === 'flights' ? 'Flights' : activeTab === 'private-jet' ? 'Private Jets' : activeTab === 'hotels' ? 'Hotels' : 'Transport Options'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {searchResults.map((result, index) => (
                  <BookingResultCard
                    key={result.id}
                    result={result}
                    onBook={handleBook}
                    index={index}
                  />
                ))}
              </CardContent>
            </Card>
          )}

          {/* Popular Destinations */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#0B63BC]" />
                Popular Destinations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {popularDestinations.slice(0, 6).map((destination) => (
                  <Card
                    key={destination.code}
                    className="cursor-pointer transition-all duration-200 hover:shadow-lg border-gray-200 hover:border-[#0B63BC]/30"
                  >
                    <CardContent className="p-3 text-center">
                      <div className="text-2xl mb-1">{destination.image}</div>
                      <h4 className="font-semibold text-gray-900 text-xs mb-1">{destination.name}</h4>
                      <p className="text-xs text-gray-500">{destination.country}</p>
                      <p className="text-xs text-[#0B63BC] font-medium">{destination.code}</p>
                    </CardContent>
                  </Card>
                ))}
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
                  <Hotel className="h-4 w-4" />
                  Book Hotel
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/chauffeur-service" className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Chauffeur Service
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/transactions" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  View Bookings
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="border-0 shadow-lg bg-white mb-20">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Best Prices</p>
                  <p className="text-xs text-gray-500">Competitive rates</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0B63BC]/10 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-[#0B63BC]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Secure Booking</p>
                  <p className="text-xs text-gray-500">Safe transactions</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">24/7 Support</p>
                  <p className="text-xs text-gray-500">Always available</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PIN Input Modal */}
        {showPinInput && (
          <PinInput
            onComplete={handlePinComplete}
            onClose={handlePinClose}
            error={pinError}
          />
        )}

        {/* Success Modal */}
        {currentBooking && (
          <TravelSuccessModal
            booking={currentBooking}
            isOpen={showSuccessModal}
            onClose={handleSuccessModalClose}
            onDownload={handleDownload}
            onShare={handleShare}
          />
        )}
      </div>
    </MobileLayout>
  );
};

export default MobileFlightBooking; 