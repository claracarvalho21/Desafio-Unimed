import { useState } from 'react';
import type { Contato } from '../types/contato';
import { useToast } from '../components/atoms/Toast';

interface UseContatoActionsProps {
  contato: Contato;
  onFavoritar: (id: number) => void | Promise<void>;
  onInativar: (id: number) => void | Promise<void>;
  onAtivar?: (id: number) => void | Promise<void>;
  onContatoAtualizado?: (contato: Contato) => void;
}

export function useContatoActions({
  contato,
  onFavoritar,
  onInativar,
  onAtivar,
  onContatoAtualizado,
}: UseContatoActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleToggleStatus = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (contato.ativo) {
        await onInativar(contato.id);
        const contatoAtualizado = { ...contato, ativo: false };
        if (onContatoAtualizado) onContatoAtualizado(contatoAtualizado);
        showToast('inativado', `${contato.nome} foi inativado com sucesso!`);
      } else if (onAtivar) {
        await onAtivar(contato.id);
        const contatoAtualizado = { ...contato, ativo: true };
        if (onContatoAtualizado) onContatoAtualizado(contatoAtualizado);
        showToast('ativado', `${contato.nome} foi ativado com sucesso!`);
      }
    } catch {
      showToast('erro', 'Erro ao alterar status do contato');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavoritar = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await onFavoritar(contato.id);
      const contatoAtualizado = { 
        ...contato, 
        favorito: !contato.favorito 
      };
      if (onContatoAtualizado) onContatoAtualizado(contatoAtualizado);
      
      if (contato.favorito) {
        showToast('desfavoritado', `${contato.nome} foi desfavoritado!`);
      } else {
        showToast('favoritado', `${contato.nome} foi favoritado com sucesso!`);
      }
    } catch {
      showToast('erro', 'Erro ao favoritar contato');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleToggleStatus,
    handleFavoritar,
  };
}