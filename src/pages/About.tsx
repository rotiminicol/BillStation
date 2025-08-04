import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
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
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#2a61de] text-white py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 items-center">
            <div className="relative px-4 md:px-4 lg:px-8 py-4 md:py-12 order-2 md:order-1">
              {/* Coin Icons - Mobile Hidden, Desktop Visible */}
              <div className="hidden md:block absolute top-0 left-0 z-10">
                <img src="/aboutuscoin.png" alt="Bitcoin Icon" className="w-12 h-12 object-contain" />
              </div>
              
              <div className="hidden md:block absolute top-0 right-0 lg:right-0 z-10">
                <img src="/aboutuscoin.png" alt="Bitcoin Icon" className="w-12 h-12 object-contain" />
              </div>
              
              <div className="hidden md:block absolute bottom-0 left-0 z-10">
                <img src="/aboutuscoin.png" alt="Bitcoin Icon" className="w-12 h-12 object-contain" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 md:mb-8 relative z-10 text-center md:text-left">About Us</h1>
              <p className="text-lg sm:text-xl mb-4 md:mb-6 leading-relaxed max-w-xl mx-auto md:mx-0">
                Bill Station is Africa's trusted all-in-one digital finance platform, designed to meet the continent's growing demand for fast, secure, and seamless financial services. More than just a platform, we are your complete digital finance partner, offering innovative tools to pay utility bills, book flights and hotels, sell and exchange gift cards, trade cryptocurrency, convert airtime to cash, and earn income through our agent network.
              </p>
              <p className="text-lg sm:text-xl leading-relaxed max-w-xl mx-auto md:mx-0">
                Driven by a mission to simplify financial transactions across Nigeria and the entire African continent, Bill Station empowers users to take control of their finances and perform smarter, more convenient transactions—anytime, anywhere.
              </p>
            </div>
            <div className="flex justify-center md:justify-end md:pr-0 md:ml-8 md:-mr-4 lg:-mr-8 xl:-mr-16 2xl:-mr-24 order-1 md:order-2">
              <img 
                src="/aboutushero.png" 
                alt="Business professionals in meeting" 
                className="w-full max-w-md md:max-w-none h-auto md:h-[500px] object-cover rounded-lg md:rounded-l-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Side - Image */}
            <div className="flex justify-center lg:justify-start">
              <img 
                src="/Screenshot (408).png" 
                alt="Airtime to Cash Illustration" 
                className="w-full max-w-md h-auto rounded-lg"
              />
            </div>

            {/* Right Side - Text Content */}
            <div>
              <h2 className="text-3xl font-bold text-[#2a61de] mb-6">
                Airtime to Cash – Quick & Seamless
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Swap your unused or excess airtime for cash anytime, anywhere. Supported networks include MTN, Airtel, Glo, and 9mobile, with instant payout and transparent rates.
              </p>
              <div className="mt-6">
                <Link to="/welcome">
                  <Button className="bg-[#2a61de] hover:bg-[#1e4bb8] text-white px-6 py-3 rounded-lg">
                    Get Started
                  </Button>
                </Link>
            </div>
            </div>
          </div>
        </div>

        {/* Utility Bill Payments Section - Full Width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-16">
          {/* Left Column - Blue Background with Content */}
          <div className="bg-[#2a61de] text-white p-6 sm:p-8 lg:p-12 lg:pr-16 order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Utility Bill Payments</h2>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6">All from One Dashboard</h3>
            <p className="text-base sm:text-lg mb-6 sm:mb-8">Forget queues and delays. The Bill Station lets you pay:</p>
            
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-sm sm:text-lg">Electricity Bills (PHCN, IKEDC, EKEDC, etc.)</span>
              </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-sm sm:text-lg">Internet Services (Spectranet, Smile)</span>
                </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-sm sm:text-lg">Cable Subscriptions (DStv, GOtv, StarTimes)</span>
                </div>
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-sm sm:text-lg">Order drinking water and have it delivered right to your door step</span>
                </div>
                </div>
            
            <p className="text-base sm:text-lg mb-6 sm:mb-8">All with real-time confirmation and digital receipts safe, simple, and stress-free.</p>
            
                  <Link to="/welcome">
              <Button className="bg-white text-[#2a61de] hover:bg-gray-100 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base">
                Get Started
              </Button>
                  </Link>
                </div>

          {/* Right Column - Image */}
          <div className="flex justify-center lg:justify-start lg:pl-8 order-1 lg:order-2">
            <img 
              src="/Screenshot (409).png" 
              alt="Utility Bill Payments Illustration" 
              className="w-full max-w-md lg:max-w-none h-auto lg:h-full object-contain lg:object-cover lg:scale-110"
            />
          </div>
        </div>

        {/* Gift Card to Cash Section */}
        <section className="py-12 sm:py-16 bg-gray-50 mb-16">
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
             </div>
           </section>

        {/* Vision Section - Full Width */}
        <section className="bg-[#2a61de] text-white py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-8">Our Vision</h2>
            
            <p className="text-xl mb-6">
              At The Bill Station, our vision is bold and clear:
            </p>
            
            <p className="text-xl mb-8 leading-relaxed">
              To be Africa's most innovative and reliable platform for digital finance, empowering everyday users with tools to do more, earn more, and grow. We envision a future where every individual — from students and small business owners to professionals and rural vendors — has equal access to fast, secure, and empowering financial services. We're not just building a platform; we're building a movement.
            </p>
            
            <p className="text-xl mb-8">
              Here's how we bring this vision to life:
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-3">Innovation at the Core</h3>
                <p className="text-lg leading-relaxed">
                  We constantly explore and integrate new technologies — from blockchain to mobile fintech solutions — ensuring our users stay ahead in an ever-evolving digital economy.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-3">Empowerment through Simplicity</h3>
                <p className="text-lg leading-relaxed">
                  Whether it's airtime conversion, gift card exchange, or crypto trading, we believe every service should be simple enough for a first-timer and powerful enough for a pro.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-3">Access for All</h3>
                <p className="text-lg leading-relaxed">
                  We aim to break financial boundaries across the continent by offering localized services, mobile-friendly interfaces, multilingual support, and agent networks that reach even the most remote communities.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-3">Financial Freedom for Everyone</h3>
                <p className="text-lg leading-relaxed">
                  By enabling users to earn through our agent program, trade digital assets, and manage bills all in one place, we help people take control of their finances and create new income opportunities.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-3">Trust and Transparency</h3>
                <p className="text-lg leading-relaxed">
                  We are committed to fair practices, transparent pricing, and exceptional customer service — because trust is the foundation of everything we do.
                </p>
              </div>
            </div>
            
            <p className="text-xl mt-12 leading-relaxed">
              We're more than just a payment platform — we're a catalyst for growth, a tool for empowerment, and a bridge to a better digital future in Africa.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Values Section */}
          <div className="mb-8">
            {/* Text Content */}
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed max-w-4xl mx-auto">
                Our core values guide everything we do, from product development to customer service. These principles shape our culture and drive our mission to empower financial freedom across Africa.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Trust & Security</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We prioritize the security of your data and transactions, building trust through transparency and reliability in every interaction.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Innovation</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We constantly innovate to provide cutting-edge financial solutions that meet evolving user needs and stay ahead of the curve.
                  </p>
              </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Customer First</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Every decision we make is centered around providing the best possible experience for our users, ensuring their success is our priority.
                  </p>
              </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We believe financial services should be accessible to everyone, regardless of location, background, or technical expertise.
                  </p>
              </div>
              </div>
            </div>
          </div>

          {/* Image at Bottom Right */}
          <div className="flex justify-end -mb-12 -mr-16 lg:-mr-32">
            <img 
              src="/Screenshot (412).png" 
              alt="Our Values Illustration" 
              className="w-[500px] h-auto rounded-lg shadow-lg"
            />
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

export default About; 