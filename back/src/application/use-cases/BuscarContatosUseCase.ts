import { IContatoRepository } from '../../domain/interfaces/IContatoRepository';
import { ContatoMapper } from '../mappers/ContatoMapper';

export class BuscarContatosUseCase {
  constructor(private contatoRepository: IContatoRepository) {}

  async execute(filtro?: string): Promise<any[]> {
    let contatos;

    // ✅ Se não houver filtro, busca TODOS os contatos (ativos E inativos)
    if (!filtro || filtro.trim() === '') {
      contatos = await this.contatoRepository.buscarTodos();
    } else {
      // Buscar por nome (também retorna todos, independente do status)
      contatos = await this.contatoRepository.buscarPorNome(filtro);
    }

    return contatos.map(contato => ContatoMapper.toResponse(contato));
  }

  async buscarPorId(id: number): Promise<any | null> {
    const contato = await this.contatoRepository.buscarPorId(id);
    if (!contato) {
      return null;
    }
    return ContatoMapper.toResponse(contato);
  }
}