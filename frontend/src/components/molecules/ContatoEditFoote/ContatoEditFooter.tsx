import React from 'react';
import { ModalFooter } from '../../atoms/Moda/ModalFooter';
import { ModalButton } from '../../atoms/Button/ModalButton';

interface ContatoEditFooterProps {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const ContatoEditFooter: React.FC<ContatoEditFooterProps> = ({
  onCancel,
  onSubmit,
  isSubmitting = false,
}) => {
  return (
    <ModalFooter align="center" className="gap-5 pt-4 border-t border-gray-100">
      <ModalButton
        variant="cancel"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancelar
      </ModalButton>
      
      <ModalButton
        variant="confirm"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </ModalButton>
    </ModalFooter>
  );
};