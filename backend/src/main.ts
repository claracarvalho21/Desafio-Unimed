import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { AppDataSource } from './infrastructure/database/data-source';

import { ContatoRepository } from './infrastructure/database/repositories/ContatoRepository';

import { CriarContatoUseCase } from './application/use-cases/CriarContatoUseCase';
import { BuscarContatosUseCase } from './application/use-cases/BuscarContatosUseCase';
import { AtualizarContatoUseCase } from './application/use-cases/AtualizarContatoUseCase';
import { InativarContatoUseCase } from './application/use-cases/InativarContatoUseCase';
import { FavoritarContatoUseCase } from './application/use-cases/FavoritarContatoUseCase';
import { AtivarContatoUseCase } from './application/use-cases/AtivarContatoUseCase';

import { ContatoController } from './infrastructure/http/controllers/ContatoController';
import { contatoRoutes } from './infrastructure/http/routes/contato.routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

async function startServer(): Promise<void> {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');

    const repository = new ContatoRepository();

    const criarContatoUseCase = new CriarContatoUseCase(repository);
    const buscarContatosUseCase = new BuscarContatosUseCase(repository);
    const atualizarContatoUseCase = new AtualizarContatoUseCase(repository);
    const inativarContatoUseCase = new InativarContatoUseCase(repository);
    const favoritarContatoUseCase = new FavoritarContatoUseCase(repository);
    const ativarContatoUseCase = new AtivarContatoUseCase(repository);

    const controller = new ContatoController(
      criarContatoUseCase,
      buscarContatosUseCase,
      atualizarContatoUseCase,
      inativarContatoUseCase,
      favoritarContatoUseCase,
      ativarContatoUseCase
    );

    app.use('/api', contatoRoutes(controller));

    const PORT = parseInt(process.env.PORT || '4100', 10);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;