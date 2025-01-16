import { X } from 'lucide-react';

interface CloseButtonProps {
  onClick: () => void;
}

export default function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute -top-12 -right-12 p-2 rounded-full bg-background text-foreground hover:bg-accent/15"
      aria-label="Close modal"
    >
      <X className="h-6 w-6" />
    </button>
  );
} 