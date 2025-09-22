import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface TableFilter {
  key: string;
  label: string;
  options: FilterOption[];
  type?: 'checkbox' | 'select' | 'date';
}

export interface TableFiltersProps {
  filters: TableFilter[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterKey: string, values: string[]) => void;
  onClearAll: () => void;
  className?: string;
}

export function TableFilters({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
  className
}: TableFiltersProps) {
  const activeFilterCount = Object.values(activeFilters).flat().length;

  const handleFilterToggle = (filterKey: string, value: string) => {
    const currentValues = activeFilters[filterKey] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange(filterKey, newValues);
  };

  const removeFilter = (filterKey: string, value: string) => {
    const currentValues = activeFilters[filterKey] || [];
    const newValues = currentValues.filter(v => v !== value);
    onFilterChange(filterKey, newValues);
  };

  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Filter Dropdowns */}
      <div className="flex items-center gap-2">
        {filters.map((filter) => (
          <DropdownMenu key={filter.key}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-input hover:bg-accent hover:text-accent-foreground"
              >
                <Filter className="mr-2 h-4 w-4" />
                {filter.label}
                {activeFilters[filter.key]?.length > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                    {activeFilters[filter.key].length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 bg-popover border-border">
              <DropdownMenuLabel>{filter.label}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              {filter.options.map((option) => (
                <DropdownMenuCheckboxItem
                  key={option.value}
                  checked={activeFilters[filter.key]?.includes(option.value) || false}
                  onCheckedChange={() => handleFilterToggle(filter.key, option.value)}
                  className="text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{option.label}</span>
                    {option.count !== undefined && (
                      <Badge variant="outline" className="ml-2 h-5 text-xs">
                        {option.count}
                      </Badge>
                    )}
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex flex-wrap gap-1">
            {Object.entries(activeFilters).map(([filterKey, values]) =>
              values.map((value) => {
                const filter = filters.find(f => f.key === filterKey);
                const option = filter?.options.find(o => o.value === value);
                
                return (
                  <Badge
                    key={`${filterKey}-${value}`}
                    variant="secondary"
                    className="text-xs px-2 py-1 gap-1"
                  >
                    {option?.label || value}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-3 w-3 p-0 hover:bg-transparent"
                      onClick={() => removeFilter(filterKey, value)}
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </Badge>
                );
              })
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            Limpiar todo
          </Button>
        </div>
      )}
    </div>
  );
}