import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = 'success' | 'error' | 'processing' | null;

interface TransactionStatusProps {
  status: Status;
  onClose: () => void;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function TransactionStatus({
  status,
  onClose,
  title,
  description,
  buttonText = 'Done',
  onButtonClick
}: TransactionStatusProps) {
  if (!status) return null;

  const statusConfig = {
    success: {
      icon: <CheckCircle className="h-16 w-16 text-green-500" />,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    error: {
      icon: <XCircle className="h-16 w-16 text-red-500" />,
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
    },
    processing: {
      icon: <AlertCircle className="h-16 w-16 text-blue-500 animate-pulse" />,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
  };

  const config = statusConfig[status] || statusConfig.error;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl p-6 w-full max-w-md mx-auto shadow-xl"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className={`p-4 rounded-full ${config.bgColor} mb-2`}>
              {config.icon}
            </div>
            
            <h3 className={`text-2xl font-bold ${config.textColor}`}>
              {title}
            </h3>
            
            <p className="text-gray-600 mb-6">
              {description}
            </p>
            
            <div className="w-full space-y-3">
              <Button 
                onClick={onButtonClick || onClose} 
                className={`w-full ${status === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                size="lg"
              >
                {buttonText}
              </Button>
              
              {status !== 'processing' && (
                <Button 
                  variant="outline" 
                  onClick={onClose} 
                  className="w-full"
                >
                  Close
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
