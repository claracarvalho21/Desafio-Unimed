import { ContatoEntity } from '../../domain/entities/ContatoEntity';

export interface ContatoResponse {
  id: number;
  nome: string;
  email: string;
  celular: string;
  telefone: string;
  favorito: boolean;
  ativo: boolean;
  dataCadastro: Date;
}

export class ContatoMapper {
  static toResponse(entity: ContatoEntity): ContatoResponse {
    return {
      id: entity.id,
      nome: entity.nome,
      email: entity.email,
      celular: entity.celular || '',
      telefone: entity.telefone || '',
      favorito: entity.favorito,
      ativo: entity.ativo,
      dataCadastro: entity.created_at
    };
  }

  static toResponseList(entities: ContatoEntity[]): ContatoResponse[] {
    return entities.map(entity => this.toResponse(entity));
  }

  static toEntity(data: Partial<ContatoResponse>): Partial<ContatoEntity> {
    return {
      nome: data.nome,
      email: data.email,
      celular: data.celular,
      telefone: data.telefone,
      favorito: data.favorito,
      ativo: data.ativo
    };
  }
}