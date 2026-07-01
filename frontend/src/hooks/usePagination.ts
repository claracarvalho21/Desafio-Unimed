import { useState, useMemo, useCallback } from 'react';

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage?: number;
  sortBy?: keyof T;
  sortDirection?: 'asc' | 'desc';
}

export function usePagination<T>({
  items,
  itemsPerPage = 10,
  sortBy,
  sortDirection = 'asc',
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const sortedItems = useMemo(() => {
    // Se não tiver sortBy, não ordenar
    if (!sortBy) {
      return items;
    }
    
    return [...items].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      // Se for string, ordenar alfabeticamente
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      
      // Se for número ou outro tipo
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [items, sortBy, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(sortedItems.length / itemsPerPage));
  
  const validPage = useMemo(() => {
    return Math.min(currentPage, totalPages);
  }, [currentPage, totalPages]);

  const currentItems = useMemo(() => {
    const startIndex = (validPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedItems.slice(startIndex, endIndex);
  }, [sortedItems, validPage, itemsPerPage]);

  const goToPage = useCallback((page: number) => {
    const targetPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(targetPage);
  }, [totalPages]);

  const goToPreviousPage = useCallback(() => {
    goToPage(validPage - 1);
  }, [goToPage, validPage]);

  const goToNextPage = useCallback(() => {
    goToPage(validPage + 1);
  }, [goToPage, validPage]);

  return {
    currentItems,
    sortedItems,
    totalItems: sortedItems.length,
    currentPage: validPage,
    totalPages,
    itemsPerPage,
    startIndex: (validPage - 1) * itemsPerPage,
    endIndex: Math.min(validPage * itemsPerPage, sortedItems.length),
    goToPage,
    goToPreviousPage,
    goToNextPage,
  };
}