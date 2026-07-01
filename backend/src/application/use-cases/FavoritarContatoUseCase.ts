import { IContatoRepository } from '../../domain/interfaces/IContatoRepository';
import { ContatoMapper } from '../mappers/ContatoMapper';
import { AppError } from '../../shared/errors/AppError';

export class FavoritarContatoUseCase {
  constructor(private contatoRepository: IContatoRepository) {}

  async execute(id: number) {
    // Busca o contato
    const contato = await this.contatoRepository.buscarPorId(id);
    
    if (!contato) {
      throw new AppError('Contato não encontrado', 404);
    }

    // Favorita/Desfavorita
    const contatoAtualizado = await this.contatoRepository.favoritar(id);

    if (!contatoAtualizado) {
      throw new AppError('Erro ao favoritar contato', 500);
    }

    return ContatoMapper.toResponse(contatoAtualizado);
  }

  async buscarFavoritos() {
    const contatos = await this.contatoRepository.buscarFavoritos();
    return contatos.map(contato => ContatoMapper.toResponse(contato));
  }
}