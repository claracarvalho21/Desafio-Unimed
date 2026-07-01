import React from 'react';

interface ContainerWithOverflowProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'custom';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  customMaxWidth?: string;
  customPadding?: string;
  minWidth?: string;  // ← Agora pode ser qualquer valor
}

export const ContainerWithOverflow: React.FC<ContainerWithOverflowProps> = ({
  children,
  className = '',
  maxWidth = 'full',
  padding = 'md',
  customMaxWidth = '',
  customPadding = '',
  minWidth = '100%',  // ← Padrão alterado para 100%
}) => {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
    custom: customMaxWidth,
  };

  const paddingClasses = {
    none: 'px-0',
    sm: 'px-2 sm:px-4',
    md: 'px-4 md:px-6 lg:px-8',
    lg: 'px-6 md:px-8 lg:px-12',
    xl: 'px-8 md:px-12 lg:px-16',
    custom: customPadding,
  };

  return (
    <div
      className={`
        w-full mx-auto
        ${maxWidthClasses[maxWidth]}
        ${paddingClasses[padding]}
        ${className}
      `}
    >
      <div className="w-full overflow-x-auto overflow-y-visible">
        {/* ✅ Usa a minWidth definida ou 100% */}
        <div style={{ minWidth: minWidth }}>
          {children}
        </div>
      </div>
    </div>
  );
};