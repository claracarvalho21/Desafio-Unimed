import React from 'react';
import { Icon, type IconName } from '../../atoms/Input/Icon/Icon';
import { Typography } from '../../atoms/Typography/Typography';

interface FormFieldProps {
  id?: string; // ✅ Adicionar id como opcional
  label: string;
  name: string;
  value: string;
  placeholder: string;
  icon: IconName;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  helperText?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  name,
  value,
  placeholder,
  icon,
  error,
  required = false,
  disabled = false,
  maxLength,
  helperText,
  onChange,
}) => {
  const fieldId = id || name; // ✅ Usar id ou fallback para name

  return (
    <div>
      <label htmlFor={fieldId} className="block text-sm font-medium text-[#016701] mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon name={icon} size={20} color="#016701" />
        </div>
        <input
          id={fieldId}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          className={`w-full h-11 pl-10 pr-3 py-2.5 rounded-lg bg-white text-[#016701] text-base focus:outline-none focus:ring-2 focus:ring-[#B6E2D0] transition-all duration-200 disabled:opacity-50 ${
            error 
              ? 'border-2 border-red-500' 
              : 'border border-[#016701] focus:border-[#016701]'
          }`}
        />
      </div>
      {helperText && !error && (
        <Typography variant="caption" color="secondary" className="text-xs mt-1">
          {helperText}
        </Typography>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};