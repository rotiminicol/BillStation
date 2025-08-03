import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Bill Station Logo" 
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">BILL STATION</span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/landing" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/about" className="text-blue-600 px-3 py-2 text-sm font-medium">
                About us
              </Link>
              <Link to="/crypto" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Crypto
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Services
              </Link>
              <Link to="/agent" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Become an agent
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link to="/signup">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Register
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-blue-600 hover:bg-blue-700">
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
            <h1 className="text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl max-w-4xl mx-auto">
              Bill Station is Africa's trusted all-in-one digital finance platform, designed to meet the continent's growing demand for fast, secure, and seamless financial services.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                More than just a platform, we are your complete digital finance partner
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We offer innovative tools to pay utility bills, book flights and hotels, sell and exchange gift cards, trade cryptocurrency, convert airtime to cash, and earn income through our agent network.
              </p>
              <p className="text-lg text-gray-600">
                Driven by a mission to simplify financial transactions across Nigeria and the entire African continent, Bill Station empowers users to take control of their finances and perform smarter, more convenient transactions—anytime, anywhere.
              </p>
            </div>
            <div>
              <img src="/image14.png" alt="About Bill Station" className="w-full h-auto rounded-lg" />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💱</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Airtime to Cash – Quick & Seamless</h3>
                <p className="text-gray-600">
                  Swap your unused or excess airtime for cash anytime, anywhere. Supported networks include MTN, Airtel, Glo, and 9mobile, with instant payout and transparent rates.
                </p>
                <div className="mt-4">
                  <Link to="/welcome">
                    <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💳</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Utility Bill Payments</h3>
                <p className="text-gray-600">
                  All from One Dashboard. Forget queues and delays. The Bill Station lets you pay electricity bills, internet services, cable subscriptions, and more with real-time confirmation.
                </p>
                <div className="mt-4">
                  <Link to="/welcome">
                    <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🎁</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Gift Card to Cash</h3>
                <p className="text-gray-600">
                  Got unused or unwanted gift cards? Turn them into real money in minutes. We accept a wide range of popular international gift cards.
                </p>
                <div className="mt-4">
                  <Link to="/welcome">
                    <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vision Section */}
          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Vision</h2>
            <p className="text-lg text-gray-600 mb-8 text-center">
              At The Bill Station, our vision is bold and clear: To be Africa's most innovative and reliable platform for digital finance, empowering everyday users with tools to do more, earn more, and grow.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              We envision a future where every individual — from students and small business owners to professionals and rural vendors — has equal access to fast, secure, and empowering financial services. We're not just building a platform; we're building a movement.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Innovation at the Core</h4>
                <p className="text-gray-600">
                  We constantly explore and integrate new technologies — from blockchain to mobile fintech solutions — ensuring our users stay ahead in an ever-evolving digital economy.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Empowerment through Simplicity</h4>
                <p className="text-gray-600">
                  Whether it's airtime conversion, gift card exchange, or crypto trading, we believe every service should be simple enough for a first-timer and powerful enough for a pro.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Access for All</h4>
                <p className="text-gray-600">
                  We aim to break financial boundaries across the continent by offering localized services, mobile-friendly interfaces, multilingual support, and agent networks.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Financial Freedom for Everyone</h4>
                <p className="text-gray-600">
                  By enabling users to earn through our agent program, trade digital assets, and manage bills all in one place, we help people take control of their finances.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Trust and Transparency</h4>
                <p className="text-gray-600">
                  We are committed to fair practices, transparent pricing, and exceptional customer service — because trust is the foundation of everything we do.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-600 text-white p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Integrity</h4>
                <p>Transparent and fair in everything we do</p>
              </div>
              <div className="bg-blue-600 text-white p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Innovation</h4>
                <p>We improve constantly to serve you better</p>
              </div>
              <div className="bg-blue-600 text-white p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Customer First</h4>
                <p>Your satisfaction is our success</p>
              </div>
              <div className="bg-blue-600 text-white p-6 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Empowerment</h4>
                <p>Helping you earn, grow, and lead</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to experience smarter transactions?</h2>
            <p className="text-xl mb-6">
              Join The Bill Station today — and unlock the full potential of digital convenience.
            </p>
            <Link to="/welcome">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
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

export default About; 