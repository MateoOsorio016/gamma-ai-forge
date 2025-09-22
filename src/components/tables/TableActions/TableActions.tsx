import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableAction } from '../DataTable';
import { cn } from '@/lib/utils';

export interface TableActionsProps {
  actions: TableAction[];
  item: any;
  className?: string;
  triggerClassName?: string;
  showLabel?: boolean;
}

export function TableActions({
  actions,
  item,
  className,
  triggerClassName,
  showLabel = false
}: TableActionsProps) {
  if (actions.length === 0) {
    return null;
  }

  // Si hay solo una acción, mostrarla como botón directo
  if (actions.length === 1) {
    const action = actions[0];
    const Icon = action.icon;
    
    return (
      <Button
        variant={action.variant || 'outline'}
        size="sm"
        onClick={() => action.onClick(item)}
        className={cn("h-8 w-8 p-0", triggerClassName)}
      >
        {Icon && <Icon className="h-4 w-4" />}
        {!Icon && showLabel && action.label}
      </Button>
    );
  }

  // Si hay múltiples acciones, mostrar dropdown
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn("h-8 w-8 p-0", triggerClassName)}
          >
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-popover border-border">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border" />
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <DropdownMenuItem
                key={action.id}
                onClick={() => action.onClick(item)}
                className={cn(
                  "cursor-pointer text-popover-foreground hover:bg-accent hover:text-accent-foreground",
                  action.variant === 'destructive' && "text-destructive hover:bg-destructive hover:text-destructive-foreground"
                )}
              >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {action.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}