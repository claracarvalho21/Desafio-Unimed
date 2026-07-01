import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import contatoService from '../services/contatoService';
import type { CriarContatoDTO, AtualizarContatoDTO, Contato } from '../types/contato';
import React from 'react';

const QUERY_KEYS = {
  contatos: () => ['contatos'] as const,
  favoritos: () => ['contatos', 'favoritos'] as const,
  contato: (id: number) => ['contato', id] as const,
};

export const useContatos = (filtro?: string) => {
  return useQuery({
    queryKey: ['contatos', filtro],
    queryFn: () => contatoService.listar(filtro),
  });
};

export const useContatosFiltrados = (filtro: string = '', mostrarInativos: boolean = true) => {
  const { data: contatos = [], isLoading, error, isFetching, refetch } = useContatos();

  const contatosFiltrados = React.useMemo(() => {
    let resultado = contatos;

    if (!mostrarInativos) {
      resultado = resultado.filter((contato: Contato) => contato.ativo === true);
    }

    // Aplicar filtro de busca
    if (filtro && filtro.trim() !== '') {
      const term = filtro.toLowerCase().trim();
      resultado = resultado.filter((contato: Contato) => {
        const celularLimpo = contato.celular.replace(/\D/g, '');
        const telefoneLimpo = contato.telefone?.replace(/\D/g, '') || '';

        return (
          contato.nome.toLowerCase().includes(term) ||
          contato.email.toLowerCase().includes(term) ||
          celularLimpo.includes(term) ||
          telefoneLimpo.includes(term) ||
          contato.celular.includes(term) ||
          (contato.telefone && contato.telefone.includes(term))
        );
      });
    }

    return resultado;
  }, [contatos, filtro, mostrarInativos]);

  return {
    data: contatosFiltrados,
    allContatos: contatos,
    isLoading,
    isFetching,
    error,
    refetch,
  };
};

export const useFavoritos = () => {
  return useQuery({
    queryKey: QUERY_KEYS.favoritos(),
    queryFn: () => contatoService.listarFavoritos(),
    staleTime: 1000 * 60 * 1,
  });
};

export const useContatoMutations = () => {
  const queryClient = useQueryClient();

  const criarContato = useMutation({
    mutationFn: (data: CriarContatoDTO) => contatoService.criar(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contatos'] });
      queryClient.setQueryData(['contato', data.id], data);
    },
  });

  const atualizarContato = useMutation({
    mutationFn: ({ id, data }: { id: number; data: AtualizarContatoDTO }) =>
      contatoService.atualizar(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData(['contato', data.id], data);
      queryClient.invalidateQueries({ queryKey: ['contatos'] });
    },
  });

  const favoritarContato = useMutation({
    mutationFn: (id: number) => contatoService.favoritar(id),
    onSuccess: (data) => {
      queryClient.setQueryData(['contato', data.id], data);
      queryClient.invalidateQueries({ queryKey: ['contatos'] });
      queryClient.invalidateQueries({ queryKey: ['contatos', 'favoritos'] });
    },
  });

  const inativarContato = useMutation({
    mutationFn: (id: number) => contatoService.inativar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contatos'] });
      queryClient.invalidateQueries({ queryKey: ['contatos', 'favoritos'] });
    },
  });

  const ativarContato = useMutation({
    mutationFn: (id: number) => contatoService.ativar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contatos'] });
      queryClient.invalidateQueries({ queryKey: ['contatos', 'favoritos'] });
    },
  });

  return {
    criarContato,
    atualizarContato,
    favoritarContato,
    inativarContato,
    ativarContato,
  };
};