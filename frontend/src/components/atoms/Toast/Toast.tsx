import React, { useEffect, useState } from 'react';

export type ToastType =
  | 'favoritado'
  | 'desfavoritado'
  | 'desativado'
  | 'ativado'
  | 'atualizado'
  | 'adicionado'
  | 'inativado'
  | 'erro';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ type, message, onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // ✅ Fechar ao clicar
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'favoritado':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              fill="#BAD200"
              stroke="#BAD200"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'desfavoritado':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
              stroke="#BAD200"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        );
      case 'desativado':
      case 'inativado':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="8" width="16" height="8" rx="4" stroke="#BAD200" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" fill="#BAD200" />
          </svg>
        );
      case 'ativado':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="8" width="16" height="8" rx="4" fill="#BAD200" />
            <circle cx="12" cy="12" r="3" fill="white" />
          </svg>
        );
      case 'atualizado':
      case 'adicionado':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17L4 12"
              stroke="#BAD200"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'erro':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
            <line
              x1="12"
              y1="8"
              x2="12"
              y2="12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="12"
              y1="16"
              x2="12.01"
              y2="16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'erro':
        return 'bg-red-600';
      default:
        return 'bg-[#016701]';
    }
  };

  function getDefaultMessage(): React.ReactNode {
    throw new Error('Function not implemented.');
  }

  return (
    <div
      onClick={handleClose} // ✅ Clique para fechar
      className={`
        fixed top-8.25 left-1/2 transform -translate-x-1/2 z-50
        w-150 h-11
        rounded-[54px] px-7 py-1
        ${getBackgroundColor()}
        flex items-center justify-center gap-2.5
        transition-all duration-300 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
        shadow-lg
        cursor-pointer hover:opacity-90 active:scale-[0.98]
      `}
    >
      <div className="shrink-0">{getIcon()}</div>
      <span className="text-white text-[16px] font-normal font-['Inter'] leading-[100%] tracking-[0%]">
        {message || getDefaultMessage()}
      </span>
    </div>
  );
};
