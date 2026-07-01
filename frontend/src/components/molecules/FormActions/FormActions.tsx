import React from 'react';
import { Icon } from '../../atoms/Input/Icon/Icon';

interface FormActionsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
  submitText?: string;
  cancelText?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  isSubmitting = false,
  submitText = 'Salvar',
  cancelText = 'Cancelar',
}) => {
  return (
    <div className="flex gap-3 pt-2">
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-lg bg-[#009A59] text-white font-medium hover:bg-[#007A45] transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Salvando...' : (
          <>
            <Icon name="check" size={16} color="white" />
            {submitText}
          </>
        )}
      </button>
      <button
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 flex-1 px-4 py-2.5 rounded-lg border border-[#016701] text-[#016701] hover:bg-[#F5FAF8] transition-colors font-medium disabled:opacity-50"
      >
        <Icon name="close" size={16} color="#016701" />
        {cancelText}
      </button>
    </div>
  );
};