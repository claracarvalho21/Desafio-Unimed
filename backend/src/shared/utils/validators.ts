export const validators = {
  isEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isCelular: (celular: string): boolean => {
    const cleaned = celular.replace(/\D/g, '');
    return /^\d{11}$/.test(cleaned);
  },

  isTelefone: (telefone: string): boolean => {
    const cleaned = telefone.replace(/\D/g, '');
    return /^\d{10}$/.test(cleaned);
  },

  isNome: (nome: string): boolean => {
    return nome.length >= 3 && nome.length <= 100;
  },

  sanitizePhone: (phone: string): string => {
    return phone.replace(/\D/g, '');
  },

  formatPhone: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  }
};