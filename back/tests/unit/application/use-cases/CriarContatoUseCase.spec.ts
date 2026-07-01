// tests/unit/application/use-cases/CriarContatoUseCase.spec.ts

import { CriarContatoUseCase } from '../../../../src/application/use-cases/CriarContatoUseCase';
import { IContatoRepository } from '../../../../src/domain/interfaces/IContatoRepository';
import { ContatoEntity } from '../../../../src/domain/entities/ContatoEntity';
import { AppError } from '../../../../src/shared/errors/AppError';

describe('CriarContatoUseCase', () => {
  let useCase: CriarContatoUseCase;
  let mockRepository: jest.Mocked<IContatoRepository>;

  beforeEach(() => {
    // ✅ Mock completo
    mockRepository = {
      criar: jest.fn(),
      buscarTodos: jest.fn(),
      buscarPorId: jest.fn(),
      buscarFavoritos: jest.fn(),
      buscarPorNome: jest.fn(),
      buscarPorEmail: jest.fn(),
      buscarPorCelular: jest.fn(),
      atualizar: jest.fn(),
      inativar: jest.fn(),
      ativar: jest.fn(),
      favoritar: jest.fn(),
    };

    useCase = new CriarContatoUseCase(mockRepository);
  });

  it('deve criar um contato com sucesso', async () => {
    const dados = {
      nome: 'Ana Souza',
      email: 'ana@email.com',
      celular: '11988887777',
      telefone: '12345678'
    };

    const contatoCriado: ContatoEntity = {
      id: 1,
      nome: dados.nome,
      email: dados.email,
      celular: dados.celular,
      telefone: dados.telefone || '',
      favorito: false,
      ativo: true,
      created_at: new Date(),
    };

    // ✅ Mock dos métodos chamados no useCase
    mockRepository.buscarPorEmail.mockResolvedValue(null);
    mockRepository.buscarPorCelular.mockResolvedValue(null);
    mockRepository.criar.mockResolvedValue(contatoCriado);

    const result = await useCase.execute(dados);

    expect(result).toBeDefined();
    expect(result.ativo).toBe(true);
    expect(result.nome).toBe(dados.nome);
    expect(result.email).toBe(dados.email);
    expect(result.celular).toBe(dados.celular);
    expect(mockRepository.buscarPorEmail).toHaveBeenCalledWith(dados.email);
    expect(mockRepository.buscarPorCelular).toHaveBeenCalledWith(dados.celular);
    expect(mockRepository.criar).toHaveBeenCalledWith({
      nome: dados.nome,
      email: dados.email,
      celular: dados.celular,
      telefone: dados.telefone || '',
      favorito: false,
      ativo: true
    });
  });

  it('deve lançar erro se email já existir', async () => {
    const dados = {
      nome: 'Ana Souza',
      email: 'ana@email.com',
      celular: '11988887777'
    };

    const contatoExistente: ContatoEntity = {
      id: 1,
      nome: 'Outro',
      email: dados.email,
      celular: '11999999999',
      telefone: '',
      favorito: false,
      ativo: true,
      created_at: new Date(),
    };

    // ✅ Mock do método buscarPorEmail retornando um contato existente
    mockRepository.buscarPorEmail.mockResolvedValue(contatoExistente);

    await expect(useCase.execute(dados)).rejects.toThrow(AppError);
    expect(mockRepository.buscarPorEmail).toHaveBeenCalledWith(dados.email);
    expect(mockRepository.criar).not.toHaveBeenCalled();
  });

  it('deve lançar erro se celular já existir', async () => {
    const dados = {
      nome: 'Ana Souza',
      email: 'ana@email.com',
      celular: '11988887777'
    };

    const contatoExistente: ContatoEntity = {
      id: 1,
      nome: 'Outro',
      email: 'outro@email.com',
      celular: dados.celular,
      telefone: '',
      favorito: false,
      ativo: true,
      created_at: new Date(),
    };

    // ✅ Mock: email não existe, mas celular existe
    mockRepository.buscarPorEmail.mockResolvedValue(null);
    mockRepository.buscarPorCelular.mockResolvedValue(contatoExistente);

    await expect(useCase.execute(dados)).rejects.toThrow(AppError);
    expect(mockRepository.buscarPorEmail).toHaveBeenCalledWith(dados.email);
    expect(mockRepository.buscarPorCelular).toHaveBeenCalledWith(dados.celular);
    expect(mockRepository.criar).not.toHaveBeenCalled();
  });

  it('deve criar contato mesmo sem telefone', async () => {
    const dados = {
      nome: 'Carlos Silva',
      email: 'carlos@email.com',
      celular: '11977776666'
    };

    const contatoCriado: ContatoEntity = {
      id: 2,
      nome: dados.nome,
      email: dados.email,
      celular: dados.celular,
      telefone: '',
      favorito: false,
      ativo: true,
      created_at: new Date(),
    };

    mockRepository.buscarPorEmail.mockResolvedValue(null);
    mockRepository.buscarPorCelular.mockResolvedValue(null);
    mockRepository.criar.mockResolvedValue(contatoCriado);

    const result = await useCase.execute(dados);

    expect(result).toBeDefined();
    expect(result.telefone).toBe('');
    expect(mockRepository.criar).toHaveBeenCalledWith({
      nome: dados.nome,
      email: dados.email,
      celular: dados.celular,
      telefone: '',
      favorito: false,
      ativo: true
    });
  });
});