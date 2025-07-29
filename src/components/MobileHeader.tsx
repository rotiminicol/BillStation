import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  className?: string;
}

const MobileHeader = ({
  title,
  showBack = false,
  onBack,
  className = "",
}: MobileHeaderProps) => {
  return (
    <header className={`sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 ${className}`}>
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left side */}
        <div className="flex items-center space-x-2">
          {showBack && onBack && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-gray-700 hover:bg-gray-100"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          
          {title && (
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          )}
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
