import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MobileLayout from "@/components/MobileLayout";

const Onboarding1 = ({ onNext }: { onNext: () => void }) => {
  const navigate = useNavigate();

  return (
    <MobileLayout className="bg-white">
      <div className="flex flex-col h-full p-6">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-64 h-64 bg-blue-50 rounded-full flex items-center justify-center mb-8">
            <img 
              src="/onboarding-1.svg" 
              alt="Easy Payments"
              className="w-48 h-48 object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Easy Payments</h2>
          <p className="text-gray-600 max-w-md">
            Send and receive money with just a few taps. Fast, secure, and convenient.
          </p>
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/login')}
            className="text-gray-600"
          >
            Skip
          </Button>
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <div className="w-3 h-3 rounded-full bg-gray-200"></div>
            <div className="w-3 h-3 rounded-full bg-gray-200"></div>
          </div>
          <Button onClick={onNext}>
            Next
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Onboarding1;
