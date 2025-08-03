import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Star, Ticket, ArrowLeft, Share2, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
  description: string;
  category: 'music' | 'comedy' | 'festival' | 'sports' | 'theater';
  rating?: number;
  tags?: string[];
  ticketTiers: TicketTier[];
}

interface EventDetailProps {
  event: Event;
  onBack: () => void;
  onBuyTicket: (eventId: string, tierId: string) => void;
  onShare: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({
  event,
  onBack,
  onBuyTicket,
  onShare
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState(false);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Events
        </Button>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
            className="border-gray-300 hover:bg-gray-50"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFavorite(!isFavorite)}
            className={`border-gray-300 hover:bg-gray-50 ${
              isFavorite ? 'text-red-500 border-red-300' : ''
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Event Banner */}
      <div className="relative">
        <div className={`h-64 rounded-2xl bg-gradient-to-br ${getCategoryColor(event.category)} relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="absolute top-4 left-4">
            <Badge className="bg-white/20 text-white border-white/30">
              <span className="mr-1">{getCategoryIcon(event.category)}</span>
              {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
            </Badge>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
            {event.artist && (
              <p className="text-xl opacity-90 mb-3">{event.artist}</p>
            )}
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{event.venue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Description */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>About This Event</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                {event.description}
              </p>
              
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Ticket Selection */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Select Tickets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {event.ticketTiers.map((tier) => {
                  const discountPercentage = tier.originalPrice 
                    ? Math.round(((tier.originalPrice - tier.price) / tier.originalPrice) * 100)
                    : 0;
                  const soldPercentage = Math.round((tier.sold / (tier.sold + tier.available)) * 100);

                  return (
                    <div
                      key={tier.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedTier === tier.id
                          ? 'border-[#0B63BC] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedTier(tier.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{tier.name}</h4>
                        {discountPercentage > 0 && (
                          <Badge className="bg-red-500 text-white text-xs">
                            {discountPercentage}% OFF
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xl font-bold text-[#0B63BC]">
                          {formatCurrency(tier.price)}
                        </span>
                        {tier.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatCurrency(tier.originalPrice)}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{tier.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>{tier.available} available</span>
                        <span>{soldPercentage}% sold</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#0B63BC] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${soldPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
                
                <Button
                  onClick={() => selectedTier && onBuyTicket(event.id, selectedTier)}
                  disabled={!selectedTier}
                  className="w-full bg-[#0B63BC] hover:bg-[#0B63BC]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                >
                  <Ticket className="w-4 h-4 mr-2" />
                  Buy Tickets
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventDetail; 