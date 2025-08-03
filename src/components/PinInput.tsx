import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

interface PinInputProps {
  length?: number;
  onComplete: (pin: string) => void;
  onClose: () => void;
  error?: string;
}

export function PinInput({ length = 4, onComplete, onClose, error }: PinInputProps) {
  const [pin, setPin] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;
    
    const newPin = [...pin];
    newPin[index] = value.slice(-1); // Only take the last character
    setPin(newPin);
    
    // Move to next input or complete
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Check if all inputs are filled
    if (newPin.every(digit => digit !== '') && newPin.length === length) {
      onComplete(newPin.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      // Move left with arrow key
      inputRefs.current[index - 1]?.focus();
      e.preventDefault();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      // Move right with arrow key
      inputRefs.current[index + 1]?.focus();
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    
    // Only allow numbers and limit to pin length
    const numbers = pastedData.replace(/\D/g, '').split('').slice(0, length);
    
    if (numbers.length > 0) {
      const newPin = [...pin];
      numbers.forEach((num, i) => {
        if (i < length) newPin[i] = num;
      });
      setPin(newPin);
      
      // Focus the next empty input or the last one
      const nextIndex = Math.min(numbers.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      
      // If we have a complete pin, trigger onComplete
      if (numbers.length >= length) {
        onComplete(numbers.slice(0, length).join(''));
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-2">
        {Array.from({ length }).map((_, index) => (
          <Input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="password"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={pin[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className="w-14 h-14 text-2xl text-center font-mono"
            autoFocus={index === 0}
          />
        ))}
      </div>
      
      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}
      
      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700"
          type="button"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
