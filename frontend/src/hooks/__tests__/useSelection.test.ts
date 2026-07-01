import { renderHook, act } from '@testing-library/react';
import { useSelection } from '../useSelection';

describe('useSelection Hook', () => {
  const items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  it('deve iniciar com seleção vazia', () => {
    const { result } = renderHook(() => useSelection<{ id: number }>());
    expect(result.current.selectedIds.size).toBe(0);
  });

  it('deve selecionar um item', () => {
    const { result } = renderHook(() => useSelection<{ id: number }>());
    
    act(() => {
      result.current.toggleSelect(1);
    });
    
    expect(result.current.selectedIds.has(1)).toBe(true);
    expect(result.current.selectedCount).toBe(1);
  });

  it('deve desselecionar um item', () => {
    const { result } = renderHook(() => useSelection<{ id: number }>());
    
    act(() => {
      result.current.toggleSelect(1);
      result.current.toggleSelect(1);
    });
    
    expect(result.current.selectedIds.has(1)).toBe(false);
    expect(result.current.selectedCount).toBe(0);
  });

  it('deve selecionar todos os itens', () => {
    const { result } = renderHook(() => useSelection<{ id: number }>());
    
    act(() => {
      result.current.selectAll(items);
    });
    
    expect(result.current.selectedIds.size).toBe(3);
    expect(result.current.selectedIds.has(1)).toBe(true);
    expect(result.current.selectedIds.has(2)).toBe(true);
    expect(result.current.selectedIds.has(3)).toBe(true);
  });

  it('deve limpar a seleção', () => {
    const { result } = renderHook(() => useSelection<{ id: number }>());
    
    act(() => {
      result.current.selectAll(items);
      result.current.clearSelection();
    });
    
    expect(result.current.selectedIds.size).toBe(0);
  });

  it('deve verificar se um item está selecionado', () => {
    const { result } = renderHook(() => useSelection<{ id: number }>());
    
    act(() => {
      result.current.toggleSelect(1);
    });
    
    expect(result.current.isSelected(1)).toBe(true);
    expect(result.current.isSelected(2)).toBe(false);
  });
});