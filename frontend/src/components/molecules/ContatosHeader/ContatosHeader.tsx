
import React from 'react';
import { AddButton } from '../../atoms/Button/AddButton';
import phoneIcon from '../../../assets/images/boxicons_phone-filled.svg';
import type { Contato } from '../../../types/contato';

interface ContatosHeaderProps {
  contatos: Contato[];
  onNewContato: () => void;
  mostrarInativos: boolean;
  onToggleMostrarInativos: () => void;
}

export const ContatosHeader: React.FC<ContatosHeaderProps> = ({
  contatos,
  onNewContato,
}) => {
  const ativos = contatos.filter(c => c.ativo === true).length;
  const inativos = contatos.filter(c => c.ativo === false).length;
  const total = contatos.length;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-[#016701] flex items-center gap-2">
          <img
            src={phoneIcon}
            alt="Ícone telefone"
            className="w-[26.69px] h-[26.68px]"
            style={{
              filter:
                'brightness(0) saturate(100%) invert(21%) sepia(97%) saturate(1470%) hue-rotate(140deg) brightness(91%) contrast(101%)',
            }}
          />
          Contatos
        </h1>
        <div className="flex items-center gap-4 mt-1">
          <span className="text-sm text-green-600">Ativos: {ativos}</span>
          <span className="text-sm text-gray-400">Inativos: {inativos}</span>
          <span className="text-sm text-[#016701] font-medium">Total: {total}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">

        
        <AddButton onClick={onNewContato} />
      </div>
    </div>
  );
};

export default ContatosHeader;