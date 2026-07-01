// src/pages/__tests__/Contatos.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../../contexts/AuthProvider';
import { Contatos } from '../Contatos/Contatos';
import type { Contato } from '../../types/contato';

// Mock dos hooks
jest.mock('../../hooks/useContatosPage');
jest.mock('../../hooks/useContatos');

// Mock completo do Toast
jest.mock('../../components/atoms/Toast', () => ({
  ToastProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useToast: () => ({
    showToast: jest.fn(),
    toast: null,
    hideToast: jest.fn(),
  }),
}));

import { useContatosPage } from '../../hooks/useContatosPage';

const mockUseContatosPage = useContatosPage as jest.Mock;

const mockContatos: Contato[] = [
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

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          {ui}
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Contatos Page', () => {
  const defaultMock = {
    contatos: [],
    favoritos: [],
    contatosInativos: [],
    isLoading: false,
    error: null,
    selectedContato: null,
    modalType: null,
    mostrarInativos: false,
    toggleMostrarInativos: jest.fn(),
    handleCloseModal: jest.fn(),
    handleContatoAtualizado: jest.fn(),
    handleFavoritar: jest.fn(),
    handleInativar: jest.fn(),
    handleAtivar: jest.fn(),
    handleEditar: jest.fn(),
    handleOpenDetalhe: jest.fn(),
    handleSearch: jest.fn(),
    handleNewContato: jest.fn(),
    handleEditSuccess: jest.fn(),
    handleEditClose: jest.fn(),
    refetch: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseContatosPage.mockReturnValue(defaultMock);
  });

  it('deve renderizar a página com contatos', async () => {
    mockUseContatosPage.mockReturnValue({
      ...defaultMock,
      contatos: mockContatos,
      favoritos: [mockContatos[1]],
    });

    renderWithProviders(<Contatos />);

    await waitFor(() => {
      expect(screen.queryByText('Carregando contatos...')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Contatos')).toBeInTheDocument();
    expect(screen.getByText('João Silva')).toBeInTheDocument();
  });

  it('deve mostrar loading quando estiver carregando', () => {
    mockUseContatosPage.mockReturnValue({
      ...defaultMock,
      isLoading: true,
    });

    renderWithProviders(<Contatos />);
    expect(screen.getByText('Carregando contatos...')).toBeInTheDocument();
  });

  it('deve mostrar erro quando houver erro', () => {
    mockUseContatosPage.mockReturnValue({
      ...defaultMock,
      error: new Error('Erro ao carregar contatos'),
    });

    renderWithProviders(<Contatos />);
    expect(screen.getByText('Erro ao carregar contatos')).toBeInTheDocument();
  });

  it('deve mostrar mensagem quando não houver contatos', () => {
    mockUseContatosPage.mockReturnValue({
      ...defaultMock,
      contatos: [],
      favoritos: [],
    });

    renderWithProviders(<Contatos />);
    expect(screen.getByText('Nenhum contato encontrado.')).toBeInTheDocument();
  });
});