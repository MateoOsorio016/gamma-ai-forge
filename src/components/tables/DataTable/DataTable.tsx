import React from 'react';
import { useTable, TableColumn } from '@/hooks/useTable';
import { TableSearch } from '../TableSearch';
import { TablePagination } from '../TablePagination';
import { TableActions } from '../TableActions';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TableAction {
  id: string;
  label: string;
  icon?: React.ComponentType<any>;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary';
  onClick: (item: any) => void;
}

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: TableAction[];
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  loading?: boolean;
  emptyMessage?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  actions = [],
  searchable = true,
  searchPlaceholder = "Buscar...",
  pageSize = 10,
  loading = false,
  emptyMessage = "No se encontraron registros",
  title,
  description,
  className
}: DataTableProps<T>) {
  const {
    data: paginatedData,
    state,
    totalPages,
    totalItems,
    handleSort,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
  } = useTable({
    data,
    columns,
    initialState: { pageSize }
  });

  const getSortIcon = (columnKey: string) => {
    if (state.sortBy !== columnKey) {
      return <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />;
    }
    return state.sortOrder === 'asc' 
      ? <ChevronUp className="h-4 w-4 text-accent" />
      : <ChevronDown className="h-4 w-4 text-accent" />;
  };

  if (loading) {
    return (
      <Card className={cn("p-6", className)}>
        <div className="animate-pulse space-y-4">
          {searchable && (
            <div className="h-10 bg-muted rounded-md"></div>
          )}
          <div className="space-y-3">
            <div className="h-12 bg-muted rounded-md"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted/50 rounded-md"></div>
            ))}
          </div>
          <div className="h-10 bg-muted rounded-md"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("shadow-soft border-border", className)}>
      {/* Header */}
      {(title || description) && (
        <div className="p-6 pb-4 border-b border-border">
          {title && (
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}

      {/* Search */}
      {searchable && (
        <div className="p-6 pb-4">
          <TableSearch
            value={state.search}
            onChange={handleSearch}
            placeholder={searchPlaceholder}
          />
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              {columns.map((column) => (
                <TableHead 
                  key={String(column.key)}
                  className={cn(
                    "font-medium text-muted-foreground",
                    column.sortable && "cursor-pointer select-none hover:text-foreground transition-colors",
                    column.width && `w-[${column.width}]`
                  )}
                  onClick={() => column.sortable && handleSort(String(column.key))}
                >
                  <div className="flex items-center gap-2">
                    {column.title}
                    {column.sortable && getSortIcon(String(column.key))}
                  </div>
                </TableHead>
              ))}
              {actions.length > 0 && (
                <TableHead className="w-[100px] text-right">
                  Acciones
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item, index) => (
                <TableRow 
                  key={index}
                  className="hover:bg-muted/50 transition-colors border-border"
                >
                  {columns.map((column) => (
                    <TableCell 
                      key={String(column.key)}
                      className="text-foreground"
                    >
                      {column.render 
                        ? column.render((item as any)[column.key], item)
                        : String((item as any)[column.key] || '')
                      }
                    </TableCell>
                  ))}
                  {actions.length > 0 && (
                    <TableCell className="text-right">
                      <TableActions actions={actions} item={item} />
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-6 pt-4 border-t border-border">
          <TablePagination
            currentPage={state.page}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={state.pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      )}
    </Card>
  );
}