import { useEffect, useState } from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

const Loader = ({ size = "md", text = "Loading..." }: LoaderProps) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizeClasses[size]} animate-pulse`}>
        <img 
          src="/logo.png" 
          alt="Bill Station Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      {text && (
        <div className="text-center">
          <p className="text-gray-600 font-medium">{text}{dots}</p>
        </div>
      )}
    </div>
  );
};

export default Loader; 