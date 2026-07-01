import React from 'react';
import { useTheme } from '../../../hooks/useTheme';

const AccessibilityBar: React.FC = () => {
  const { 
    isHighContrast, 
    toggleHighContrast, 
    increaseFontSize, 
    decreaseFontSize 
  } = useTheme();

  return (
    <div className="w-full bg-[#BAD200] h-8 flex items-center justify-end px-4 gap-3 text-xs accessibility-bar">
      {/* Contraste */}
      <button
        onClick={toggleHighContrast}
        className="flex items-center gap-1 font-medium group"
        aria-label={isHighContrast ? 'Desativar alto contraste' : 'Ativar alto contraste'}
      >
        <div className="w-7 h-6 flex items-center justify-center bg-[#009A59] rounded-sm">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="halfDrop">
                <rect x="12" y="0" width="12" height="24" />
              </clipPath>
            </defs>
            <path
              d="M12 2C12 2 4 10 4 16C4 20.4183 7.58172 24 12 24C16.4183 24 20 20.4183 20 16C20 10 12 2 12 2Z"
              fill="#007A45"
            />
            <path
              d="M12 2C12 2 4 10 4 16C4 20.4183 7.58172 24 12 24C16.4183 24 20 20.4183 20 16C20 10 12 2 12 2Z"
              fill="white"
              clipPath="url(#halfDrop)"
            />
          </svg>
        </div>
        <span className="text-[#009A59] font-medium group-hover:text-white transition-colors">
          {isHighContrast ? 'Modo Normal' : 'Contraste'}
        </span>
      </button>

      {/* A+ */}
      <div className="flex items-center gap-1 group">
        <button
          onClick={increaseFontSize}
          className="w-7 h-6 flex items-center justify-center bg-[#009A59] text-white font-bold text-sm rounded-sm hover:opacity-80 transition-opacity"
          aria-label="Aumentar tamanho da fonte"
        >
          A+
        </button>
        <span className="text-[#009A59] font-medium text-[11px] group-hover:text-white transition-colors">
          Aumentar
        </span>
      </div>

      {/* A- */}
      <div className="flex items-center gap-1 group">
        <button
          onClick={decreaseFontSize}
          className="w-7 h-6 flex items-center justify-center bg-[#009A59] text-white font-bold text-sm rounded-sm hover:opacity-80 transition-opacity"
          aria-label="Diminuir tamanho da fonte"
        >
          A-
        </button>
        <span className="text-[#009A59] font-medium text-[11px] group-hover:text-white transition-colors">
          Diminuir
        </span>
      </div>
    </div>
  );
};

export default AccessibilityBar;