import React from 'react';
import type { Contato } from '../../../types/contato';
import { ToggleSwitch } from '../../atoms/ToggleSwitch/ToggleSwitch';
import { Typography } from '../../atoms/Typography/Typography';

interface ContatoHeaderProps {
  contato: Contato;
  isLoading: boolean;
  onToggleStatus: () => void;
}

export const ContatoHeader: React.FC<ContatoHeaderProps> = ({
  contato,
  isLoading,
  onToggleStatus,
}) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#009A59]/10 flex items-center justify-center border-2 border-[#009A59]/20">
          <span className="text-2xl font-bold text-[#016701]">
            {contato.nome.charAt(0).toUpperCase()}
          </span>
        </div>
        
        <div>
          <Typography variant="h3" color="primary" className="font-bold">
            {contato.nome}
          </Typography>
          <div className="flex items-center gap-2 mt-1">
            {/* ✅ CORRIGIDO: usando 'ativo' em vez de 'status' */}
            <span className={`
              inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              ${contato.ativo 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
              }
            `}>
              {contato.ativo ? '🟢 Ativo' : '🔴 Inativo'}
            </span>
            {contato.favorito && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                ⭐ Favorito
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Typography variant="caption" color="secondary" className="text-sm">
          {contato.ativo ? 'Ativo' : 'Inativo'}
        </Typography>
        {/* ✅ CORRIGIDO: passando 'contato.ativo' diretamente */}
        <ToggleSwitch
          isActive={contato.ativo}
          onToggle={onToggleStatus}
          size={28}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};