import React from 'react';
import type { Contato } from '../../../types/contato';
import { Icon } from '../../atoms/Input/Icon/Icon';
import { Typography } from '../../atoms/Typography/Typography';
import { FavoriteIcon } from '../../atoms/FavoriteIcon/FavoriteIcon';

interface ContatoActionsProps {
  contato: Contato;
  isLoading: boolean;
  onEditar: () => void;
  onFavoritar: () => void;
}

export const ContatoActions: React.FC<ContatoActionsProps> = ({
  contato,
  isLoading,
  onEditar,
  onFavoritar,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#F5FAF8] rounded-lg border border-[#E8F3EF]">
      <Typography variant="caption" color="secondary" className="text-xs font-medium">
        Ações rápidas:
      </Typography>
      
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={onEditar}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#016701] bg-white text-[#016701] hover:bg-[#F5FAF8] transition-colors text-sm font-medium"
          disabled={isLoading}
        >
          <Icon name="edit" size={16} color="#016701" />
          Editar
        </button>

        <button
          onClick={onFavoritar}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#016701] bg-white text-[#016701] hover:bg-[#F5FAF8] transition-colors text-sm font-medium"
          disabled={isLoading}
        >
          <FavoriteIcon isFavorited={contato.favorito} size={18} />
          {isLoading ? 'Carregando...' : (contato.favorito ? 'Desfavoritar' : 'Favoritar')}
        </button>
      </div>
    </div>
  );
};