// tests/unit/application/use-cases/FavoritarContatoUseCase.spec.ts

import { FavoritarContatoUseCase } from '../../../../src/application/use-cases/FavoritarContatoUseCase';
import { IContatoRepository } from '../../../../src/domain/interfaces/IContatoRepository';
import { ContatoEntity } from '../../../../src/domain/entities/ContatoEntity';
import { AppError } from '../../../../src/shared/errors/AppError';

// ✅ Mock do repositório sem 'salvar' e com todos os métodos
const mockRepository: jest.Mocked<IContatoRepository> = {
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

describe('FavoritarContatoUseCase', () => {
  let useCase: FavoritarContatoUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new FavoritarContatoUseCase(mockRepository);
  });

  it('deve favoritar um contato com sucesso', async () => {
    // ✅ Usar apenas as propriedades CORRETAS da entidade
    const contato: ContatoEntity = {
      id: 1,
      nome: 'João Silva',
      email: 'joao@email.com',
      celular: '11999999999',
      telefone: '12345678',
      favorito: false,
      ativo: true,
      created_at: new Date(),
      // ❌ REMOVER: status
      // ❌ REMOVER: updated_at
    };

    const contatoFavoritado: ContatoEntity = {
      ...contato,
      favorito: true
    };

    mockRepository.buscarPorId.mockResolvedValue(contato);
    mockRepository.favoritar.mockResolvedValue(contatoFavoritado);

    const result = await useCase.execute(1);

    expect(result).toBeDefined();
    expect(result.favorito).toBe(true);
    expect(mockRepository.buscarPorId).toHaveBeenCalledWith(1);
    expect(mockRepository.favoritar).toHaveBeenCalledWith(1);
  });

  it('deve lançar erro se contato não existir', async () => {
    mockRepository.buscarPorId.mockResolvedValue(null);

    await expect(useCase.execute(999)).rejects.toThrow(AppError);
    expect(mockRepository.buscarPorId).toHaveBeenCalledWith(999);
    expect(mockRepository.favoritar).not.toHaveBeenCalled();
  });

  it('deve desfavoritar um contato', async () => {
    // ✅ Usar apenas as propriedades CORRETAS da entidade
    const contato: ContatoEntity = {
      id: 1,
      nome: 'João Silva',
      email: 'joao@email.com',
      celular: '11999999999',
      telefone: '12345678',
      favorito: true,
      ativo: true,
      created_at: new Date(),
    };

    const contatoDesfavoritado: ContatoEntity = {
      ...contato,
      favorito: false
    };

    mockRepository.buscarPorId.mockResolvedValue(contato);
    mockRepository.favoritar.mockResolvedValue(contatoDesfavoritado);

    const result = await useCase.execute(1);

    expect(result).toBeDefined();
    expect(result.favorito).toBe(false);
    expect(mockRepository.favoritar).toHaveBeenCalledWith(1);
  });
});