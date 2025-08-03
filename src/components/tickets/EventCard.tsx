import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Star, Ticket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Event {
  id: string;
  title: string;
  artist?: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'music' | 'comedy' | 'festival' | 'sports' | 'theater';
  rating?: number;
  soldPercentage?: number;
  tags?: string[];
}

interface EventCardProps {
  event: Event;
  onViewDetails: (eventId: string) => void;
  onBuyTicket: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  onViewDetails,
  onBuyTicket
}) => {
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
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const discountPercentage = event.originalPrice 
    ? Math.round(((event.originalPrice - event.price) / event.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      className="cursor-pointer"
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Event Banner */}
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(event.category)}`}>
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <Badge className="bg-white/20 text-white border-white/30">
                <span className="mr-1">{getCategoryIcon(event.category)}</span>
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </Badge>
            </div>

            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-red-500 text-white border-red-600">
                  {discountPercentage}% OFF
                </Badge>
              </div>
            )}

            {/* Sold Percentage */}
            {event.soldPercentage && (
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-black/50 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-300"
                    style={{ width: `${event.soldPercentage}%` }}
                  ></div>
                </div>
                <p className="text-white text-xs mt-1">
                  {event.soldPercentage}% sold
                </p>
              </div>
            )}

            {/* Event Image Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-6xl opacity-30">
                {getCategoryIcon(event.category)}
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Event Title and Artist */}
          <div className="mb-3">
            <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
              {event.title}
            </h3>
            {event.artist && (
              <p className="text-sm text-gray-600 mb-2">{event.artist}</p>
            )}
          </div>

          {/* Event Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-[#0B63BC]" />
              <span>{formatDate(event.date)}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2 text-[#0B63BC]" />
              <span>{event.time}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2 text-[#0B63BC]" />
              <span className="line-clamp-1">{event.venue}, {event.city}</span>
            </div>
          </div>

          {/* Rating */}
          {event.rating && (
            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(event.rating!)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">
                {event.rating.toFixed(1)}
              </span>
            </div>
          )}

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {event.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {event.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{event.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-[#0B63BC]">
                {formatCurrency(event.price)}
              </span>
              {event.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(event.originalPrice)}
                </span>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(event.id);
                }}
                className="border-[#0B63BC] text-[#0B63BC] hover:bg-[#0B63BC] hover:text-white"
              >
                Details
              </Button>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onBuyTicket(event.id);
                }}
                className="bg-[#0B63BC] hover:bg-[#0B63BC]/90"
              >
                <Ticket className="w-4 h-4 mr-1" />
                Buy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EventCard; 