// ContatoDetalhe.tsx

import React from 'react';
import type { Contato } from '../../../types/contato';
import { Modal } from '../../atoms/Moda/Modal';
import { ModalFooter } from '../../atoms/Moda/ModalFooter';
import { ModalButton } from '../../atoms/Button/ModalButton';
import { formatters } from '../../../utils/formatters';
import { useContatoActions } from '../../../hooks/useContatoActions';
import { ContatoHeader } from '../../molecules/ContatoHeader/ContatoHeader';
import { ContatoInfoCard } from '../../molecules/ContatoInfoCard/ContatoInfoCard';
import { ContatoActions } from '../../molecules/ContatoActions/ContatoActions';

interface ContatoDetalheProps {
  isOpen: boolean;
  contato: Contato | null;
  onClose: () => void;
  onEditar: (contato: Contato) => void;
  onFavoritar: (id: number) => void | Promise<void>;
  onInativar: (id: number) => void | Promise<void>;
  onAtivar?: (id: number) => void | Promise<void>;
  onContatoAtualizado?: (contato: Contato) => void;
}

export const ContatoDetalhe: React.FC<ContatoDetalheProps> = ({
  isOpen,
  contato,
  onClose,
  onEditar,
  onFavoritar,
  onInativar,
  onAtivar,
  onContatoAtualizado,
}) => {
  const { isLoading, handleToggleStatus, handleFavoritar } = useContatoActions({
    contato: contato!,
    onFavoritar,
    onInativar,
    onAtivar,
    onContatoAtualizado,
  });

  if (!contato) return null;

  // ✅ Usando as const para garantir o tipo correto
  const infoItems = [
    {
      icon: 'phone' as const,
      label: 'Celular',
      value: formatters.celular(contato.celular),
    },
    {
      icon: 'mail' as const,
      label: 'E-mail',
      value: contato.email,
    },
    ...(contato.telefone ? [{
      icon: 'phone' as const,
      label: 'Telefone Fixo',
      value: formatters.telefoneFixo(contato.telefone),
    }] : []),
    {
      icon: 'plus' as const,
      label: 'Cadastrado em',
      value: formatters.dateTime(contato.dataCadastro),
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="xl" showCloseButton={true}>
      <div className="space-y-6">
        {/* Header */}
        <ContatoHeader
          contato={contato}
          isLoading={isLoading}
          onToggleStatus={handleToggleStatus}
        />

        {/* Separator */}
        <div className="w-full h-px bg-linear-to-r from-[#016701] via-[#009A59] to-transparent" />

        {/* Informações */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {infoItems.map((item, index) => (
            <ContatoInfoCard
              key={index}
              icon={item.icon}
              label={item.label}
              value={item.value}
            />
          ))}
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-[#E8F3EF] to-transparent" />

        {/* Ações Rápidas */}
        <ContatoActions
          contato={contato}
          isLoading={isLoading}
          onEditar={() => {
            onClose();
            onEditar(contato);
          }}
          onFavoritar={handleFavoritar}
        />

        {/* Footer */}
        <ModalFooter align="center" className="gap-3 pt-4 pb-1 border-t border-gray-100">
          <ModalButton variant="cancel" onClick={onClose} disabled={isLoading}>
            Voltar
          </ModalButton>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default ContatoDetalhe;