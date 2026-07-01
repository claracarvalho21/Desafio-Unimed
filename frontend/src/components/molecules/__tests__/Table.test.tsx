import { render, screen, fireEvent } from '@testing-library/react';
import { Table } from '../Table/Table';

describe('Table Component', () => {
  const mockData = [
    { id: 1, nome: 'João', email: 'joao@email.com' },
    { id: 2, nome: 'Maria', email: 'maria@email.com' },
  ];

  const mockColumns = [
    { key: 'nome', header: 'Nome' },
    { key: 'email', header: 'Email' },
  ];

  it('deve renderizar os dados', () => {
    render(<Table data={mockData} columns={mockColumns} />);
    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('Maria')).toBeInTheDocument();
    expect(screen.getByText('joao@email.com')).toBeInTheDocument();
  });

  it('deve chamar onRowClick ao clicar em uma linha', () => {
    const onRowClick = jest.fn();
    render(
      <Table 
        data={mockData} 
        columns={mockColumns} 
        onRowClick={onRowClick} 
      />
    );
    fireEvent.click(screen.getByText('João'));
    expect(onRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  it('deve mostrar mensagem quando não há dados', () => {
    render(<Table data={[]} columns={mockColumns} />);
    expect(screen.getByText('Nenhum dado encontrado.')).toBeInTheDocument();
  });

  it('deve renderizar ações quando fornecido', () => {
    const renderActions = jest.fn().mockReturnValue(<button>Editar</button>);
    render(
      <Table 
        data={mockData} 
        columns={mockColumns} 
        renderActions={renderActions} 
      />
    );
    // ✅ Usar getAllByText porque há múltiplos botões "Editar"
    const buttons = screen.getAllByText('Editar');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toBeInTheDocument();
  });
});