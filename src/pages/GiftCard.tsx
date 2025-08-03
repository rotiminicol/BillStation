import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, ArrowLeft, Lock, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import DesktopLayout from '@/components/DesktopLayout';
import { useNavigate } from 'react-router-dom';
import BrandSelector from '@/components/giftcard/BrandSelector';
import GiftForm from '@/components/giftcard/GiftForm';
import SuccessScreen from '@/components/giftcard/SuccessScreen';
import PurchaseList from '@/components/giftcard/PurchaseList';
import { PinInput } from '@/components/PinInput';

interface GiftCardBrand {
  icon: any;
  label: string;
  value: string;
  color: string;
  discount: string;
  description?: string;
}

interface GiftFormData {
  amount: string;
  recipient: string;
  message: string;
}

interface GiftCardPurchase {
  id: string;
  brand: string;
  amount: number;
  recipient: string;
  date: string;
  status: 'delivered' | 'pending' | 'failed';
}

type Step = 'brand-selection' | 'form' | 'pin' | 'success';

const GiftCard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State management
  const [currentStep, setCurrentStep] = useState<Step>('brand-selection');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [formData, setFormData] = useState<GiftFormData>({
    amount: '',
    recipient: '',
    message: ''
  });
  const [showPinInput, setShowPinInput] = useState(false);
  const [pinError, setPinError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recentPurchases, setRecentPurchases] = useState<GiftCardPurchase[]>([]);
  const [savedRecipients, setSavedRecipients] = useState<string[]>([]);

  // Gift card brands data
  const giftCardBrands: GiftCardBrand[] = [
    { 
      icon: Gift, 
      label: "Amazon", 
      value: "amazon", 
      color: "from-orange-500 to-yellow-500", 
      discount: "10%",
      description: "Shop millions of products"
    },
    { 
      icon: Gift, 
      label: "Apple", 
      value: "apple", 
      color: "from-gray-500 to-gray-700", 
      discount: "5%",
      description: "Apps, music, movies & more"
    },
    { 
      icon: Gift, 
      label: "Google Play", 
      value: "google-play", 
      color: "from-green-500 to-blue-500", 
      discount: "15%",
      description: "Android apps & games"
    },
    { 
      icon: Gift, 
      label: "Steam", 
      value: "steam", 
      color: "from-blue-500 to-purple-500", 
      discount: "8%",
      description: "PC games & software"
    },
    { 
      icon: Gift, 
      label: "Netflix", 
      value: "netflix", 
      color: "from-red-500 to-pink-500", 
      discount: "12%",
      description: "Stream movies & TV shows"
    },
    { 
      icon: Gift, 
      label: "Spotify", 
      value: "spotify", 
      color: "from-green-500 to-emerald-500", 
      discount: "7%",
      description: "Music streaming service"
    },
  ];

  // Load recent purchases and saved recipients
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock recent purchases data
        const mockPurchases: GiftCardPurchase[] = [
          {
            id: "1",
            brand: "Amazon",
            amount: 100,
            recipient: "john@example.com",
            date: "2024-01-15",
            status: "delivered"
          },
          {
            id: "2",
            brand: "Apple",
            amount: 50,
            recipient: "jane@example.com",
            date: "2024-01-14",
            status: "pending"
          },
          {
            id: "3",
            brand: "Google Play",
            amount: 25,
            recipient: "mike@example.com",
            date: "2024-01-13",
            status: "delivered"
          }
        ];
        
        setRecentPurchases(mockPurchases);
        
        // Extract unique recipients for saved recipients
        const recipients = [...new Set(mockPurchases.map(p => p.recipient))];
        setSavedRecipients(recipients);
      } catch (error) {
        console.error('Error fetching gift card data:', error);
        toast({
          title: "Error",
          description: "Failed to load gift card data",
          variant: "destructive"
        });
      }
    };

    fetchData();
  }, [toast]);

  // Handle brand selection
  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    setCurrentStep('form');
  };

  // Handle form data changes
  const handleFormDataChange = (data: GiftFormData) => {
    setFormData(data);
  };

  // Handle form continue
  const handleFormContinue = () => {
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
        
        // Add to recent purchases
        const newPurchase: GiftCardPurchase = {
          id: Date.now().toString(),
          brand: selectedBrand,
          amount: parseInt(formData.amount.replace(/[^0-9]/g, '')),
          recipient: formData.recipient,
          date: new Date().toISOString(),
          status: 'delivered'
        };
        
        setRecentPurchases(prev => [newPurchase, ...prev.slice(0, 4)]);
        
        // Add recipient to saved recipients if not already there
        if (!savedRecipients.includes(formData.recipient)) {
          setSavedRecipients(prev => [...prev, formData.recipient]);
        }

        toast({
          title: "Success!",
          description: "Gift card sent successfully",
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
  const handleBuyAnother = () => {
    setCurrentStep('brand-selection');
    setSelectedBrand('');
    setFormData({ amount: '', recipient: '', message: '' });
  };

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  const handleShareReceipt = () => {
    // Implement share functionality
    toast({
      title: "Receipt Shared",
      description: "Receipt has been shared successfully",
    });
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const getCurrentPurchase = () => ({
    brand: selectedBrand,
    amount: formData.amount,
    recipient: formData.recipient,
    message: formData.message,
    transactionId: 'GC' + Date.now().toString().slice(-8),
    timestamp: new Date().toLocaleString()
  });

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
                <h1 className="text-2xl font-bold text-gray-900">Gift Cards</h1>
                <p className="text-gray-600">Send digital gift cards instantly</p>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {currentStep === 'brand-selection' && (
                  <motion.div
                    key="brand-selection"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <BrandSelector
                      brands={giftCardBrands}
                      selectedBrand={selectedBrand}
                      onBrandSelect={handleBrandSelect}
                    />
                  </motion.div>
                )}

                {currentStep === 'form' && (
                  <motion.div
                    key="form"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <GiftForm
                      selectedBrand={selectedBrand}
                      formData={formData}
                      onFormDataChange={handleFormDataChange}
                      onContinue={handleFormContinue}
                      savedRecipients={savedRecipients}
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
                    <SuccessScreen
                      purchase={getCurrentPurchase()}
                      onBuyAnother={handleBuyAnother}
                      onGoHome={handleGoHome}
                      onShareReceipt={handleShareReceipt}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <PurchaseList
                  purchases={recentPurchases}
                  onPurchaseClick={(purchase) => {
                    // Handle purchase click - could show details modal
                    console.log('Purchase clicked:', purchase);
                  }}
                />
              </div>
            </div>
          </div>
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
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Enter Your PIN
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Complete your gift card purchase
                  </p>
                </div>

                                 <PinInput
                   onComplete={handlePinComplete}
                   onClose={() => {
                     setShowPinInput(false);
                     setCurrentStep('form');
                   }}
                   error={pinError}
                 />

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    <Shield className="w-3 h-3 inline mr-1" />
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

export default GiftCard;