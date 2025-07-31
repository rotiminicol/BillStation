import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

const MobileWelcome = () => {
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

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold && currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    } else if (info.offset.x < -swipeThreshold && currentSlide < 4) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const currentSlideData = slides[currentSlide - 1];

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center w-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {/* Illustration */}
            <div className="w-full max-w-sm h-48 mb-4 flex items-center justify-center">
              <img 
                src={currentSlideData.image} 
                alt="Welcome Illustration"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Title */}
            <div className="h-16 mb-3 flex items-center justify-center">
              <h1 className="text-xl font-bold text-gray-900 text-center max-w-sm leading-tight">
                {currentSlideData.title}
              </h1>
            </div>

            {/* Description */}
            <div className="h-20 mb-4 flex items-center justify-center">
              <p className="text-gray-600 text-center max-w-sm leading-relaxed text-sm">
                {currentSlideData.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicator */}
        <div className="h-8 flex items-center space-x-3 mb-4">
          {currentSlideData.progress.map((isActive, index) => (
            <div
              key={index}
              className={`w-12 h-2 rounded-full transition-colors duration-300 ${
                isActive ? 'bg-[#0B63BC]' : 'bg-gray-900'
              }`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm h-20 flex flex-col justify-center space-y-2">
          <Button 
            onClick={handleNext}
            className="w-full py-3 bg-[#0B63BC] hover:bg-[#0B63BC]/90 text-white font-medium rounded-lg"
          >
            {currentSlide === 4 ? 'Get Started' : 'Next'}
          </Button>
          
          <Button 
            variant="outline"
            onClick={handleSkip}
            className="w-full py-3 border-[#0B63BC] text-[#0B63BC] hover:bg-[#0B63BC]/10 font-medium rounded-lg"
          >
            Skip
          </Button>
        </div>
      </div>

      {/* Bottom Link */}
      <div className="h-12 flex items-center justify-center px-6">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#0B63BC] underline font-medium">
            Sign in Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MobileWelcome; 