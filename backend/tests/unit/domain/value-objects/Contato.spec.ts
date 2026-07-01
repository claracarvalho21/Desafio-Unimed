// tests/unit/domain/value-objects/Contato.spec.ts

import { ContatoEntity } from '../../../../src/domain/entities/ContatoEntity';

describe('ContatoEntity', () => {
  const createContato = (): ContatoEntity => {
    const contato = new ContatoEntity();
    contato.nome = 'Maria Silva';
    contato.email = 'maria@email.com';
    contato.celular = '81999999999';
    contato.telefone = '';
    contato.favorito = false;
    contato.ativo = true;
    contato.created_at = new Date();
    return contato;
  };

  it('deve criar um contato válido', () => {
    const contato = createContato();
    expect(contato.nome).toBe('Maria Silva');
    expect(contato.email).toBe('maria@email.com');
    expect(contato.celular).toBe('81999999999');
    expect(contato.telefone).toBe('');
    expect(contato.favorito).toBe(false);
    expect(contato.ativo).toBe(true);
    expect(contato.created_at).toBeInstanceOf(Date);
  });

  it('deve favoritar um contato', () => {
    const contato = createContato();
    contato.favorito = true;
    expect(contato.favorito).toBe(true);
  });

  it('deve desfavoritar um contato', () => {
    const contato = createContato();
    contato.favorito = true;
    contato.favorito = false;
    expect(contato.favorito).toBe(false);
  });

  it('deve inativar um contato', () => {
    const contato = createContato();
    contato.ativo = false;
    expect(contato.ativo).toBe(false);
  });

  it('deve ativar um contato', () => {
    const contato = createContato();
    contato.ativo = false;
    contato.ativo = true;
    expect(contato.ativo).toBe(true);
  });

  it('deve atualizar o nome', () => {
    const contato = createContato();
    contato.nome = 'Maria Santos Silva';
    expect(contato.nome).toBe('Maria Santos Silva');
  });

  it('deve ter os campos obrigatórios', () => {
    const contato = new ContatoEntity();
    contato.nome = 'João Silva';
    contato.email = 'joao@email.com';
    contato.celular = '11999999999';
    
    expect(contato.nome).toBe('João Silva');
    expect(contato.email).toBe('joao@email.com');
    expect(contato.celular).toBe('11999999999');
  });
});