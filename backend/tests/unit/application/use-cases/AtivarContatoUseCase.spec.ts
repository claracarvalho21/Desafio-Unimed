import { AtivarContatoUseCase } from '../../../../src/application/use-cases/AtivarContatoUseCase';
import { IContatoRepository } from '../../../../src/domain/interfaces/IContatoRepository';
import { ContatoEntity } from '../../../../src/domain/entities/ContatoEntity';
import { AppError } from '../../../../src/shared/errors/AppError';

describe('AtivarContatoUseCase', () => {
  let useCase: AtivarContatoUseCase;
  let mockRepository: jest.Mocked<IContatoRepository>;

  beforeEach(() => {
    // ✅ Mock sem o método 'salvar'
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

    useCase = new AtivarContatoUseCase(mockRepository);
  });

  it('deve ativar um contato inativo com sucesso', async () => {
    const contatoInativo: ContatoEntity = {
      id: 1,
      nome: 'João Silva',
      email: 'joao@email.com',
      celular: '11999999999',
      telefone: '12345678',
      favorito: false,
      ativo: false,
      created_at: new Date(),
    };

    const contatoAtivado: ContatoEntity = {
      ...contatoInativo,
      ativo: true,
    };

    mockRepository.buscarPorId.mockResolvedValue(contatoInativo);
    mockRepository.ativar.mockResolvedValue(contatoAtivado);

    await useCase.execute(1);

    expect(mockRepository.buscarPorId).toHaveBeenCalledWith(1);
    expect(mockRepository.ativar).toHaveBeenCalledWith(1);
  });

  it('deve lançar erro se contato não existir', async () => {
    mockRepository.buscarPorId.mockResolvedValue(null);

    await expect(useCase.execute(999)).rejects.toThrow(AppError);
    expect(mockRepository.buscarPorId).toHaveBeenCalledWith(999);
    expect(mockRepository.ativar).not.toHaveBeenCalled();
  });

  it('deve lançar erro se contato já estiver ativo', async () => {
    const contatoAtivo: ContatoEntity = {
      id: 1,
      nome: 'João Silva',
      email: 'joao@email.com',
      celular: '11999999999',
      telefone: '12345678',
      favorito: false,
      ativo: true,
      created_at: new Date(),
    };

    mockRepository.buscarPorId.mockResolvedValue(contatoAtivo);

    await expect(useCase.execute(1)).rejects.toThrow(AppError);
    expect(mockRepository.buscarPorId).toHaveBeenCalledWith(1);
    expect(mockRepository.ativar).not.toHaveBeenCalled();
  });
});