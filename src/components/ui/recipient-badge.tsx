import * as React from "react"
import { CheckCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface RecipientBadgeProps {
  name: string
  accountNumber: string
  bank?: string
  isVerified?: boolean
  onRemove?: () => void
  className?: string
}

export function RecipientBadge({
  name,
  accountNumber,
  bank,
  isVerified = false,
  onRemove,
  className
}: RecipientBadgeProps) {
  const badgeVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  }

  return (
    <motion.div
      variants={badgeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        "flex items-center space-x-3 p-3 rounded-lg border bg-white",
        isVerified 
          ? "border-green-200 bg-green-50" 
          : "border-gray-200",
        className
      )}
    >
      <div className="flex-shrink-0">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center",
          isVerified ? "bg-green-100" : "bg-gray-100"
        )}>
          <User className={cn(
            "w-5 h-5",
            isVerified ? "text-green-600" : "text-gray-600"
          )} />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h4 className="text-sm font-medium text-gray-900 truncate">
            {name}
          </h4>
          {isVerified && (
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
          )}
        </div>
        <p className="text-xs text-gray-500 font-mono">
          {accountNumber}
        </p>
        {bank && (
          <p className="text-xs text-gray-500">{bank}</p>
        )}
      </div>
      
      {onRemove && (
        <button
          onClick={onRemove}
          className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </motion.div>
  )
} 