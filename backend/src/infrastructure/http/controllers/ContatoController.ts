// src/infrastructure/http/controllers/ContatoController.ts
import { Request, Response } from 'express';
import { CriarContatoUseCase } from '../../../application/use-cases/CriarContatoUseCase';
import { BuscarContatosUseCase } from '../../../application/use-cases/BuscarContatosUseCase';
import { AtualizarContatoUseCase } from '../../../application/use-cases/AtualizarContatoUseCase';
import { InativarContatoUseCase } from '../../../application/use-cases/InativarContatoUseCase';
import { FavoritarContatoUseCase } from '../../../application/use-cases/FavoritarContatoUseCase';
import { AtivarContatoUseCase } from '../../../application/use-cases/AtivarContatoUseCase';

export class ContatoController {
  constructor(
    private criarContatoUseCase: CriarContatoUseCase,
    private buscarContatosUseCase: BuscarContatosUseCase,
    private atualizarContatoUseCase: AtualizarContatoUseCase,
    private inativarContatoUseCase: InativarContatoUseCase,
    private favoritarContatoUseCase: FavoritarContatoUseCase,
    private ativarContatoUseCase: AtivarContatoUseCase
  ) {}

  async criar(req: Request, res: Response): Promise<Response> {
    try {
      const contato = await this.criarContatoUseCase.execute(req.body);
      return res.status(201).json(contato);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async buscarTodos(req: Request, res: Response): Promise<Response> {
    try {
      const { filtro } = req.query;
      const contatos = await this.buscarContatosUseCase.execute(filtro as string);
      return res.status(200).json(contatos);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async buscarPorId(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const contato = await this.buscarContatosUseCase.buscarPorId(Number(id));
      
      if (!contato) {
        return res.status(404).json({ error: 'Contato não encontrado' });
      }
      
      return res.status(200).json(contato);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async buscarFavoritos(req: Request, res: Response): Promise<Response> {
    try {
      const contatos = await this.favoritarContatoUseCase.buscarFavoritos();
      return res.status(200).json(contatos);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async atualizar(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const contato = await this.atualizarContatoUseCase.execute(
        Number(id),
        req.body
      );
      return res.status(200).json(contato);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async inativar(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.inativarContatoUseCase.execute(Number(id));
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async favoritar(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const contato = await this.favoritarContatoUseCase.execute(Number(id));
      return res.status(200).json(contato);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async ativar(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.ativarContatoUseCase.execute(Number(id));
      return res.status(204).send();
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}