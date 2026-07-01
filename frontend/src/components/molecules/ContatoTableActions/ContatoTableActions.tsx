import React from 'react';
import type { Contato } from '../../../types/contato';
import { FavoriteIcon } from '../../atoms/FavoriteIcon/FavoriteIcon';
import { ToggleSwitch } from '../../atoms/ToggleSwitch/ToggleSwitch';

interface ContatoTableActionsProps {
  item: Contato;
  onFavoritar: (id: number) => void;
  onToggleStatus: (id: number, e?: React.MouseEvent) => void;
}

export const ContatoTableActions: React.FC<ContatoTableActionsProps> = ({
  item,
  onFavoritar,
  onToggleStatus,
}) => {
  return (
    <div className="flex items-center gap-3">
      <div 
        onClick={(e) => {
          e.stopPropagation();
          onFavoritar(item.id);
        }}
        className="cursor-pointer"
      >
        <FavoriteIcon
          isFavorited={item.favorito}
          size={24}
        />
      </div>
      
      <div 
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        className="cursor-pointer"
      >
        <ToggleSwitch
          isActive={item.ativo}
          size={28}
          onToggle={() => onToggleStatus(item.id)}
        />
      </div>
    </div>
  );
};