/**
 * Formatadores de dados
 */

export const formatters = {
  /**
   * Formata data para o formato brasileiro: DD/MM/YYYY
   */
  date: (date: string | Date): string => {
    const d = new Date(date);
    return d.toLocaleDateString('pt-BR');
  },

  /**
   * Formata data e hora: DD/MM/YYYY HH:mm
   */
  dateTime: (date: string | Date): string => {
    const d = new Date(date);
    return d.toLocaleString('pt-BR');
  },

  /**
   * Formata telefone celular: (81) 99999-9999
   */
  celular: (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return value;
  },

  /**
   * Formata telefone fixo: (81) 3333-4444
   */
  telefoneFixo: (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    return value;
  },

  /**
   * Formata telefone (detecta automaticamente se é celular ou fixo)
   */
  phone: (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    return value;
  },

  /**
   * Formata moeda: R$ 1.234,56
   */
  currency: (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  },
};