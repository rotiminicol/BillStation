import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Landing: React.FC = () => {
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
              <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Quick and Easy Bill Payments with <span className="font-extrabold">Bill Station</span>
              </h1>
              <p className="text-xl mb-6">
                Bill Station – Africa's Largest & Most Trusted Digital Hub, Seamlessly Connecting You Across Nigeria.
              </p>
              <p className="text-lg mb-8">
                Pay bills, trade Bitcoin and gift cards, convert airtime to cash, book hotels, flights, and airport pick-ups, reserve short- and long-term stays, and grab tickets to top events—all in one secure platform.
              </p>
              <p className="text-xl font-semibold mb-8">
                Everything you need is just a tap away.
              </p>
              <div className="flex space-x-4">
                <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                  <span className="text-white text-lg mr-2">🍎</span>
                  App Store
                </Button>
                <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3">
                  <span className="text-white text-lg mr-2">▶️</span>
                  Play Store
                </Button>
              </div>
              <div className="mt-6">
                <Link to="/welcome">
                  <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <img 
                src="/Illustration.png" 
                alt="Mobile App Banner" 
                className="w-80 h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Download app</h2>
          <p className="text-lg text-gray-600 mb-8">
            Download Bill Station App from Apple store and Google Playstore.
          </p>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How to get started</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">GET THE BILL STATION</h3>
              <p className="text-gray-600">Register Account</p>
              <p className="text-gray-600">Instant and Easy account opening.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Register Account</h3>
              <p className="text-gray-600">Instant and Easy account opening.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy the app</h3>
              <p className="text-gray-600">Fuel your financial journey, enjoy effortless transactions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Bill Station app features designed to meet your diverse financial needs:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💳</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Bill Payments</h3>
                <p className="text-gray-600">
                  Settle a wide range of bills, including electricity, rent, school fees, and more.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💱</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Airtime to Cash Swap</h3>
                <p className="text-gray-600">
                  Convert your airtime to cash with a few clicks.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">📤</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Cash Transfers</h3>
                <p className="text-gray-600">
                  Send and receive money swiftly and securely with our reliable cash transfer feature.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">✈️</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Flight booking and ticket purchase</h3>
                <p className="text-gray-600">
                  We provide exclusive flight booking, hotel reservations, and airport transportation services, offering both short- and long-term stay options for a comfortable and convenient travel experience.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🎁</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Bitcoin & Gift Cards</h3>
                <p className="text-gray-600">
                  Trade and exchange different gift cards with a few clicks.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent>
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💳</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Virtual Card</h3>
                <p className="text-gray-600">
                  Shop online across borders without limitations, fund your dollar card with naira
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gift Cards Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trading Gift Cards just got easier!
            </h2>
            <p className="text-lg text-gray-600">
              Bill Station introduces a convenient and versatile way to share the gift of choice with your loved ones.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src="/Frame.png" alt="Feature Image" className="w-full h-auto" />
            </div>
            <div>
              <div className="bg-blue-600 text-white rounded-lg p-8 mb-8">
                <h3 className="text-2xl font-bold mb-4">Highly Secure</h3>
                <p className="text-lg">
                  Bill Station introduces a convenient and versatile way to trade gift cards.
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold mb-2">Buy Gift Cards</h4>
                  <p className="text-gray-600">
                    Browse through a variety of top brands and make secure, instant Gift cards purchases right from your phone.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Instant Gift Card Sale</h4>
                  <p className="text-gray-600">
                    Our easy-to-use platform allows you to sell your gift cards for cash quickly and securely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Card to Cash Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Gift Card to Cash – Sell and Exchange Instantly
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Got unused or unwanted gift cards? Turn them into real money in minutes. We accept a wide range of popular international gift cards, including:
            </p>
            <Link to="/welcome">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Virtual Card Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bill Station Virtual Card</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              With our Virtual Card, you can shop seamlessly across borders without limitations. Fund your dollar-based card with your local currency (naira), eliminating currency exchange hassles. Enjoy the freedom to explore global online markets and make purchases without worrying about currency barriers. Your access to worldwide shopping just got easier and more convenient.
            </p>
          </div>
          <div className="text-center">
            <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
              JOIN THE OTHERS
            </Button>
          </div>
        </div>
      </section>

      {/* Download App Now Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Download the app now</h2>
          <p className="text-xl mb-8">Fuel your financial journey with Bill Station!</p>
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
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">CONTACT US</h2>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
            <p className="text-lg text-gray-600">
              We provide 24/7 customer service support for all customers.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h4 className="text-xl font-semibold mb-4">Email Us</h4>
              <div className="space-y-2">
                <p className="text-gray-600">admin@thebillstation.com</p>
                <p className="text-gray-600">thebillstation175@gmail.com</p>
              </div>
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4">WhatsApp</h4>
                <p className="text-gray-600">+2349168581914</p>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Leave us a message</h4>
              <p className="text-gray-600 mb-6">
                And we will get back to you as soon as possible.
              </p>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Message*"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Submit
                </Button>
              </form>
            </div>
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

export default Landing; 