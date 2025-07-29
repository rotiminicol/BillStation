import { Button } from "@/components/ui/button";
import MobileLayout from "@/components/MobileLayout";

const Onboarding2 = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  return (
    <MobileLayout className="bg-white">
      <div className="flex flex-col h-full p-6">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-64 h-64 bg-green-50 rounded-full flex items-center justify-center mb-8">
            <img 
              src="/onboarding-2.svg" 
              alt="Track Expenses"
              className="w-48 h-48 object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Track Your Expenses</h2>
          <p className="text-gray-600 max-w-md">
            Keep track of all your transactions and manage your finances in one place.
          </p>
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
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
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

export default Onboarding2;
