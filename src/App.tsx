
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthProvider } from "@/hooks/use-auth";
import ErrorBoundary from "@/components/ErrorBoundary";

// Desktop Imports
import Splash from "./pages/Splash";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment";
import CardPage from "./pages/Card";
import OurStation from "./pages/OurStation";
import Bills from "./pages/Bills";
import Cards from "./pages/Cards";
import Profile from "./pages/Profile";
import Transfer from "./pages/Transfer";
import AirtimeSwap from "./pages/AirtimeSwap";
import FlightBooking from "./pages/FlightBooking";
import BitcoinTrading from "./pages/BitcoinTrading";
import VirtualCard from "./pages/VirtualCard";
import GiftCard from "./pages/GiftCard";
import HotelBooking from "./pages/HotelBooking";
import ChauffeurService from "./pages/ChauffeurService";
import Transactions from "./pages/Transactions";
import TransactionDetails from "./pages/TransactionDetails";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import FlightBookPrivateJet from "./pages/FlightBookPrivateJet";
import BuyTickets from "./pages/BuyTickets";
import ConvertAsset from "./pages/ConvertAsset";
import BookRide from "./pages/BookRide";
import UpgradeTier from "./pages/UpgradeTier";
import TransactionHistory from "./pages/TransactionHistory";
import Settings from "./pages/Settings";
import HelpCenter from "./pages/HelpCenter";
import Notifications from "./pages/Notifications";

// Mobile Imports
import MobileDashboard from "./pages/mobile/Dashboard";
import MobileLogin from "./pages/mobile/Login";
import MobileSignup from "./pages/mobile/Signup";
import MobileForgotPassword from "./pages/mobile/ForgotPassword";
import MobileOnboarding from "./pages/mobile/Onboarding";
import MobileWelcome from "./pages/mobile/Welcome";
import MobileTransfer from "./pages/mobile/Transfer";
import MobileBills from "./pages/mobile/Bills";
import MobileAirtimeSwap from "./pages/mobile/AirtimeSwap";
import MobileFlightBook from "./pages/mobile/FlightBook";
import MobileBitcoinTrading from "./pages/mobile/BitcoinTrading";
import MobileGiftCard from "./pages/mobile/GiftCard";
import MobileVirtualCard from "./pages/mobile/VirtualCard";
import MobileProfile from "./pages/mobile/Profile";
import MobileCards from "./pages/mobile/Cards";
import MobileHotelBooking from "./pages/mobile/HotelBooking";
import MobileChauffeurService from "./pages/mobile/ChauffeurService";
import MobileTransactions from "./pages/mobile/Transactions";
import MobileTransactionDetails from "./pages/mobile/TransactionDetails";
import MobileAccount from "./pages/mobile/Account";
import MobileFlightBookPrivateJet from "./pages/mobile/FlightBookPrivateJet";
import MobileBuyTickets from "./pages/mobile/BuyTickets";
import MobileConvertAsset from "./pages/mobile/ConvertAsset";
import MobileBookRide from "./pages/mobile/BookRide";
import MobileTransactionHistory from "./pages/mobile/TransactionHistory";

const queryClient = new QueryClient();

// Check if device is mobile
const isMobileDevice = () => {
  return window.innerWidth < 1024;
};

// Main App Router
const AppRouter = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobileDevice());
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  console.log('AppRouter rendering...', { isMobile });

  // Render mobile or desktop routes based on screen size
  if (isMobile) {
    return (
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/welcome" element={<MobileWelcome />} />
        <Route path="/login" element={<MobileLogin />} />
        <Route path="/signup" element={<MobileSignup />} />
        <Route path="/forgot-password" element={<MobileForgotPassword />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/onboarding" element={<MobileOnboarding />} />
        <Route path="/dashboard" element={<MobileDashboard />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/card" element={<CardPage />} />
        <Route path="/our-station" element={<OurStation />} />
        <Route path="/transfer" element={<MobileTransfer />} />
        <Route path="/bills" element={<MobileBills />} />
        <Route path="/cards" element={<MobileCards />} />
        <Route path="/airtime-swap" element={<MobileAirtimeSwap />} />
        <Route path="/flight-book" element={<MobileFlightBook />} />
        <Route path="/bitcoin-trading" element={<MobileBitcoinTrading />} />
        <Route path="/gift-card" element={<MobileGiftCard />} />
        <Route path="/virtual-card" element={<MobileVirtualCard />} />
        <Route path="/hotel-booking" element={<MobileHotelBooking />} />
        <Route path="/chauffeur-service" element={<MobileChauffeurService />} />
        <Route path="/profile" element={<MobileProfile />} />
        <Route path="/transactions" element={<MobileTransactions />} />
        <Route path="/transactions/:category" element={<MobileTransactionHistory />} />
        <Route path="/transactions/:id" element={<MobileTransactionDetails />} />
        <Route path="/account" element={<MobileAccount />} />
        <Route path="/flight-book-private-jet" element={<MobileFlightBookPrivateJet />} />
        <Route path="/buy-tickets" element={<MobileBuyTickets />} />
                              <Route path="/convert-asset" element={<MobileConvertAsset />} />
                      <Route path="/book-ride" element={<MobileBookRide />} />
                      <Route path="/upgrade-tier" element={<UpgradeTier />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/help-center" element={<HelpCenter />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // Desktop routes
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/payment" element={<Payment />} />
              <Route path="/card" element={<CardPage />} />
        <Route path="/our-station" element={<OurStation />} />
        <Route path="/bills" element={<Bills />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/transfer" element={<Transfer />} />
      <Route path="/airtime-swap" element={<AirtimeSwap />} />
      <Route path="/flight-booking" element={<FlightBooking />} />
      <Route path="/bitcoin-trading" element={<BitcoinTrading />} />
      <Route path="/virtual-card" element={<VirtualCard />} />
      <Route path="/gift-card" element={<GiftCard />} />
      <Route path="/hotel-booking" element={<HotelBooking />} />
      <Route path="/chauffeur-service" element={<ChauffeurService />} />
              <Route path="/transactions" element={<Transactions />} />
        <Route path="/transactions/:category" element={<TransactionHistory />} />
        <Route path="/transactions/:id" element={<TransactionDetails />} />
        <Route path="/account" element={<Account />} />
      <Route path="/flight-book-private-jet" element={<FlightBookPrivateJet />} />
      <Route path="/buy-tickets" element={<BuyTickets />} />
                          <Route path="/convert-asset" element={<ConvertAsset />} />
                    <Route path="/book-ride" element={<BookRide />} />
                    <Route path="/upgrade-tier" element={<UpgradeTier />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/help-center" element={<HelpCenter />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  console.log('App component rendering...');
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <AppRouter />
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
