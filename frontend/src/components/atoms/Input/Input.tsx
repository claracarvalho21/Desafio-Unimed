import React, { forwardRef } from 'react';
import { Icon, type IconName } from './Icon/Icon';
import { Typography } from './Typography/Typography';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  iconName?: IconName;
  iconPosition?: 'left' | 'right';
  required?: boolean;
  helperText?: string;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      iconName,
      iconPosition = 'left',
      required = false,
      helperText,
      containerClassName = '',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    const baseStyles = `
      w-full h-[44px] rounded-[7px] border-[1px]
      px-3 py-2.5
      bg-white text-[#016701] text-[16px]
      font-['Inter'] font-normal leading-[100%] tracking-[0%]
      placeholder:text-[#016701] placeholder:opacity-40
      border-[#016701]
      focus:outline-none focus:ring-2 focus:ring-[#B6E2D0] focus:border-[#016701]
      transition-all duration-200
      disabled:opacity-50 disabled:cursor-not-allowed
      ${error ? 'border-red-500 focus:ring-red-200' : ''}
      ${iconName && iconPosition === 'left' ? 'pl-10' : ''}
      ${iconName && iconPosition === 'right' ? 'pr-10' : ''}
      ${className}
    `;

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <Typography variant="label" color="primary" className="mb-1 block">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Typography>
        )}

        <div className="relative w-full">
          {iconName && iconPosition === 'left' && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon name={iconName} size={20} color="#016701" />
            </div>
          )}

          <input ref={ref} id={inputId} className={baseStyles} {...props} />

          {iconName && iconPosition === 'right' && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Icon name={iconName} size={20} color="#016701" />
            </div>
          )}
        </div>

        {helperText && !error && (
          <Typography variant="caption" color="secondary" className="mt-1 block">
            {helperText}
          </Typography>
        )}

        {error && (
          <Typography variant="caption" color="danger" className="mt-1 block">
            {error}
          </Typography>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';