import { Email } from '../value-objects/Email';
import { Celular } from '../value-objects/Celular';
import { Telefone } from '../value-objects/Telefone';
import { StatusContato } from '../enums/ContatoEntity';

interface ContatoProps {
  id?: number;
  nome: string;
  email: Email;
  celular: Celular;
  telefone?: Telefone;
  favorito: boolean;
  status: StatusContato;
  dataCadastro: Date;
}

export class Contato {
  private props: ContatoProps;

  private constructor(props: ContatoProps) {
    this.props = props;
    this.validate();
  }

  static create(data: Omit<ContatoProps, 'favorito' | 'status' | 'dataCadastro'>): Contato {
    return new Contato({
      ...data,
      favorito: false,
      status: StatusContato.ATIVO,
      dataCadastro: new Date()
    });
  }

  static restore(data: ContatoProps): Contato {
    return new Contato(data);
  }

  private validate(): void {
    if (!this.props.nome || this.props.nome.length < 3) {
      throw new Error('Name must have at least 3 characters');
    }
  }

  // ========== GETTERS ==========
  get id(): number | undefined { return this.props.id; }
  get nome(): string { return this.props.nome; }
  get email(): Email { return this.props.email; }
  get celular(): Celular { return this.props.celular; }
  get telefone(): Telefone | undefined { return this.props.telefone; }
  get favorito(): boolean { return this.props.favorito; }
  get status(): StatusContato { return this.props.status; }
  get dataCadastro(): Date { return this.props.dataCadastro; }

  // ========== MÉTODOS DE ATUALIZAÇÃO ==========
  atualizarNome(nome: string): void {
    if (nome.length < 3) {
      throw new Error('Name must have at least 3 characters');
    }
    this.props.nome = nome;
  }

  atualizarEmail(email: Email): void {
    this.props.email = email;
  }

  atualizarCelular(celular: Celular): void {
    this.props.celular = celular;
  }

  atualizarTelefone(telefone: Telefone): void {
    this.props.telefone = telefone;
  }

  // ========== MÉTODOS DE FAVORITO ==========
  favoritar(): void {
    this.props.favorito = true;
  }

  desfavoritar(): void {
    this.props.favorito = false;
  }

  toggleFavorito(): void {
    this.props.favorito = !this.props.favorito;
  }

  // ========== MÉTODOS DE STATUS ==========
  inativar(): void {
    if (this.props.status === StatusContato.INATIVO) {
      throw new Error('Contato já está inativo');
    }
    this.props.status = StatusContato.INATIVO;
  }

  ativar(): void {
    if (this.props.status === StatusContato.ATIVO) {
      throw new Error('Contato já está ativo');
    }
    this.props.status = StatusContato.ATIVO;
  }

  // ========== MÉTODO TOJSON ==========
  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email.value,
      celular: this.celular.value,
      telefone: this.telefone?.value,
      favorito: this.favorito,
      status: this.status,
      dataCadastro: this.dataCadastro
    };
  }
}