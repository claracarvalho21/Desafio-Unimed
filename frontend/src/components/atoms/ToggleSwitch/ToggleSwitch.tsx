import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ToggleSwitchProps {
  isActive: boolean;
  onToggle: () => void;
  size?: number;
  className?: string;
  disabled?: boolean;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isActive,
  onToggle,
  size = 32,
  className = '',
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const circleSize = size - 8;

  const getColors = () => {
    if (isActive) {
      return {
        bg: '#016701',
        border: '#016701',
        circleBg: '#FFFFFF',
        hoverBg: '#009A59',
        hoverBorder: '#009A59',
      };
    } else {
      return {
        bg: 'transparent',
        border: '#747474',
        circleBg: '#747474',
        hoverBg: 'transparent',
        hoverBorder: '#009A59',
      };
    }
  };

  const colors = getColors();
  const circlePosition = isActive ? 'right-2' : 'left-2';
  const effectiveIsHovered = !disabled && isHovered;
  const tooltipText = isActive ? 'Desativar' : 'Ativar';

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsHovered(true);
      setShowTooltip(true);
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setTooltipPosition({
          top: rect.top - 10,
          left: rect.left + rect.width / 2,
        });
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowTooltip(false);
  };

  // ✅ Função que previne comportamento padrão
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      onToggle();
    }
  };

  const tooltipContent = showTooltip && !disabled && createPortal(
    <div
      className="fixed z-99999 whitespace-nowrap pointer-events-none
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
      <button
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        disabled={disabled}
        type="button"
        className={`
          relative rounded-full transition-all duration-300 ease-in-out
          flex items-center
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
        style={{
          width: size,
          height: size / 2,
          border: `2px solid ${effectiveIsHovered ? colors.hoverBorder : colors.border}`,
          backgroundColor: effectiveIsHovered ? colors.hoverBg : colors.bg,
        }}
        aria-label={isActive ? 'Desativar' : 'Ativar'}
      >
        <div
          className={`
            absolute ${circlePosition} transition-all duration-300 ease-in-out
            rounded-full
          `}
          style={{
            width: circleSize,
            height: circleSize,
            backgroundColor: isActive ? '#FFFFFF' : '#747474',
            boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
            transform: isHovered && !isActive ? 'scale(0.95)' : 'scale(0.5)',
          }}
        />
      </button>
      {tooltipContent}
    </>
  );
};