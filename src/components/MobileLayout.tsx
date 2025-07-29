import { ReactNode } from "react";
import Navigation from "./Navigation";

interface MobileLayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
  className?: string;
}

const MobileLayout = ({ children, showNavigation = true, className = "" }: MobileLayoutProps) => {
  return (
    <div className="relative max-w-md mx-auto h-screen bg-gray-50 overflow-hidden">
      {/* Main Content */}
      <main className={`h-full overflow-y-auto pb-24 ${className}`}>
        {children}
      </main>
      
      {/* Bottom Navigation */}
      {showNavigation && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <Navigation />
        </div>
      )}
      
      {/* Status Bar Blur */}
      <div className="fixed top-0 left-0 right-0 h-6 bg-gradient-to-b from-white/90 to-transparent z-40" />
    </div>
  );
};

export default MobileLayout;
