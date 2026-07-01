import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import userAddIcon from '../../../assets/images/mdi_user-add.svg';

interface AddButtonProps {
  onClick?: () => void;
  className?: string;
}

export const AddButton: React.FC<AddButtonProps> = ({ onClick, className = '' }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
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
    setShowTooltip(false);
  };

  const tooltipContent = showTooltip && createPortal(
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
      Adicionar Contato
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
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          w-15.5 h-15.5 rounded-[33px]
          bg-[#BAD200] 
          flex items-center justify-center
          hover:bg-[#A8C000] transition-colors
          hover:scale-105 active:scale-95
          shadow-md hover:shadow-lg
          add-button
          ${className}
        `}
        aria-label="Adicionar contato"
      >
        <img
          src={userAddIcon}
          alt="Adicionar contato"
          className="w-6.5 h-10 add-button-icon transition-all duration-200"
          style={{
            filter:
              'brightness(0) saturate(100%) invert(21%) sepia(97%) saturate(1470%) hue-rotate(140deg) brightness(91%) contrast(101%)',
          }}
        />
      </button>
      {tooltipContent}
    </>
  );
};