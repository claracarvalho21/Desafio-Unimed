import { contatoApi } from '../api/contatoApi';
import validationService from './validationService';
import type {
  Contato,
  CriarContatoDTO,
  AtualizarContatoDTO,
} from '../types/contato';

class ContatoService {
  /**
   * Listar todos os contatos
   */
  async listar(filtro?: string): Promise<Contato[]> {
    try {
      return await contatoApi.listar(filtro);
    } catch (error) {
      console.error('Erro ao listar contatos:', error);
      throw error;
    }
  }

  /**
   * Buscar contato por ID
   */
  async buscarPorId(id: number): Promise<Contato | null> {
    try {
      return await contatoApi.buscarPorId(id);
    } catch (error) {
      console.error(`Erro ao buscar contato ${id}:`, error);
      return null;
    }
  }

  /**
   * Criar contato
   */
  async criar(data: CriarContatoDTO): Promise<Contato> {
    try {
      // Utiliza o ValidationService
      const validation = validationService.validarContato(data);

      if (!validation.isValid) {
        throw new Error(Object.values(validation.errors).join(', '));
      }

      const payload = {
        nome: data.nome.trim(),
        email: data.email.trim(),
        celular: data.celular.replace(/\D/g, ''),
        telefone: data.telefone
          ? data.telefone.replace(/\D/g, '')
          : '',
      };

      return await contatoApi.criar(payload);
    } catch (error) {
      console.error('Erro ao criar contato:', error);
      throw error;
    }
  }

  /**
   * Atualizar contato
   */
  async atualizar(
    id: number,
    data: AtualizarContatoDTO
  ): Promise<Contato> {
    try {
      return await contatoApi.atualizar(id, data);
    } catch (error) {
      console.error(`Erro ao atualizar contato ${id}:`, error);
      throw error;
    }
  }

  /**
   * Favoritar ou desfavoritar
   */
  async favoritar(id: number): Promise<Contato> {
    try {
      return await contatoApi.favoritar(id);
    } catch (error) {
      console.error(`Erro ao favoritar contato ${id}:`, error);
      throw error;
    }
  }

  /**
   * Inativar contato
   */
  async inativar(id: number): Promise<void> {
    try {
      await contatoApi.inativar(id);
    } catch (error) {
      console.error(`Erro ao inativar contato ${id}:`, error);
      throw error;
    }
  }

  /**
   * Ativar contato
   */
  async ativar(id: number): Promise<void> {
    try {
      await contatoApi.ativar(id);
    } catch (error) {
      console.error(`Erro ao ativar contato ${id}:`, error);
      throw error;
    }
  }

  /**
   * Listar favoritos
   */
  async listarFavoritos(): Promise<Contato[]> {
    try {
      return await contatoApi.listarFavoritos();
    } catch (error) {
      console.error('Erro ao listar favoritos:', error);
      throw error;
    }
  }
}

export default new ContatoService();