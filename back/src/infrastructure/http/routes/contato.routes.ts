import { Router } from 'express';
import { ContatoController } from '../controllers/ContatoController';

export const contatoRoutes = (controller: ContatoController): Router => {
  const router = Router();

  router.post('/contatos', controller.criar.bind(controller));
  router.get('/contatos', controller.buscarTodos.bind(controller));
  router.get('/contatos/favoritos', controller.buscarFavoritos.bind(controller));
  router.get('/contatos/:id', controller.buscarPorId.bind(controller));
  router.put('/contatos/:id', controller.atualizar.bind(controller));
  router.delete('/contatos/:id', controller.inativar.bind(controller));
  router.patch('/contatos/:id/favoritar', controller.favoritar.bind(controller));
  router.patch('/contatos/:id/ativar', controller.ativar.bind(controller));

  return router;
};