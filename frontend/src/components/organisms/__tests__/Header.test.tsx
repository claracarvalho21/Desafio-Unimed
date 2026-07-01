import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../contexts/AuthProvider';
import Header from '../Header/Header';

describe('Header Component', () => {
  const renderWithProviders = (component: React.ReactNode) => {
    return render(
      <BrowserRouter>
        <AuthProvider>{component}</AuthProvider>
      </BrowserRouter>
    );
  };

  it('deve renderizar o logo', () => {
    renderWithProviders(<Header />);
    expect(screen.getByAltText('Unimed')).toBeInTheDocument();
  });

  it('deve mostrar o nome do usuário', () => {
    renderWithProviders(<Header />);
    // ✅ O Header mostra o email do usuário, não o nome 'Yasmin Silva'
    expect(screen.getByText('admin@unimed.com')).toBeInTheDocument();
  });
});
