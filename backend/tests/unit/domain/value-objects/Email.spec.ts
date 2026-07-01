import { Email } from '../../../../src/domain/value-objects/Email';

describe('Email Value Object', () => {
  it('deve criar um email válido', () => {
    const email = new Email('teste@email.com');
    expect(email.value).toBe('teste@email.com');
  });

  it('deve lançar erro para email inválido', () => {
    expect(() => new Email('email-invalido')).toThrow('Invalid email');
    expect(() => new Email('teste@')).toThrow('Invalid email');
    expect(() => new Email('@dominio.com')).toThrow('Invalid email');
  });

  it('deve comparar dois emails corretamente', () => {
    const email1 = new Email('teste@email.com');
    const email2 = new Email('teste@email.com');
    const email3 = new Email('outro@email.com');

    expect(email1.equals(email2)).toBe(true);
    expect(email1.equals(email3)).toBe(false);
  });
});