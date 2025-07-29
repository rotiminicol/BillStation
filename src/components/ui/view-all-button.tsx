import { Link } from "react-router-dom";

interface ViewAllButtonProps {
  category?: string;
  className?: string;
}

const ViewAllButton = ({ category, className = "" }: ViewAllButtonProps) => {
  const getTransactionUrl = () => {
    if (category) {
      return `/transactions?category=${category}`;
    }
    return "/transactions";
  };

  return (
    <Link 
      to={getTransactionUrl()}
      className={`group relative inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium text-xs rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 border border-white/20 ${className}`}
    >
      <span className="relative z-10">View All</span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Link>
  );
};

export default ViewAllButton; 