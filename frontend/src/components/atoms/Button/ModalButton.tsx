import React from 'react';

interface ModalButtonProps {
  variant: 'cancel' | 'confirm';
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const ModalButton: React.FC<ModalButtonProps> = ({
  variant,
  onClick,
  children,
  className = '',
  disabled = false,
}) => {
  const baseStyles = `
    w-[228px] h-[44px] rounded-[7px] border-[1px]
    flex items-center justify-center gap-2.5
    font-['Inter'] font-normal text-[16px] leading-[100%] tracking-[0%]
    transition-all duration-200
    hover:scale-[1.02] active:scale-[0.98]
    focus:outline-none focus:ring-2 focus:ring-[#B6E2D0] focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
  `;

  const variants = {
    cancel: `
      border-[#016701] bg-white text-[#016701]
      hover:bg-[#F5FAF8] hover:border-[#007A45] hover:text-[#007A45]
      active:bg-[#E8F3EF] active:border-[#016701]
      focus:ring-[#B6E2D0]
    `,
    confirm: `
      border-[#016701] bg-[#016701] text-white
      hover:bg-[#007A45] hover:border-[#007A45]
      active:bg-[#005A33] active:border-[#005A33]
      focus:ring-[#B6E2D0]
    `,
  };

  const icons = {
    cancel: (
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors duration-200"
      >
        <path
          d="M18 6L6 18M6 6L18 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    confirm: (
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors duration-200"
      >
        <path
          d="M20 6L9 17L4 12"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${className}
      `}
    >
      <span className="transition-transform duration-200 group-hover:scale-110">
        {icons[variant]}
      </span>
      {children}
    </button>
  );
};