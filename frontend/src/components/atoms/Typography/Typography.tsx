import React from 'react';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label' | 'subtitle';
export type TypographyColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'white' | 'gray';

export interface TypographyProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  className?: string;
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div' | 'label';
  align?: 'left' | 'center' | 'right';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = 'primary',
  className = '',
  children,
  as: Component = 'span',
  align = 'left',
  weight,
}) => {
  const variantStyles = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-2xl font-bold',
    h4: 'text-xl font-bold',
    subtitle: 'text-lg font-semibold',
    body: 'text-base font-normal',
    caption: 'text-sm font-normal',
    label: 'text-sm font-medium',
  };

  const colorStyles = {
    primary: 'text-[#016701]',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    danger: 'text-red-600',
    warning: 'text-yellow-600',
    white: 'text-white',
    gray: 'text-gray-500',
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const weightStyles = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const weightClass = weight ? weightStyles[weight] : '';

  return (
    <Component
      className={`
        font-['Inter'] leading-[100%] tracking-[0%]
        ${variantStyles[variant]}
        ${colorStyles[color]}
        ${alignStyles[align]}
        ${weightClass}
        ${className}
      `}
    >
      {children}
    </Component>
  );
};

export default Typography;