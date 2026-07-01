/**
 * Validações de dados
 */

export const validators = {
  /**
   * Valida se o email é válido
   */
  email: (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },

  /**
   * Valida se o celular tem 11 dígitos
   */
  celular: (value: string): boolean => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.length === 11;
  },

  /**
   * Valida se o telefone fixo tem 10 dígitos
   */
  telefoneFixo: (value: string): boolean => {
    const cleaned = value.replace(/\D/g, '');
    return cleaned.length === 10;
  },

  /**
   * Valida se o CPF é válido
   */
  cpf: (value: string): boolean => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length !== 11) return false;
    
    const invalidCPFs = [
      '00000000000', '11111111111', '22222222222',
      '33333333333', '44444444444', '55555555555',
      '66666666666', '77777777777', '88888888888',
      '99999999999'
    ];
    if (invalidCPFs.includes(cleaned)) return false;
    
    // Algoritmo de validação de CPF
    let sum = 0;
    let remainder: number;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleaned.substring(9, 10))) return false;
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleaned.substring(10, 11))) return false;
    
    return true;
  },

  /**
   * Valida se o campo não está vazio
   */
  required: (value: unknown): boolean => {
    if (typeof value === 'string') return value.trim().length > 0;
    return value !== null && value !== undefined;
  },

  /**
   * Valida se o campo tem um tamanho mínimo
   */
  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },

  /**
   * Valida se o campo tem um tamanho máximo
   */
  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  },
};