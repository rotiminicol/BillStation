import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Landing: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white max-w-[2000px] mx-auto">
      {/* Header */}
      <header className="bg-[#2a61de] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Bill Station Logo" 
                className="h-8 sm:h-10 md:h-12 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
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

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/signup">
                <Button className="bg-white text-[#2a61de] hover:bg-gray-100 border-white px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold">
                  Register
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-[#2a61de] hover:bg-[#1e4bb8] text-white px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold">
                  Login
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-[#2a61de]">
                <Link to="/landing" className="block text-white hover:text-white hover:underline px-3 py-2 text-base font-bold">
                  Home
                </Link>
                <Link to="/about" className="block text-white hover:text-white hover:underline px-3 py-2 text-base font-bold">
                  About us
                </Link>
                <Link to="/crypto" className="block text-white hover:text-white hover:underline px-3 py-2 text-base font-bold">
                  Crypto
                </Link>
                <Link to="/services" className="block text-white hover:text-white hover:underline px-3 py-2 text-base font-bold">
                  Services
                </Link>
                <Link to="/agent" className="block text-white hover:text-white hover:underline px-3 py-2 text-base font-bold">
                  Become an agent
                </Link>
                <div className="pt-4 space-y-2">
                  <Link to="/signup">
                    <Button className="w-full bg-white text-[#2a61de] hover:bg-gray-100 border-white px-6 py-2 text-base font-semibold">
                      Register
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button className="w-full bg-[#2a61de] hover:bg-[#1e4bb8] text-white px-6 py-2 text-base font-semibold border border-white">
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#2a61de] text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                Quick and Easy Bill Payments with <span className="font-extrabold">Bill Station</span>
              </h1>
              <p className="text-lg sm:text-xl mb-4 sm:mb-6">
                Bill Station – Africa's Largest & Most Trusted Digital Hub, Seamlessly Connecting You Across Nigeria.
              </p>
              <p className="text-base sm:text-lg mb-6 sm:mb-8">
                Pay bills, trade Bitcoin and gift cards, convert airtime to cash, book hotels, flights, and airport pick-ups, reserve short- and long-term stays, and grab tickets to top events—all in one secure platform.
              </p>
              <p className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8">
                Everything you need is just a tap away.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                {/* App Store Button */}
                <button className="bg-black text-white px-4 sm:px-6 py-3 rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-800 transition-colors">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>
                
                {/* Google Play Button */}
                <button className="bg-black text-white px-4 sm:px-6 py-3 rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-800 transition-colors">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on</div>
                    <div className="text-sm font-semibold">Google play</div>
              </div>
                </button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img 
                src="/landinghero.png" 
                alt="Mobile App Banner" 
                className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none lg:w-[600px] h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      

      {/* How to Get Started */}
       <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                       <div className="text-center mb-8 sm:mb-12">
              <p className="text-sm text-[#2a61de] mb-2">GET THE BILL STATION</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">How to get started</h2>
            </div>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
                <div className="flex justify-center mb-4">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#2a61de]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Download app</h3>
                <p className="text-gray-600 text-sm sm:text-base">Download Bill Station App from Apple store</p>
                <p className="text-gray-600 text-sm sm:text-base">and Google Playstore.</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#2a61de]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
            </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Register Account</h3>
                <p className="text-gray-600 text-sm sm:text-base">Instant and Easy account opening.</p>
              </div>
              <div className="text-center sm:col-span-2 lg:col-span-1">
                <div className="flex justify-center mb-4">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#2a61de]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
            </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Enjoy the app</h3>
                <p className="text-gray-600 text-sm sm:text-base">Fuel your financial journey, enjoy effortless</p>
                <p className="text-gray-600 text-sm sm:text-base">transactions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
       <section className="py-12 sm:py-16 bg-gray-50">
         <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
                       <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
              Bill Station app features designed to<br className="hidden sm:block" />
               meet your diverse financial needs:
          </h2>
           <div className="relative">
                           {/* Central Logo - Hidden on mobile, shown on larger screens */}
              <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="text-center">
                  <img src="/logo.png" alt="Bill Station Logo" className="h-32 lg:h-40 w-auto mx-auto" />
                </div>
              </div>
             
                                                                                   {/* Features Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-96">
                                 {/* Left Column */}
                  <div className="flex flex-col justify-center space-y-8 lg:space-y-32">
                                     <div className="text-center lg:text-right">
                      <div className="flex flex-col lg:flex-row justify-center lg:justify-end items-center lg:items-start">
                        <svg className="w-10 h-10 lg:w-12 lg:h-12 text-[#2a61de] flex-shrink-0 mb-4 lg:mb-0 lg:mr-4 lg:mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div className="text-center lg:text-right">
                          <h3 className="text-lg lg:text-xl font-semibold mb-2">Bill Payments</h3>
                          <p className="text-gray-600 text-sm lg:text-base">
                            Settle a wide range of bills,<br className="hidden sm:block" />
                            including electricity, rent,<br className="hidden sm:block" />
                            school fees, and more.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                                       <div className="text-center lg:text-right">
                       <div className="flex flex-col lg:flex-row justify-center lg:justify-end items-center lg:items-start">
                         <svg className="w-10 h-10 lg:w-12 lg:h-12 text-[#2a61de] flex-shrink-0 mb-4 lg:mb-0 lg:mr-4 lg:mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                         </svg>
                         <div className="text-center lg:text-right">
                           <h3 className="text-lg lg:text-xl font-semibold mb-2">Cash Transfers</h3>
                           <p className="text-gray-600 text-sm lg:text-base">
                             Send and receive money swiftly<br className="hidden sm:block" />
                             and securely with our reliable<br className="hidden sm:block" />
                             cash transfer feature.
                           </p>
                         </div>
                       </div>
                </div>
                    
                                       <div className="text-center lg:text-right">
                       <div className="flex flex-col lg:flex-row justify-center lg:justify-end items-center lg:items-start">
                         <svg className="w-10 h-10 lg:w-12 lg:h-12 text-[#2a61de] flex-shrink-0 mb-4 lg:mb-0 lg:mr-4 lg:mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                         </svg>
                         <div className="text-center lg:text-right">
                           <h3 className="text-lg lg:text-xl font-semibold mb-2">Bitcoin & Gift Cards</h3>
                           <p className="text-gray-600 text-sm lg:text-base">
                             Trade and exchange different<br className="hidden sm:block" />
                             gift cards with a few clicks.
                           </p>
                         </div>
                       </div>
                     </div>
                 </div>
                 
                                 {/* Right Column */}
                  <div className="flex flex-col justify-center space-y-8 lg:space-y-32">
                                     <div className="text-center lg:text-left">
                      <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:items-start">
                        <div className="mb-4 lg:mb-0 lg:mr-4 text-center lg:text-left">
                          <h3 className="text-lg lg:text-xl font-semibold mb-2">Airtime to Cash Swap</h3>
                          <p className="text-gray-600 text-sm lg:text-base">
                            Convert your airtime to cash<br className="hidden sm:block" />
                            with a few clicks.
                          </p>
                        </div>
                        <svg className="w-10 h-10 lg:w-12 lg:h-12 text-[#2a61de] flex-shrink-0 lg:mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                </div>
                    
                                       <div className="text-center lg:text-left">
                       <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:items-start">
                         <div className="mb-4 lg:mb-0 lg:mr-4 text-center lg:text-left">
                           <h3 className="text-lg lg:text-xl font-semibold mb-2">Flight booking and ticket purchase</h3>
                           <p className="text-gray-600 text-sm lg:text-base">
                             We provide exclusive flight booking,<br className="hidden sm:block" />
                             hotel reservations, and airport<br className="hidden sm:block" />
                             transportation services, offering both<br className="hidden sm:block" />
                             short- and long-term stay options for<br className="hidden sm:block" />
                             a comfortable and convenient travel<br className="hidden sm:block" />
                             experience.
                           </p>
                         </div>
                         <svg className="w-10 h-10 lg:w-12 lg:h-12 text-[#2a61de] flex-shrink-0 lg:mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                         </svg>
                       </div>
                     </div>
                    
                                       <div className="text-center lg:text-left">
                       <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:items-start">
                         <div className="mb-4 lg:mb-0 lg:mr-4 text-center lg:text-left">
                           <h3 className="text-lg lg:text-xl font-semibold mb-2">Virtual Card</h3>
                           <p className="text-gray-600 text-sm lg:text-base">
                             Shop online across borders without<br className="hidden sm:block" />
                             limitations, fund your dollar card<br className="hidden sm:block" />
                             with naira
                           </p>
                         </div>
                         <svg className="w-10 h-10 lg:w-12 lg:h-12 text-[#2a61de] flex-shrink-0 lg:mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                         </svg>
                       </div>
                </div>
                </div>
                </div>
          </div>
        </div>
      </section>

      {/* Gift Cards Section */}
       <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-8 sm:mb-12">
             <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Trading Gift Cards just got easier!
            </h2>
             <p className="text-base sm:text-lg text-gray-600">
              Bill Station introduces a convenient and versatile way to share the gift of choice with your loved ones.
            </p>
          </div>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
             {/* Left Side - Feature Descriptions */}
             <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
                               {/* Highly Secure Feature */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#2a61de] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
            <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Highly Secure</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                  Bill Station introduces a convenient and versatile way to trade gift cards.
                </p>
              </div>
                </div>

                {/* Buy Gift Cards Feature */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#2a61de] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Buy Gift Cards</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                    Browse through a variety of top brands and make secure, instant Gift cards purchases right from your phone.
                  </p>
                  </div>
                </div>

                {/* Instant Gift Card Sale Feature */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                  <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#2a61de] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Instant Gift Card Sale</h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                    Our easy-to-use platform allows you to sell your gift cards for cash quickly and securely.
                  </p>
                </div>
              </div>
             </div>

                           {/* Right Side - Gift Cards Image */}
              <div className="flex justify-center order-1 lg:order-2">
                <img 
                  src="/giftcards.png" 
                  alt="Gift Cards" 
                  className="w-full h-auto max-w-sm sm:max-w-md lg:max-w-2xl"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Gift Card to Cash Section */}
       <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center">
             <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Gift Card to Cash – Sell and Exchange Instantly
            </h2>
             <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              Got unused or unwanted gift cards? Turn them into real money in minutes. We accept a wide range of popular international gift cards, including:
            </p>
             
                           {/* Gift Card Brand Logos */}
              <div className="relative overflow-hidden mb-6 sm:mb-8">
                <div className="flex animate-scroll space-x-6 sm:space-x-12">
                                     {/* First set of logos */}
                   <div className="flex items-center space-x-8 sm:space-x-16 flex-shrink-0">
                     {/* Sephora */}
                     <div className="flex-shrink-0">
                       <div className="text-gray-800 font-bold text-2xl sm:text-4xl">SEPHORA</div>
                     </div>
                     
                     {/* iTunes */}
                     <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3">
                       <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                       </svg>
                       <span className="text-gray-800 font-semibold text-xl sm:text-3xl">iTunes</span>
                     </div>
                     
                     {/* Mastercard */}
                     <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3">
                       <div className="flex">
                         <div className="w-6 h-6 sm:w-10 sm:h-10 bg-red-500 rounded-full"></div>
                         <div className="w-6 h-6 sm:w-10 sm:h-10 bg-yellow-500 rounded-full -ml-2 sm:-ml-4"></div>
                       </div>
                       <span className="text-gray-800 font-semibold text-lg sm:text-2xl">mastercard</span>
                     </div>
                     
                     {/* Google Play */}
                     <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3">
                       <svg className="w-8 h-8 sm:w-11 sm:h-11 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                       </svg>
                       <span className="text-gray-800 font-semibold text-xl sm:text-3xl">Google Play</span>
                     </div>
                     
                     {/* eBay */}
                     <div className="flex-shrink-0">
                       <div className="text-gray-800 font-bold text-2xl sm:text-4xl">ebay</div>
                     </div>
                     
                     {/* Walmart */}
                     <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3">
                       <svg className="w-8 h-8 sm:w-11 sm:h-11 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z"/>
                       </svg>
                       <span className="text-gray-800 font-bold text-xl sm:text-3xl">Walmart</span>
                     </div>
                     
                     {/* Amazon */}
                     <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3">
                       <span className="text-gray-800 font-bold text-2xl sm:text-4xl">amazon</span>
                       <svg className="w-6 h-6 sm:w-10 sm:h-10 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M7,10L12,15L17,10H7Z"/>
                       </svg>
                     </div>
                     
                     {/* Visa */}
                     <div className="flex-shrink-0">
                       <div className="text-gray-800 font-bold text-2xl sm:text-4xl">VISA</div>
                     </div>
                     
                     {/* Nordstrom */}
                     <div className="flex-shrink-0">
                       <div className="text-gray-800 font-bold text-2xl sm:text-4xl">NORDSTROM</div>
                     </div>
                   </div>
                  
                                     {/* Duplicate set for seamless loop */}
                   <div className="flex items-center space-x-8 sm:space-x-16 flex-shrink-0">
                     {/* Sephora */}
                     <div className="flex-shrink-0">
                       <div className="text-gray-800 font-bold text-2xl sm:text-4xl">SEPHORA</div>
                     </div>
                     
                     {/* iTunes */}
                     <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3">
                       <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                       </svg>
                       <span className="text-gray-800 font-semibold text-xl sm:text-3xl">iTunes</span>
                     </div>
                     
                     {/* Mastercard */}
                     <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3">
                       <div className="flex">
                         <div className="w-6 h-6 sm:w-10 sm:h-10 bg-red-500 rounded-full"></div>
                         <div className="w-6 h-6 sm:w-10 sm:h-10 bg-yellow-500 rounded-full -ml-2 sm:-ml-4"></div>
                       </div>
                       <span className="text-gray-800 font-semibold text-lg sm:text-2xl">mastercard</span>
                     </div>
                     
                     {/* Google Play */}
                     <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3">
                       <svg className="w-8 h-8 sm:w-11 sm:h-11 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                       </svg>
                       <span className="text-gray-800 font-semibold text-xl sm:text-3xl">Google Play</span>
                     </div>
                     
                     {/* eBay */}
                     <div className="flex-shrink-0">
                       <div className="text-gray-800 font-bold text-2xl sm:text-4xl">ebay</div>
                     </div>
                     
                     {/* Walmart */}
                     <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3">
                       <svg className="w-8 h-8 sm:w-11 sm:h-11 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z"/>
                       </svg>
                       <span className="text-gray-800 font-bold text-xl sm:text-3xl">Walmart</span>
                     </div>
                     
                     {/* Amazon */}
                     <div className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3">
                       <span className="text-gray-800 font-bold text-2xl sm:text-4xl">amazon</span>
                       <svg className="w-6 h-6 sm:w-10 sm:h-10 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M7,10L12,15L17,10H7Z"/>
                       </svg>
                     </div>
                     
                     {/* Visa */}
                     <div className="flex-shrink-0">
                       <div className="text-gray-800 font-bold text-2xl sm:text-4xl">VISA</div>
                     </div>
                     
                     {/* Nordstrom */}
                     <div className="flex-shrink-0">
                       <div className="text-gray-800 font-bold text-2xl sm:text-4xl">NORDSTROM</div>
                     </div>
                   </div>
                </div>
              </div>
             
            <Link to="/welcome">
               <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 sm:px-8 py-3 rounded-lg text-sm sm:text-base">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Virtual Card Section */}
       <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
             {/* Left Side - Text Content */}
             <div className="order-2 lg:order-1">
               <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Bill Station Virtual Card</h2>
               <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              With our Virtual Card, you can shop seamlessly across borders without limitations. Fund your dollar-based card with your local currency (naira), eliminating currency exchange hassles. Enjoy the freedom to explore global online markets and make purchases without worrying about currency barriers. Your access to worldwide shopping just got easier and more convenient.
            </p>
          </div>
             
                           {/* Right Side - Virtual Card Image */}
              <div className="flex justify-center order-1 lg:order-2">
                <img 
                  src="/virtual.png" 
                  alt="Bill Station Virtual Card" 
                  className="w-full h-auto max-w-sm sm:max-w-md lg:max-w-2xl"
                />
              </div>
          </div>
        </div>
      </section>

      {/* Download App Now Section */}
       <section className="py-12 sm:py-16">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="bg-[#2a61de] text-white rounded-2xl py-12 sm:py-16 px-6 sm:px-8 text-center">
             <p className="text-sm font-semibold mb-2">JOIN THE OTHERS</p>
             <h2 className="text-2xl sm:text-3xl font-bold mb-4">Download the app now</h2>
             <p className="text-lg sm:text-xl mb-6 sm:mb-8">Fuel your financial journey with Bill Station!</p>
             <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
               {/* App Store Button */}
               <button className="bg-black text-white px-4 sm:px-6 py-3 rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-800 transition-colors">
                 <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                 </svg>
                 <div className="text-left">
                   <div className="text-xs">Download on the</div>
                   <div className="text-sm font-semibold">App Store</div>
                 </div>
               </button>
               
               {/* Google Play Button */}
               <button className="bg-black text-white px-4 sm:px-6 py-3 rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-800 transition-colors">
                 <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                 </svg>
                 <div className="text-left">
                   <div className="text-xs">Download on</div>
                   <div className="text-sm font-semibold">Google play</div>
                 </div>
               </button>
             </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
       <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
             {/* Left Side - Contact Information */}
             <div className="order-2 lg:order-1">
               <p className="text-sm font-semibold text-[#2a61de] mb-2">CONTACT US</p>
               <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
               <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              We provide 24/7 customer service support for all customers.
            </p>
               
               {/* Email Contact */}
               <div className="flex items-start space-x-4 mb-6 sm:mb-8">
                 <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#2a61de] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                 </svg>
                 <div>
                   <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Email Us</h3>
                   <p className="text-gray-900 text-sm sm:text-base">admin@thebillstation.com</p>
                   <p className="text-gray-900 text-sm sm:text-base">thebillstation175@gmail.com</p>
                 </div>
          </div>
               
               {/* WhatsApp Contact */}
               <div className="flex items-start space-x-4">
                 <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#2a61de] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                 </svg>
            <div>
                   <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">whats app chat</h3>
                   <a href="tel:+2349168581914" className="text-[#2a61de] underline text-sm sm:text-base">+2349168581914</a>
              </div>
              </div>
            </div>
             
             {/* Right Side - Contact Form */}
             <div className="order-1 lg:order-2">
               <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Leave us a message</h2>
               <p className="text-gray-900 mb-4 sm:mb-6 text-sm sm:text-base">
                And we will get back to you as soon as possible.
              </p>
              <form className="space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                  <input
                    type="text"
                    placeholder="First name"
                       className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a61de] focus:border-transparent text-sm sm:text-base"
                  />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                  <input
                    type="text"
                    placeholder="Last name"
                       className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a61de] focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                     placeholder="Email"
                     className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a61de] focus:border-transparent text-sm sm:text-base"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                   <div className="relative">
                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                       </svg>
                       <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                       </svg>
                     </div>
                <input
                  type="tel"
                  placeholder="Phone"
                       className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a61de] focus:border-transparent text-sm sm:text-base"
                />
                   </div>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                     placeholder="Message"
                  rows={4}
                     className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a61de] focus:border-transparent text-sm sm:text-base"
                ></textarea>
                 </div>
                 <Button type="submit" className="w-full bg-[#2a61de] hover:bg-[#1e4bb8] text-white py-3 rounded-lg text-sm sm:text-base">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
       <footer className="bg-[#2a61de] text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                  {/* Left Section - App Information and Social Media */}
                     <div className="text-center sm:text-left">
                       {/* Logo with BS and BILL STATION */}
                       <div className="mb-4 inline-block">
                         <div className="text-center">
                           <img src="/logo.png" alt="Bill Station Logo" className="h-10 sm:h-12 w-auto mx-auto mb-1" />
                           <div className="text-xs sm:text-sm">BILL STATION</div>
                         </div>
                       </div>
               <p className="text-white mb-4 sm:mb-6 text-sm sm:text-base">
                With Bill Station app, you can conveniently make payments for almost all of your day-to-day bills,
              </p>
               {/* Social Media Icons */}
               <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
                 {/* Facebook */}
                 <div className="w-8 h-8 sm:w-10 sm:h-10 border border-white rounded-full flex items-center justify-center">
                   <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                   </svg>
                 </div>
                 {/* WhatsApp */}
                 <div className="w-8 h-8 sm:w-10 sm:h-10 border border-white rounded-full flex items-center justify-center">
                   <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                   </svg>
                 </div>
                 {/* LinkedIn */}
                 <div className="w-8 h-8 sm:w-10 sm:h-10 border border-white rounded-lg flex items-center justify-center">
                   <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                   </svg>
            </div>
                 {/* Instagram */}
                 <div className="w-8 h-8 sm:w-10 sm:h-10 border border-white rounded-lg flex items-center justify-center">
                   <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.928-.875-1.418-2.026-1.418-3.323s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244z"/>
                   </svg>
            </div>
              </div>
            </div>
             
             {/* Middle Section - Quick Links */}
             <div className="text-center sm:text-left">
               <h4 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Quick Links</h4>
               <ul className="space-y-1 sm:space-y-2">
                 <li><Link to="/landing" className="text-white underline hover:no-underline text-sm sm:text-base">Home</Link></li>
                 <li><Link to="/about" className="text-white underline hover:no-underline text-sm sm:text-base">About us</Link></li>
                 <li><Link to="/crypto" className="text-white underline hover:no-underline text-sm sm:text-base">Crypto</Link></li>
                 <li><Link to="/services" className="text-white underline hover:no-underline text-sm sm:text-base">Services</Link></li>
                 <li><Link to="/agent" className="text-white underline hover:no-underline text-sm sm:text-base">Become an agent</Link></li>
               </ul>
             </div>
             
             {/* Right Section - Terms & Conditions */}
             <div className="text-center sm:text-left">
               <ul className="space-y-1 sm:space-y-2">
                 <li><Link to="/terms" className="text-white underline hover:no-underline text-sm sm:text-base">Terms & conditions</Link></li>
              </ul>
            </div>
          </div>
           
           {/* Copyright Section */}
           <div className="border-t border-white border-opacity-20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
             <p className="text-white text-xs sm:text-sm">
              Copyright © Bill Station 2025. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 