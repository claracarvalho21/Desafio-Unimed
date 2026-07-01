import React, { useState } from 'react';

interface AvatarProps {
  name: string;
  isSelected?: boolean;
  onSelect?: () => void;
  size?: number;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  isSelected = false,
  onSelect,
  size = 35,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getInitials = (nome: string): string => {
    return nome.charAt(0).toUpperCase();
  };

  const getBackgroundColor = () => {
    if (isSelected) {
      return 'bg-[#BAD200]';
    }
    if (isHovered) {
      return 'bg-[#FFD700]';
    }
    return 'bg-[#009A59]';
  };

  const getTextColor = () => {
    if (isSelected) {
      return 'text-[#016701]';
    }
    if (isHovered) {
      return 'text-[#016701]';
    }
    return 'text-white';
  };

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        rounded-full flex items-center justify-center
        font-bold text-[16px] font-['Inter'] shrink-0
        transition-all duration-300 ease-in-out
        hover:scale-105 active:scale-95
        ${getBackgroundColor()}
        ${getTextColor()}
        ${className}
        border-2 ${isSelected ? 'border-[#016701]' : isHovered ? 'border-[#FFD700]' : 'border-transparent'}
      `}
      style={{
        width: size,
        height: size,
      }}
      aria-label={isSelected ? 'Desselecionar' : 'Selecionar'}
    >
      {isSelected ? (
        <svg
          width={size * 0.6}
          height={size * 0.6}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 6L9 17L4 12"
            stroke="#016701"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        getInitials(name)
      )}
    </button>
  );
};