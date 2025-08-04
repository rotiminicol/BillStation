import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Agent: React.FC = () => {
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
            <h1 className="text-5xl font-bold mb-6">Become an Agent – Earn with Every Transaction</h1>
            <p className="text-xl max-w-4xl mx-auto mb-8">
              Join the Bill Station Agent Network and start making real money—no investment required.
            </p>
            <p className="text-lg mb-8">
              Whether you're a POS operator, student, freelancer, shop owner, or digital entrepreneur, you can earn high commissions just by helping others pay bills, trade crypto, sell gift cards, or convert airtime. It's your chance to make money daily, grow your business, and offer in-demand services in your community.
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              APPLY NOW
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Why BillStation Agent */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why BillStation agent</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Become part of the BillStation family by joining our growing network of agents. Register directly through our app or request a call back to get started. Start earning attractive commissions and expand your business today — now open to agents across all states in Nigeria!
            </p>
          </div>

          {/* Earn High Commissions Section */}
          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Earn High Commissions With Zero Investment</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <p className="text-gray-600">
                  Earn up to 21% commission across all our services — the highest in the industry
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <p className="text-gray-600">
                  Unlike traditional franchises, you pay nothing to get started
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <p className="text-gray-600">
                  No overhead, no setup costs — just instant profits from your phone
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  4
                </div>
                <p className="text-gray-600">
                  Use your spare time, existing business, or extra space to start earning
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  5
                </div>
                <p className="text-gray-600">
                  Perfect for shop owners, students, freelancers, and everyday hustlers
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                APPLY NOW
              </Button>
            </div>
          </div>

          {/* Use Our Brand Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Use Our Brand to Build Your Business</h2>
            <p className="text-lg text-gray-600 mb-8 text-center">
              With Bill Station as your digital partner, you gain access to:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center p-6">
                <CardContent>
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🏢</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">A trusted, growing brand</h3>
                  <p className="text-gray-600">
                    in digital services
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent>
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📈</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Built-in customer demand</h3>
                  <p className="text-gray-600">
                    for bills, airtime, crypto, gift cards, and more
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent>
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Full marketing and technical support</h3>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent>
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Real-time dashboard</h3>
                  <p className="text-gray-600">
                    to track earnings and customer activity
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6">
                <CardContent>
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">💳</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Instant payouts</h3>
                  <p className="text-gray-600">
                    via secure bank transfers
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                APPLY NOW
              </Button>
            </div>
          </div>

          {/* Unmatched Agent Benefits */}
          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Unmatched Agent Benefits</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                  1
                </div>
                <p className="text-gray-600">
                  Weekly commissions paid directly to your bank account
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                  2
                </div>
                <p className="text-gray-600">
                  Discounted rates on bill payments and airtime — increase your margins
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                  3
                </div>
                <p className="text-gray-600">
                  Get exclusive access to new product launches and promos
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                  4
                </div>
                <p className="text-gray-600">
                  Connect with other agents, share tips, and grow together
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">
                  5
                </div>
                <p className="text-gray-600">
                  Dedicated support team ready to assist you 24/7
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                APPLY NOW
              </Button>
            </div>
          </div>

          {/* Sign Up Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sign Up on BillStation Agent</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Submit your application</h3>
                <p className="text-gray-600">
                  Once you submit your application, your request will be reviewed and if approved you'll get an acceptance to your Billpoint registered email.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Identity verification</h3>
                <p className="text-gray-600">
                  Provide any means of identification, National ID, NIN, Driver's license, Voter's card.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Join BillStation</h3>
                <p className="text-gray-600">
                  in 3 Easy Steps
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
                APPLY NOW
              </Button>
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

export default Agent; 