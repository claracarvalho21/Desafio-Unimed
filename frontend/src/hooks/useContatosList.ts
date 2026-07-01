import { useState, useCallback } from 'react';
import type { Contato } from '../types/contato';
import { useToast } from '../components/atoms/Toast';

interface UseContatosListProps {
  contatos: Contato[];
  onFavoritar: (id: number) => void;
  onInativar: (id: number) => void;
  onAtivar?: (id: number) => void;
}

export function useContatosList({
  contatos,
  onFavoritar,
  onInativar,
  onAtivar,
}: UseContatosListProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [contatoToToggle, setContatoToToggle] = useState<Contato | null>(null);
  const { showToast } = useToast();

  const handleFavoriteSelected = useCallback((selectedIds: Set<number>) => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    
    ids.forEach((id) => onFavoritar(id));
    showToast('favoritado', `${ids.length} ${ids.length === 1 ? 'contato favoritado' : 'contatos favoritados'}`);
  }, [onFavoritar, showToast]);

  const handleToggleSelected = useCallback((selectedIds: Set<number>) => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;
    
    const allActive = ids.every((id) => {
      const contato = contatos.find((c) => c.id === id);
      return contato?.ativo === true;
    });

    if (allActive) {
      ids.forEach((id) => onInativar(id));
      showToast('desativado', `${ids.length} ${ids.length === 1 ? 'contato desativado' : 'contatos desativados'}`);
    } else {
      ids.forEach((id) => {
        if (onAtivar) onAtivar(id);
      });
      showToast('ativado', `${ids.length} ${ids.length === 1 ? 'contato ativado' : 'contatos ativados'}`);
    }
  }, [contatos, onInativar, onAtivar, showToast]);

  const handleToggleStatus = useCallback((id: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    const contato = contatos.find((c) => c.id === id);
    if (contato) {
      // ✅ Usar 'ativo' ao invés de 'status'
      if (contato.ativo) {
        setContatoToToggle(contato);
        setShowConfirmModal(true);
      } else if (onAtivar) {
        onAtivar(id);
        showToast('ativado', `${contato.nome} ativado com sucesso!`);
      }
    }
  }, [contatos, onAtivar, showToast]);

  const handleConfirmDesativar = useCallback(() => {
    if (contatoToToggle) {
      onInativar(contatoToToggle.id);
      showToast('desativado', `${contatoToToggle.nome} desativado`);
      setContatoToToggle(null);
      setShowConfirmModal(false);
    }
  }, [contatoToToggle, onInativar, showToast]);

  const handleCloseConfirmModal = useCallback(() => {
    setShowConfirmModal(false);
    setContatoToToggle(null);
  }, []);

  return {
    showConfirmModal,
    contatoToToggle,
    handleFavoriteSelected,
    handleToggleSelected,
    handleToggleStatus,
    handleConfirmDesativar,
    handleCloseConfirmModal,
  };
}