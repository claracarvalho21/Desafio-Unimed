import React from 'react';

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right' | 'between';
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className = '',
  align = 'right',
}) => {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div className={`
      flex items-center ${alignClasses[align]} gap-3 px-6 py-4
      border-t border-gray-100 bg-gray-50
      ${className}
    `}>
      {children}
    </div>
  );
};