// frontend/src/hooks/useContatoEdit.ts

import { useState, useCallback } from 'react';
import type { Contato } from '../types/contato';
import { useToast } from '../components/atoms/Toast';
import { useContatoMutations } from './useContatos';
import type { ContatoFormData } from '../components/organisms/ContatoForm/ContatoForm';

interface UseContatoEditProps {
  contato: Contato;
  onClose: () => void;
  onSuccess?: (contatoAtualizado: Contato) => void;
}

interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
  };
  message?: string;
}

export function useContatoEdit({ contato, onClose, onSuccess }: UseContatoEditProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const { atualizarContato } = useContatoMutations();

  const handleSalvar = useCallback(
    async (data: ContatoFormData) => { // ✅ Substituído 'any' por 'ContatoFormData'
      if (!contato) return;
      
      setIsSubmitting(true);

      try {
        const contatoAtualizado = await atualizarContato.mutateAsync({ 
          id: contato.id, 
          data 
        });
        
        showToast('atualizado', `${data.nome} atualizado com sucesso!`);
        onClose();
        
        if (onSuccess) {
          onSuccess(contatoAtualizado);
        }
      } catch (err: unknown) {
        const error = err as ApiError;
        const errorMessage = error?.response?.data?.error || error?.message || 'Erro ao salvar contato';

        if (
          errorMessage.toLowerCase().includes('already exists') ||
          errorMessage.toLowerCase().includes('celular') ||
          errorMessage.toLowerCase().includes('mobile number') ||
          errorMessage.toLowerCase().includes('número') ||
          errorMessage.toLowerCase().includes('cadastrado')
        ) {
          showToast('erro', 'Este número de celular já está cadastrado em outro contato.');
        } else {
          showToast('erro', errorMessage);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [contato, atualizarContato, showToast, onClose, onSuccess]
  );

  const handleCancelar = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleSubmitForm = useCallback(() => {
    const form = document.getElementById('contato-form') as HTMLFormElement;
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  }, []);

  return {
    isSubmitting,
    handleSalvar,
    handleCancelar,
    handleSubmitForm,
  };
}