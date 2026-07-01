// frontend/src/mocks/contatosMock.ts
import type { Contato } from '../src/types/contato';

export const contatosMock: Contato[] = [
  {
    id: 1,
    nome: 'André da Silva',
    email: 'andre@email.com',
    celular: '81999999999',
    telefone: '8133334444',
    favorito: true,
    ativo: false,
    dataCadastro: '2026-06-26T19:15:21.594Z'
  },
  {
    id: 2,
    nome: 'João lalal',
    email: 'joao@email.com',
    celular: '81888888888',
    telefone: '',
    favorito: true,
    ativo: true,
    dataCadastro: '2026-06-26T19:16:41.469Z'
  },
  {
    id: 3,
    nome: 'Maria Santos Silva',
    email: 'maria@email.com',
    celular: '81777777777',
    telefone: '8133335555',
    favorito: true,
    ativo: false,
    dataCadastro: '2026-06-26T20:12:47.348Z'
  }
];