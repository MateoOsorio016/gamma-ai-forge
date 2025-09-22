import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface TableSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function TableSearch({
  value,
  onChange,
  placeholder = "Buscar...",
  className,
  disabled = false
}: TableSearchProps) {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={cn("relative max-w-sm", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="pl-9 pr-9 bg-background border-input focus:border-ring transition-colors"
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          onClick={handleClear}
          disabled={disabled}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}