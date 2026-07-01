import React from 'react';
import GroupsIcon from '../../../assets/images/ic_sharp-groups.svg';
import { BulkActions } from '../../molecules/BulkActions/BulkActions';

interface ContatosTableHeaderProps {
  totalItems: number;
  selectedCount: number;
  onClearSelection: () => void;
  onFavoriteSelected: () => void;
  onToggleSelected: () => void;
}

export const ContatosTableHeader: React.FC<ContatosTableHeaderProps> = ({
  totalItems,
  selectedCount,
  onClearSelection,
  onFavoriteSelected,
  onToggleSelected,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-4">
        <h2 className="text-[24px] font-bold text-[#016701] font-['Inter'] leading-[100%] tracking-[0%] flex items-center gap-2">
          <img
            src={GroupsIcon}
            alt="Contatos"
            className="w-8 h-8"
            style={{
              filter:
                'brightness(0) saturate(100%) invert(21%) sepia(97%) saturate(1470%) hue-rotate(140deg) brightness(91%) contrast(101%)',
            }}
          />
          Todos
        </h2>
        <span className="text-sm text-gray-500">
          {totalItems} contatos
        </span>
      </div>
      
      <BulkActions
        selectedCount={selectedCount}
        onClearSelection={onClearSelection}
        onFavoriteSelected={onFavoriteSelected}
        onToggleSelected={onToggleSelected}
      />
    </div>
  );
};