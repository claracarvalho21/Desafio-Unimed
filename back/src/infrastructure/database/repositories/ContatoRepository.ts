import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { ContatoEntity } from '../../../domain/entities/ContatoEntity';
import { IContatoRepository } from '../../../domain/interfaces/IContatoRepository';

export class ContatoRepository implements IContatoRepository {
  private repository: Repository<ContatoEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(ContatoEntity);
  }

  async criar(data: Partial<ContatoEntity>): Promise<ContatoEntity> {
    const contato = this.repository.create(data);
    return await this.repository.save(contato);
  }

  async buscarTodos(): Promise<ContatoEntity[]> {
    return await this.repository.find({
      order: { created_at: 'DESC' }
    });
  }

  async buscarPorId(id: number): Promise<ContatoEntity | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async buscarFavoritos(): Promise<ContatoEntity[]> {
    return await this.repository.find({
      where: { favorito: true, ativo: true },
      order: { created_at: 'DESC' }
    });
  }

  async buscarPorNome(nome: string): Promise<ContatoEntity[]> {
    return await this.repository
      .createQueryBuilder('c')
      .where('c.nome ILIKE :nome', { nome: `%${nome}%` })
      .orderBy('c.created_at', 'DESC')
      .getMany();
  }

  async buscarPorEmail(email: string): Promise<ContatoEntity | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async buscarPorCelular(celular: string): Promise<ContatoEntity | null> {
    return await this.repository.findOne({ where: { celular } });
  }

  async atualizar(id: number, data: Partial<ContatoEntity>): Promise<ContatoEntity | null> {
    const contato = await this.buscarPorId(id);
    if (!contato) return null;

    Object.assign(contato, data);
    return await this.repository.save(contato);
  }

  async inativar(id: number): Promise<ContatoEntity | null> {
    const contato = await this.buscarPorId(id);
    if (!contato) return null;

    contato.ativo = false;
    return await this.repository.save(contato);
  }

  async ativar(id: number): Promise<ContatoEntity | null> {
    const contato = await this.buscarPorId(id);
    if (!contato) return null;

    contato.ativo = true;
    return await this.repository.save(contato);
  }

  async favoritar(id: number): Promise<ContatoEntity | null> {
    const contato = await this.buscarPorId(id);
    if (!contato) return null;

    contato.favorito = !contato.favorito;
    return await this.repository.save(contato);
  }
}