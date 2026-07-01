import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'coontato', schema: 'desafio' })
export class ContatoEntity {
  @PrimaryGeneratedColumn({ name: 'contato_id' })
  id: number;

  @Column({ name: 'contato_nome', length: 100 })
  nome: string;

  @Column({ name: 'contato_email', length: 255, unique: true })
  email: string;

  @Column({ name: 'contato_celular', length: 11, unique: true })
  celular: string;

  @Column({ name: 'contato_telefone', length: 10, nullable: true })
  telefone: string;

  @Column({ 
    name: 'contato_sn_favorito', 
    type: 'char', 
    length: 1,
    default: 'N',
    transformer: {
      to: (value: boolean) => value ? 'S' : 'N',
      from: (value: string) => value === 'S'
    }
  })
  favorito: boolean;

  @Column({ 
    name: 'contato_sn_ativo', 
    type: 'char', 
    length: 1,
    default: 'S',
    transformer: {
      to: (value: boolean) => value ? 'S' : 'N',
      from: (value: string) => value === 'S'
    }
  })
  ativo: boolean;

  @CreateDateColumn({ name: 'contato_dh_cad' })
  created_at: Date;
}