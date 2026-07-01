import { renderHook, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../contexts/AuthProvider';
import { ToastProvider } from '../../components/atoms/Toast';
import { useContatosPage } from '../useContatosPage';
import type { Contato } from '../../types/contato';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

describe('useContatosPage', () => {
  const contatoMock: Contato = {
    id: 1,
    nome: 'Teste',
    email: 'teste@email.com',
    celular: '81999999999',
    telefone: '12345678',
    favorito: false,
    ativo: true,
    dataCadastro: new Date().toISOString()
  };

  const contatoInativoMock: Contato = {
    id: 2,
    nome: 'Teste Inativo',
    email: 'teste.inativo@email.com',
    celular: '81888888888',
    telefone: '87654321',
    favorito: false,
    ativo: false,
    dataCadastro: new Date().toISOString()
  };

  it('deve retornar dados iniciais', () => {
    const { result } = renderHook(() => useContatosPage(), { wrapper });
    expect(result.current.contatos).toBeDefined();
    expect(result.current.favoritos).toBeDefined();
  });

  it('deve abrir e fechar modal de edição', async () => {
    const { result } = renderHook(() => useContatosPage(), { wrapper });
    
    // ✅ Usar act com async/await
    await act(async () => {
      result.current.handleEditar(contatoMock);
      // Aguardar o setTimeout de 50ms
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.modalType).toBe('edicao');
    expect(result.current.selectedContato).toEqual(contatoMock);

    await act(async () => {
      result.current.handleCloseModal();
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.modalType).toBeNull();
    expect(result.current.selectedContato).toBeNull();
  });

  it('deve abrir e fechar modal de detalhes', async () => {
    const { result } = renderHook(() => useContatosPage(), { wrapper });
    
    await act(async () => {
      result.current.handleOpenDetalhe(contatoMock);
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.modalType).toBe('detalhe');
    expect(result.current.selectedContato).toEqual(contatoMock);

    await act(async () => {
      result.current.handleCloseModal();
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.modalType).toBeNull();
    expect(result.current.selectedContato).toBeNull();
  });

  it('deve abrir modal de edição com contato inativo', async () => {
    const { result } = renderHook(() => useContatosPage(), { wrapper });
    
    await act(async () => {
      result.current.handleEditar(contatoInativoMock);
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.modalType).toBe('edicao');
    expect(result.current.selectedContato).toEqual(contatoInativoMock);
    expect(result.current.selectedContato?.ativo).toBe(false);
  });

  it('deve ter funções definidas', () => {
    const { result } = renderHook(() => useContatosPage(), { wrapper });
    
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleNewContato).toBeDefined();
    expect(result.current.handleFavoritar).toBeDefined();
    expect(result.current.handleInativar).toBeDefined();
    expect(result.current.handleAtivar).toBeDefined();
    expect(result.current.toggleMostrarInativos).toBeDefined();
  });

  it('deve alternar a exibição de contatos inativos', async () => {
    const { result } = renderHook(() => useContatosPage(), { wrapper });
    
    // Valor inicial
    expect(result.current.mostrarInativos).toBe(true);
    
    // Alternar para false
    await act(async () => {
      result.current.toggleMostrarInativos();
    });
    
    expect(result.current.mostrarInativos).toBe(false);
    
    // Alternar para true
    await act(async () => {
      result.current.toggleMostrarInativos();
    });
    
    expect(result.current.mostrarInativos).toBe(true);
  });
});