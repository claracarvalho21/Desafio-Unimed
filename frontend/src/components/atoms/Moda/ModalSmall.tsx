import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalSmallProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
  maxWidth?: string;
}

export const ModalSmall: React.FC<ModalSmallProps> = ({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
  className = '',
  maxWidth = 'max-w-md',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`
          ${maxWidth}
          w-full bg-white rounded-xl shadow-2xl
          overflow-hidden
          animate-fade-in-up
          ${className}
        `}
        style={{
          maxHeight: '80vh',
        }}
      >
        {/* ✅ Barra verde superior mais fina */}
        <div className="w-full h-1 bg-[#009A59]" />

        {/* ✅ Header do modal menor */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-auto"
              aria-label="Fechar"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* ✅ Conteúdo com padding reduzido */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 60px)' }}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};