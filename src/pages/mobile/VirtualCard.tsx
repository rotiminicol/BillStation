import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Plus, Eye, EyeOff, Copy, MoreVertical, ArrowRight, CheckCircle } from "lucide-react";
import MobileLayout from "@/components/MobileLayout";
import { MobileCard } from "@/components/ui/mobile-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/Loader";
import ViewAllButton from "@/components/ui/view-all-button";

interface VirtualCard {
  id: string;
  name: string;
  number: string;
  type: 'visa' | 'mastercard';
  balance: number;
  status: 'active' | 'blocked' | 'expired';
  expiryDate: string;
  cvv: string;
  isDefault?: boolean;
}

const VirtualCard = () => {
  const [loading, setLoading] = useState(true);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [selectedCard, setSelectedCard] = useState<VirtualCard | null>(null);
  const [cardName, setCardName] = useState("");
  const [cardType, setCardType] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [virtualCards, setVirtualCards] = useState<VirtualCard[]>([]);
  const { toast } = useToast();

  const cardTypes = [
    { icon: CreditCard, label: "Visa", value: "visa", color: "from-blue-500 to-blue-800" },
    { icon: CreditCard, label: "Mastercard", value: "mastercard", color: "from-orange-500 to-red-600" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock virtual cards data
        const mockCards: VirtualCard[] = [
          {
            id: "1",
            name: "Shopping Card",
            number: "4532 **** **** 1234",
            type: "visa",
            balance: 2500.00,
            status: "active",
            expiryDate: "12/25",
            cvv: "123",
            isDefault: true
          },
          {
            id: "2",
            name: "Travel Card",
            number: "5123 **** **** 5678",
            type: "mastercard",
            balance: 1800.50,
            status: "active",
            expiryDate: "08/26",
            cvv: "456"
          },
          {
            id: "3",
            name: "Business Card",
            number: "4111 **** **** 1111",
            type: "visa",
            balance: 5000.75,
            status: "active",
            expiryDate: "03/27",
            cvv: "789"
          }
        ];
        
        setVirtualCards(mockCards);
      } catch (error) {
        console.error('Error fetching virtual card data:', error);
        toast({
          title: "Error",
          description: "Failed to load virtual card data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleCreateCard = async () => {
    if (!cardName || !cardType) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate card creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Card Created",
        description: "Your virtual card has been created successfully",
      });
      
      // Reset form
      setCardName("");
      setCardType("");
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
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

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center h-full">
          <Loader text="Loading virtual cards..." />
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Virtual Cards</h1>
            <p className="text-sm text-gray-600 mt-1">
              Create and manage your virtual cards
            </p>
          </div>

          {/* Balance Card */}
          <MobileCard className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6">
            <div className="text-center mb-4">
              <p className="text-sm text-indigo-100 mb-2">Total Balance</p>
              <h2 className="text-3xl font-bold">$9,300.25</h2>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-white/20">
              <div>
                <p className="text-xs text-indigo-200">Active Cards</p>
                <p className="text-sm font-medium">3</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-indigo-200">This Month</p>
                <p className="text-sm font-medium">$2,450.00</p>
              </div>
            </div>
          </MobileCard>
        </div>

        {/* Card Type Selection */}
        <div className="grid grid-cols-2 gap-3">
          {cardTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setCardType(type.value)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                cardType === type.value
                  ? 'bg-indigo-50 border-2 border-indigo-200'
                  : 'bg-white border border-gray-200 hover:bg-gray-50'
              }`}
            >
                              <div className="w-12 h-12 rounded-full bg-[#0B63BC]/10 flex items-center justify-center mb-3">
                                  <type.icon className="h-5 w-5 text-[#0B63BC]" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">{type.label}</span>
            </button>
          ))}
        </div>

        {/* Create Card Form */}
        {cardType && (
          <MobileCard>
            <MobileCard.Header>
              <MobileCard.Title>Create {cardType.toUpperCase()} Virtual Card</MobileCard.Title>
            </MobileCard.Header>
            
            <MobileCard.Content className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Card Name</Label>
                <Input
                  id="cardName"
                  placeholder="Enter card name"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              
              <Button
                onClick={handleCreateCard}
                disabled={isProcessing}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </div>
                ) : (
                  "Create Virtual Card"
                )}
              </Button>
            </MobileCard.Content>
          </MobileCard>
        )}

        {/* Virtual Cards List */}
        <MobileCard>
          <MobileCard.Header>
            <MobileCard.Title>Your Virtual Cards</MobileCard.Title>
            <ViewAllButton category="virtual-card" />
          </MobileCard.Header>
          
          <MobileCard.Content className="mt-4 space-y-4">
            {virtualCards.length > 0 ? (
              virtualCards.map((card) => (
                <div key={card.id} className="border border-gray-200 rounded-xl overflow-hidden">
                  {/* Realistic ATM Card Display */}
                  <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 rounded-xl">
                                        {/* Card Network Logo */}
                    <div className="absolute top-4 left-4">
                      {card.type === 'visa' ? (
                        <div className="w-12 h-8 bg-[#0B63BC] rounded flex items-center justify-center">
                          <div className="text-white font-bold text-xs">VISA</div>
                        </div>
                      ) : (
                        <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center">
                          <div className="text-white font-bold text-xs">MC</div>
                        </div>
                      )}
                    </div>
                    

                    
                    {/* Card Number */}
                    <div className="mt-12 mb-6">
                      <p className="text-xs text-gray-300 mb-2">CARD NUMBER</p>
                      <p className="text-xl font-mono font-bold tracking-wider">
                        {showCardDetails ? card.number.replace(/\*/g, '') : card.number}
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
                        <p className="font-semibold">{showCardDetails ? card.cvv : '***'}</p>
                      </div>
                    </div>
                    

                    
                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex items-center space-x-2">
                      {card.isDefault && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          DEFAULT
                        </span>
                      )}
                      <button
                        onClick={() => setShowCardDetails(!showCardDetails)}
                        className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                      >
                        {showCardDetails ? (
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
                        onClick={() => setSelectedCard(card)}
                      >
                        Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setSelectedCard(card)}
                      >
                        Block
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No virtual cards yet</p>
                <p className="text-gray-400 text-xs mt-1">Create your first virtual card to get started</p>
              </div>
            )}
          </MobileCard.Content>
        </MobileCard>
      </div>
    </MobileLayout>
  );
};

export default VirtualCard;
