import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface BackButtonProps {
  to?: string;
  variant?: "default" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

const BackButton = ({ 
  to, 
  variant = "ghost", 
  size = "sm", 
  className = "",
  children 
}: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  const buttonContent = children || (
    <>
      <ArrowLeft className="h-4 w-4 lg:h-5 lg:w-5" />
      <span className="ml-2">Back</span>
    </>
  );

  if (to && to.startsWith('/')) {
    return (
      <Button variant={variant} size={size} asChild className={className}>
        <Link to={to}>
          {buttonContent}
        </Link>
      </Button>
    );
  }

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleClick}
      className={className}
    >
      {buttonContent}
    </Button>
  );
};

export default BackButton; 