import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TableColumn<T> {
  key: keyof T | string;
  header?: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
  width?: string;
  minWidth?: string;
  hideOnMobile?: boolean;
}

interface TableProps<T> {
  columns?: TableColumn<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  className?: string;
  rowHeight?: string;
  alternatingColors?: boolean;
  colorA?: string;
  colorB?: string;
  hoverColor?: string;
  avatarField?: keyof T;
  avatarBgColor?: string;
  avatarTextColor?: string;
  showAvatar?: boolean;
  avatarSize?: string;
  renderActions?: (item: T) => React.ReactNode;
  children?: React.ReactNode;
  colorWidth?: string;
}

export function Table<T>({
  columns = [],
  data,
  onRowClick,
  className = '',
  rowHeight = 'min-h-[65px]',
  alternatingColors = true,
  colorA = 'bg-[#DCF5EB]',
  colorB = 'bg-white',
  hoverColor = 'hover:bg-[#B6E2D0]',
  avatarField,
  avatarBgColor = 'bg-[#009A59]',
  avatarTextColor = 'text-white',
  showAvatar = false,
  avatarSize = 'w-[35px] h-[35px]',
  renderActions,
  children,
}: TableProps<T>) {
  const [hoveredRowId, setHoveredRowId] = useState<string | number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOverAction, setIsOverAction] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (data.length === 0) {
    return (
      <div className="w-full text-center py-8 text-gray-500">
        Nenhum dado encontrado.
      </div>
    );
  }

  const getAvatarValue = (item: T): string => {
    if (!avatarField) return '';
    const value = item[avatarField];
    return String(value || '').charAt(0).toUpperCase();
  };

  const getItemId = (item: T, index: number): string | number => {
    if (item && typeof item === 'object' && item !== null) {
      const itemWithId = item as Record<string, unknown>;
      if ('id' in itemWithId) {
        const id = itemWithId.id;
        if (id !== undefined && id !== null) {
          return String(id);
        }
      }
    }
    return index;
  };

  const getColumnValue = (item: T, key: string): React.ReactNode => {
    if (item && typeof item === 'object' && item !== null) {
      const itemObj = item as Record<string, unknown>;
      if (key in itemObj) {
        const value = itemObj[key];
        return value !== undefined && value !== null ? String(value) : '';
      }
    }
    return '';
  };

  const handleRowMouseEnter = (id: string | number, e: React.MouseEvent) => {
    if (isOverAction) return;
    if (!onRowClick) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setHoveredRowId(id);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltipPosition({
      top: rect.top - 10,
      left: rect.left + rect.width / 2,
    });

    timerRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 300);
  };

  const handleRowMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShowTooltip(false);
    setHoveredRowId(null);
  };

  const handleActionMouseEnter = () => {
    setIsOverAction(true);
    setShowTooltip(false);
  };

  const handleActionMouseLeave = () => {
    setIsOverAction(false);
  };

  const shouldShowTooltip = showTooltip && hoveredRowId !== null && onRowClick && !isOverAction;

  const tooltipContent = shouldShowTooltip && createPortal(
    <div
      className="fixed z-99999 whitespace-nowrap pointer-events-none
                 px-3 py-1.5 rounded shadow-lg
                 bg-[#016701] text-[#BAD200]
                 text-[12px] font-normal font-['Inter'] leading-[100%] tracking-[0%]
                 transition-opacity duration-200"
      style={{
        top: `${tooltipPosition.top - 28}px`,
        left: `${tooltipPosition.left}px`,
        transform: 'translateX(-50%)',
      }}
    >
      Visualizar detalhes
      <div
        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2
                   w-0 h-0 border-l-[6px] border-l-transparent
                   border-r-[6px] border-r-transparent
                   border-t-[6px] border-t-[#016701]"
      />
    </div>,
    document.body
  );

  return (
    <>
      <div className={`w-full ${className}`}>
        {data.map((item, index) => {
          const id = getItemId(item, index);
          const rowColor = alternatingColors
            ? index % 2 === 0
              ? colorA
              : colorB
            : colorA;

          return (
            <div
              key={id}
              onMouseEnter={(e) => handleRowMouseEnter(id, e)}
              onMouseLeave={handleRowMouseLeave}
              className={`
                flex items-center ${rowHeight} w-full relative
                transition-all duration-200
                ${onRowClick ? 'cursor-pointer hover:shadow-md' : ''}
                ${rowColor} ${hoverColor}
                rounded-lg px-2 sm:px-4
                mb-1
              `}
              onClick={() => onRowClick?.(item)}
            >
              <div className="flex items-center flex-1 w-full min-w-0 gap-2 sm:gap-4">
                {showAvatar && avatarField && (
                  <div className="flex items-center shrink-0">
                    <div
                      className={`
                        ${avatarSize} rounded-full ${avatarBgColor}
                        flex items-center justify-center ${avatarTextColor}
                        font-bold text-[14px] sm:text-[16px] font-['Inter'] shrink-0
                        border-2 border-white
                        shadow-sm
                      `}
                    >
                      {getAvatarValue(item)}
                    </div>
                  </div>
                )}

                {columns.length > 0 ? (
                  <div className="flex items-center flex-1 min-w-0 gap-2 sm:gap-4 flex-wrap">
                    {columns.map((col) => (
                      <div
                        key={String(col.key)}
                        className={`
                          flex-1 min-w-20 
                          ${col.className || ''}
                          ${col.hideOnMobile ? 'hidden sm:block' : ''}
                        `}
                        style={{ 
                          width: col.width || 'auto',
                          minWidth: col.minWidth || '80px'
                        }}
                      >
                        {col.render ? col.render(item) : getColumnValue(item, String(col.key))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center flex-1 min-w-0">
                    {children}
                  </div>
                )}

                {renderActions && (
                  <div 
                    className="shrink-0 flex items-center gap-1 sm:gap-3 ml-auto"
                    onMouseEnter={handleActionMouseEnter}
                    onMouseLeave={handleActionMouseLeave}
                  >
                    {renderActions(item)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {tooltipContent}
    </>
  );
}

export default Table;