import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepperProps {
  steps: string[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("flex items-center justify-between w-full", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep
        const isUpcoming = index > currentStep

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                  isCompleted && "bg-[#0B63BC] text-white",
                  isCurrent && "bg-[#0B63BC] text-white ring-4 ring-[#0B63BC]/20",
                  isUpcoming && "bg-gray-200 text-gray-500"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-2 text-center transition-colors duration-300",
                  isCompleted && "text-[#0B63BC] font-medium",
                  isCurrent && "text-[#0B63BC] font-medium",
                  isUpcoming && "text-gray-500"
                )}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4 transition-colors duration-300",
                  isCompleted ? "bg-[#0B63BC]" : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
} 