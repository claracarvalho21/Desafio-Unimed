import { IContatoRepository } from '../../domain/interfaces/IContatoRepository';
import { AppError } from '../../shared/errors/AppError';

export class InativarContatoUseCase {
  constructor(private contatoRepository: IContatoRepository) {}

  async execute(id: number): Promise<void> {
    
    // Busca o contato
    const contato = await this.contatoRepository.buscarPorId(id);
    
    if (!contato) {
      throw new AppError(`Contato com ID ${id} não encontrado`, 404);
    }

    // Verifica se já está inativo
    if (contato.ativo === false) {
      throw new AppError(`Contato com ID ${id} já está inativo`, 400);
    }

    // Inativa o contato
    const contatoAtualizado = await this.contatoRepository.inativar(id);

    if (!contatoAtualizado) {
      throw new AppError(`Erro ao inativar contato com ID ${id}`, 500);
    }
  }
}