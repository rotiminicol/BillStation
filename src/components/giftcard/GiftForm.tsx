import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, DollarSign, User, Gift } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GiftFormData {
  amount: string;
  recipient: string;
  message: string;
}

interface GiftFormProps {
  selectedBrand: string;
  formData: GiftFormData;
  onFormDataChange: (data: GiftFormData) => void;
  onContinue: () => void;
  savedRecipients?: string[];
}

const GiftForm: React.FC<GiftFormProps> = ({
  selectedBrand,
  formData,
  onFormDataChange,
  onContinue,
  savedRecipients = []
}) => {
  const [focusedField, setFocusedField] = useState<string>('');
  const [showSavedRecipients, setShowSavedRecipients] = useState(false);

  const quickAmounts = [10, 25, 50, 100, 200, 500];

  const formatCurrency = (value: string) => {
    // Remove all non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    
    if (numericValue === '') return '';
    
    // Convert to number and format
    const number = parseInt(numericValue, 10);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const handleAmountChange = (value: string) => {
    const formatted = formatCurrency(value);
    onFormDataChange({ ...formData, amount: formatted });
  };

  const handleQuickAmountSelect = (amount: number) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
    onFormDataChange({ ...formData, amount: formatted });
  };

  const handleRecipientSelect = (recipient: string) => {
    onFormDataChange({ ...formData, recipient });
    setShowSavedRecipients(false);
  };

  const isFormValid = () => {
    const numericAmount = formData.amount.replace(/[^0-9]/g, '');
    return selectedBrand && 
           formData.amount && 
           parseInt(numericAmount) >= 5 && 
           formData.recipient && 
           formData.recipient.includes('@');
  };

  const getSelectedBrandInfo = () => {
    const brands = [
      { value: 'amazon', label: 'Amazon', color: 'from-orange-500 to-yellow-500' },
      { value: 'apple', label: 'Apple', color: 'from-gray-500 to-gray-700' },
      { value: 'google-play', label: 'Google Play', color: 'from-green-500 to-blue-500' },
      { value: 'steam', label: 'Steam', color: 'from-blue-500 to-purple-500' },
      { value: 'netflix', label: 'Netflix', color: 'from-red-500 to-pink-500' },
      { value: 'spotify', label: 'Spotify', color: 'from-green-500 to-emerald-500' },
    ];
    return brands.find(brand => brand.value === selectedBrand);
  };

  const brandInfo = getSelectedBrandInfo();

  const formVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Selected Brand Header */}
      {brandInfo && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className={`inline-flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r ${brandInfo.color} text-white`}>
            <Gift className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-bold">{brandInfo.label} Gift Card</h2>
              <p className="text-sm opacity-90">Instant delivery via email</p>
            </div>
          </div>
        </motion.div>
      )}

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-[#0B63BC]" />
            <span>Purchase Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Amount Selection */}
          <div className="space-y-3">
            <Label htmlFor="amount" className="text-sm font-medium">
              Gift Card Amount
            </Label>
            
            <motion.div
              variants={inputVariants}
              whileFocus="focus"
              className="relative"
            >
              <Input
                id="amount"
                type="text"
                placeholder="$0.00"
                value={formData.amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                onFocus={() => setFocusedField('amount')}
                onBlur={() => setFocusedField('')}
                className={`text-lg font-semibold ${
                  focusedField === 'amount' ? 'ring-2 ring-[#0B63BC]' : ''
                }`}
              />
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </motion.div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((amount) => (
                <motion.button
                  key={amount}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickAmountSelect(amount)}
                  className="p-2 text-sm border border-gray-200 rounded-lg hover:border-[#0B63BC] hover:bg-blue-50 transition-colors"
                >
                  ${amount}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Recipient Email */}
          <div className="space-y-3">
            <Label htmlFor="recipient" className="text-sm font-medium">
              Recipient Email
            </Label>
            
            <motion.div
              variants={inputVariants}
              whileFocus="focus"
              className="relative"
            >
              <Input
                id="recipient"
                type="email"
                placeholder="recipient@example.com"
                value={formData.recipient}
                onChange={(e) => onFormDataChange({ ...formData, recipient: e.target.value })}
                onFocus={() => {
                  setFocusedField('recipient');
                  if (savedRecipients.length > 0) {
                    setShowSavedRecipients(true);
                  }
                }}
                onBlur={() => {
                  setFocusedField('');
                  // Delay hiding to allow clicking on saved recipients
                  setTimeout(() => setShowSavedRecipients(false), 200);
                }}
                className={`${
                  focusedField === 'recipient' ? 'ring-2 ring-[#0B63BC]' : ''
                }`}
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </motion.div>

            {/* Saved Recipients */}
            {showSavedRecipients && savedRecipients.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1"
              >
                {savedRecipients.map((recipient, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecipientSelect(recipient)}
                    className="w-full p-3 text-left hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{recipient}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Personal Message */}
          <div className="space-y-3">
            <Label htmlFor="message" className="text-sm font-medium">
              Personal Message (Optional)
            </Label>
            
            <motion.div
              variants={inputVariants}
              whileFocus="focus"
            >
              <Textarea
                id="message"
                placeholder="Add a personal message to your gift card..."
                value={formData.message}
                onChange={(e) => onFormDataChange({ ...formData, message: e.target.value })}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField('')}
                className={`resize-none ${
                  focusedField === 'message' ? 'ring-2 ring-[#0B63BC]' : ''
                }`}
                rows={3}
              />
            </motion.div>
          </div>

          {/* Continue Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={onContinue}
              disabled={!isFormValid()}
              className="w-full bg-[#0B63BC] hover:bg-[#0B63BC]/90 disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              Continue to Payment
            </Button>
          </motion.div>

          {/* Security Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-3 bg-green-50 rounded-lg border border-green-200"
          >
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm text-green-800 font-medium">Secure Payment</p>
                <p className="text-xs text-green-700">Your payment information is encrypted and secure</p>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GiftForm; 