import React from 'react';
import { ModalSmall } from './ModalSmall';
import { Typography } from '../Typography/Typography';
import { ModalButton } from '../../atoms/Button/ModalButton';

interface ModalConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
}

export const ModalConfirm: React.FC<ModalConfirmProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar ação',
  message = 'Tem certeza que deseja realizar esta ação?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  icon,
}) => {
  return (
    <ModalSmall isOpen={isOpen} onClose={onClose} showCloseButton={true} maxWidth="max-w-sm">
      <div className="text-center space-y-4">
        {icon && (
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}

        <Typography variant="h4" color="primary" className="text-center">
          {title}
        </Typography>

        <Typography variant="body" color="secondary" className="text-center">
          {message}
        </Typography>

        <div className="flex items-center justify-center gap-3 pt-4">
          <ModalButton
            variant="cancel"
            onClick={onClose}
          >
            {cancelText}
          </ModalButton>
          <ModalButton
            variant="confirm"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </ModalButton>
        </div>
      </div>
    </ModalSmall>
  );
};