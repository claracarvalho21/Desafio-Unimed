import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContatosFiltrados, useContatoMutations } from './useContatos';
import { useToast } from '../components/atoms/Toast';
import type { Contato } from '../types/contato';

export function useContatosPage() {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState('');
  const [mostrarInativos, setMostrarInativos] = useState(true);
  const [selectedContato, setSelectedContato] = useState<Contato | null>(null);
  const [modalType, setModalType] = useState<'detalhe' | 'edicao' | null>(null);
  const { showToast } = useToast();
  
  const { data: contatos = [], allContatos = [], isLoading, error, refetch } = 
    useContatosFiltrados(filtro, mostrarInativos);
  
  const { favoritarContato, inativarContato, ativarContato } = useContatoMutations();

  const favoritos = contatos.filter((c) => c.favorito);
  const contatosInativos = allContatos.filter((c: Contato) => !c.ativo);

  const toggleMostrarInativos = useCallback(() => {
    setMostrarInativos(prev => !prev);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalType(null);
    setSelectedContato(null);
  }, []);

  const handleContatoAtualizado = useCallback((contatoAtualizado: Contato) => {
    setSelectedContato(contatoAtualizado);
  }, []);

  const handleFavoritar = useCallback(
    (id: number) => {
      const contato = contatos.find((c) => c.id === id);
      if (contato) {
        showToast(
          contato.favorito ? 'desfavoritado' : 'favoritado',
          contato.favorito ? `${contato.nome} desfavoritado` : `${contato.nome} favoritado`
        );
      }
      favoritarContato.mutate(id, {
        onSuccess: (contatoAtualizado) => {
          if (selectedContato && selectedContato.id === id) {
            setSelectedContato(contatoAtualizado);
          }
          refetch();
        }
      });
    },
    [favoritarContato, selectedContato, refetch, contatos, showToast]
  );

  const handleInativar = useCallback(
    (id: number) => {
      const contato = contatos.find((c) => c.id === id);
      if (contato) {
        showToast('inativado', `${contato.nome} foi inativado com sucesso!`);
      }
      inativarContato.mutate(id, {
        onSuccess: () => {
          refetch();
          if (selectedContato && selectedContato.id === id) {
            handleCloseModal();
          }
        }
      });
    },
    [inativarContato, selectedContato, refetch, handleCloseModal, contatos, showToast]
  );

  const handleAtivar = useCallback(
    (id: number) => {
      const contato = contatos.find((c) => c.id === id);
      if (contato) {
        showToast('ativado', `${contato.nome} foi ativado com sucesso!`);
      }
      ativarContato.mutate(id, {
        onSuccess: () => {
          refetch();
          if (selectedContato && selectedContato.id === id) {
            setSelectedContato(prev => prev ? { ...prev, ativo: true } : null);
          }
        }
      });
    },
    [ativarContato, refetch, selectedContato, contatos, showToast]
  );

  const handleEditar = useCallback((contato: Contato) => {
    setModalType(null);
    setTimeout(() => {
      setSelectedContato(contato);
      setModalType('edicao');
    }, 50);
  }, []);

  const handleOpenDetalhe = useCallback((contato: Contato) => {
    setModalType(null);
    setTimeout(() => {
      setSelectedContato(contato);
      setModalType('detalhe');
    }, 50);
  }, []);

  const handleSearch = useCallback((term: string) => {
    setFiltro(term);
  }, []);

  const handleNewContato = useCallback(() => {
    navigate('/contatos/novo');
  }, [navigate]);

  const handleEditSuccess = useCallback((contatoAtualizado: Contato) => {
    setModalType(null);
    setTimeout(() => {
      setSelectedContato(contatoAtualizado);
      setModalType('detalhe');
    }, 50);
    refetch();
  }, [refetch]);

  const handleEditClose = useCallback(() => {
    if (selectedContato) {
      setModalType(null);
      setTimeout(() => {
        setModalType('detalhe');
      }, 50);
    } else {
      setModalType(null);
    }
  }, [selectedContato]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    // Dados
    contatos,
    favoritos,
    contatosInativos,
    isLoading,
    error,
    
    // Estado dos modais
    selectedContato,
    modalType,
    
    // Filtros
    mostrarInativos,
    toggleMostrarInativos,
    
    // Handlers
    handleCloseModal,
    handleContatoAtualizado,
    handleFavoritar,
    handleInativar,
    handleAtivar,
    handleEditar,
    handleOpenDetalhe,
    handleSearch,
    handleNewContato,
    handleEditSuccess,
    handleEditClose,
    refetch,
  };
}