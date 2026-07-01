import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../Moda/Modal';

describe('Modal Component', () => {
  it('deve renderizar quando isOpen for true', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <p>Conteúdo do modal</p>
      </Modal>
    );
    expect(screen.getByText('Conteúdo do modal')).toBeInTheDocument();
  });

  it('não deve renderizar quando isOpen for false', () => {
    render(
      <Modal isOpen={false} onClose={jest.fn()}>
        <p>Conteúdo</p>
      </Modal>
    );
    expect(screen.queryByText('Conteúdo')).not.toBeInTheDocument();
  });

  it('deve fechar ao clicar no overlay', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Conteúdo</p>
      </Modal>
    );
    // ✅ O overlay é o primeiro div com classe fixed inset-0
    const overlay = document.querySelector('.fixed.inset-0');
    if (overlay) {
      fireEvent.click(overlay);
    }
    expect(onClose).toHaveBeenCalled();
  });

  it('deve fechar ao pressionar ESC', () => {
    const onClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Conteúdo</p>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('deve mostrar o título quando fornecido', () => {
    render(
      <Modal isOpen={true} onClose={jest.fn()} title="Título do Modal">
        <p>Conteúdo</p>
      </Modal>
    );
    expect(screen.getByText('Título do Modal')).toBeInTheDocument();
  });
});