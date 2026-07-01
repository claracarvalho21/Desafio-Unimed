import { renderHook, act } from '@testing-library/react';
import { ToastProvider } from '../../components/atoms/Toast';
import { useContatosList } from '../useContatosList';
import type { Contato } from '../../types/contato';

describe('useContatosList', () => {
  const mockContatos: Contato[] = [
    {
      id: 1,
      nome: 'João',
      email: 'joao@email.com',
      celular: '81999999999',
      telefone: '12345678',
      ativo: true,
      favorito: false,
      dataCadastro: new Date().toISOString(),
    },
    {
      id: 2,
      nome: 'Maria',
      email: 'maria@email.com',
      celular: '81888888888',
      telefone: '87654321',
      ativo: false,
      favorito: false,
      dataCadastro: new Date().toISOString(),
    },
    {
      id: 3,
      nome: 'Pedro',
      email: 'pedro@email.com',
      celular: '81777777777',
      telefone: '',
      ativo: true,
      favorito: true,
      dataCadastro: new Date().toISOString(),
    },
  ];

  const mockFavoritar = jest.fn();
  const mockInativar = jest.fn();
  const mockAtivar = jest.fn();

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ToastProvider>{children}</ToastProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve inicializar com estado padrão', () => {
    const { result } = renderHook(
      () =>
        useContatosList({
          contatos: mockContatos,
          onFavoritar: mockFavoritar,
          onInativar: mockInativar,
          onAtivar: mockAtivar,
        }),
      { wrapper }
    );

    expect(result.current.showConfirmModal).toBe(false);
    expect(result.current.contatoToToggle).toBeNull();
  });

  it('deve abrir modal de confirmação para desativar contato ativo', () => {
    const { result } = renderHook(
      () =>
        useContatosList({
          contatos: mockContatos,
          onFavoritar: mockFavoritar,
          onInativar: mockInativar,
          onAtivar: mockAtivar,
        }),
      { wrapper }
    );

    act(() => {
      result.current.handleToggleStatus(1);
    });

    expect(result.current.showConfirmModal).toBe(true);
    expect(result.current.contatoToToggle).toEqual(mockContatos[0]);
  });

  it('deve ativar contato inativo diretamente (sem modal)', () => {
    const { result } = renderHook(
      () =>
        useContatosList({
          contatos: mockContatos,
          onFavoritar: mockFavoritar,
          onInativar: mockInativar,
          onAtivar: mockAtivar,
        }),
      { wrapper }
    );

    act(() => {
      result.current.handleToggleStatus(2);
    });

    expect(mockAtivar).toHaveBeenCalledWith(2);
    expect(result.current.showConfirmModal).toBe(false);
  });

  it('deve confirmar desativação e chamar onInativar', () => {
    const { result } = renderHook(
      () =>
        useContatosList({
          contatos: mockContatos,
          onFavoritar: mockFavoritar,
          onInativar: mockInativar,
          onAtivar: mockAtivar,
        }),
      { wrapper }
    );

    act(() => {
      result.current.handleToggleStatus(1);
    });

    expect(result.current.showConfirmModal).toBe(true);

    act(() => {
      result.current.handleConfirmDesativar();
    });

    expect(mockInativar).toHaveBeenCalledWith(1);
    expect(result.current.showConfirmModal).toBe(false);
    expect(result.current.contatoToToggle).toBeNull();
  });

  it('deve fechar modal de confirmação sem desativar', () => {
    const { result } = renderHook(
      () =>
        useContatosList({
          contatos: mockContatos,
          onFavoritar: mockFavoritar,
          onInativar: mockInativar,
          onAtivar: mockAtivar,
        }),
      { wrapper }
    );

    act(() => {
      result.current.handleToggleStatus(1);
    });

    expect(result.current.showConfirmModal).toBe(true);

    act(() => {
      result.current.handleCloseConfirmModal();
    });

    expect(mockInativar).not.toHaveBeenCalled();
    expect(result.current.showConfirmModal).toBe(false);
    expect(result.current.contatoToToggle).toBeNull();
  });

  it('deve favoritar contatos selecionados', () => {
    const { result } = renderHook(
      () =>
        useContatosList({
          contatos: mockContatos,
          onFavoritar: mockFavoritar,
          onInativar: mockInativar,
          onAtivar: mockAtivar,
        }),
      { wrapper }
    );

    const selectedIds = new Set([1, 3]);

    act(() => {
      result.current.handleFavoriteSelected(selectedIds);
    });

    expect(mockFavoritar).toHaveBeenCalledWith(1);
    expect(mockFavoritar).toHaveBeenCalledWith(3);
    expect(mockFavoritar).toHaveBeenCalledTimes(2);
  });

  it('deve inativar múltiplos contatos ativos selecionados', () => {
    const { result } = renderHook(
      () =>
        useContatosList({
          contatos: mockContatos,
          onFavoritar: mockFavoritar,
          onInativar: mockInativar,
          onAtivar: mockAtivar,
        }),
      { wrapper }
    );
    const selectedIds = new Set([1, 3]);

    act(() => {
      result.current.handleToggleSelected(selectedIds);
    });

    expect(mockInativar).toHaveBeenCalledWith(1);
    expect(mockInativar).toHaveBeenCalledWith(3);
    expect(mockAtivar).not.toHaveBeenCalled();
  });

  it('deve ativar todos os contatos inativos selecionados', () => {
    const { result } = renderHook(
      () =>
        useContatosList({
          contatos: mockContatos,
          onFavoritar: mockFavoritar,
          onInativar: mockInativar,
          onAtivar: mockAtivar,
        }),
      { wrapper }
    );
    // Apenas o contato 2 é inativo
    const selectedIds = new Set([2]);

    act(() => {
      result.current.handleToggleSelected(selectedIds);
    });

    expect(mockAtivar).toHaveBeenCalledWith(2);
    expect(mockInativar).not.toHaveBeenCalled();
  });

  it('deve ativar e inativar contatos mistos selecionados', () => {
    const { result } = renderHook(
      () =>
        useContatosList({
          contatos: mockContatos,
          onFavoritar: mockFavoritar,
          onInativar: mockInativar,
          onAtivar: mockAtivar,
        }),
      { wrapper }
    );

    // IDs: 1 (ativo), 2 (inativo), 3 (ativo)
    const selectedIds = new Set([1, 2, 3]);

    act(() => {
      result.current.handleToggleSelected(selectedIds);
    });

    // ✅ Como há mistura, o comportamento esperado é ATIVAR TODOS
    // (porque nem todos estão ativos, então ele ativa todos)
    // OU inativar os ativos e ativar os inativos, dependendo da lógica

    // Verifica se chamou onAtivar para todos (comportamento atual)
    expect(mockAtivar).toHaveBeenCalledWith(1);
    expect(mockAtivar).toHaveBeenCalledWith(2);
    expect(mockAtivar).toHaveBeenCalledWith(3);
    
    // onInativar não deve ser chamado porque nem todos estão ativos
    expect(mockInativar).not.toHaveBeenCalled();
  });
});