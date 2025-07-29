import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MobileCardProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  noShadow?: boolean;
  noBorder?: boolean;
  fullWidth?: boolean;
}

export function MobileCard({
  children,
  className = "",
  noPadding = false,
  noShadow = false,
  noBorder = false,
  fullWidth = false,
  ...props
}: MobileCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl",
        !noShadow && "shadow-sm",
        !noBorder && "border border-gray-100",
        !fullWidth && "w-full",
        !noPadding && "p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface MobileCardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function MobileCardHeader({ children, className = "" }: MobileCardHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-3", className)}>
      {children}
    </div>
  );
}

interface MobileCardTitleProps {
  children: ReactNode;
  className?: string;
}

export function MobileCardTitle({ children, className = "" }: MobileCardTitleProps) {
  return (
    <h3 className={cn("text-sm font-medium text-gray-500", className)}>
      {children}
    </h3>
  );
}

interface MobileCardContentProps {
  children: ReactNode;
  className?: string;
}

export function MobileCardContent({ children, className = "" }: MobileCardContentProps) {
  return <div className={cn("", className)}>{children}</div>;
}

interface MobileCardFooterProps {
  children: ReactNode;
  className?: string;
}

export function MobileCardFooter({ children, className = "" }: MobileCardFooterProps) {
  return <div className={cn("mt-4 pt-4 border-t border-gray-100", className)}>{children}</div>;
}

MobileCard.Header = MobileCardHeader;
MobileCard.Title = MobileCardTitle;
MobileCard.Content = MobileCardContent;
MobileCard.Footer = MobileCardFooter;

export default MobileCard;
