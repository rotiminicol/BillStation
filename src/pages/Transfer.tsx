
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Send, Clock, CheckCircle, Activity, DollarSign, ArrowRight, Shield, Users, Globe, Zap, AlertCircle, CreditCard, Eye, EyeOff, Plus, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { paystackService, Bank } from "@/services/paystack";
import { transactionAPI, authAPI } from "@/services/api";
import { getBankLogo } from "@/lib/bankLogos";
import { User, Transaction } from "@/types";
import ViewAllButton from "@/components/ui/view-all-button";
import { useAuth } from "@/hooks/use-auth";

const Transfer = () => {
  const [transferType, setTransferType] = useState("billstation");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [accountName, setAccountName] = useState("");
  const [verifyingAccount, setVerifyingAccount] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userData, setUserData] = useState<User | null>(null);
  const [showBalance, setShowBalance] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch banks and user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [banksData, userResponse, transactionsResponse] = await Promise.all([
          paystackService.getBanks(),
          authAPI.getMe(),
          transactionAPI.getAll().catch(() => [])
        ]);
        
        setBanks(banksData);
        setUserData(userResponse);
        setTransactions(transactionsResponse);
        console.log('Transfer data loaded:', { banks: banksData.length, user: userResponse });
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load transfer data",
          variant: "destructive"
        });
      }
    };

    fetchData();
  }, [toast]);

  // Verify account when account number and bank are provided
  useEffect(() => {
    const verifyAccount = async () => {
      if (transferType !== "billstation" && recipient.length === 10 && selectedBank) {
        setVerifyingAccount(true);
        try {
          const bankData = banks.find(bank => bank.code === selectedBank);
          if (bankData) {
            const verification = await paystackService.verifyAccount(recipient, selectedBank);
            setAccountName(verification.account_name);
            toast({
              title: "Account Verified",
              description: `${verification.account_name} - ${bankData.name}`,
            });
          }
        } catch (error) {
          console.error('Account verification failed:', error);
          setAccountName("");
          toast({
            title: "Verification Failed",
            description: "Could not verify account details",
            variant: "destructive"
          });
        } finally {
          setVerifyingAccount(false);
        }
      }
    };

    verifyAccount();
  }, [recipient, selectedBank, transferType, banks, toast]);

  const handleTransfer = async () => {
    if (!amount || !recipient) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const transferAmount = parseFloat(amount);
    
    if (transferAmount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount.",
        variant: "destructive"
      });
      return;
    }

    if (userData?.balance < transferAmount) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough balance for this transfer.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Create transaction record
      const transactionData = {
        type: 'debit' as const,
        amount: transferAmount,
        description: description || `Transfer to ${accountName || recipient}`,
        recipient: accountName || recipient,
        reference: `TXN_${Date.now()}`
      };

      await transactionAPI.create(transactionData);
      
      // Update user balance
      const newBalance = userData.balance - transferAmount;
      await authAPI.updateBalance(newBalance);
      
      // Update local state
      setUserData(prev => prev ? { ...prev, balance: newBalance } : null);
      
      toast({
        title: "Transfer Successful",
        description: `₦${transferAmount.toLocaleString()} transferred successfully`,
      });
      
      // Reset form
      setAmount("");
      setRecipient("");
      setDescription("");
      setAccountName("");
      setSelectedBank("");
      
    } catch (error) {
      console.error('Transfer failed:', error);
      toast({
        title: "Transfer Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const userEmail = user?.email || userData?.email || "user@example.com";
  const userBalance = userData?.balance || 100000;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
      duration: 2000,
    });
  };

  const TransferContent = () => (
    <div className="space-y-8">
      {/* Top Section: User Greeting and Balance */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage 
              src={userData?.profilePicture} 
              alt={`${userData?.firstName || 'User'} ${userData?.lastName || ''}`}
            />
            <AvatarFallback className="bg-[#0B63BC] text-white font-semibold text-sm">
              {userData?.profilePicture ? 
                (userData?.firstName?.[0] || 'A') + (userData?.lastName?.[0] || '') :
                userEmail.charAt(0).toUpperCase()
              }
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transfer Funds</h1>
            <p className="text-gray-600 text-sm">Send money securely to anyone, anywhere.</p>
          </div>
        </div>
      </div>

      {/* Balance Card - Same as Dashboard */}
      <div className="bg-gradient-to-br from-[#0B63BC] via-[#0B63BC]/90 to-[#0B63BC]/80 rounded-2xl p-8 text-white relative overflow-hidden min-h-[280px]">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full"></div>
        <div className="absolute top-12 right-8 w-1 h-1 bg-white/30 rounded-full"></div>
        <div className="absolute bottom-8 left-6 w-3 h-3 bg-white/15 rounded-full"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Bill Station" className="w-8 h-8 rounded-lg" />
              <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30 border-0">
                Primary Wallet
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalance(!showBalance)}
              className="text-white hover:bg-white/20 rounded-full p-2"
            >
              {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="text-center mb-6">
            <motion.div 
              className="text-4xl font-bold mb-2"
              key={showBalance ? 'visible' : 'hidden'}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {showBalance ? `₦ ${userBalance.toLocaleString()}.00` : "••••••••"}
            </motion.div>
            
            {/* Account Details */}
            <motion.div 
              className="space-y-3"
              key={showBalance ? 'details-visible' : 'details-hidden'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {/* Account Number */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-white/70 text-sm">Account:</span>
                <span className="text-white font-mono text-sm">
                  {showBalance ? userData?.accountNumber || "1234567890" : "••••••••••"}
                </span>
                <button 
                  className="text-white/60 hover:text-white/80 transition-colors"
                  onClick={() => copyToClipboard(userData?.accountNumber || "1234567890", "Account Number")}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>

              {/* Wallet Address */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-white/70 text-sm">Wallet:</span>
                <span className="text-white font-mono text-xs max-w-32 truncate">
                  {showBalance ? `0x${String(userData?.id || "1234567890abcdef").slice(0, 16)}...` : "••••••••••••••••"}
                </span>
                <button 
                  className="text-white/60 hover:text-white/80 transition-colors"
                  onClick={() => copyToClipboard(`0x${String(userData?.id || "1234567890abcdef")}`, "Wallet Address")}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>

              {/* Account Status */}
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/70 text-sm">
                  {showBalance ? "Active" : "••••"}
                </span>
                <span className="text-white/50 text-xs">
                  {showBalance ? "• Verified" : "••••••"}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Transfer Type Selector - Modern Design */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transfer Method</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setTransferType("billstation")}
                className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                  transferType === "billstation" 
                    ? "border-[#0B63BC] bg-[#0B63BC]/5 shadow-sm" 
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transferType === "billstation" ? "bg-[#0B63BC] text-white" : "bg-gray-100 text-gray-600"
                  }`}>
                    <Shield className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className={`font-semibold ${
                      transferType === "billstation" ? "text-[#0B63BC]" : "text-gray-900"
                    }`}>Bill Station</div>
                    <div className="text-xs text-gray-500">Instant transfer</div>
                  </div>
                </div>
                {transferType === "billstation" && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-[#0B63BC] rounded-full"></div>
                )}
              </button>

              <button
                  onClick={() => setTransferType("bank")}
                className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                    transferType === "bank" 
                    ? "border-[#0B63BC] bg-[#0B63BC]/5 shadow-sm" 
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    transferType === "bank" ? "bg-[#0B63BC] text-white" : "bg-gray-100 text-gray-600"
                  }`}>
                    <Globe className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className={`font-semibold ${
                      transferType === "bank" ? "text-[#0B63BC]" : "text-gray-900"
                    }`}>Bank Transfer</div>
                    <div className="text-xs text-gray-500">NIBSS transfer</div>
                  </div>
                </div>
                {transferType === "bank" && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-[#0B63BC] rounded-full"></div>
                )}
              </button>
            </div>
              </div>

          {/* Transfer Form - Modern Design */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Transfer Details</h3>
            <div className="space-y-6">
              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium text-gray-700">Amount (₦)</Label>
                <div className="relative">
                <Input
                  id="amount"
                  type="number"
                    placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                    className="h-14 text-lg font-semibold border-gray-200 focus:border-[#0B63BC] focus:ring-[#0B63BC]/20"
                />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    NGN
                  </div>
                </div>
              </div>

              {/* Recipient */}
              <div className="space-y-2">
                <Label htmlFor="recipient" className="text-sm font-medium text-gray-700">
                  {transferType === "billstation" ? "Phone Number" : "Account Number"}
                </Label>
                <Input
                  id="recipient"
                  type="text"
                  placeholder={transferType === "billstation" ? "Enter phone number" : "Enter account number"}
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="h-14 border-gray-200 focus:border-[#0B63BC] focus:ring-[#0B63BC]/20"
                />
              </div>

              {/* Bank Selection (for bank transfers) */}
              {transferType === "bank" && (
                <div className="space-y-2">
                  <Label htmlFor="bank" className="text-sm font-medium text-gray-700">Select Bank</Label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger className="h-14 border-gray-200 focus:border-[#0B63BC] focus:ring-[#0B63BC]/20">
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

              {/* Account Name Display */}
              {accountName && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-xl"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-green-800 font-medium">Account Verified</p>
                      <p className="text-green-700 text-sm">{accountName}</p>
                    </div>
                </div>
                </motion.div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="What's this transfer for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[80px] border-gray-200 focus:border-[#0B63BC] focus:ring-[#0B63BC]/20 resize-none"
                />
              </div>

              {/* Transfer Button */}
              <Button
                onClick={handleTransfer}
                disabled={loading || verifyingAccount}
                className="w-full h-14 bg-[#0B63BC] hover:bg-[#0B63BC]/90 text-lg font-semibold rounded-xl shadow-sm"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Transfer...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Send ₦{amount ? parseFloat(amount).toLocaleString() : '0'}
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Transactions - Modern Design */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <ViewAllButton />
            </div>
            <div className="space-y-3">
                {transactions.length === 0 ? (
                  <div className="text-center py-8">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <CreditCard className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">No transactions yet</p>
                  </div>
                ) : (
                  transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                      <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100">
                          <img
                            src={getBankLogo({ code: transaction.bankCode, name: transaction.bankName || transaction.description })}
                            alt="Bank"
                            className="w-6 h-6 object-contain"
                            onError={e => { e.currentTarget.src = '/placeholder.svg'; }}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.created_at ? new Date(transaction.created_at).toLocaleDateString() : 'Recently'}</p>
                        </div>
                      </div>
                      <p className={`font-bold text-sm ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'credit' ? '+' : '-'}₦{(transaction.amount || 0).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
              </div>

          {/* Quick Actions - Modern Design */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" size="sm" asChild className="w-full justify-start h-12 rounded-xl border-gray-200 hover:border-[#0B63BC] hover:bg-[#0B63BC]/5">
                <Link to="/bills" className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0B63BC]/10 rounded-lg flex items-center justify-center">
                    <Zap className="h-4 w-4 text-[#0B63BC]" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Pay Bills</div>
                    <div className="text-xs text-gray-500">Utilities & services</div>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-start h-12 rounded-xl border-gray-200 hover:border-[#0B63BC] hover:bg-[#0B63BC]/5">
                <Link to="/cards" className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0B63BC]/10 rounded-lg flex items-center justify-center">
                    <Shield className="h-4 w-4 text-[#0B63BC]" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Manage Cards</div>
                    <div className="text-xs text-gray-500">Virtual & physical cards</div>
                  </div>
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-start h-12 rounded-xl border-gray-200 hover:border-[#0B63BC] hover:bg-[#0B63BC]/5">
                <Link to="/transactions" className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0B63BC]/10 rounded-lg flex items-center justify-center">
                    <Activity className="h-4 w-4 text-[#0B63BC]" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900">View History</div>
                    <div className="text-xs text-gray-500">Transaction history</div>
                  </div>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DesktopLayout>
      <TransferContent />
    </DesktopLayout>
  );
};

export default Transfer;
