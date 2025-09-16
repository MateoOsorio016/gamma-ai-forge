import { useState, useMemo } from 'react';

export interface TableColumn<T> {
  key: keyof T;
  title: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, item: T) => React.ReactNode;
}

export interface TableState {
  sortBy?: string;
  sortOrder: 'asc' | 'desc';
  page: number;
  pageSize: number;
  search: string;
}

export interface UseTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  initialState?: Partial<TableState>;
}

export function useTable<T>({ data, columns, initialState }: UseTableProps<T>) {
  const [state, setState] = useState<TableState>({
    sortBy: undefined,
    sortOrder: 'asc',
    page: 1,
    pageSize: 10,
    search: '',
    ...initialState,
  });

  const filteredData = useMemo(() => {
    if (!state.search) return data;
    
    return data.filter(item =>
      Object.values(item as any).some(value =>
        String(value).toLowerCase().includes(state.search.toLowerCase())
      )
    );
  }, [data, state.search]);

  const sortedData = useMemo(() => {
    if (!state.sortBy) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = (a as any)[state.sortBy!];
      const bValue = (b as any)[state.sortBy!];
      
      if (aValue < bValue) return state.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return state.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, state.sortBy, state.sortOrder]);

  const paginatedData = useMemo(() => {
    const startIndex = (state.page - 1) * state.pageSize;
    return sortedData.slice(startIndex, startIndex + state.pageSize);
  }, [sortedData, state.page, state.pageSize]);

  const totalPages = Math.ceil(sortedData.length / state.pageSize);

  const updateState = (updates: Partial<TableState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleSort = (columnKey: string) => {
    updateState({
      sortBy: columnKey,
      sortOrder: state.sortBy === columnKey && state.sortOrder === 'asc' ? 'desc' : 'asc',
      page: 1,
    });
  };

  const handleSearch = (search: string) => {
    updateState({ search, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateState({ page });
  };

  const handlePageSizeChange = (pageSize: number) => {
    updateState({ pageSize, page: 1 });
  };

  return {
    data: paginatedData,
    columns,
    state,
    totalPages,
    totalItems: sortedData.length,
    handleSort,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
  };
}