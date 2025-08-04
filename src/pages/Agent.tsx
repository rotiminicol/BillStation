import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Agent: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                <Button className="bg-white text-[#2a61de] hover:bg-gray-100 border-white px-6 py-2 text-base font-semibold">
                  Register
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-[#2a61de] hover:bg-blue-700 text-white px-6 py-2 text-base font-semibold border border-white">
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
                  className="block text-white hover:text-white/80 px-4 py-3 text-base font-semibold transition-all duration-200 rounded-lg hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link 
                  to="/agent" 
                  className="block text-white hover:text-white/80 px-4 py-3 text-base font-semibold transition-all duration-200 rounded-lg hover:bg-white/10 bg-white/10"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">Become an Agent – Earn with Every Transaction</h1>
            <p className="text-lg md:text-xl max-w-4xl mx-auto mb-6 md:mb-8 px-4">
              Join the Bill Station Agent Network and start making real money—no investment required.
            </p>
            <p className="text-base md:text-lg max-w-5xl mx-auto mb-6 md:mb-8 leading-relaxed px-4">
              Whether you're a POS operator, student, freelancer, shop owner, or digital entrepreneur, you can earn high commissions just by helping others pay bills, trade crypto, sell gift cards, or convert airtime. It's your chance to make money daily, grow your business, and offer in-demand services in your community.
            </p>
            <Button className="bg-white text-[#2a61de] hover:bg-gray-100 px-6 md:px-8 py-3 text-base md:text-lg font-semibold rounded-lg">
              APPLY NOW
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
        <section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          </div>
          
          {/* Combined Agent Section - Full Width */}
          <div className="w-full">
           <div className="bg-blue-50">
             <div className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Why BillStation agent</h2>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto px-4">
                  Become part of the BillStation family by joining our growing network of agents. Register directly through our app or request a call back to get started. Start earning attractive commissions and expand your business today — now open to agents across all states in Nigeria!
                </p>
              </div>
              
                                                           <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Earn High Commissions With Zero Investment</h3>
                    
                    <div className="space-y-6 mb-8">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-4 mt-1">
                          <span className="text-blue-600 font-bold text-sm">1</span>
                        </div>
                        <p className="text-gray-700 text-lg">
                          Earn up to 21% commission across all our services — the highest in the industry
                        </p>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-4 mt-1">
                          <span className="text-blue-600 font-bold text-sm">2</span>
                        </div>
                        <p className="text-gray-700 text-lg">
                          Unlike traditional franchises, you pay nothing to get started
                        </p>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-4 mt-1">
                          <span className="text-blue-600 font-bold text-sm">3</span>
                        </div>
                        <p className="text-gray-700 text-lg">
                          No overhead, no setup costs — just instant profits from your phone
                        </p>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-4 mt-1">
                          <span className="text-blue-600 font-bold text-sm">4</span>
                        </div>
                        <p className="text-gray-700 text-lg">
                          Use your spare time, existing business, or extra space to start earning
                        </p>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-4 mt-1">
                          <span className="text-blue-600 font-bold text-sm">5</span>
                        </div>
                        <p className="text-gray-700 text-lg">
                          Perfect for shop owners, students, freelancers, and everyday hustlers
                        </p>
                      </div>
                    </div>
                    
                    <Button className="bg-[#2a61de] text-white hover:bg-blue-700 px-8 py-3 text-lg font-semibold rounded-lg">
                      APPLY NOW
                    </Button>
                  </div>
                  
                  <div className="flex justify-center">
                    <img src="/Screenshot__428.png" alt="BillStation Agent Benefits" className="w-full max-w-lg h-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
                 </div>
         
         {/* Use Our Brand Section - Full Width */}
         <div className="w-full">
           <div className="bg-[#2a61de] text-white">
             <div className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                 <div className="flex justify-center">
                   <img src="/Screenshot (429).png" alt="Use Our Brand" className="w-full max-w-lg h-auto" />
                 </div>
                 
                 <div className="text-left">
                   <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">Use Our Brand to Build Your Business</h2>
                   <p className="text-xl text-white mb-8">
                     With Bill Station as your digital partner, you gain access to:
                   </p>
                   
                   <div className="space-y-6 mb-8">
                     <div className="flex items-start">
                       <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 mt-1 border-2 border-blue-300">
                         <span className="text-[#2a61de] font-bold text-sm">1</span>
                       </div>
                       <p className="text-white text-lg">
                         A trusted, growing brand in digital services
                       </p>
                     </div>
                     
                     <div className="flex items-start">
                       <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 mt-1 border-2 border-blue-300">
                         <span className="text-[#2a61de] font-bold text-sm">2</span>
                       </div>
                       <p className="text-white text-lg">
                         Built-in customer demand for bills, airtime, crypto, gift cards, and more
                       </p>
                     </div>
                     
                     <div className="flex items-start">
                       <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 mt-1 border-2 border-blue-300">
                         <span className="text-[#2a61de] font-bold text-sm">3</span>
                       </div>
                       <p className="text-white text-lg">
                         Full marketing and technical support
                       </p>
                     </div>
                     
                     <div className="flex items-start">
                       <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 mt-1 border-2 border-blue-300">
                         <span className="text-[#2a61de] font-bold text-sm">4</span>
                       </div>
                       <p className="text-white text-lg">
                         Real-time dashboard to track earnings and customer activity
                       </p>
                     </div>
                     
                     <div className="flex items-start">
                       <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4 mt-1 border-2 border-blue-300">
                         <span className="text-[#2a61de] font-bold text-sm">5</span>
                       </div>
                       <p className="text-white text-lg">
                         Instant payouts via secure bank transfers
                       </p>
                     </div>
                   </div>
                   
                   <Button className="bg-white text-[#2a61de] hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg">
                     APPLY NOW
                   </Button>
                 </div>
               </div>
             </div>
           </div>
         </div>
         
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                     {/* Unmatched Agent Benefits */}
           <div className="w-full">
             <div className="bg-white">
               <div className="py-8 md:py-16 px-4 sm:px-6 lg:px-8">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                   <div className="text-left">
                     <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">Unmatched Agent Benefits</h2>
                     
                     <div className="space-y-6 mb-8">
                       <div className="flex items-start">
                         <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-4 mt-1">
                           <span className="text-blue-600 font-bold text-sm">1</span>
                         </div>
                         <p className="text-gray-700 text-lg">
                           Weekly commissions paid directly to your bank account
                         </p>
                       </div>
                       
                       <div className="flex items-start">
                         <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-4 mt-1">
                           <span className="text-blue-600 font-bold text-sm">2</span>
                         </div>
                         <p className="text-gray-700 text-lg">
                           Discounted rates on bill payments and airtime — increase your margins
                         </p>
                       </div>
                       
                       <div className="flex items-start">
                         <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-4 mt-1">
                           <span className="text-blue-600 font-bold text-sm">3</span>
                         </div>
                         <p className="text-gray-700 text-lg">
                           Get exclusive access to new product launches and promos
                         </p>
                       </div>
                       
                       <div className="flex items-start">
                         <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-4 mt-1">
                           <span className="text-blue-600 font-bold text-sm">4</span>
                         </div>
                         <p className="text-gray-700 text-lg">
                           Connect with other agents, share tips, and grow together
                         </p>
                       </div>
                       
                       <div className="flex items-start">
                         <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-4 mt-1">
                           <span className="text-blue-600 font-bold text-sm">5</span>
                         </div>
                         <p className="text-gray-700 text-lg">
                           Dedicated support team ready to assist you 24/7
                         </p>
                       </div>
                     </div>
                     
                     <Button className="bg-[#2a61de] text-white hover:bg-blue-700 px-8 py-3 text-lg font-semibold rounded-lg">
                       APPLY NOW
                     </Button>
                   </div>
                   
                   <div className="flex justify-center">
                     <img src="/Screenshot__430.png" alt="Unmatched Agent Benefits" className="w-full max-w-2xl h-auto" />
                   </div>
                 </div>
               </div>
             </div>
           </div>

        </div>
      </section>

      {/* Join BillStation in 3 Easy Steps */}
      <div className="w-full">
        <div className="bg-[#2a61de] text-white">
          <div className="py-8 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">Join BillStation in 3 Easy Steps</h2>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="flex justify-center">
                  <img src="/Screenshot__431.png" alt="Join BillStation Steps" className="w-full max-w-3xl h-auto" />
                </div>
                
                <div className="text-left">
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-6 mt-1">
                        <span className="text-[#2a61de] font-bold text-xl">1</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Sign Up on BillStation Agent</h3>
                        <p className="text-white text-lg">
                          During application, provide all required information
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-6 mt-1">
                        <span className="text-[#2a61de] font-bold text-xl">2</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Identity verification</h3>
                        <p className="text-white text-lg">
                          Provide any means of identification, National ID, NIN, Driver's license, Voter's card.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-6 mt-1">
                        <span className="text-[#2a61de] font-bold text-xl">3</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Submit your application</h3>
                        <p className="text-white text-lg">
                          Once you submit your application, your request will be reviewed and if approved you'll get an acceptance to your Billpoint registered email.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="bg-white text-[#2a61de] hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg mt-8">
                    APPLY NOW
                  </Button>
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

export default Agent; 