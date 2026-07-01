import { Celular } from '../../../../src/domain/value-objects/Celular';

describe('Celular Value Object', () => {
  it('deve criar um celular válido', () => {
    const celular = new Celular('81999999999');
    expect(celular.value).toBe('81999999999');
  });

  it('deve remover formatação ao criar', () => {
    const celular = new Celular('(81) 99999-9999');
    expect(celular.value).toBe('81999999999');
  });

  it('deve lançar erro para celular inválido', () => {
    expect(() => new Celular('123456')).toThrow('Invalid mobile number');
    expect(() => new Celular('8199999999')).toThrow('Invalid mobile number');
  });

  it('deve comparar dois celulares', () => {
    const c1 = new Celular('81999999999');
    const c2 = new Celular('81999999999');
    const c3 = new Celular('81988888888');

    expect(c1.equals(c2)).toBe(true);
    expect(c1.equals(c3)).toBe(false);
  });
});