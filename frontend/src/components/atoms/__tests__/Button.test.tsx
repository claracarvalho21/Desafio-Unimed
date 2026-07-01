import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button/Button';

describe('Button Component', () => {
  it('deve renderizar com o texto correto', () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByText('Clique aqui')).toBeInTheDocument();
  });

  it('deve estar desabilitado quando disabled for true', () => {
    render(<Button disabled>Desabilitado</Button>);
    expect(screen.getByText('Desabilitado')).toBeDisabled();
  });

  it('deve chamar onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clique</Button>);
    fireEvent.click(screen.getByText('Clique'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('deve aplicar a classe correta para cada variante', () => {
    const { rerender } = render(<Button variant="primary">Primário</Button>);
    expect(screen.getByText('Primário')).toHaveClass('bg-[#009A59]');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByText('Outline')).toHaveClass('border-2');
  });

  it('deve mostrar loading quando loading for true', () => {
    render(<Button loading>Carregando</Button>);
    expect(screen.getByText('Carregando')).toBeInTheDocument();
    expect(screen.getByText('Carregando')).toBeDisabled();
  });
});