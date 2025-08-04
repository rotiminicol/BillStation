import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Services: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
         <div className="min-h-screen">
               {/* Header */}
        <header className="bg-[#2a61de]">
         <div className="w-full px-4 sm:px-6 lg:px-8">
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col space-y-1 p-2"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
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

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="py-6 space-y-4 border-t border-white/20 bg-[#2a61de] min-h-[60vh]">
              {/* Mobile Navigation Links */}
              <nav className="space-y-4 px-4">
                <Link 
                  to="/landing" 
                  className="block text-white hover:text-white/80 px-4 py-3 text-base font-semibold transition-all duration-200 rounded-lg hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="block text-white hover:text-white/80 px-4 py-3 text-base font-semibold transition-all duration-200 rounded-lg hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About us
                </Link>
                <Link 
                  to="/crypto" 
                  className="block text-white hover:text-white/80 px-4 py-3 text-base font-semibold transition-all duration-200 rounded-lg hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Crypto
                </Link>
                <Link 
                  to="/services" 
                  className="block text-white hover:text-white/80 px-4 py-3 text-base font-semibold transition-all duration-200 rounded-lg hover:bg-white/10 bg-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link 
                  to="/agent" 
                  className="block text-white hover:text-white/80 px-4 py-3 text-base font-semibold transition-all duration-200 rounded-lg hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Become an agent
                </Link>
              </nav>
              
              {/* Mobile Auth Buttons - Added more spacing */}
              <div className="flex flex-col space-y-4 pt-6 px-4 pb-8 border-t border-white/20 mt-auto">
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-white text-[#2a61de] hover:bg-gray-100 border-white py-4 text-base font-semibold rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl">
                    Register
                  </Button>
                </Link>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#2a61de] hover:bg-[#1e4bb8] text-white border-2 border-white py-4 text-base font-semibold rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>

             {/* Hero Section */}
       <section className="bg-[#2a61de] text-white py-12 md:py-20 relative overflow-hidden">
         <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">Services</h1>
            <p className="text-base md:text-lg lg:text-xl max-w-4xl mx-auto mb-6 md:mb-8 leading-relaxed px-4">
              Experience the freedom and convenience of instant connectivity by using our airtime and data purchase system. We've partnered with these providers to ensure that you can make payments quickly and easily.
            </p>
            <Button className="bg-white text-[#2a61de] hover:bg-gray-100 px-6 md:px-8 py-3 text-base md:text-lg font-semibold rounded-lg">
              Download App
            </Button>
          </div>
        </div>
        
                 {/* Bitcoin Coin Icon */}
         <div className="absolute bottom-4 right-8 transform rotate-12">
           <img 
             src="/aboutuscoin.png" 
             alt="Bitcoin Coin" 
             className="w-16 h-16 md:w-20 md:h-20 object-contain"
           />
         </div>
      </section>

                                                       {/* Main Content */}
         <section className="pb-16">
          <div className="w-full">
                     {/* Airtime to Cash Section */}
           <div className="bg-blue-50 rounded-lg p-4 md:p-8 mb-8 md:mb-16 relative overflow-hidden">
                           {/* Floating Coin Icons */}
              <div className="absolute top-4 right-4">
                <div className="w-8 md:w-12 h-8 md:h-12 flex items-center justify-center mb-2">
                  <img src="/aboutuscoin.png" alt="Coin Icon" className="w-6 md:w-8 h-6 md:h-8 object-contain" />
                </div>
                <div className="w-6 md:w-8 h-6 md:h-8 ml-2 md:ml-4 flex items-center justify-center">
                  <img src="/aboutuscoin.png" alt="Coin Icon" className="w-4 md:w-5 h-4 md:h-5 object-contain" />
                </div>
              </div>
             
                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <div className="order-1 lg:order-2">
                  <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Airtime to Cash Swap</h2>
                  <h3 className="text-lg md:text-xl text-gray-700 mb-4 md:mb-6">Turn Airtime into Real Money — Instantly.</h3>
                  
                                     <div className="space-y-4 mb-8">
                     <div className="flex items-center">
                       <svg className="w-6 h-6 text-[#2a61de] mr-3" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                       </svg>
                       <span className="text-lg font-medium text-gray-700">Easy to Use</span>
                     </div>
                     <div className="flex items-center">
                       <svg className="w-6 h-6 text-[#2a61de] mr-3" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                       </svg>
                       <span className="text-lg font-medium text-gray-700">Instant Payment</span>
                     </div>
                     <div className="flex items-center">
                       <svg className="w-6 h-6 text-[#2a61de] mr-3" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                       </svg>
                       <span className="text-lg font-medium text-gray-700">100% Secure</span>
                     </div>
                   </div>
                  
                  <Button className="bg-[#2a61de] hover:bg-blue-700 px-8 py-3 text-lg text-white font-semibold">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Swap Now
                  </Button>
                  
                  <p className="text-gray-600 mt-6 leading-relaxed">
                    Experience the freedom and convenience of instant connectivity by using our airtime and data purchase system. We've partnered with these providers to ensure that you can make payments quickly and easily.
                  </p>
                </div>
                                 <div className="order-2 lg:order-1 flex justify-center">
                   <img src="/Screenshot421.png" alt="Airtime to Cash App Interface" className="w-full max-w-sm h-auto" />
                 </div>
              </div>
           </div>

                                           {/* Pay Your Utility Bills Effortlessly Section */}
                                                   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="bg-[#2F67E8] text-white py-16 rounded-lg mb-16">
                                   <div className="text-center mb-12 px-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">Pay Your Utility Bills Effortlessly</h2>
                  <p className="text-xl text-white/90 max-w-4xl mx-auto">
                    Effortless Payment Solutions for Your Utility Bills: Simplify Your Expenses
                  </p>
                </div>
                                 
                                                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-16">
                  {/* Electricity Bills */}
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Electricity Bills</h3>
                    <p className="text-white/90 leading-relaxed">
                      With our intuitive app, you can bid farewell to the time-consuming process of visiting payment centers or writing checks. BILL STATION provides a seamless experience, enabling you to pay your electricity bills conveniently from the comfort of your own home, anytime, anywhere.
                    </p>
                  </div>
                  
                  {/* Internet Bills */}
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Internet Bills</h3>
                    <p className="text-white/90 leading-relaxed">
                      Are you tired of the hassle involved in paying your internet bills? We have the perfect solution for you! Introducing our streamlined online payment system that allows you to effortlessly settle your internet bills from the comfort of your own home.
                    </p>
                  </div>
                  
                  {/* Betting */}
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      <span className="text-4xl">⚽</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Betting</h3>
                    <p className="text-white/90 leading-relaxed">
                      Complicated payment processes when settling your sports betting bills? We have the perfect solution for you! with our new app that allows you to effortlessly manage your betting payments, ensuring a thrilling and convenient experience every time.
                    </p>
                  </div>
                  
                  {/* TV/Cable Bills */}
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5l-1 1v2h8v-2l-1-1h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H3V5h18v10z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">TV/Cable Bills</h3>
                    <p className="text-white/90 leading-relaxed">
                      Tired of the inconvenience involved in paying your TV/Cable bills? Bill Station has the perfect solution for you! Introducing our hassle-free online payment system that allows you to effortlessly settle your TV/Cable bills from the comfort of your own home.
                    </p>
                  </div>
                  
                  {/* Order Drinking Water */}
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      <span className="text-4xl">💧</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Order Drinking Water</h3>
                    <p className="text-white/90 leading-relaxed">
                      Just like using your favorite app, but fulfilled through our trusted partners. Fast, fresh delivery to your doorstep Choose from 3- or 5-gallon Add a countertop dispenser for convenience Tap to order - hydration made simple!
                    </p>
                  </div>
                  
                  {/* Bookings & Ticket Purchases */}
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                      <span className="text-4xl">✈️</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Bookings & Ticket Purchases</h3>
                    <p className="text-white/90 leading-relaxed">
                      Book your hotels and flights with us! Enjoy exclusive airport ride bookings for smooth, private transportation. Whether you're planning a short getaway or a long-term stay, we offer tailored accommodations to ensure comfort and convenience—perfect for any trip length.
                    </p>
                  </div>
                </div>
              </div>
            </div>

                                           {/* Airport Pick-Up Services */}
            <div className="w-full mb-16">
                                                                                                                                                                                                                                               <div className="bg-[#2F67E8] text-white">
                               <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
                                   <div className="text-center lg:text-left px-16">
                   <div className="w-16 h-16 mx-auto lg:mx-0 mb-6 flex items-center justify-center">
                     <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                     </svg>
                   </div>
                   <h2 className="text-4xl font-bold mb-6">Airport Pick-Up Services</h2>
                   <p className="text-lg text-white/90 mb-8 leading-relaxed">
                     Touch down and leave the rest to us! Through our reliable transportation partners, we offer convenient airport pick-up services to ensure you're greeted with a smile and transported comfortably to your destination. No waiting, no stress – just smooth, on-time service.
                   </p>
                   <Link to="/welcome">
                     <Button className="bg-white text-[#2F67E8] hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                       Get Started
                     </Button>
                   </Link>
                 </div>
                                   <div className="flex justify-center lg:justify-center">
                    <img src="/Screenshot (424).png" alt="Airport Pick-Up Services" className="w-full h-auto" />
                 </div>
               </div>
             </div>

             {/* Shortlet & Hotel Section */}
             <div className="w-full mb-16">
               <div className="bg-[#2a61de]">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
                   <div className="flex justify-center lg:justify-center">
                     <img src="/Screenshot (425).png" alt="Shortlet & Hotel Booking" className="w-full h-auto" />
                   </div>
                   <div className="text-center lg:text-left px-16 py-16">
                     <h2 className="text-4xl font-bold text-white mb-6">Shortlet & Hotel Booking</h2>
                     <p className="text-lg text-white/90 mb-8 leading-relaxed">
                       Discover the perfect accommodation for your stay. From cozy shortlets to luxury hotels, we offer a wide range of options to suit every budget and preference. Book with confidence and enjoy seamless check-ins.
                     </p>
                     <Button className="bg-white text-[#2a61de] hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                       Get Started
                     </Button>
                   </div>
                 </div>
               </div>
             </div>
           </div>


        </div>
      </section>

      {/* Download App Section */}
      <div className="bg-white py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
            {/* Left Column - Logo and Download Content */}
            <div className="text-center lg:text-left flex flex-col justify-center h-full flex-1 lg:pr-0 order-2 lg:order-1">
              {/* Logo */}
              <div className="mb-6 lg:mb-8">
                <img src="/logo.png" alt="Bill Station Logo" className="h-12 lg:h-16 w-auto mb-4 mx-auto lg:mx-0" />
              </div>
              
              {/* Download Content */}
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">Download App Now !</h2>
              <p className="text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8">Available on:</p>
              
              {/* App Store Button */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                <button className="bg-black text-white px-4 lg:px-6 py-3 lg:py-4 rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-800 transition-colors">
                  <svg className="w-6 lg:w-8 h-6 lg:h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>
                
                {/* Google Play Button */}
                <button className="bg-black text-white px-4 lg:px-6 py-3 lg:py-4 rounded-lg flex items-center justify-center space-x-3 hover:bg-gray-800 transition-colors">
                  <svg className="w-6 lg:w-8 h-6 lg:h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on</div>
                    <div className="text-sm font-semibold">Google play</div>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Right Column - Single Tall Image */}
            <div className="flex justify-center lg:justify-end items-center flex-1 lg:pl-0 order-1 lg:order-2">
              <div className="relative">
                {/* Large Blue Circle Background */}
                <div className="w-64 lg:w-96 h-64 lg:h-96 bg-[#2a61de] rounded-full absolute -top-4 lg:-top-8 -right-4 lg:-right-8 -z-10"></div>
                
                {/* Single Tall Smartphone Mockup */}
                <div className="relative z-10">
                  <img 
                    src="/Screenshot (419).png" 
                    alt="Bill Station App Mockup" 
                    className="w-48 lg:w-72 h-auto lg:h-[700px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default Services; 