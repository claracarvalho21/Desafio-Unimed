// src/infrastructure/database/migrations/1782489864968-CreateContatoTable.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContatoTable1782489864968 implements MigrationInterface {
  name = 'CreateContatoTable1782489864968';

  public async up(queryRunner: QueryRunner): Promise<void> {
    
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS desafio`);

    const tableExists = await queryRunner.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'desafio' 
        AND table_name = 'coontato'
      );
    `);

    if (tableExists[0].exists) {
      return;
    }

    await queryRunner.query(`
      CREATE TABLE desafio.coontato (
        contato_id SERIAL PRIMARY KEY,
        contato_nome VARCHAR(100) NOT NULL,
        contato_email VARCHAR(255) NOT NULL UNIQUE,
        contato_celular VARCHAR(11) NOT NULL UNIQUE,
        contato_telefone VARCHAR(10),
        contato_sn_favorito CHAR(1) DEFAULT 'N',
        contato_sn_ativo CHAR(1) DEFAULT 'S',
        contato_dh_cad TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await queryRunner.query(`CREATE INDEX idx_coontato_celular ON desafio.coontato(contato_celular)`);
    await queryRunner.query(`CREATE INDEX idx_coontato_nome ON desafio.coontato(contato_nome)`);
    await queryRunner.query(`CREATE INDEX idx_coontato_email ON desafio.coontato(contato_email)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS desafio.coontato CASCADE`);
    await queryRunner.query(`DROP SCHEMA IF EXISTS desafio CASCADE`);
  }
}