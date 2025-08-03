import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, ArrowLeft, Filter, Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import DesktopLayout from '@/components/DesktopLayout';
import { useNavigate } from 'react-router-dom';
import EventCard from '@/components/tickets/EventCard';
import EventDetail from '@/components/tickets/EventDetail';
import TicketPurchaseForm from '@/components/tickets/TicketPurchaseForm';
import TicketSuccessScreen from '@/components/tickets/TicketSuccessScreen';
import { PinInput } from '@/components/PinInput';

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
  description: string;
  ticketTiers: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    description: string;
    benefits: string[];
    available: number;
    sold: number;
  }[];
}

interface TicketPurchase {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  city: string;
  tierName: string;
  quantity: number;
  totalAmount: number;
  buyerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  transactionId: string;
  purchaseDate: string;
}

type Step = 'events' | 'event-detail' | 'purchase' | 'pin' | 'success';

const BuyTickets = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management
  const [currentStep, setCurrentStep] = useState<Step>('events');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedTierId, setSelectedTierId] = useState('');
  const [purchaseData, setPurchaseData] = useState<any>(null);
  const [showPinInput, setShowPinInput] = useState(false);
  const [pinError, setPinError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [events, setEvents] = useState<Event[]>([]);

  // Mock events data
  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Wizkid Live in Concert',
      artist: 'Wizkid',
      date: '2024-08-15',
      time: '8:00 PM',
      venue: 'Eko Convention Centre',
      city: 'Lagos',
      price: 25000,
      originalPrice: 30000,
      image: '/wizkid.jpg',
      category: 'music',
      rating: 4.8,
      soldPercentage: 75,
      tags: ['Afrobeats', 'Live Music', 'Concert'],
      description: 'Experience the magic of Wizkid live in concert! Join us for an unforgettable night of music, energy, and pure entertainment. This is a must-attend event for all music lovers.',
      ticketTiers: [
        {
          id: 'vip',
          name: 'VIP Package',
          price: 50000,
          originalPrice: 60000,
          description: 'Premium seating with meet & greet',
          benefits: ['Front row seating', 'Meet & greet with Wizkid', 'Exclusive merchandise', 'Complimentary drinks'],
          available: 50,
          sold: 35
        },
        {
          id: 'regular',
          name: 'Regular Admission',
          price: 25000,
          originalPrice: 30000,
          description: 'General admission seating',
          benefits: ['General seating', 'Access to all performances'],
          available: 500,
          sold: 375
        }
      ]
    },
    {
      id: '2',
      title: 'Lagos Comedy Night',
      artist: 'Basketmouth & Friends',
      date: '2024-09-01',
      time: '7:30 PM',
      venue: 'Muson Centre',
      city: 'Lagos',
      price: 15000,
      image: '/comedy.jpg',
      category: 'comedy',
      rating: 4.6,
      soldPercentage: 60,
      tags: ['Comedy', 'Stand-up', 'Entertainment'],
      description: 'Get ready for a night of laughter with Nigeria\'s finest comedians. Basketmouth leads an all-star lineup that will have you rolling in the aisles.',
      ticketTiers: [
        {
          id: 'premium',
          name: 'Premium Seating',
          price: 20000,
          description: 'Premium seating with better view',
          benefits: ['Premium seating', 'Complimentary snacks'],
          available: 100,
          sold: 60
        },
        {
          id: 'general',
          name: 'General Admission',
          price: 15000,
          description: 'General admission seating',
          benefits: ['General seating', 'Access to all performances'],
          available: 300,
          sold: 180
        }
      ]
    },
    {
      id: '3',
      title: 'Afrobeat Festival',
      artist: 'Multiple Artists',
      date: '2024-10-15',
      time: '6:00 PM',
      venue: 'Tafawa Balewa Square',
      city: 'Lagos',
      price: 35000,
      image: '/festival.jpg',
      category: 'festival',
      rating: 4.9,
      soldPercentage: 85,
      tags: ['Festival', 'Afrobeat', 'Multiple Artists'],
      description: 'The biggest Afrobeat festival of the year! Featuring top artists from across Africa. A celebration of music, culture, and unity.',
      ticketTiers: [
        {
          id: 'vip-festival',
          name: 'VIP Festival Pass',
          price: 75000,
          description: 'All-access VIP experience',
          benefits: ['VIP area access', 'Meet & greet with artists', 'Exclusive food & drinks', 'Backstage tour'],
          available: 200,
          sold: 170
        },
        {
          id: 'regular-festival',
          name: 'Regular Festival Pass',
          price: 35000,
          description: 'General festival access',
          benefits: ['General festival access', 'All performances'],
          available: 1000,
          sold: 850
        }
      ]
    }
  ];

  useEffect(() => {
    setEvents(mockEvents);
  }, []);

  // Filter events based on search and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (event.artist && event.artist.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle event selection
  const handleEventSelect = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
      setCurrentStep('event-detail');
    }
  };

  // Handle buy ticket
  const handleBuyTicket = (eventId: string, tierId: string) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
      setSelectedTierId(tierId);
      setCurrentStep('purchase');
    }
  };

  // Handle purchase form completion
  const handlePurchaseComplete = (data: any) => {
    setPurchaseData(data);
    setShowPinInput(true);
    setCurrentStep('pin');
  };

  // Handle PIN completion
  const handlePinComplete = async (pin: string) => {
    setIsProcessing(true);
    setPinError('');

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (pin === '1234') {
        // Success - show success screen
        setShowPinInput(false);
        setCurrentStep('success');
        
        toast({
          title: "Success!",
          description: "Tickets purchased successfully",
        });
      } else {
        setPinError('Incorrect PIN. Please try again.');
        toast({
          title: "Error",
          description: "Incorrect PIN entered",
          variant: "destructive"
        });
      }
    } catch (error) {
      setPinError('Payment failed. Please try again.');
      toast({
        title: "Error",
        description: "Payment processing failed",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle success screen actions
  const handleViewTickets = () => {
    // Navigate to tickets history
    navigate('/transactions');
  };

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  const handleShare = () => {
    toast({
      title: "Shared!",
      description: "Event details have been shared",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Downloaded!",
      description: "Tickets have been downloaded",
    });
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const getCurrentPurchase = (): TicketPurchase => {
    if (!selectedEvent || !purchaseData) {
      return {
        eventId: '',
        eventTitle: '',
        eventDate: '',
        eventTime: '',
        venue: '',
        city: '',
        tierName: '',
        quantity: 0,
        totalAmount: 0,
        buyerInfo: { firstName: '', lastName: '', email: '', phone: '' },
        transactionId: '',
        purchaseDate: ''
      };
    }

    const selectedTier = selectedEvent.ticketTiers.find(tier => tier.id === selectedTierId);
    
    return {
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      eventDate: selectedEvent.date,
      eventTime: selectedEvent.time,
      venue: selectedEvent.venue,
      city: selectedEvent.city,
      tierName: selectedTier?.name || '',
      quantity: purchaseData.quantity,
      totalAmount: purchaseData.totalAmount,
      buyerInfo: purchaseData.buyerInfo,
      transactionId: 'TK' + Date.now().toString().slice(-8),
      purchaseDate: new Date().toLocaleString()
    };
  };

  return (
    <DesktopLayout>
      <div className="min-h-screen bg-[#F6F6F8]">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/dashboard')} 
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Buy Tickets</h1>
                <p className="text-gray-600">Discover and book amazing events</p>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {currentStep === 'events' && (
              <motion.div
                key="events"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {/* Search and Filters */}
                <div className="mb-8 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search events, artists, or venues..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline" className="border-gray-300">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                  
                  {/* Category Filters */}
                  <div className="flex space-x-2">
                    {['all', 'music', 'comedy', 'festival', 'sports', 'theater'].map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category)}
                        className={selectedCategory === category ? "bg-[#0B63BC]" : "border-gray-300"}
                      >
                        {category === 'all' ? 'All Events' : 
                         category.charAt(0).toUpperCase() + category.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onViewDetails={handleEventSelect}
                      onBuyTicket={handleBuyTicket}
                    />
                  ))}
                </div>

                {filteredEvents.length === 0 && (
                  <div className="text-center py-12">
                    <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                    <p className="text-gray-600">Try adjusting your search or filters</p>
                  </div>
                )}
              </motion.div>
            )}

            {currentStep === 'event-detail' && selectedEvent && (
              <motion.div
                key="event-detail"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <EventDetail
                  event={selectedEvent}
                  onBack={() => setCurrentStep('events')}
                  onBuyTicket={handleBuyTicket}
                  onShare={handleShare}
                />
              </motion.div>
            )}

            {currentStep === 'purchase' && selectedEvent && (
              <motion.div
                key="purchase"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <TicketPurchaseForm
                  event={selectedEvent}
                  selectedTierId={selectedTierId}
                  onBack={() => setCurrentStep('event-detail')}
                  onComplete={handlePurchaseComplete}
                />
              </motion.div>
            )}

            {currentStep === 'success' && (
              <motion.div
                key="success"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <TicketSuccessScreen
                  purchase={getCurrentPurchase()}
                  onViewTickets={handleViewTickets}
                  onGoHome={handleGoHome}
                  onShare={handleShare}
                  onDownload={handleDownload}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* PIN Input Modal */}
        <AnimatePresence>
          {showPinInput && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-md"
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-[#0B63BC] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Ticket className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Complete Your Purchase
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Enter your PIN to confirm ticket purchase
                  </p>
                </div>

                <PinInput
                  onComplete={handlePinComplete}
                  onClose={() => {
                    setShowPinInput(false);
                    setCurrentStep('purchase');
                  }}
                  error={pinError}
                />

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Your payment is secure and encrypted
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DesktopLayout>
  );
};

export default BuyTickets;