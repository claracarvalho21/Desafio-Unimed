import { api } from './api';
import type { Contato, CriarContatoDTO, AtualizarContatoDTO } from '../types/contato';

export const contatoApi = {
  // Listar todos os contatos
  listar: async (filtro?: string): Promise<Contato[]> => {
    const url = filtro ? `/api/contatos?filtro=${filtro}` : '/api/contatos';
    const response = await api.get(url);
    return response.data;
  },

  // Buscar contatos com filtro
  buscar: async (filtro: string): Promise<Contato[]> => {
    const response = await api.get(`/api/contatos?filtro=${filtro}`);
    return response.data;
  },

  // Buscar contato por ID
  buscarPorId: async (id: number): Promise<Contato> => {
    const response = await api.get(`/api/contatos/${id}`);
    return response.data;
  },

  // Criar contato
  criar: async (data: CriarContatoDTO): Promise<Contato> => {
    const response = await api.post('/api/contatos', data);
    return response.data;
  },

  // Atualizar contato
  atualizar: async (id: number, data: AtualizarContatoDTO): Promise<Contato> => {
    const response = await api.put(`/api/contatos/${id}`, data);
    return response.data;
  },

  // Favoritar/Desfavoritar
  favoritar: async (id: number): Promise<Contato> => {
    const response = await api.patch(`/api/contatos/${id}/favoritar`);
    return response.data;
  },

  // Inativar contato
  inativar: async (id: number): Promise<void> => {
    await api.delete(`/api/contatos/${id}`);
  },

  // Ativar contato
  ativar: async (id: number): Promise<void> => {
    await api.patch(`/api/contatos/${id}/ativar`);
  },

  // Listar favoritos
  listarFavoritos: async (): Promise<Contato[]> => {
    const response = await api.get('/api/contatos/favoritos');
    return response.data;
  },
};

export default contatoApi;