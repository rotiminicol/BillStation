import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Wifi, Car, Utensils, Dumbbell, Droplet, WashingMachine, AirVent, Shield, Users, Bed } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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

interface HotelCardProps {
  hotel: Hotel;
  onSelect: (hotel: Hotel) => void;
  index: number;
}

const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  onSelect,
  index
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="h-4 w-4" />;
      case 'parking':
        return <Car className="h-4 w-4" />;
      case 'restaurant':
        return <Utensils className="h-4 w-4" />;
      case 'gym':
        return <Dumbbell className="h-4 w-4" />;
      case 'pool':
        return <Droplet className="h-4 w-4" />;
      case 'laundry':
        return <WashingMachine className="h-4 w-4" />;
      case 'ac':
        return <AirVent className="h-4 w-4" />;
      case 'security':
        return <Shield className="h-4 w-4" />;
      default:
        return <Bed className="h-4 w-4" />;
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: index * 0.1,
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

  const discountPercentage = hotel.originalPrice 
    ? Math.round(((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Image Section */}
        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-3 left-3">
            <Badge className={`${hotel.type === 'hotel' ? 'bg-blue-600' : 'bg-green-600'} text-white`}>
              {hotel.type === 'hotel' ? 'Hotel' : 'Shortlet'}
            </Badge>
          </div>
          {discountPercentage > 0 && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-red-500 text-white">
                {discountPercentage}% OFF
              </Badge>
            </div>
          )}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-2 text-white">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">{hotel.location}</span>
              <span className="text-xs opacity-75">• {hotel.distance}</span>
            </div>
          </div>
        </div>
        
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 mb-1">{hotel.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(hotel.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    {hotel.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({hotel.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {hotel.description}
          </p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.slice(0, 4).map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
            {hotel.amenities.length > 4 && (
              <span className="text-xs text-gray-500">
                +{hotel.amenities.length - 4} more
              </span>
            )}
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-[#0B63BC]">
                {formatCurrency(hotel.price)}
              </span>
              {hotel.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(hotel.originalPrice)}
                </span>
              )}
              <span className="text-sm text-gray-500">/night</span>
            </div>
            
            <Button
              onClick={() => onSelect(hotel)}
              disabled={!hotel.available}
              className={`${
                hotel.available
                  ? 'bg-[#0B63BC] hover:bg-[#0B63BC]/90'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {hotel.available ? 'Select' : 'Unavailable'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HotelCard; 