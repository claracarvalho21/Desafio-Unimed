import { render, screen, fireEvent } from '@testing-library/react';
import { ToggleSwitch } from '../ToggleSwitch/ToggleSwitch';

describe('ToggleSwitch Component', () => {
  it('deve renderizar com estado ativo', () => {
    render(<ToggleSwitch isActive={true} onToggle={jest.fn()} />);
    const toggle = screen.getByRole('button');
    // Verificar se o botão tem o estilo correto para ativo
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-label', 'Desativar');
  });

  it('deve renderizar com estado inativo', () => {
    render(<ToggleSwitch isActive={false} onToggle={jest.fn()} />);
    const toggle = screen.getByRole('button');
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-label', 'Ativar');
  });

  it('deve chamar onToggle quando clicado', () => {
    const handleToggle = jest.fn();
    render(<ToggleSwitch isActive={false} onToggle={handleToggle} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('deve estar desabilitado quando disabled for true', () => {
    render(<ToggleSwitch isActive={false} onToggle={jest.fn()} disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});