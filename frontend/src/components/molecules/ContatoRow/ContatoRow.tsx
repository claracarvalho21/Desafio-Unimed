// frontend/src/components/molecules/ContatoRow/ContatoRow.tsx

import React from 'react';
import type { Contato } from '../../../types/contato';
import { Avatar } from '../../atoms/Avatar/Avatar';

interface ContatoRowProps {
  item: Contato;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export const ContatoRow: React.FC<ContatoRowProps> = ({
  item,
  isSelected,
  onSelect,
}) => {
  return (
    <div className="flex items-center gap-3">
      <div onClick={(e) => e.stopPropagation()}>
        <Avatar
          name={item.nome}
          isSelected={isSelected}
          onSelect={() => onSelect(item.id)}
          size={35}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-[16px] font-normal text-[#016701] leading-[100%] tracking-[0%]">
          {item.nome}
        </span>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`
            text-[11px] font-medium leading-[100%] tracking-[0%]
            ${item.ativo ? 'text-green-600' : 'text-gray-400'}
          `}>
            {item.ativo ? 'Ativo' : 'Inativo'}
          </span>
          {item.favorito && (
            <span className="text-[11px] font-medium text-yellow-600">
              ⭐ Favorito
            </span>
          )}
        </div>
      </div>
    </div>
  );
};