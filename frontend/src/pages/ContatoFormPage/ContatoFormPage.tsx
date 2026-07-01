import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/atoms/Toast';
import { useContatoMutations } from '../../hooks/useContatos';
import { ContatoFormTemplate } from '../../components/templates/ContatoFormTemplate/ContatoFormTemplate';
import type { ContatoFormData } from '../../components/organisms/ContatoForm/ContatoForm';

interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
  };
  message?: string;
}

export const ContatoFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { criarContato } = useContatoMutations();

  const handleSalvar = async (data: ContatoFormData) => {
    try {
      await criarContato.mutateAsync(data);
      showToast('adicionado', `${data.nome} adicionado com sucesso!`);
      navigate('/contatos');
    } catch (err: unknown) {
      const error = err as ApiError;
      const errorMessage = error?.response?.data?.error || error?.message || 'Erro ao salvar contato';
      
      // Validação de campos obrigatórios
      if (errorMessage.toLowerCase().includes('nome deve ter pelo menos 3 caracteres')) {
        showToast('erro', 'Nome deve ter pelo menos 3 caracteres!');
      } 
      // Validação de email obrigatório
      else if (errorMessage.toLowerCase().includes('email é obrigatório')) {
        showToast('erro', 'Email é obrigatório!');
      } 
      // Validação de email inválido
      else if (errorMessage.toLowerCase().includes('email inválido')) {
        showToast('erro', 'Email inválido!');
      } 
      // Validação de email duplicado
      else if (errorMessage.toLowerCase().includes('email já está cadastrado')) {
        showToast('erro', 'Este email já está cadastrado em outro contato.');
      } 
      // Validação de celular inválido
      else if (errorMessage.toLowerCase().includes('celular inválido')) {
        showToast('erro', 'Celular inválido (deve ter 11 dígitos)!');
      } 
      // Validação de celular duplicado
      else if (errorMessage.toLowerCase().includes('already exists') || 
               errorMessage.toLowerCase().includes('celular') || 
               errorMessage.toLowerCase().includes('mobile number') ||
               errorMessage.toLowerCase().includes('número') ||
               errorMessage.toLowerCase().includes('cadastrado')) {
        showToast('erro', 'Este número de celular já está cadastrado em outro contato.');
      } 
      // Erro genérico
      else {
        showToast('erro', errorMessage);
      }
    }
  };

  const handleCancelar = () => {
    navigate('/contatos');
  };

  return (
    <ContatoFormTemplate
      title="Novo Contato"
      onSave={handleSalvar}
      onCancel={handleCancelar}
    />
  );
};

export default ContatoFormPage;