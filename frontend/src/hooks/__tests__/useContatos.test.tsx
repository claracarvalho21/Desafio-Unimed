// src/hooks/__tests__/useContatos.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useContatos } from '../useContatos';
import contatoService from '../../services/contatoService';

// Mock do serviço (exportação default)
jest.mock('../../services/contatoService');

const mockedContatoService = contatoService as jest.Mocked<typeof contatoService>;

describe('useContatos Hook', () => {
  // ✅ CORRIGIDO: usando 'ativo' em vez de 'status'
  const mockContatos = [
    { 
      id: 1, 
      nome: 'João Silva', 
      email: 'joao@email.com', 
      telefone: '11999999999',
      celular: '11999999999',
      favorito: false,
      ativo: true, 
      dataCadastro: new Date().toISOString(),
    },
    { 
      id: 2, 
      nome: 'Maria Santos', 
      email: 'maria@email.com', 
      telefone: '11888888888',
      celular: '11888888888',
      favorito: true,
      ativo: true,
      dataCadastro: new Date().toISOString(),
    },
  ];

  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar a lista de contatos', async () => {
    mockedContatoService.listar.mockResolvedValue(mockContatos);

    const wrapper = createWrapper();
    const { result } = renderHook(() => useContatos(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockContatos);
    expect(result.current.isSuccess).toBe(true);
    expect(mockedContatoService.listar).toHaveBeenCalledWith(undefined);
  });

  it('deve lidar com erro ao carregar contatos', async () => {
    const error = new Error('Erro ao carregar contatos');
    mockedContatoService.listar.mockRejectedValue(error);

    const wrapper = createWrapper();
    const { result } = renderHook(() => useContatos(), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
  });

  it('deve mostrar loading enquanto carrega', async () => {
    mockedContatoService.listar.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(mockContatos), 100))
    );

    const wrapper = createWrapper();
    const { result } = renderHook(() => useContatos(), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(mockContatos);
  });

  it('deve passar filtro para o serviço quando fornecido', async () => {
    const filtro = 'João';
    mockedContatoService.listar.mockResolvedValue([mockContatos[0]]);

    const wrapper = createWrapper();
    const { result } = renderHook(() => useContatos(filtro), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockedContatoService.listar).toHaveBeenCalledWith(filtro);
    expect(result.current.data).toEqual([mockContatos[0]]);
  });
});