
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Clock, CheckCircle, Sparkles, Activity, DollarSign, ArrowRight, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import DesktopLayout from "@/components/DesktopLayout";
import BackButton from "@/components/ui/back-button";
import { useToast } from "@/hooks/use-toast";
import { paystackService, Bank } from "@/services/paystack";
import { transactionAPI, authAPI } from "@/services/api";

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
  const [transactions, setTransactions] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [animateCards, setAnimateCards] = useState(false);
  const { toast } = useToast();

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
      } finally {
        // Trigger animations after data loads
        setTimeout(() => setAnimateCards(true), 100);
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

      toast({
        title: "Transfer Successful!",
        description: `₦${transferAmount.toLocaleString()} sent successfully.`,
      });

      // Reset form
      setAmount("");
      setRecipient("");
      setDescription("");
      setAccountName("");
      setSelectedBank("");

      // Refresh transactions and user data
      const [updatedTransactions, updatedUser] = await Promise.all([
        transactionAPI.getAll(),
        authAPI.getMe()
      ]);
      setTransactions(updatedTransactions);
      setUserData(updatedUser);

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

  const TransferContent = () => (
    <div className="space-y-8">
      {/* Header with Animation */}
      <div className={`flex items-center mb-8 transition-all duration-1000 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <BackButton to="/dashboard" className="mr-4" />
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Send Money
          </h1>
          <Sparkles className="h-6 w-6 text-blue-500 animate-pulse" />
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Balance Display with Premium Design */}
          {userData && (
            <div className={`transition-all duration-1000 delay-200 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white overflow-hidden relative group">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/50 via-green-700/50 to-green-800/50"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700 delay-300"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-white/5 to-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl group-hover:blur-2xl transition-all duration-1000"></div>
                
                <CardContent className="p-8 relative z-10">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <DollarSign className="h-6 w-6 text-green-100" />
                      <p className="text-green-100 text-lg font-medium">Available Balance</p>
                    </div>
                    <p className="text-4xl font-bold tracking-tight">₦{userData.balance?.toLocaleString() || '0'}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Transfer Type Selector with Enhanced Design */}
          <div className={`transition-all duration-1000 delay-400 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={transferType === "billstation" ? "default" : "outline"}
                    size="lg"
                    onClick={() => setTransferType("billstation")}
                    className={`h-16 text-lg font-semibold transition-all duration-300 ${
                      transferType === "billstation" 
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg" 
                        : "border-2 hover:border-blue-500 hover:bg-blue-50"
                    }`}
                  >
                    <Shield className="h-5 w-5 mr-2" />
                    Bill Station
                  </Button>
                  <Button
                    variant={transferType === "bank" ? "default" : "outline"}
                    size="lg"
                    onClick={() => setTransferType("bank")}
                    className={`h-16 text-lg font-semibold transition-all duration-300 ${
                      transferType === "bank" 
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg" 
                        : "border-2 hover:border-blue-500 hover:bg-blue-50"
                    }`}
                  >
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Other Banks
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transfer Form with Premium Design */}
          <div className={`transition-all duration-1000 delay-600 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Send className="h-6 w-6 text-white" />
                  </div>
                  Send Money
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="recipient" className="text-base font-semibold">
                    {transferType === "billstation" ? "Phone Number or Email" : "Account Number"}
                  </Label>
                  <Input
                    id="recipient"
                    placeholder={transferType === "billstation" ? "080XXXXXXXX or email" : "Enter account number"}
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300 text-base"
                  />
                </div>

                {transferType !== "billstation" && (
                  <div className="space-y-2">
                    <Label htmlFor="bank" className="text-base font-semibold">Bank</Label>
                    <Select value={selectedBank} onValueChange={setSelectedBank}>
                      <SelectTrigger className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300">
                        <SelectValue placeholder="Select bank" />
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

                {accountName && (
                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-base font-semibold text-green-800">{accountName}</span>
                    </div>
                  </div>
                )}

                {verifyingAccount && (
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-base text-blue-800">Verifying account...</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-base font-semibold">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base font-semibold">Description (Optional)</Label>
                  <Input
                    id="description"
                    placeholder="What's this for?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="h-14 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300 text-base"
                  />
                </div>

                <Button
                  onClick={handleTransfer}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  disabled={loading || verifyingAccount}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Send ₦{amount || "0"}
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar with Enhanced Design */}
        <div className="lg:col-span-1">
          <div className={`transition-all duration-1000 delay-800 ${animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Transaction History */}
            <Card className="lg:sticky lg:top-8 border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {transactions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Send className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">No transactions yet</h3>
                    <p className="text-gray-500 text-base mb-8">Your transfer history will appear here</p>
                    <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                      <Link to="/transfer">Send Money</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {transactions.slice(0, 5).map((transaction, index) => (
                      <div 
                        key={transaction.id} 
                        className={`flex items-center justify-between p-6 hover:bg-gray-50 transition-all duration-300 hover:shadow-sm ${index === transactions.length - 1 ? 'rounded-b-lg' : 'border-b border-gray-100'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                            transaction.type === "credit" ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-red-500 to-red-600'
                          }`}>
                            <span className={`text-white font-bold text-lg ${
                              transaction.type === "credit" ? 'text-green-100' : 'text-red-100'
                            }`}>
                              {transaction.type === "credit" ? "+" : "-"}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-base">{transaction.description}</p>
                            <p className="text-sm text-gray-500">
                              {transaction.created_at ? new Date(transaction.created_at).toLocaleDateString() : 'Recently'}
                            </p>
                          </div>
                        </div>
                        <p className={`font-bold text-base ${
                          transaction.type === "credit" ? "text-green-600" : "text-red-600"
                        }`}>
                          {transaction.type === "credit" ? "+" : "-"}₦{(transaction.amount || 0).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DesktopLayout>
      <TransferContent />
      <Navigation />
    </DesktopLayout>
  );
};

export default Transfer;
