import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../../molecules/SearchBar/SearchBar'; 

describe('SearchBar Component', () => {
  it('deve renderizar o campo de busca', () => {
    render(<SearchBar onSearch={jest.fn()} />);
    expect(screen.getByPlaceholderText('Buscar por nome ou número...')).toBeInTheDocument();
  });

  it('deve chamar onSearch com debounce', async () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} debounceDelay={100} />);
    
    const input = screen.getByPlaceholderText('Buscar por nome ou número...');
    await userEvent.type(input, 'João');
    
    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('João');
    }, { timeout: 300 });
  });

  it('deve limpar a busca ao clicar no botão de limpar', async () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);
    
    const input = screen.getByPlaceholderText('Buscar por nome ou número...');
    await userEvent.type(input, 'Maria');
    
    const clearButton = screen.getByLabelText('Limpar busca');
    await userEvent.click(clearButton);
    
    expect(input).toHaveValue('');
    expect(onSearch).toHaveBeenCalledWith('');
  });

  it('deve submeter a busca ao clicar no botão Buscar', async () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);
    
    const input = screen.getByPlaceholderText('Buscar por nome ou número...');
    await userEvent.type(input, 'Pedro');
    
    const submitButton = screen.getByText('Buscar');
    await userEvent.click(submitButton);
    
    expect(onSearch).toHaveBeenCalledWith('Pedro');
  });
});