import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../Pagination/Pagination';

describe('Pagination Component', () => {
  const mockProps = {
    currentPage: 1,
    totalPages: 5,
    totalItems: 50,
    startIndex: 0,
    endIndex: 10,
    onPageChange: jest.fn(),
    onPrevious: jest.fn(),
    onNext: jest.fn(),
  };

  it('deve renderizar informações da página', () => {
    render(<Pagination {...mockProps} />);
    expect(screen.getByText('Mostrando 1 - 10 de 50 contatos')).toBeInTheDocument();
  });

  it('deve desabilitar botão anterior na primeira página', () => {
    render(<Pagination {...mockProps} currentPage={1} />);
    expect(screen.getByText('Anterior')).toBeDisabled();
  });

  it('deve desabilitar botão próximo na última página', () => {
    render(<Pagination {...mockProps} currentPage={5} />);
    expect(screen.getByText('Próximo')).toBeDisabled();
  });

  it('deve chamar onPageChange ao clicar em uma página', () => {
    const onPageChange = jest.fn();
    render(<Pagination {...mockProps} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText('2'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('deve chamar onNext ao clicar em próximo', () => {
    const onNext = jest.fn();
    render(<Pagination {...mockProps} onNext={onNext} currentPage={1} />);
    fireEvent.click(screen.getByText('Próximo'));
    expect(onNext).toHaveBeenCalled();
  });
});