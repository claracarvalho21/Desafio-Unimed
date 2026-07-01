// tests/integration/contato.routes.spec.ts

import { Request, Response } from 'express';
import { ContatoController } from '../../src/infrastructure/http/controllers/ContatoController';
import { IContatoRepository } from '../../src/domain/interfaces/IContatoRepository';
import { ContatoEntity } from '../../src/domain/entities/ContatoEntity';
import { CriarContatoUseCase } from '../../src/application/use-cases/CriarContatoUseCase';
import { BuscarContatosUseCase } from '../../src/application/use-cases/BuscarContatosUseCase';
import { AtualizarContatoUseCase } from '../../src/application/use-cases/AtualizarContatoUseCase';
import { InativarContatoUseCase } from '../../src/application/use-cases/InativarContatoUseCase';
import { FavoritarContatoUseCase } from '../../src/application/use-cases/FavoritarContatoUseCase';
import { AtivarContatoUseCase } from '../../src/application/use-cases/AtivarContatoUseCase';
import { describe } from 'node:test';

// Mock do repositório
class MockContatoRepository implements IContatoRepository {
  private contatos: ContatoEntity[] = [];
  private nextId = 1;

  async criar(data: Partial<ContatoEntity>): Promise<ContatoEntity> {
    const contato = {
      id: this.nextId++,
      ...data,
      ativo: data.ativo ?? true,
      favorito: data.favorito ?? false,
      created_at: new Date(),
      updated_at: new Date()
    } as ContatoEntity;
    this.contatos.push(contato);
    return contato;
  }

  async buscarTodos(): Promise<ContatoEntity[]> {
    return this.contatos;
  }

  async buscarPorId(id: number): Promise<ContatoEntity | null> {
    return this.contatos.find(c => c.id === id) || null;
  }

  async buscarFavoritos(): Promise<ContatoEntity[]> {
    return this.contatos.filter(c => c.favorito === true && c.ativo === true);
  }

  async buscarPorNome(nome: string): Promise<ContatoEntity[]> {
    return this.contatos.filter(c => 
      c.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  async buscarPorEmail(email: string): Promise<ContatoEntity | null> {
    return this.contatos.find(c => c.email === email) || null;
  }

  async buscarPorCelular(celular: string): Promise<ContatoEntity | null> {
    return this.contatos.find(c => c.celular === celular) || null;
  }

  async atualizar(id: number, data: Partial<ContatoEntity>): Promise<ContatoEntity | null> {
    const contato = await this.buscarPorId(id);
    if (!contato) return null;
    
    Object.assign(contato, data);
    return contato;
  }

  async inativar(id: number): Promise<ContatoEntity | null> {
    const contato = await this.buscarPorId(id);
    if (!contato) return null;
    
    contato.ativo = false;
    return contato;
  }

  async ativar(id: number): Promise<ContatoEntity | null> {
    const contato = await this.buscarPorId(id);
    if (!contato) return null;
    
    contato.ativo = true;
    return contato;
  }

  async favoritar(id: number): Promise<ContatoEntity | null> {
    const contato = await this.buscarPorId(id);
    if (!contato) return null;
    
    contato.favorito = !contato.favorito;
    return contato;
  }
}

// Mock do Response
const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('ContatoController', () => {
  let mockRepository: MockContatoRepository;
  let buscarContatosUseCase: BuscarContatosUseCase;
  let criarContatoUseCase: CriarContatoUseCase;
  let atualizarContatoUseCase: AtualizarContatoUseCase;
  let inativarContatoUseCase: InativarContatoUseCase;
  let favoritarContatoUseCase: FavoritarContatoUseCase;
  let ativarContatoUseCase: AtivarContatoUseCase;
  let controller: ContatoController;

  beforeEach(() => {
    mockRepository = new MockContatoRepository();
    buscarContatosUseCase = new BuscarContatosUseCase(mockRepository);
    criarContatoUseCase = new CriarContatoUseCase(mockRepository);
    atualizarContatoUseCase = new AtualizarContatoUseCase(mockRepository);
    inativarContatoUseCase = new InativarContatoUseCase(mockRepository);
    favoritarContatoUseCase = new FavoritarContatoUseCase(mockRepository);
    ativarContatoUseCase = new AtivarContatoUseCase(mockRepository);
    
    controller = new ContatoController(
      criarContatoUseCase,
      buscarContatosUseCase,
      atualizarContatoUseCase,
      inativarContatoUseCase,
      favoritarContatoUseCase,
      ativarContatoUseCase
    );
  });

  describe('buscarTodos', () => {
    it('deve retornar todos os contatos', async () => {
      const req = { query: {} } as Request;
      const res = mockResponse() as Response;

      await controller.buscarTodos(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('criar', () => {
    it('deve criar um novo contato', async () => {
      const req = {
        body: {
          nome: 'Teste Silva',
          email: 'teste@email.com',
          celular: '11999999999'
        }
      } as Request;
      const res = mockResponse() as Response;

      await controller.criar(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
    });
  });
});