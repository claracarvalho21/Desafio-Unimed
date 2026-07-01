import { IContatoRepository } from '../../domain/interfaces/IContatoRepository';
import { AppError } from '../../shared/errors/AppError';

export class AtivarContatoUseCase {
  constructor(private contatoRepository: IContatoRepository) {}

  async execute(id: number): Promise<void> {
    // Busca o contato
    const contato = await this.contatoRepository.buscarPorId(id);
    
    if (!contato) {
      throw new AppError('Contato não encontrado', 404);
    }

    // Verifica se já está ativo
    if (contato.ativo === true) {
      throw new AppError('Contato já está ativo', 400);
    }

    // Ativa o contato
    const contatoAtualizado = await this.contatoRepository.ativar(id);

    if (!contatoAtualizado) {
      throw new AppError('Erro ao ativar contato', 500);
    }
  }
}