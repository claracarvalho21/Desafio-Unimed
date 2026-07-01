import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContatoForm } from '../ContatoForm/ContatoForm';

describe('ContatoForm Component', () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar todos os campos', () => {
    render(<ContatoForm onSave={mockOnSave} onCancel={mockOnCancel} />);
    
    expect(screen.getByPlaceholderText('Nome completo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('email@exemplo.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('(81) 99999-9999')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('(81) 3333-4444')).toBeInTheDocument();
  });

  it('deve validar campos obrigatórios', async () => {
    render(<ContatoForm onSave={mockOnSave} onCancel={mockOnCancel} />);
    
    const submitButton = screen.getByText('Salvar');
    await userEvent.click(submitButton);
    
    expect(await screen.findByText(/Nome é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/Email é obrigatório/i)).toBeInTheDocument();
    expect(await screen.findByText(/Celular é obrigatório/i)).toBeInTheDocument();
  });

  it('deve preencher com dados do contato quando passado', () => {
    const contato = {
      id: 1,
      nome: 'João Silva',
      email: 'joao@email.com',
      celular: '81999999999',
      telefone: '8133334444',
      favorito: false,
      ativo: true, 
      dataCadastro: '2026-06-26T19:15:21.594Z'
    };

    render(<ContatoForm contato={contato} onSave={mockOnSave} onCancel={mockOnCancel} />);
    
    expect(screen.getByDisplayValue('João Silva')).toBeInTheDocument();
    expect(screen.getByDisplayValue('joao@email.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('81999999999')).toBeInTheDocument();
  });

  it('deve validar formato do celular', async () => {
    render(<ContatoForm onSave={mockOnSave} onCancel={mockOnCancel} />);
    
    const celularInput = screen.getByPlaceholderText('(81) 99999-9999');
    await userEvent.type(celularInput, '123');
    
    const submitButton = screen.getByText('Salvar');
    await userEvent.click(submitButton);
    
    expect(await screen.findByText(/Celular deve ter 11 dígitos/i)).toBeInTheDocument();
  });

  it('deve chamar onSave com dados válidos', async () => {
    render(<ContatoForm onSave={mockOnSave} onCancel={mockOnCancel} />);
    
    await userEvent.type(screen.getByPlaceholderText('Nome completo'), 'João Silva');
    await userEvent.type(screen.getByPlaceholderText('email@exemplo.com'), 'joao@email.com');
    await userEvent.type(screen.getByPlaceholderText('(81) 99999-9999'), '81999999999');
    
    const submitButton = screen.getByText('Salvar');
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith({
        nome: 'João Silva',
        email: 'joao@email.com',
        celular: '81999999999',
        telefone: undefined,
      });
    });
  });

  it('deve chamar onCancel ao clicar em Cancelar', async () => {
    render(<ContatoForm onSave={mockOnSave} onCancel={mockOnCancel} />);
    
    const cancelButton = screen.getByText('Cancelar');
    await userEvent.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});