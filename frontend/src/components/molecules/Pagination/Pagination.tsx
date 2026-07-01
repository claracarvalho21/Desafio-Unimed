// frontend/src/components/molecules/Pagination/Pagination.tsx

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
  onPrevious,
  onNext,
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= maxVisible; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-200">
      <div className="text-sm text-gray-600">
        Mostrando {startIndex + 1} - {Math.min(endIndex, totalItems)} de {totalItems} contatos
      </div>
      
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <button
          onClick={onPrevious}
          disabled={currentPage === 1}
          className={`
            px-3 py-1.5 rounded-md text-sm font-medium transition-colors
            ${currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-[#016701] border border-[#016701] hover:bg-[#F5FAF8]'
            }
          `}
        >
          Anterior
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`
                w-8 h-8 rounded-md text-sm font-medium transition-colors
                ${currentPage === pageNum
                  ? 'bg-[#016701] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }
              `}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className={`
            px-3 py-1.5 rounded-md text-sm font-medium transition-colors
            ${currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-[#016701] border border-[#016701] hover:bg-[#F5FAF8]'
            }
          `}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};