import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, CreditCard, Ticket, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TicketTier {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  benefits: string[];
  available: number;
  sold: number;
}

interface Event {
  id: string;
  title: string;
  artist?: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  category: 'music' | 'comedy' | 'festival' | 'sports' | 'theater';
  ticketTiers: TicketTier[];
}

interface BuyerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface TicketPurchaseFormProps {
  event: Event;
  selectedTierId: string;
  onBack: () => void;
  onComplete: (purchaseData: {
    eventId: string;
    tierId: string;
    quantity: number;
    buyerInfo: BuyerInfo;
    totalAmount: number;
  }) => void;
}

const TicketPurchaseForm: React.FC<TicketPurchaseFormProps> = ({
  event,
  selectedTierId,
  onBack,
  onComplete
}) => {
  const [quantity, setQuantity] = useState(1);
  const [buyerInfo, setBuyerInfo] = useState<BuyerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const selectedTier = event.ticketTiers.find(tier => tier.id === selectedTierId);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'music': 'from-purple-500 to-pink-500',
      'comedy': 'from-orange-500 to-red-500',
      'festival': 'from-green-500 to-blue-500',
      'sports': 'from-blue-500 to-indigo-500',
      'theater': 'from-pink-500 to-purple-500'
    };
    return colors[category] || 'from-gray-500 to-gray-700';
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'music': '🎵',
      'comedy': '🎭',
      'festival': '🎪',
      'sports': '⚽',
      'theater': '🎬'
    };
    return icons[category] || '🎫';
  };

  const totalAmount = selectedTier ? selectedTier.price * quantity : 0;
  const discountAmount = selectedTier?.originalPrice 
    ? (selectedTier.originalPrice - selectedTier.price) * quantity 
    : 0;

  const isFormValid = () => {
    return selectedTier && 
           quantity > 0 && 
           quantity <= selectedTier.available &&
           buyerInfo.firstName.trim() !== '' &&
           buyerInfo.lastName.trim() !== '' &&
           buyerInfo.email.trim() !== '' &&
           buyerInfo.phone.trim() !== '';
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (selectedTier && newQuantity >= 1 && newQuantity <= selectedTier.available) {
      setQuantity(newQuantity);
    }
  };

  const handleBuyerInfoChange = (field: keyof BuyerInfo, value: string) => {
    setBuyerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (isFormValid() && selectedTier) {
      onComplete({
        eventId: event.id,
        tierId: selectedTier.id,
        quantity,
        buyerInfo,
        totalAmount
      });
    }
  };

  if (!selectedTier) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Selected ticket tier not found.</p>
        <Button onClick={onBack} className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Back to Event
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Purchase Tickets</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Purchase Form */}
        <div className="space-y-6">
          {/* Event Summary */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Ticket className="w-5 h-5 text-[#0B63BC]" />
                <span>Event Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`p-4 rounded-lg bg-gradient-to-r ${getCategoryColor(event.category)} text-white mb-4`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{event.title}</h3>
                    {event.artist && (
                      <p className="text-sm opacity-90">{event.artist}</p>
                    )}
                  </div>
                  <div className="text-4xl opacity-30">
                    {getCategoryIcon(event.category)}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-[#0B63BC]" />
                  <span>{formatDate(event.date)} at {event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-[#0B63BC]" />
                  <span>{event.venue}, {event.city}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ticket Selection */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border-2 border-[#0B63BC] rounded-lg bg-blue-50">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{selectedTier.name}</h4>
                  {selectedTier.originalPrice && (
                    <Badge className="bg-red-500 text-white text-xs">
                      {Math.round(((selectedTier.originalPrice - selectedTier.price) / selectedTier.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{selectedTier.description}</p>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xl font-bold text-[#0B63BC]">
                    {formatCurrency(selectedTier.price)}
                  </span>
                  {selectedTier.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatCurrency(selectedTier.originalPrice)}
                    </span>
                  )}
                </div>
                
                <div className="text-xs text-gray-500">
                  {selectedTier.available} tickets available
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="space-y-2">
                <Label htmlFor="quantity">Number of Tickets</Label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 p-0"
                  >
                    -
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    min={1}
                    max={selectedTier.available}
                    className="w-20 text-center"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= selectedTier.available}
                    className="w-10 h-10 p-0"
                  >
                    +
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Buyer Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-[#0B63BC]" />
                <span>Buyer Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={buyerInfo.firstName}
                    onChange={(e) => handleBuyerInfoChange('firstName', e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={buyerInfo.lastName}
                    onChange={(e) => handleBuyerInfoChange('lastName', e.target.value)}
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={buyerInfo.email}
                  onChange={(e) => handleBuyerInfoChange('email', e.target.value)}
                  placeholder="john.doe@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={buyerInfo.phone}
                  onChange={(e) => handleBuyerInfoChange('phone', e.target.value)}
                  placeholder="+234 801 234 5678"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ticket Price</span>
                    <span>{formatCurrency(selectedTier.price)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Quantity</span>
                    <span>{quantity}</span>
                  </div>
                  
                  {discountAmount > 0 && (
                    <div className="flex justify-between items-center text-green-600">
                      <span>Discount</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total</span>
                      <span className="text-[#0B63BC]">{formatCurrency(totalAmount)}</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid()}
                  className="w-full bg-[#0B63BC] hover:bg-[#0B63BC]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Payment
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  By proceeding, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TicketPurchaseForm; 