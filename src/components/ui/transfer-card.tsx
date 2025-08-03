import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface TransferCardProps {
  title: string
  description: string
  icon: React.ReactNode
  isSelected?: boolean
  onClick?: () => void
  className?: string
  variant?: "method" | "summary"
  amount?: string
  recipient?: string
  bank?: string
  charges?: string
  reference?: string
}

export function TransferCard({
  title,
  description,
  icon,
  isSelected = false,
  onClick,
  className,
  variant = "method",
  amount,
  recipient,
  bank,
  charges,
  reference
}: TransferCardProps) {
  const cardVariants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -2 },
    tap: { scale: 0.98 },
    selected: { scale: 1.02, y: -2 }
  }

  if (variant === "summary") {
    return (
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="selected"
        className={cn(
          "p-6 rounded-xl border-2 bg-white shadow-sm transition-all duration-300",
          "border-[#0B63BC] bg-[#0B63BC]/5",
          className
        )}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <div className="text-[#0B63BC]">{icon}</div>
          </div>
          
          {amount && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Amount</span>
                <span className="text-xl font-bold text-gray-900">{amount}</span>
              </div>
              
              {recipient && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Recipient</span>
                  <span className="text-sm font-medium text-gray-900">{recipient}</span>
                </div>
              )}
              
              {bank && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bank</span>
                  <span className="text-sm font-medium text-gray-900">{bank}</span>
                </div>
              )}
              
              {charges && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Charges</span>
                  <span className="text-sm font-medium text-gray-900">{charges}</span>
                </div>
              )}
              
              {reference && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Reference</span>
                  <span className="text-sm font-medium text-gray-900 font-mono">{reference}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      animate={isSelected ? "selected" : "initial"}
      onClick={onClick}
      className={cn(
        "p-6 rounded-xl border-2 cursor-pointer transition-all duration-300",
        "bg-white shadow-sm hover:shadow-md",
        isSelected 
          ? "border-[#0B63BC] bg-[#0B63BC]/5" 
          : "border-gray-200 hover:border-[#0B63BC]/50",
        className
      )}
    >
      <div className="flex items-start space-x-4">
        <div className={cn(
          "p-3 rounded-lg",
          isSelected ? "bg-[#0B63BC] text-white" : "bg-gray-100 text-gray-600"
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className={cn(
            "text-lg font-semibold mb-1",
            isSelected ? "text-[#0B63BC]" : "text-gray-900"
          )}>
            {title}
          </h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </motion.div>
  )
} 