import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../usePagination';

describe('usePagination Hook', () => {
  const items = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

  it('deve retornar a primeira página por padrão', () => {
    const { result } = renderHook(() => usePagination({
      items,
      itemsPerPage: 3,
    }));

    expect(result.current.currentPage).toBe(1);
    expect(result.current.currentItems).toEqual(['A', 'B', 'C']);
    expect(result.current.totalPages).toBe(4);
  });

  it('deve navegar para a próxima página', () => {
    const { result } = renderHook(() => usePagination({
      items,
      itemsPerPage: 3,
    }));

    act(() => {
      result.current.goToNextPage();
    });
    
    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentItems).toEqual(['D', 'E', 'F']);
  });

  it('deve navegar para a página anterior', () => {
    const { result } = renderHook(() => usePagination({
      items,
      itemsPerPage: 3,
    }));

    act(() => {
      result.current.goToPage(3);
    });
    
    expect(result.current.currentPage).toBe(3);
    expect(result.current.currentItems).toEqual(['G', 'H', 'I']);
    
    act(() => {
      result.current.goToPreviousPage();
    });
    
    expect(result.current.currentPage).toBe(2);
    expect(result.current.currentItems).toEqual(['D', 'E', 'F']);
  });

  it('deve ordenar itens corretamente', () => {
    const itemsDesordenados = ['Z', 'A', 'M', 'B'];
    const { result } = renderHook(() => usePagination({
      items: itemsDesordenados,
      itemsPerPage: 10,
      sortBy: undefined,
    }));

    expect(result.current.currentItems).toEqual(['Z', 'A', 'M', 'B']);
  });

  it('deve ordenar objetos por nome quando sortBy é definido', () => {
    const objetos = [
      { nome: 'Z' },
      { nome: 'A' },
      { nome: 'M' },
      { nome: 'B' }
    ];
    
    const { result } = renderHook(() => usePagination({
      items: objetos,
      itemsPerPage: 10,
      sortBy: 'nome',
      sortDirection: 'asc',
    }));

    expect(result.current.currentItems).toEqual([
      { nome: 'A' },
      { nome: 'B' },
      { nome: 'M' },
      { nome: 'Z' }
    ]);
  });

  it('deve retornar a página correta quando o total de páginas muda', () => {
    const { result, rerender } = renderHook(
      ({ items }) => usePagination({ items, itemsPerPage: 3 }),
      { initialProps: { items: ['A', 'B', 'C', 'D', 'E'] } }
    );

    expect(result.current.totalPages).toBe(2);
    expect(result.current.currentPage).toBe(1);

    rerender({ items: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] });
    
    expect(result.current.totalPages).toBe(3);
    expect(result.current.currentPage).toBe(1);
  });

  it('deve voltar para a primeira página quando o total de páginas diminuir', () => {
    const { result, rerender } = renderHook(
      ({ items }) => usePagination({ items, itemsPerPage: 3 }),
      { initialProps: { items: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] } }
    );

    act(() => {
      result.current.goToPage(3);
    });
    
    expect(result.current.currentPage).toBe(3);

    rerender({ items: ['A', 'B', 'C', 'D', 'E'] });
    
    expect(result.current.totalPages).toBe(2);
    expect(result.current.currentPage).toBe(2);
  });
});