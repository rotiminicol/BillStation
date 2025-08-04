import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Services: React.FC = () => {
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
            <h1 className="text-5xl font-bold mb-6">Services</h1>
            <p className="text-xl max-w-4xl mx-auto mb-8">
              Experience the freedom and convenience of instant connectivity by using our airtime and data purchase system. We've partnered with these providers to ensure that you can make payments quickly and easily.
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
          {/* Airtime to Cash Section */}
          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Turn Airtime into Real Money — Instantly.</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">⚡</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">💨</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Instant Payment</h3>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl">🔒</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">100% Secure</h3>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                  Swap Now
                </Button>
              </div>
              <div>
                <img src="/image1.png" alt="Airtime to Cash" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💧</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Order Drinking Water</h3>
                <p className="text-gray-600">
                  Fast, fresh delivery to your doorstep. Choose from 3- or 5-gallon. Add a countertop dispenser for convenience. Tap to order – hydration made simple!
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">✈️</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Bookings & Ticket Purchases</h3>
                <p className="text-gray-600">
                  Book your hotels and flights with us! Enjoy exclusive airport ride bookings for smooth, private transportation. Whether you're planning a short getaway or a long-term stay, we offer tailored accommodations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💳</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Pay Your Utility Bills Effortlessly</h3>
                <p className="text-gray-600">
                  Effortless Payment Solutions for Your Utility Bills: Simplify Your Expenses. Just like using your favorite app, but fulfilled through our trusted partners.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Bill Payment Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-2xl">📺</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">TV/Cable Bills</h3>
                <p className="text-gray-600">
                  Tired of the inconvenience involved in paying your TV/Cable bills? Bill Station has the perfect solution for you! Introducing our hassle-free online payment system that allows you to effortlessly settle your TV/Cable bills from the comfort of your own home.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-2xl">🎲</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Betting</h3>
                <p className="text-gray-600">
                  Complicated payment processes when settling your sports betting bills? We have the perfect solution for you! with our new app that allows you to effortlessly manage your betting payments, ensuring a thrilling and convenient experience every time.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Electricity Bills</h3>
                <p className="text-gray-600">
                  With our intuitive app, you can bid farewell to the time-consuming process of visiting payment centers or writing checks. BILL STATION provides a seamless experience, enabling you to pay your electricity bills conveniently from the comfort of your own home, anytime, anywhere.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-2xl">🌐</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Internet Bills</h3>
                <p className="text-gray-600">
                  Are you tired of the hassle involved in paying your internet bills? We have the perfect solution for you! Introducing our streamlined online payment system that allows you to effortlessly settle your internet bills from the comfort of your own home.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Airport Pick-Up Services */}
          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Airport Pick-Up Services</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Touch down and leave the rest to us! Through our reliable transportation partners, we offer convenient airport pick-up services to ensure you're greeted with a smile and transported comfortably to your destination. No waiting, no stress – just smooth, on-time service.
                </p>
                <Link to="/welcome">
                  <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div>
                <img src="/chauffeur-service-3-1.jpg" alt="Airport Pick-Up Services" className="w-full h-auto rounded-lg" />
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

export default Services; 