export class ValidationService {
  /**
   * Validar nome
   */
  validarNome(nome: string): { isValid: boolean; message?: string } {
    if (!nome || nome.trim().length === 0) {
      return { isValid: false, message: 'Nome é obrigatório' };
    }
    if (nome.trim().length < 3) {
      return { isValid: false, message: 'Nome deve ter pelo menos 3 caracteres' };
    }
    if (nome.trim().length > 100) {
      return { isValid: false, message: 'Nome deve ter no máximo 100 caracteres' };
    }
    return { isValid: true };
  }

  /**
   * Validar email
   */
  validarEmail(email: string): { isValid: boolean; message?: string } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || email.trim().length === 0) {
      return { isValid: false, message: 'Email é obrigatório' };
    }
    if (!emailRegex.test(email.trim())) {
      return { isValid: false, message: 'Email inválido' };
    }
    return { isValid: true };
  }

  /**
   * Validar celular
   */
  validarCelular(celular: string): { isValid: boolean; message?: string } {
    const cleaned = celular.replace(/\D/g, '');
    
    if (!cleaned) {
      return { isValid: false, message: 'Celular é obrigatório' };
    }
    if (cleaned.length !== 11) {
      return { 
        isValid: false, 
        message: `Celular deve ter 11 dígitos (DDD + número). Atualmente tem ${cleaned.length} dígitos.` 
      };
    }
    return { isValid: true };
  }

  /**
   * Validar telefone fixo
   */
  validarTelefone(telefone?: string): { isValid: boolean; message?: string } {
    if (!telefone) {
      return { isValid: true }; // Telefone é opcional
    }
    
    const cleaned = telefone.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      return { 
        isValid: false, 
        message: `Telefone deve ter 10 dígitos (DDD + número). Atualmente tem ${cleaned.length} dígitos.` 
      };
    }
    return { isValid: true };
  }

  /**
   * Validar contato completo
   */
  validarContato(data: {
    nome: string;
    email: string;
    celular: string;
    telefone?: string;
  }): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};
    
    const nomeValidation = this.validarNome(data.nome);
    if (!nomeValidation.isValid) {
      errors.nome = nomeValidation.message || 'Nome inválido';
    }
    
    const emailValidation = this.validarEmail(data.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.message || 'Email inválido';
    }
    
    const celularValidation = this.validarCelular(data.celular);
    if (!celularValidation.isValid) {
      errors.celular = celularValidation.message || 'Celular inválido';
    }
    
    const telefoneValidation = this.validarTelefone(data.telefone);
    if (!telefoneValidation.isValid) {
      errors.telefone = telefoneValidation.message || 'Telefone inválido';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Validar CPF
   */
  validarCPF(cpf: string): { isValid: boolean; message?: string } {
    const cleaned = cpf.replace(/\D/g, '');
    
    if (cleaned.length !== 11) {
      return { isValid: false, message: 'CPF deve ter 11 dígitos' };
    }
    
    const invalidCPFs = [
      '00000000000', '11111111111', '22222222222',
      '33333333333', '44444444444', '55555555555',
      '66666666666', '77777777777', '88888888888',
      '99999999999'
    ];
    
    if (invalidCPFs.includes(cleaned)) {
      return { isValid: false, message: 'CPF inválido' };
    }
    
    // Validação do dígito verificador
    let sum = 0;
    let remainder: number;
    
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleaned.substring(9, 10))) {
      return { isValid: false, message: 'CPF inválido' };
    }
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleaned.substring(10, 11))) {
      return { isValid: false, message: 'CPF inválido' };
    }
    
    return { isValid: true };
  }

  /**
   * Validar CEP
   */
  validarCEP(cep: string): { isValid: boolean; message?: string } {
    const cleaned = cep.replace(/\D/g, '');
    if (cleaned.length !== 8) {
      return { isValid: false, message: 'CEP deve ter 8 dígitos' };
    }
    return { isValid: true };
  }
}

export default new ValidationService();