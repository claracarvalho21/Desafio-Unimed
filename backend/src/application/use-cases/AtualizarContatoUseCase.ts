import { IContatoRepository } from '../../domain/interfaces/IContatoRepository';
import { ContatoMapper } from '../mappers/ContatoMapper';
import { AppError } from '../../shared/errors/AppError';

export class AtualizarContatoUseCase {
  constructor(private contatoRepository: IContatoRepository) {}

  async execute(id: number, data: { nome?: string; email?: string; celular?: string; telefone?: string }) {
    // Busca o contato
    const contato = await this.contatoRepository.buscarPorId(id);
    
    if (!contato) {
      throw new AppError('Contato não encontrado', 404);
    }

    // Verifica se o email já existe (se estiver atualizando)
    if (data.email && data.email !== contato.email) {
      const existente = await this.contatoRepository.buscarPorEmail(data.email);
      if (existente) {
        throw new AppError('Email já cadastrado', 400);
      }
    }

    // Atualiza o contato
    const contatoAtualizado = await this.contatoRepository.atualizar(id, {
      nome: data.nome,
      email: data.email,
      celular: data.celular,
      telefone: data.telefone
    });

    if (!contatoAtualizado) {
      throw new AppError('Erro ao atualizar contato', 500);
    }

    return ContatoMapper.toResponse(contatoAtualizado);
  }
}