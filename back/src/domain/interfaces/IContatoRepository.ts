import { Contato } from '../entities/Contato';
import { ContatoEntity } from '../entities/ContatoEntity';

export interface IContatoRepository {
  criar(data: Partial<ContatoEntity>): Promise<ContatoEntity>;
  buscarTodos(): Promise<ContatoEntity[]>;
  buscarPorId(id: number): Promise<ContatoEntity | null>;
  buscarFavoritos(): Promise<ContatoEntity[]>;
  buscarPorNome(nome: string): Promise<ContatoEntity[]>;
  buscarPorEmail(email: string): Promise<ContatoEntity | null>;
  buscarPorCelular(celular: string): Promise<ContatoEntity | null>;
  atualizar(id: number, data: Partial<ContatoEntity>): Promise<ContatoEntity | null>;
  inativar(id: number): Promise<ContatoEntity | null>;
  ativar(id: number): Promise<ContatoEntity | null>;
  favoritar(id: number): Promise<ContatoEntity | null>;
}