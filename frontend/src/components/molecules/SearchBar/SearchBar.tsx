import React, { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  className?: string;
  debounceDelay?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Buscar por nome ou número...',
  className = '',
  debounceDelay = 500,
}) => {
  const [term, setTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (term.trim() === '') {
      onSearch('');
      return;
    }

    debounceTimerRef.current = setTimeout(() => {
      onSearch(term);
    }, debounceDelay);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [term, onSearch, debounceDelay]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    onSearch(term);
  };

  const handleClear = () => {
    setTerm('');
    onSearch('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value);
    
    if (value.trim() === '') {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      onSearch('');
    }
  };

  const getBorderColor = () => {
    if (isFocused) return 'border-[#009A59] ring-2 ring-[#B6E2D0]';
    if (term) return 'border-[#009A59]';
    if (isHovered) return 'border-[#B6E2D0]';
    return 'border-gray-300';
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="relative w-full">
        {/* Ícone */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="#016701"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="16.5"
              y1="16.5"
              x2="21"
              y2="21"
              stroke="#016701"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder={placeholder}
          value={term}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            w-full h-11 pl-12 pr-32 py-2.5
            border rounded-[10px]
            bg-white text-[#016701] text-[16px]
            placeholder:text-[#016701] placeholder:opacity-60
            transition-all duration-200
            outline-none
            font-['Inter'] font-normal leading-[100%] tracking-[0%]
            ${getBorderColor()}
          `}
          style={{ fontFamily: 'Inter, sans-serif' }}
        />

        {/* Botão de limpar */}
        {term && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-16 top-1/2 -translate-y-1/2 text-[#016701] hover:text-[#009A59] transition-colors z-10"
            aria-label="Limpar busca"
          >
            ✕
          </button>
        )}

        {/* Botão de busca */}
        <button
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#009A59] text-white text-sm font-medium rounded-lg hover:bg-[#007A45] transition-colors z-10"
        >
          Buscar
        </button>
      </div>
    </form>
  );
};