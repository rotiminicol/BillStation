import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Crypto: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Bill Station Logo" 
                className="h-12 w-auto"
              />
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/landing" className="text-white hover:text-white hover:underline px-3 py-2 text-base font-bold transition-all duration-200">
                Home
              </Link>
              <Link to="/about" className="text-white hover:text-white hover:underline px-3 py-2 text-base font-bold transition-all duration-200">
                About us
              </Link>
              <Link to="/crypto" className="text-white hover:text-white hover:underline px-3 py-2 text-base font-bold transition-all duration-200">
                Crypto
              </Link>
              <Link to="/services" className="text-white hover:text-white hover:underline px-3 py-2 text-base font-bold transition-all duration-200">
                Services
              </Link>
              <Link to="/agent" className="text-white hover:text-white hover:underline px-3 py-2 text-base font-bold transition-all duration-200">
                Become an agent
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link to="/signup">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 border-white px-6 py-2 text-base font-semibold">
                  Register
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 text-base font-semibold">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Buy and Sell Digital Assets Instantly</h1>
            <p className="text-xl max-w-4xl mx-auto mb-8">
              Seamlessly trade digital assets with ease. Enjoy a secure and efficient platform for buying, selling, and managing your transactions effortlessly.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Download App
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Looking for a platform to Buy, Sell, or HODL your digital assets?
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Bill Station is the ultimate solution. Trade securely, manage your assets effortlessly, and experience seamless transactions all in one place.
            </p>
          </div>

          {/* Security Section */}
          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Your Assets, Fully Secured with Bill Station</h2>
            <p className="text-lg text-gray-600 mb-8 text-center">
              At Bill Station, we prioritize the safety of your digital assets. Our advanced security system, coupled with a seamless transaction process, ensures your funds remain protected at all times. More than just a platform, we provide the tools and guidance you need to navigate the world of digital asset trading with confidence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  01
                </div>
                <h3 className="text-xl font-semibold mb-2">Two-Factor Authentication (2FA)</h3>
                <p className="text-gray-600">
                  We enforce 2FA to add an extra layer of security, ensuring that only you can access your account—even if your credentials are compromised.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  02
                </div>
                <h3 className="text-xl font-semibold mb-2">Encrypted Wallets</h3>
                <p className="text-gray-600">
                  Bill Station utilizes highly secure, encrypted wallets to safeguard your digital assets against potential threats and unauthorized access.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  03
                </div>
                <h3 className="text-xl font-semibold mb-2">KYC Verification</h3>
                <p className="text-gray-600">
                  We implement Know Your Customer (KYC) verification to maintain a safe and trustworthy trading environment, preventing fraudulent activities and unauthorized users.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-lg text-gray-600 mb-4">
                With Bill Station, you can trade with peace of mind, knowing your assets are protected by cutting-edge security measures.
              </p>
              <Link to="/welcome">
                <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                  Get Started Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Savings</h3>
                <p className="text-gray-600">
                  Save your cryptocurrency in a secure wallet and access it as needed!
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Wide range of currencies</h3>
                <p className="text-gray-600">
                  Our wallet allows you to Receive, Send and Swap a wide range of Crypto ranging from Bitcoin, Ethereum, Tether, BNB, and many more
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💳</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Your Personalized Wallet</h3>
                <p className="text-gray-600">
                  Send and receive cryptocurrency with your wallet, as well as fund, withdraw, and swap assets at any time.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📈</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Best market prices</h3>
                <p className="text-gray-600">
                  You'll not find good rates like ours in any other place. No one does it like Bill Station.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center mb-16">
            <Link to="/welcome">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                GET STARTED NOW
              </Button>
            </Link>
          </div>

          {/* Instant Crypto Swaps */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img src="/Group 51.png" alt="Crypto Swaps" className="w-full h-auto rounded-lg" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Instant Crypto Swaps</h2>
              <p className="text-lg text-gray-600 mb-6">
                You can swap one asset for the other easily with Bill Station at the current market prices. Don't go through multiple stressful channels when you can do it all on your Bill Station account.
              </p>
              <Link to="/welcome">
                <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Digital Asset Management */}
          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Digital Asset Management with MPC custody wallet</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Safely process crypto payment</h3>
                <p className="text-gray-600">
                  With our custodial online crypto wallets, all your user data is stored in secured storage, which reduces the risk of data being stolen, unless the user shares the details with someone, or their device gets stolen. Be your bank!.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Stay Ahead of Hackers</h3>
                <p className="text-gray-600">
                  Security is paramount when it comes to managing your cryptocurrencies, and our MPC Wallet delivers unbeatable protection.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Safely process crypto payment</h3>
                <p className="text-gray-600">
                  With our custodial online crypto wallets, all your user data is stored in secured storage, which reduces the risk of data being stolen, unless the user shares the details with someone, or their device gets stolen. Be your bank!.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-2">Next level security for your assets</h3>
                <p className="text-gray-600">
                  Say goodbye to the vulnerabilities of traditional single-key wallets and embrace the unbeatable security of our MPC Wallet.
                </p>
              </div>
            </div>
          </div>

          {/* Download App Section */}
          <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Download App Now !</h2>
            <p className="text-xl mb-6">Available on:</p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                <span className="text-white text-lg mr-2">🍎</span>
                App Store
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                <span className="text-white text-lg mr-2">▶️</span>
                Play Store
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2a61de] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src="/logo.png" alt="Bill Station Logo" className="h-8 w-auto mb-4" />
              <p className="text-gray-400">
                With Bill Station app, you can conveniently make payments for almost all of your day-to-day bills,
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/landing" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white">About us</Link></li>
                <li><Link to="/crypto" className="text-gray-400 hover:text-white">Crypto</Link></li>
                <li><Link to="/services" className="text-gray-400 hover:text-white">Services</Link></li>
                <li><Link to="/agent" className="text-gray-400 hover:text-white">Become an agent</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Download</h4>
              <div className="space-y-2">
                <Button className="bg-black text-white hover:bg-gray-800 w-full justify-start">
                  <span className="text-white text-lg mr-2">🍎</span>
                  App Store
                </Button>
                <Button className="bg-black text-white hover:bg-gray-800 w-full justify-start">
                  <span className="text-white text-lg mr-2">▶️</span>
                  Play Store
                </Button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms & conditions</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              Copyright © Bill Station 2025. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Crypto; 