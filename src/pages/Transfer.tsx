
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Globe, CheckCircle, X, ArrowLeft, Eye, EyeOff, Shield, Users, Activity, Lock } from "lucide-react";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";
import { paystackService, Bank } from "@/services/paystack";
import { transactionAPI, authAPI } from "@/services/api";
import { User } from "@/types";
import { useAuth } from "@/hooks/use-auth";

const Transfer = () => {
  const [transferType, setTransferType] = useState("billstation");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  const [showBalance, setShowBalance] = useState(true);
  const [pin, setPin] = useState("");
  const [accountName, setAccountName] = useState("");
  const [verifyingAccount, setVerifyingAccount] = useState(false);
  const [transferDetails, setTransferDetails] = useState<{
    amount: number;
    recipient: string;
    accountName: string;
    type: string;
    bank?: string;
  } | null>(null);
  const [currentStep, setCurrentStep] = useState<'method' | 'details' | 'pin' | 'success'>('method');
  const { user } = useAuth();

  // Load data once on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [banksData, userResponse] = await Promise.all([
          paystackService.getBanks(),
          authAPI.getMe()
        ]);
        setBanks(banksData);
        setUserData(userResponse);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  // Verify account when recipient and bank are provided
  useEffect(() => {
    const verifyAccount = async () => {
      if (transferType === "bank" && recipient.length === 10 && selectedBank) {
        setVerifyingAccount(true);
        try {
          const verification = await paystackService.verifyAccount(recipient, selectedBank);
          setAccountName(verification.account_name);
        } catch (error) {
          console.error('Account verification failed:', error);
          setAccountName("");
        } finally {
          setVerifyingAccount(false);
        }
      } else {
        setAccountName("");
      }
    };

    const timeoutId = setTimeout(() => {
      verifyAccount();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [recipient, selectedBank, transferType]);

  const handleTransferMethodSelect = (method: string) => {
    setTransferType(method);
    setCurrentStep('details');
  };

  const handleTransfer = async () => {
    if (!amount || !recipient) {
      alert("Please fill in all required fields.");
      return;
    }

    const transferAmount = parseFloat(amount);
    if (transferAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (userData?.balance < transferAmount) {
      alert("You don't have enough balance for this transfer.");
      return;
    }

    // Store transfer details and show PIN step
    setTransferDetails({
      amount: transferAmount,
      recipient: recipient,
      accountName: accountName,
      type: transferType,
      bank: banks.find(b => b.code === selectedBank)?.name
    });
    setCurrentStep('pin');
  };

  const handlePinSubmit = async () => {
    if (pin.length !== 4) {
      alert("Please enter a 4-digit PIN");
      return;
    }

    setLoading(true);
    
    try {
      // Simulate PIN verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const transactionData = {
        type: 'debit' as const,
        amount: transferDetails!.amount,
        description: `Transfer to ${transferDetails!.accountName || transferDetails!.recipient}`,
        recipient: transferDetails!.accountName || transferDetails!.recipient,
        reference: `TXN_${Date.now()}`
      };

      await transactionAPI.create(transactionData);
      
      const newBalance = userData!.balance - transferDetails!.amount;
      await authAPI.updateBalance(newBalance);
      setUserData(prev => prev ? { ...prev, balance: newBalance } : null);
      
      setCurrentStep('success');
      
    } catch (error) {
      console.error('Transfer failed:', error);
      alert("Transfer failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDone = () => {
    // Reset everything and go back to method selection
    setCurrentStep('method');
    setAmount("");
    setRecipient("");
    setSelectedBank("");
    setAccountName("");
    setPin("");
    setTransferDetails(null);
  };

  const handleBack = () => {
    if (currentStep === 'details') {
      setCurrentStep('method');
    } else if (currentStep === 'pin') {
      setCurrentStep('details');
    }
  };

  return (
    <DesktopLayout>
      <div className="flex h-screen">
        <Navigation />
        <div className="flex-1 overflow-hidden">
          <div className="h-full bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
            <div className="h-full flex">
              {/* Left Side - Dynamic Container */}
              {currentStep !== 'method' && (
                <div className="w-1/2 p-8 flex items-center justify-center">
                  <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-2xl w-full max-w-md">
                    {currentStep === 'details' && (
                      <div className="text-center">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Send className="h-10 w-10 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Transfer Details</h3>
                        <div className="space-y-4 text-left">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                            <span className="text-gray-600">Method:</span>
                            <span className="font-semibold text-gray-900">
                              {transferType === "billstation" ? "Bill Station" : "Bank Transfer"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                            <span className="text-gray-600">Amount:</span>
                            <span className="font-semibold text-gray-900">₦{amount || '0.00'}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                            <span className="text-gray-600">Recipient:</span>
                            <span className="font-semibold text-gray-900">{recipient || 'Not entered'}</span>
                          </div>
                          {accountName && (
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                              <span className="text-green-600">Account Name:</span>
                              <span className="font-semibold text-green-700">{accountName}</span>
                            </div>
                          )}
                          {transferType === "bank" && selectedBank && (
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                              <span className="text-gray-600">Bank:</span>
                              <span className="font-semibold text-gray-900">
                                {banks.find(b => b.code === selectedBank)?.name}
                              </span>
                            </div>
                          )}
                        </div>
                        <Button
                          onClick={handleTransfer}
                          disabled={!amount || !recipient}
                          className="w-full h-12 bg-[#0B63BC] hover:bg-[#0B63BC]/90 mt-6"
                        >
                          Continue to PIN
                        </Button>
                        <Button
                          onClick={handleBack}
                          variant="outline"
                          className="w-full h-12 mt-3"
                        >
                          Back
                        </Button>
                      </div>
                    )}

                    {currentStep === 'pin' && (
                      <div className="text-center">
                        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Lock className="h-10 w-10 text-orange-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Enter PIN</h3>
                        <p className="text-gray-600 mb-6">Please enter your 4-digit PIN to complete the transfer</p>
                        
                        <div className="mb-6">
                          <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value.slice(0, 4))}
                            placeholder="Enter PIN"
                            className="w-full h-14 px-4 text-2xl font-bold text-center border border-gray-300 rounded-xl focus:border-[#0B63BC] focus:outline-none"
                            maxLength={4}
                          />
                        </div>

                        <Button
                          onClick={handlePinSubmit}
                          disabled={pin.length !== 4 || loading}
                          className="w-full h-12 bg-[#0B63BC] hover:bg-[#0B63BC]/90 mb-3"
                        >
                          {loading ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Processing...
                            </div>
                          ) : (
                            'Confirm Transfer'
                          )}
                        </Button>
                        <Button
                          onClick={handleBack}
                          variant="outline"
                          className="w-full h-12"
                        >
                          Back
                        </Button>
                      </div>
                    )}

                    {currentStep === 'success' && (
                      <div className="text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <CheckCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Transfer Successful!</h3>
                        <div className="bg-green-50 rounded-2xl p-6 mb-6">
                          <p className="text-green-800 text-lg mb-2">
                            We've successfully sent <span className="font-bold">₦{transferDetails?.amount?.toLocaleString()}</span> to
                          </p>
                          <p className="text-green-700 text-xl font-semibold">
                            {transferDetails?.accountName || transferDetails?.recipient}
                          </p>
                        </div>
                        <Button
                          onClick={handleDone}
                          className="w-full h-12 bg-[#0B63BC] hover:bg-[#0B63BC]/90"
                        >
                          Done
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Right Side - Main Content */}
              <div className={`${currentStep === 'method' ? 'w-full' : 'w-1/2'} p-8 flex items-center justify-center`}>
                <div className="w-full max-w-2xl">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-gray-900 mb-3">Transfer Funds</h1>
                    <p className="text-gray-600 text-xl">Send money securely to anyone, anywhere.</p>
                  </div>

                  {/* Balance Card */}
                  <div className="bg-gradient-to-br from-[#0B63BC] via-[#0B63BC]/90 to-[#0B63BC]/80 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden mb-8">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-white/80 text-lg font-medium">Primary Wallet</span>
                        <button 
                          onClick={() => setShowBalance(!showBalance)}
                          className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                        >
                          {showBalance ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                        </button>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-6xl font-bold mb-3">
                          {showBalance ? `₦${userData?.balance?.toLocaleString() || '0'}` : "••••••••"}
                        </div>
                        <div className="text-white/70 text-xl">
                          {showBalance ? "Available Balance" : "••••••••••••••"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transfer Method Selection */}
                  {currentStep === 'method' && (
                    <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-lg">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                        <Activity className="h-6 w-6 text-[#0B63BC]" />
                        Select Transfer Method
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                        <button
                          onClick={() => handleTransferMethodSelect("billstation")}
                          className="p-6 rounded-2xl border-2 border-gray-200 hover:border-[#0B63BC] hover:bg-[#0B63BC]/5 transition-all duration-300 hover:shadow-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                              <img src="/logo.png" alt="Bill Station" className="h-6 w-6" />
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-lg text-gray-900">Bill Station</div>
                              <div className="text-sm text-gray-500">Instant transfer</div>
                            </div>
                          </div>
                        </button>

                        <button
                          onClick={() => handleTransferMethodSelect("bank")}
                          className="p-6 rounded-2xl border-2 border-gray-200 hover:border-[#0B63BC] hover:bg-[#0B63BC]/5 transition-all duration-300 hover:shadow-lg"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                              <Globe className="h-6 w-6 text-[#0B63BC]" />
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-lg text-gray-900">Bank Transfer</div>
                              <div className="text-sm text-gray-500">NIBSS transfer</div>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Transfer Form */}
                  {currentStep === 'details' && (
                    <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-lg">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                        <Send className="h-6 w-6 text-[#0B63BC]" />
                        Transfer Details
                      </h3>
                      <div className="space-y-6">
                        {/* Amount */}
                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-3">Amount</label>
                          <div className="relative">
                            <input
                              type="number"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              placeholder="0.00"
                              className="w-full h-16 px-6 text-2xl font-bold border border-gray-300 rounded-xl focus:border-[#0B63BC] focus:outline-none focus:ring-2 focus:ring-[#0B63BC]/20"
                            />
                            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg font-medium">
                              NGN
                            </div>
                          </div>
                        </div>

                        {/* Account Number */}
                        <div>
                          <label className="block text-lg font-medium text-gray-700 mb-3">
                            Account Number
                          </label>
                          <input
                            type="text"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="Enter account number"
                            className="w-full h-16 px-6 text-xl border border-gray-300 rounded-xl focus:border-[#0B63BC] focus:outline-none focus:ring-2 focus:ring-[#0B63BC]/20"
                          />
                        </div>

                        {/* Account Name Display */}
                        {accountName && (
                          <div className="p-6 bg-green-50 border border-green-200 rounded-xl">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                              </div>
                              <div>
                                <p className="text-green-800 font-semibold text-lg">Account Verified</p>
                                <p className="text-green-700 text-lg">{accountName}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Bank Selection */}
                        {transferType === "bank" && (
                          <div>
                            <label className="block text-lg font-medium text-gray-700 mb-3">Select Bank</label>
                            <Select value={selectedBank} onValueChange={setSelectedBank}>
                              <SelectTrigger className="h-16 border border-gray-300 focus:border-[#0B63BC] rounded-xl text-lg">
                                <SelectValue placeholder="Choose a bank" />
                              </SelectTrigger>
                              <SelectContent>
                                {banks.map((bank) => (
                                  <SelectItem key={bank.code} value={bank.code}>
                                    {bank.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
};

export default Transfer;
