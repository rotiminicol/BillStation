import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Welcome = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      image: "/Frame.png",
      title: "Instant Access to Essential Services",
      description: "Top up your phone, pay bills, and even indulge in some leisure activities, all from one app.",
      progress: [true, false, false, false]
    },
    {
      id: 2,
      image: "/Layer 1.png",
      title: "Cash in on Unused Airtime Credits",
      description: "Don't let your extra airtime go to waste. Use Billstation Airtime Swap to convert it into cash.",
      progress: [true, true, false, false]
    },
    {
      id: 3,
      image: "/Illustration.png",
      title: "Buy and Sell Gift Cards for Quick Cash",
      description: "Maximize earnings by trading gift cards for cash. Earn commissions on transactions, turning unused cards into income.",
      progress: [true, true, true, false]
    },
    {
      id: 4,
      image: "/Frame (1).png",
      title: "Get Instant Virtual USD Card",
      description: "Enhance shopping with our Virtual USD Card. Fund with Naira, make secure global payments, enjoy seamless transactions worldwide",
      progress: [true, true, true, true]
    }
  ];

  const handleNext = () => {
    if (currentSlide < 4) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/login');
    }
  };

  const handleSkip = () => {
    navigate('/login');
  };

  const currentSlideData = slides[currentSlide - 1];

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12">
        <div className="w-full max-w-4xl flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center w-full"
            >
              {/* Illustration - Fixed height container */}
              <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl h-32 sm:h-40 lg:h-48 xl:h-56 mb-1 sm:mb-2 lg:mb-3 flex items-center justify-center">
                <img 
                  src={currentSlideData.image} 
                  alt="Welcome Illustration"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title - Fixed height container */}
              <div className="h-12 sm:h-16 lg:h-20 xl:h-24 mb-1 sm:mb-2 lg:mb-3 flex items-center justify-center">
                <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 text-center max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-2xl px-4 leading-tight">
                  {currentSlideData.title}
                </h1>
              </div>

              {/* Description - Fixed height container */}
              <div className="h-16 sm:h-20 lg:h-24 xl:h-28 mb-1 sm:mb-2 lg:mb-3 flex items-center justify-center">
                <p className="text-gray-600 text-center max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-2xl leading-relaxed text-sm sm:text-base lg:text-lg px-4">
                  {currentSlideData.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator - Fixed height */}
          <div className="h-6 sm:h-8 lg:h-10 flex items-center space-x-2 sm:space-x-3 lg:space-x-4 mb-1 sm:mb-2 lg:mb-3">
            {currentSlideData.progress.map((isActive, index) => (
              <div
                key={index}
                className={`w-10 sm:w-12 lg:w-16 xl:w-20 h-1.5 sm:h-2 lg:h-2.5 rounded-full transition-colors duration-300 ${
                  isActive ? 'bg-[#0B63BC]' : 'bg-gray-900'
                }`}
              />
            ))}
          </div>

          {/* Action Buttons - Fixed height */}
          <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg h-16 sm:h-20 lg:h-24 flex flex-col justify-center space-y-1 px-4">
            <Button 
              onClick={handleNext}
              className="w-full py-2 sm:py-3 lg:py-4 bg-[#0B63BC] hover:bg-[#0B63BC]/90 text-white font-medium rounded-lg text-sm sm:text-base lg:text-lg"
            >
              {currentSlide === 4 ? 'Get Started' : 'Next'}
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleSkip}
              className="w-full py-2 sm:py-3 lg:py-4 border-[#0B63BC] text-[#0B63BC] hover:bg-[#0B63BC]/10 font-medium rounded-lg text-sm sm:text-base lg:text-lg"
            >
              Skip
            </Button>
          </div>
        </div>
      </div>

                {/* Bottom Link - Fixed height */}
          <div className="h-6 sm:h-8 lg:h-12 flex items-center justify-center px-4">
        <p className="text-gray-600 text-sm sm:text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-[#0B63BC] underline font-medium">
            Sign in Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Welcome;
