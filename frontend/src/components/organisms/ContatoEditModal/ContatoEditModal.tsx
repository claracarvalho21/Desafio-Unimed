// ContatoEditModal.tsx

import React from 'react';
import type { Contato } from '../../../types/contato';
import { ContatoForm } from '../../organisms/ContatoForm/ContatoForm';
import { Modal } from '../../atoms/Moda/Modal';
import { useContatoEdit } from '../../../hooks/useContatoEdit';
import { ContatoEditFooter } from '../../molecules/ContatoEditFoote/ContatoEditFooter';

interface ContatoEditModalProps {
  isOpen: boolean;
  contato: Contato | null;
  onClose: () => void;
  onSuccess?: (contatoAtualizado: Contato) => void;
}

export const ContatoEditModal: React.FC<ContatoEditModalProps> = ({
  isOpen,
  contato,
  onClose,
  onSuccess,
}) => {
  const { isSubmitting, handleSalvar, handleCancelar, handleSubmitForm } = useContatoEdit({
    contato: contato!,
    onClose,
    onSuccess,
  });

  if (!isOpen || !contato) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Contato" size="xl" showCloseButton={true}>
      <div className="flex flex-col gap-5 py-2">
        <div className="w-150 mx-auto">
          <ContatoForm 
            contato={contato} 
            onSave={handleSalvar} 
            onCancel={handleCancelar}
            hideButtons={true}
            isSubmitting={isSubmitting}
          />
        </div>

        <ContatoEditFooter
          onCancel={handleCancelar}
          onSubmit={handleSubmitForm}
          isSubmitting={isSubmitting}
        />
      </div>
    </Modal>
  );
};

export default ContatoEditModal;