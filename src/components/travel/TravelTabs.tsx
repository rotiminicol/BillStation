import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Hotel, Car, Crown, Search, Calendar, MapPin, Users, Building, Car as CarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TravelTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSearch: (data: any) => void;
  loading: boolean;
}

const TravelTabs: React.FC<TravelTabsProps> = ({
  activeTab,
  onTabChange,
  onSearch,
  loading
}) => {
  const [formData, setFormData] = React.useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: '1',
    rooms: '1',
    guests: '1',
    carType: '',
    pickupLocation: '',
    dropoffLocation: '',
    pickupTime: '',
    jetType: ''
  });

  const tabs = [
    { id: 'flights', icon: <Plane className="h-5 w-5" />, label: 'Flights', color: 'from-blue-500 to-blue-600' },
    { id: 'private-jet', icon: <Crown className="h-5 w-5" />, label: 'Private Jet', color: 'from-purple-500 to-purple-600' },
    { id: 'hotels', icon: <Hotel className="h-5 w-5" />, label: 'Hotels', color: 'from-green-500 to-green-600' },
    { id: 'transport', icon: <Car className="h-5 w-5" />, label: 'Transport', color: 'from-orange-500 to-orange-600' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const requiredFields = getRequiredFields();
    const isValid = requiredFields.every(field => formData[field as keyof typeof formData]);
    
    if (!isValid) {
      return false;
    }
    
    onSearch({ ...formData, service: activeTab });
    return true;
  };

  const getRequiredFields = () => {
    switch (activeTab) {
      case 'flights':
      case 'private-jet':
        return ['from', 'to', 'departureDate'];
      case 'hotels':
        return ['to', 'departureDate', 'returnDate'];
      case 'transport':
        return ['pickupLocation', 'dropoffLocation', 'pickupTime'];
      default:
        return [];
    }
  };

  const renderFlightForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="from">From</Label>
          <Input
            id="from"
            placeholder="Departure airport"
            value={formData.from}
            onChange={(e) => handleInputChange('from', e.target.value)}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="to">To</Label>
          <Input
            id="to"
            placeholder="Destination airport"
            value={formData.to}
            onChange={(e) => handleInputChange('to', e.target.value)}
            className="h-12"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departureDate">Departure Date</Label>
          <Input
            id="departureDate"
            type="date"
            value={formData.departureDate}
            onChange={(e) => handleInputChange('departureDate', e.target.value)}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="returnDate">Return Date (Optional)</Label>
          <Input
            id="returnDate"
            type="date"
            value={formData.returnDate}
            onChange={(e) => handleInputChange('returnDate', e.target.value)}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="passengers">Passengers</Label>
          <Select value={formData.passengers} onValueChange={(value) => handleInputChange('passengers', value)}>
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
    </div>
  );

  const renderPrivateJetForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="from">From</Label>
          <Input
            id="from"
            placeholder="Departure location"
            value={formData.from}
            onChange={(e) => handleInputChange('from', e.target.value)}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="to">To</Label>
          <Input
            id="to"
            placeholder="Destination"
            value={formData.to}
            onChange={(e) => handleInputChange('to', e.target.value)}
            className="h-12"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departureDate">Departure Date</Label>
          <Input
            id="departureDate"
            type="date"
            value={formData.departureDate}
            onChange={(e) => handleInputChange('departureDate', e.target.value)}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jetType">Jet Type</Label>
          <Select value={formData.jetType} onValueChange={(value) => handleInputChange('jetType', value)}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select jet type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light Jet (4-8 passengers)</SelectItem>
              <SelectItem value="midsize">Midsize Jet (6-9 passengers)</SelectItem>
              <SelectItem value="heavy">Heavy Jet (10-16 passengers)</SelectItem>
              <SelectItem value="ultra-long">Ultra Long Range (12-19 passengers)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="passengers">Passengers</Label>
          <Select value={formData.passengers} onValueChange={(value) => handleInputChange('passengers', value)}>
            <SelectTrigger className="h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? 'Passenger' : 'Passengers'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderHotelForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="to">Destination</Label>
          <Input
            id="to"
            placeholder="City or hotel name"
            value={formData.to}
            onChange={(e) => handleInputChange('to', e.target.value)}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="guests">Guests</Label>
          <Select value={formData.guests} onValueChange={(value) => handleInputChange('guests', value)}>
            <SelectTrigger className="h-12">
              <SelectValue />
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departureDate">Check-in Date</Label>
          <Input
            id="departureDate"
            type="date"
            value={formData.departureDate}
            onChange={(e) => handleInputChange('departureDate', e.target.value)}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="returnDate">Check-out Date</Label>
          <Input
            id="returnDate"
            type="date"
            value={formData.returnDate}
            onChange={(e) => handleInputChange('returnDate', e.target.value)}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rooms">Rooms</Label>
          <Select value={formData.rooms} onValueChange={(value) => handleInputChange('rooms', value)}>
            <SelectTrigger className="h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? 'Room' : 'Rooms'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderTransportForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pickupLocation">Pickup Location</Label>
          <Input
            id="pickupLocation"
            placeholder="Airport, hotel, or address"
            value={formData.pickupLocation}
            onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dropoffLocation">Drop-off Location</Label>
          <Input
            id="dropoffLocation"
            placeholder="Destination address"
            value={formData.dropoffLocation}
            onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
            className="h-12"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pickupTime">Pickup Time</Label>
          <Input
            id="pickupTime"
            type="datetime-local"
            value={formData.pickupTime}
            onChange={(e) => handleInputChange('pickupTime', e.target.value)}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="carType">Vehicle Type</Label>
          <Select value={formData.carType} onValueChange={(value) => handleInputChange('carType', value)}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select vehicle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="economy">Economy</SelectItem>
              <SelectItem value="comfort">Comfort</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="van">Van</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="passengers">Passengers</Label>
          <Select value={formData.passengers} onValueChange={(value) => handleInputChange('passengers', value)}>
            <SelectTrigger className="h-12">
              <SelectValue />
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
      </div>
    </div>
  );

  const renderForm = () => {
    switch (activeTab) {
      case 'flights':
        return renderFlightForm();
      case 'private-jet':
        return renderPrivateJetForm();
      case 'hotels':
        return renderHotelForm();
      case 'transport':
        return renderTransportForm();
      default:
        return renderFlightForm();
    }
  };

  const getSearchButtonText = () => {
    switch (activeTab) {
      case 'flights':
        return 'Search Flights';
      case 'private-jet':
        return 'Search Private Jets';
      case 'hotels':
        return 'Search Hotels';
      case 'transport':
        return 'Search Transport';
      default:
        return 'Search';
    }
  };

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex bg-white rounded-xl p-1 mb-8 shadow-lg max-w-2xl">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-3 px-6 rounded-lg text-base font-semibold transition-all duration-300 relative ${
              activeTab === tab.id
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className={`absolute inset-0 rounded-lg bg-gradient-to-r ${tab.color}`}
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10 inline-flex items-center">
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Search Form */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Search className="h-5 w-5 text-[#0B63BC]" />
            {getSearchButtonText()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderForm()}

          <Button
            onClick={handleSubmit}
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
                {getSearchButtonText()}
              </div>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelTabs; 