export interface Contato {
  id: number;
  nome: string;
  email: string;
  celular: string;
  telefone: string;
  favorito: boolean;
  ativo: boolean;
  dataCadastro: string;
}

export interface CriarContatoDTO {
  nome: string;
  email: string;
  celular: string;
  telefone?: string;
}

export interface AtualizarContatoDTO {
  nome?: string;
  email?: string;
  celular?: string;
  telefone?: string;
}