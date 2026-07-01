import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../components/templates/MainLayout';
import { EmptyLayout } from '../components/templates/EmptyLayout';
import { PrivateRoute } from './PrivateRoute';
import { Contatos } from '../pages/Contatos/Contatos';
import { ContatoFormPage } from '../pages/ContatoFormPage/ContatoFormPage';
import { Login } from '../pages/Login/Login';
import { Error } from '../pages/Error/Error';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rota pública - Login */}
      <Route path="/login" element={<Login />} />

      {/* Rotas protegidas (com autenticação) */}
      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Contatos />} />
          <Route path="/contatos" element={<Contatos />} />
          <Route path="/contatos/novo" element={<ContatoFormPage />} />
        </Route>
      </Route>

      {/* Rotas sem autenticação (erros) */}
      <Route element={<EmptyLayout />}>
        <Route path="/error" element={<Error />} />
      </Route>

      {/* Rota de erro 404 */}
      <Route path="*" element={<EmptyLayout><Error /></EmptyLayout>} />
    </Routes>
  );
};