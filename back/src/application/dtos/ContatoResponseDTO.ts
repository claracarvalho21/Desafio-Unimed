export interface ContatoResponseDTO {
  id: number;
  nome: string;
  email: string;
  celular: string;
  telefone?: string;
  favorito: boolean;
  status: string;
  dataCadastro: Date;
}