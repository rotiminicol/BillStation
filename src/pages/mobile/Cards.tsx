import { useState, useEffect } from "react";
import { Plus, CreditCard, ExternalLink, Eye, EyeOff, Copy, MoreVertical } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";

interface Card {
  id: string;
  name: string;
  number: string;
  type: 'billstation' | 'external';
  brand: 'visa' | 'mastercard' | 'verve';
  balance: number;
  status: 'active' | 'blocked' | 'expired';
  expiryDate: string;
  isDefault?: boolean;
}

const Cards = () => {
  const [loading, setLoading] = useState(true);
  const [showCardNumbers, setShowCardNumbers] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const { toast } = useToast();

  // Mock data for cards
  const mockCards: Card[] = [
    {
      id: "1",
      name: "Bill Station Card",
      number: "4532 **** **** 1234",
      type: "billstation",
      brand: "visa",
      balance: 2500.00,
      status: "active",
      expiryDate: "12/25",
      isDefault: true
    },
    {
      id: "2",
      name: "Savings Card",
      number: "5123 **** **** 5678",
      type: "billstation",
      brand: "mastercard",
      balance: 1800.50,
      status: "active",
      expiryDate: "08/26"
    },
    {
      id: "3",
      name: "External Visa",
      number: "4111 **** **** 1111",
      type: "external",
      brand: "visa",
      balance: 3200.75,
      status: "active",
      expiryDate: "03/27"
    },
    {
      id: "4",
      name: "External Mastercard",
      number: "5555 **** **** 4444",
      type: "external",
      brand: "mastercard",
      balance: 1500.25,
      status: "active",
      expiryDate: "11/26"
    }
  ];

  useEffect(() => {
    const fetchCards = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCards(mockCards);
      } catch (error) {
        console.error('Error fetching cards:', error);
        toast({
          title: "Error",
          description: "Failed to load cards",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [toast]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const getBrandColor = (brand: string) => {
    switch (brand) {
      case 'visa':
        return 'from-blue-600 to-blue-800';
      case 'mastercard':
        return 'from-orange-500 to-red-600';
      case 'verve':
        return 'from-green-600 to-green-800';
      default:
        return 'from-gray-600 to-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      case 'expired':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const copyCardNumber = (cardNumber: string) => {
    navigator.clipboard.writeText(cardNumber.replace(/\*/g, ''));
    toast({
      title: "Copied!",
      description: "Card number copied to clipboard",
    });
  };

  const handleAddCard = () => {
    toast({
      title: "Add Card",
      description: "Card addition feature coming soon!",
    });
  };

  const handleCardAction = (action: string, card: Card) => {
    toast({
      title: action,
      description: `${action} feature for ${card.name} coming soon!`,
    });
  };

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-full">
          <Loader text="Loading cards..." />
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Cards</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your Bill Station and external cards
            </p>
          </div>
          <Button
            onClick={handleAddCard}
                            className="bg-[#0B63BC] hover:bg-[#0B63BC]/90 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Card
          </Button>
        </div>

        {/* Cards List */}
        <div className="space-y-4">
          {cards.map((card) => (
            <MobileCard key={card.id} className="overflow-hidden">
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 rounded-xl">
                {/* Card Network Logo */}
                <div className="absolute top-4 left-4">
                  {card.brand === 'visa' ? (
                    <div className="w-12 h-8 bg-[#0B63BC] rounded flex items-center justify-center">
                      <div className="text-white font-bold text-xs">VISA</div>
                    </div>
                  ) : card.brand === 'mastercard' ? (
                    <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center">
                      <div className="text-white font-bold text-xs">MC</div>
                    </div>
                  ) : (
                    <div className="w-12 h-8 bg-green-600 rounded flex items-center justify-center">
                      <div className="text-white font-bold text-xs">VERVE</div>
                    </div>
                  )}
                </div>
                

                
                {/* Card Number */}
                <div className="mt-12 mb-6">
                  <p className="text-xs text-gray-300 mb-2">CARD NUMBER</p>
                  <p className="text-xl font-mono font-bold tracking-wider">
                    {showCardNumbers ? card.number.replace(/\*/g, '') : card.number}
                  </p>
                </div>
                
                {/* Card Holder Name */}
                <div className="mb-4">
                  <p className="text-xs text-gray-300 mb-1">CARD HOLDER</p>
                  <p className="font-semibold text-lg">JOHN DOE</p>
                </div>
                
                {/* Expiry Date and CVV */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-300 mb-1">EXPIRES</p>
                    <p className="font-semibold">{card.expiryDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-300 mb-1">CVV</p>
                    <p className="font-semibold">***</p>
                  </div>
                </div>
                
                {/* Bank Logo */}
                <div className="absolute bottom-4 right-4">
                  <div className="text-white font-bold text-sm">BILL STATION</div>
                </div>
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                  {card.isDefault && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      DEFAULT
                    </span>
                  )}
                  <button
                    onClick={() => setShowCardNumbers(!showCardNumbers)}
                    className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    {showCardNumbers ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => copyCardNumber(card.number)}
                    className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setSelectedCard(card)}
                    className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Card Actions */}
              <div className="p-4 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Available Balance</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(card.balance)}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(card.status)}`}>
                    {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleCardAction("View Details", card)}
                  >
                    Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleCardAction("Block Card", card)}
                  >
                    Block
                  </Button>
                </div>
              </div>
            </MobileCard>
          ))}
        </div>

        {/* Empty State */}
        {cards.length === 0 && (
          <MobileCard className="text-center py-12">
            <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Cards Yet</h3>
            <p className="text-gray-600 mb-6">
              Add your first card to start making payments
            </p>
            <Button onClick={handleAddCard} className="bg-[#0B63BC] hover:bg-[#0B63BC]/90">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Card
            </Button>
          </MobileCard>
        )}
      </div>
    </MobileLayout>
  );
};

export default Cards; 