
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Clock, CheckCircle } from "lucide-react";
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
    <>
      {/* Header */}
      <div className="flex items-center mb-6 lg:mb-8">
        <BackButton to="/dashboard" className="mr-2 lg:mr-4" />
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Send Money</h1>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Balance Display */}
          {userData && (
            <Card className="mb-6 lg:mb-8">
              <CardContent className="p-4 lg:p-6">
                <div className="text-center">
                  <p className="text-sm lg:text-base text-gray-600">Available Balance</p>
                  <p className="text-2xl lg:text-3xl font-bold text-green-600">₦{userData.balance?.toLocaleString() || '0'}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Transfer Type Selector */}
          <Card className="mb-6 lg:mb-8">
            <CardContent className="p-4 lg:p-6">
              <div className="grid grid-cols-2 gap-2 lg:gap-4">
                <Button
                  variant={transferType === "billstation" ? "default" : "outline"}
                  size="lg"
                  onClick={() => setTransferType("billstation")}
                  className={transferType === "billstation" ? "bg-primary-600 h-12 lg:h-14" : "h-12 lg:h-14"}
                >
                  Bill Station
                </Button>
                <Button
                  variant={transferType === "bank" ? "default" : "outline"}
                  size="lg"
                  onClick={() => setTransferType("bank")}
                  className={transferType === "bank" ? "bg-primary-600 h-12 lg:h-14" : "h-12 lg:h-14"}
                >
                  Other Banks
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transfer Form */}
          <Card className="mb-6 lg:mb-8">
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl flex items-center gap-2">
                <Send className="h-5 w-5 lg:h-6 lg:w-6" />
                Send Money
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 lg:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="recipient" className="text-sm lg:text-base">
                  {transferType === "billstation" ? "Phone Number or Email" : "Account Number"}
                </Label>
                <Input
                  id="recipient"
                  placeholder={transferType === "billstation" ? "080XXXXXXXX or email" : "Enter account number"}
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="h-12 lg:h-14 text-base"
                />
              </div>

              {transferType !== "billstation" && (
                <div className="space-y-2">
                  <Label htmlFor="bank" className="text-sm lg:text-base">Bank</Label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger className="h-12 lg:h-14">
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
                <div className="p-3 lg:p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" />
                    <span className="text-sm lg:text-base font-medium text-green-800">{accountName}</span>
                  </div>
                </div>
              )}

              {verifyingAccount && (
                <div className="p-3 lg:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm lg:text-base text-blue-800">Verifying account...</span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm lg:text-base">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12 lg:h-14 text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm lg:text-base">Description (Optional)</Label>
                <Input
                  id="description"
                  placeholder="What's this for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-12 lg:h-14 text-base"
                />
              </div>

              <Button
                onClick={handleTransfer}
                className="w-full h-12 lg:h-14 bg-primary-600 hover:bg-primary-700 text-base lg:text-lg font-medium"
                disabled={loading || verifyingAccount}
              >
                {loading ? "Processing..." : `Send ₦${amount || "0"}`}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Transaction History */}
          <Card className="lg:sticky lg:top-8">
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl flex items-center gap-2">
                <Clock className="h-5 w-5 lg:h-6 lg:w-6" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {transactions.length === 0 ? (
                <div className="text-center py-8 lg:py-12">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 lg:h-10 lg:w-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-medium text-gray-900 mb-2">No transactions yet</h3>
                  <p className="text-gray-500 text-sm lg:text-base">Your transfer history will appear here</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 lg:p-6 hover:bg-gray-50">
                      <div className="flex items-center gap-3 lg:gap-4">
                        <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center ${
                          transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                        }`}>
                          <span className={`text-sm lg:text-base ${
                            transaction.type === "credit" ? "text-green-600" : "text-red-600"
                          }`}>
                            {transaction.type === "credit" ? "+" : "-"}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm lg:text-base">{transaction.description}</p>
                          <p className="text-sm text-gray-500">
                            {transaction.created_at ? new Date(transaction.created_at).toLocaleDateString() : 'Recently'}
                          </p>
                        </div>
                      </div>
                      <p className={`font-medium text-sm lg:text-base ${
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
    </>
  );

  return (
    <DesktopLayout>
      <TransferContent />
      <Navigation />
    </DesktopLayout>
  );
};

export default Transfer;
