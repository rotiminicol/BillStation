import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Plane, Hotel, Car, Activity, CheckCircle, ArrowRight, Calendar, MapPin, Users, Search, DollarSign, Shield, Clock, Globe, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";

import { useToast } from "@/hooks/use-toast";
import { getBankLogo } from "@/lib/bankLogos";

const FlightBooking = () => {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'transport'>('flights');
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [loading, setLoading] = useState(false);
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

  const handleSearch = () => {
    if (!fromLocation || !toLocation || !departureDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Search Complete!",
        description: "Found 15 available options for your trip.",
      });
      setLoading(false);
    }, 2000);
  };

  const FlightBookingContent = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Travel & Booking
          </h1>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white rounded-xl p-1 mb-8 shadow-lg max-w-md">
        {[
          { id: 'flights', icon: <Plane className="h-5 w-5" />, label: 'Flights' },
          { id: 'hotels', icon: <Hotel className="h-5 w-5" />, label: 'Hotels' },
          { id: 'transport', icon: <Car className="h-5 w-5" />, label: 'Transport' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'flights' | 'hotels' | 'transport')}
            className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-[#0B63BC] text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span className="inline mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Search Form */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Search className="h-5 w-5 text-[#0B63BC]" />
                Search {activeTab === 'flights' ? 'Flights' : activeTab === 'hotels' ? 'Hotels' : 'Transport'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Input
                    id="from"
                    placeholder="Departure location"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Input
                    id="to"
                    placeholder="Destination"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="departure">Departure Date</Label>
                  <Input
                    id="departure"
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="return">Return Date (Optional)</Label>
                  <Input
                    id="return"
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passengers">Passengers</Label>
                  <Select value={passengers} onValueChange={setPassengers}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'Passenger' : 'Passengers'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleSearch}
                disabled={loading}
                className="w-full h-12 bg-[#0B63BC] hover:bg-[#0B63BC]/90 text-lg font-semibold"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Searching...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Search {activeTab === 'flights' ? 'Flights' : activeTab === 'hotels' ? 'Hotels' : 'Transport'}
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Popular Destinations */}
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#0B63BC]" />
                Popular Destinations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {popularDestinations.map((destination) => (
                  <Card
                    key={destination.code}
                    className="cursor-pointer transition-all duration-200 hover:shadow-lg border-gray-200 hover:border-[#0B63BC]/30"
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">{destination.image}</div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">{destination.name}</h4>
                      <p className="text-xs text-gray-500">{destination.country}</p>
                                              <p className="text-xs text-[#0B63BC] font-medium">{destination.code}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
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
          <Card className="border-0 shadow-lg bg-white">
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
      </div>
    </div>
  );

  return (
    <DesktopLayout>
      <FlightBookingContent />
    </DesktopLayout>
  );
};

export default FlightBooking; 