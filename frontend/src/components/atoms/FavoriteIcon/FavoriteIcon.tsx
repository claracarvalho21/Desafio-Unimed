import React, { useState, useRef } from 'react';
import favoriteIcon from '../../../assets/images/mi_favorite.svg';
import { createPortal } from 'react-dom';

interface FavoriteIconProps {
  isFavorited: boolean;
  onClick?: () => void; // ✅ Sem parâmetros
  size?: number;
  className?: string;
  showHoverEffect?: boolean;
}

export const FavoriteIcon: React.FC<FavoriteIconProps> = ({
  isFavorited,
  onClick,
  size = 24,
  className = '',
  showHoverEffect = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  const getFilter = () => {
    if (isFavorited && isHovered) {
      return 'brightness(0) saturate(100%) invert(39%) sepia(74%) saturate(1470%) hue-rotate(140deg) brightness(94%) contrast(101%)';
    }
    if (isFavorited) {
      return 'brightness(0) saturate(100%) invert(21%) sepia(97%) saturate(1470%) hue-rotate(140deg) brightness(91%) contrast(101%)';
    }
    if (!isFavorited && isHovered) {
      return 'brightness(0) saturate(100%) invert(39%) sepia(74%) saturate(1470%) hue-rotate(140deg) brightness(94%) contrast(101%)';
    }
    return 'brightness(0) saturate(100%) invert(47%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(85%)';
  };

  const tooltipText = isFavorited ? 'Desfavoritar' : 'Favoritar';

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowTooltip(true);
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top - 10,
        left: rect.left + rect.width / 2,
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowTooltip(false);
  };

  const tooltipContent = showTooltip && createPortal(
    <div
      className="fixed z-[99999] whitespace-nowrap pointer-events-none
                 px-3 py-1.5 rounded shadow-lg
                 bg-[#016701] text-[#BAD200]
                 text-[12px] font-normal font-['Inter'] leading-[100%] tracking-[0%]
                 transition-opacity duration-200"
      style={{
        top: `${tooltipPosition.top - 28}px`,
        left: `${tooltipPosition.left}px`,
        transform: 'translateX(-50%)',
      }}
    >
      {tooltipText}
      <div
        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2
                   w-0 h-0 border-l-[6px] border-l-transparent
                   border-r-[6px] border-r-transparent
                   border-t-[6px] border-t-[#016701]"
      />
    </div>,
    document.body
  );

  return (
    <>
      <div
        ref={buttonRef}
        className="relative inline-flex z-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={onClick}
          className={`
            flex items-center justify-center
            transition-all duration-300 ease-in-out
            ${showHoverEffect ? 'hover:scale-110' : ''}
            ${className}
          `}
          style={{ width: size, height: size }}
          aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <img
            src={favoriteIcon}
            alt="Favorito"
            className="w-full h-full transition-all duration-300"
            style={{
              filter: getFilter(),
            }}
          />
        </button>
      </div>
      {tooltipContent}
    </>
  );
};