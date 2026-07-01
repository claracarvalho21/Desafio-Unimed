// src/components/atoms/__tests__/Avatar.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Avatar } from '../Avatar/Avatar';

describe('Avatar Component', () => {
  const user = userEvent.setup();

  it('deve renderizar a inicial do nome', () => {
    render(<Avatar name="João Silva" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('deve mostrar ícone de selecionado quando isSelected for true', () => {
    render(<Avatar name="João" isSelected={true} />);
    const avatar = screen.getByRole('button');
    expect(avatar).toHaveClass('bg-[#BAD200]');
    expect(avatar).toBeInTheDocument();
  });

  it('deve chamar onSelect quando clicado', async () => {
    const handleSelect = jest.fn();
    render(<Avatar name="João" onSelect={handleSelect} />);
    const avatar = screen.getByRole('button');
    
    await user.click(avatar);
    
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });

  it('deve aplicar o tamanho correto', () => {
    render(<Avatar name="João" size={50} />);
    const avatar = screen.getByRole('button');
    expect(avatar).toHaveStyle({ width: '50px', height: '50px' });
  });
});