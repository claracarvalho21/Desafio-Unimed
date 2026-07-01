import React from 'react';
import { FavoriteIcon } from '../../atoms/FavoriteIcon/FavoriteIcon';
import { ToggleSwitch } from '../../atoms/ToggleSwitch/ToggleSwitch';

interface BulkActionsProps {
  selectedCount: number;
  onClearSelection: () => void;
  onFavoriteSelected: () => void;
  onToggleSelected: () => void;
  className?: string;
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  onClearSelection,
  onFavoriteSelected,
  onToggleSelected,
  className = '',
}) => {
  const hasSelection = selectedCount > 0;

  return (
    <div className={`
      flex items-center gap-3 px-3 py-1.5
      bg-[#F5FAF8] rounded-lg
      border border-[#E8F3EF] 
      transition-all duration-300
      ${className}
    `}>
      <span className={`
        text-xs font-medium
        ${hasSelection ? 'text-[#016701]' : 'text-gray-400'}
      `}>
        {hasSelection 
          ? `${selectedCount} ${selectedCount === 1 ? 'selecionado' : 'selecionados'}`
          : 'Selecione contatos'}
      </span>

      <div className="w-px h-5 bg-[#E8F3EF]" />

      {/* ✅ Favoritar - usando div em vez de button */}
      <div
        onClick={hasSelection ? onFavoriteSelected : undefined}
        className={`
          flex items-center gap-1.5 transition-all duration-200
          ${hasSelection 
            ? 'text-[#016701] hover:text-[#009A59] hover:scale-105 cursor-pointer' 
            : 'opacity-40 cursor-not-allowed'}
        `}
        title={hasSelection ? 'Favoritar selecionados' : 'Selecione contatos para favoritar'}
      >
        <FavoriteIcon 
          isFavorited={true} 
          size={18}
          className={!hasSelection ? 'opacity-40' : ''}
        />
        <span className={`
          text-xs font-medium
          ${hasSelection ? 'text-[#016701]' : 'text-gray-400'}
        `}>
          Favoritar
        </span>
      </div>

      <div className="w-px h-5 bg-[#E8F3EF]" />

      {/* ✅ Ativar/Desativar */}
      <div className={`
        flex items-center gap-1.5
        ${!hasSelection ? 'opacity-40' : ''}
      `}>
        <span className="text-xs text-[#016701]">Ativar</span>
        <ToggleSwitch
          isActive={true}
          onToggle={hasSelection ? onToggleSelected : () => {}}
          size={24}
          disabled={!hasSelection}
        />
        <span className="text-xs text-[#016701]">Desativar</span>
      </div>

      <div className="w-px h-5 bg-[#E8F3EF]" />

      {/* ✅ Limpar */}
      <button
        onClick={onClearSelection}
        disabled={!hasSelection}
        className={`
          text-xs transition-all duration-200
          ${hasSelection 
            ? 'text-gray-400 hover:text-red-500 hover:scale-105 cursor-pointer' 
            : 'text-gray-200 cursor-not-allowed'}
        `}
      >
        Limpar
      </button>
    </div>
  );
};