import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";

const Onboarding3 = ({ onBack }: { onBack: () => void }) => {
  return (
    <MobileLayout className="bg-white">
      <div className="flex flex-col h-full p-6">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-64 h-64 bg-purple-50 rounded-full flex items-center justify-center mb-8">
            <img 
              src="/onboarding-3.svg" 
              alt="Secure & Safe"
              className="w-48 h-48 object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Secure & Safe</h2>
          <p className="text-gray-600 max-w-md mb-8">
            Your security is our top priority. All your data is encrypted and protected.
          </p>
          
          <div className="w-full max-w-xs space-y-4">
            <Link to="/signup" className="block">
              <Button className="w-full py-3 text-base font-medium">
                Create Account
              </Button>
            </Link>
            <Link to="/login" className="block">
              <Button variant="outline" className="w-full py-3 text-base font-medium">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-gray-600"
          >
            Back
          </Button>
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-200"></div>
            <div className="w-3 h-3 rounded-full bg-gray-200"></div>
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          </div>
          <div className="w-12"></div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Onboarding3;
