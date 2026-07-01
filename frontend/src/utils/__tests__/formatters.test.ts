import { formatters } from '../formatters';

describe('formatters', () => {
  describe('celular', () => {
    it('deve formatar celular com 11 dígitos', () => {
      expect(formatters.celular('81999999999')).toBe('(81) 99999-9999');
    });
    it('deve retornar o valor original se inválido', () => {
      expect(formatters.celular('123')).toBe('123');
    });
  });

  describe('telefoneFixo', () => {
    it('deve formatar telefone fixo com 10 dígitos', () => {
      expect(formatters.telefoneFixo('8133334444')).toBe('(81) 3333-4444');
    });
  });

  describe('dateTime', () => {
    it('deve formatar data corretamente', () => {
      const date = new Date('2026-06-26T19:15:21.594Z');
      expect(formatters.dateTime(date)).toContain('26/06/2026');
    });
  });
});