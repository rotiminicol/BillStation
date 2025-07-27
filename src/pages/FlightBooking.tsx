import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Plane, Hotel, Car, Sparkles, Activity, CheckCircle, ArrowRight, Calendar, MapPin, Users, Search, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";
import BackButton from "@/components/ui/back-button";
import { useToast } from "@/hooks/use-toast";

const FlightBooking = () => {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'transport'>('flights');
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [loading, setLoading] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  const popularDestinations = [
    { name: "Lagos", code: "LOS", country: "Nigeria" },
    { name: "Abuja", code: "ABV", country: "Nigeria" },
    { name: "Port Harcourt", code: "PHC", country: "Nigeria" },
    { name: "Kano", code: "KAN", country: "Nigeria" },
    { name: "Dubai", code: "DXB", country: "UAE" },
    { name: "London", code: "LHR", country: "UK" },
    { name: "New York", code: "JFK", country: "USA" },
    { name: "Paris", code: "CDG", country: "France" },
  ];

  const airlines = [
    { name: "Air Peace", logo: "✈️", rating: 4.5 },
    { name: "Arik Air", logo: "🛩️", rating: 4.2 },
    { name: "Ethiopian Airlines", logo: "✈️", rating: 4.7 },
    { name: "Emirates", logo: "🛫", rating: 4.8 },
    { name: "British Airways", logo: "✈️", rating: 4.6 },
    { name: "Lufthansa", logo: "🛬", rating: 4.4 },
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
      {/* Header with Animation */}
      <div className={`flex items-center mb-8 transition-all duration-1000 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <BackButton to="/dashboard" className="mr-4" />
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Travel & Booking
          </h1>
          <Sparkles className="h-6 w-6 text-blue-500 animate-pulse" />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={`flex bg-white rounded-xl p-1 mb-8 shadow-lg max-w-md transition-all duration-1000 delay-200 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <button
          onClick={() => setActiveTab('flights')}
          className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 ${
            activeTab === 'flights'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Plane className="h-5 w-5 inline mr-2" />
          Flights
        </button>
        <button
          onClick={() => setActiveTab('hotels')}
          className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 ${
            activeTab === 'hotels'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Hotel className="h-5 w-5 inline mr-2" />
          Hotels
        </button>
        <button
          onClick={() => setActiveTab('transport')}
          className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 ${
            activeTab === 'transport'
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Car className="h-5 w-5 inline mr-2" />
          Transport
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8 pb-20 lg:pb-0">
          {/* Search Form */}
          <div className={`transition-all duration-1000 delay-400 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Search className="h-6 w-6 text-white" />
                  </div>
                  {activeTab === 'flights' ? 'Flight Search' : activeTab === 'hotels' ? 'Hotel Search' : 'Transport Search'}
                </CardTitle>
                <p className="text-gray-600 text-lg">Find the best deals for your travel needs</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="from" className="text-base font-semibold">From</Label>
                    <Select value={fromLocation} onValueChange={setFromLocation}>
                      <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300">
                        <SelectValue placeholder="Select departure city" />
                      </SelectTrigger>
                      <SelectContent>
                        {popularDestinations.map((dest) => (
                          <SelectItem key={dest.code} value={dest.code}>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {dest.name} ({dest.code}) - {dest.country}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="to" className="text-base font-semibold">To</Label>
                    <Select value={toLocation} onValueChange={setToLocation}>
                      <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300">
                        <SelectValue placeholder="Select destination city" />
                      </SelectTrigger>
                      <SelectContent>
                        {popularDestinations.map((dest) => (
                          <SelectItem key={dest.code} value={dest.code}>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {dest.name} ({dest.code}) - {dest.country}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="departure" className="text-base font-semibold">Departure Date</Label>
                    <Input
                      id="departure"
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="return" className="text-base font-semibold">Return Date</Label>
                    <Input
                      id="return"
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passengers" className="text-base font-semibold">Passengers</Label>
                    <Select value={passengers} onValueChange={setPassengers}>
                      <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300">
                        <SelectValue placeholder="Number of passengers" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              {num} {num === 1 ? 'Passenger' : 'Passengers'}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleSearch}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  disabled={loading}
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
          </div>

          {/* Popular Airlines */}
          {activeTab === 'flights' && (
            <div className={`transition-all duration-1000 delay-600 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Plane className="h-5 w-5 text-white" />
                    </div>
                    Popular Airlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {airlines.map((airline, index) => (
                      <div
                        key={airline.name}
                        className="p-4 lg:p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                      >
                                                  <div className="text-center">
                            <div className="text-2xl lg:text-3xl mb-2 lg:mb-3">{airline.logo}</div>
                            <h4 className="font-semibold text-gray-900 text-sm lg:text-base group-hover:text-blue-600 transition-colors duration-300">{airline.name}</h4>
                            <div className="flex items-center justify-center gap-1 mt-1 lg:mt-2">
                              <span className="text-yellow-500">★</span>
                              <span className="text-xs lg:text-sm font-semibold">{airline.rating}</span>
                            </div>
                          </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6 hidden lg:block">
          {/* Quick Booking */}
          <div className={`transition-all duration-1000 delay-800 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50 lg:sticky lg:top-8">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  Quick Booking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Best Prices</p>
                      <p className="text-sm text-gray-600">Guaranteed lowest rates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">24/7 Support</p>
                      <p className="text-sm text-gray-600">Round-the-clock assistance</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Secure Payment</p>
                      <p className="text-sm text-gray-600">Safe and encrypted transactions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Travel Tips */}
          <div className={`transition-all duration-1000 delay-1000 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  Travel Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-800">
                      <strong>Best Time to Book:</strong> Book flights 2-3 weeks in advance for domestic travel
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl">
                    <p className="text-sm text-green-800">
                      <strong>Travel Insurance:</strong> Consider travel insurance for international trips
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-xl">
                    <p className="text-sm text-yellow-800">
                      <strong>Documentation:</strong> Ensure all travel documents are valid and up-to-date
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DesktopLayout>
      <FlightBookingContent />
      <Navigation />
    </DesktopLayout>
  );
};

export default FlightBooking; 