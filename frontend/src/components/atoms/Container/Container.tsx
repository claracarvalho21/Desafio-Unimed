import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'custom';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  as?: 'div' | 'section' | 'main' | 'article';
  customMaxWidth?: string;
  customPadding?: string;
  overflow?: 'hidden' | 'visible' | 'auto';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  maxWidth = 'full',
  padding = 'md',
  as: Component = 'div',
  customMaxWidth = '',
  customPadding = '',
  overflow = 'visible',
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

  const overflowClasses = {
    hidden: 'overflow-hidden',
    visible: 'overflow-visible',
    auto: 'overflow-auto',
  };

  return (
    <Component
      className={`
        w-full mx-auto
        ${maxWidthClasses[maxWidth]}
        ${paddingClasses[padding]}
        ${overflowClasses[overflow]}
        ${className}
      `}
    >
      {children}
    </Component>
  );
};

export default Container;