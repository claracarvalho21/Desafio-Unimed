import React from 'react';
import type { Contato } from '../../../types/contato';
import { useContatoForm } from '../../../hooks/useContatoForm';
import { FormField } from '../../molecules/FormField/FormField';
import { FormActions } from '../../molecules/FormActions/FormActions';

export interface ContatoFormData {
  nome: string;
  email: string;
  celular: string;
  telefone?: string;
}

interface ContatoFormProps {
  contato?: Contato;
  onSave: (data: ContatoFormData) => void;
  onCancel: () => void;
  hideButtons?: boolean;
  isSubmitting?: boolean;
}

export const ContatoForm: React.FC<ContatoFormProps> = ({
  contato,
  onSave,
  onCancel,
  hideButtons = false,
  isSubmitting = false,
}) => {
  const { formData, errors, handleChange, handleSubmit } = useContatoForm({
    contato,
    onSubmit: onSave,
  });

  return (
    <form id="contato-form" onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Nome */}
      <FormField
        id="nome"
        label="Nome"
        name="nome"
        value={formData.nome}
        placeholder="Nome completo"
        icon="user"
        error={errors.nome}
        required
        disabled={isSubmitting}
        onChange={handleChange}
      />

      {/* Email */}
      <FormField
        id="email"
        label="Email"
        name="email"
        value={formData.email}
        placeholder="email@exemplo.com"
        icon="mail"
        error={errors.email}
        required
        disabled={isSubmitting}
        onChange={handleChange}
      />

      {/* Celular */}
      <FormField
        id="celular"
        label="Celular"
        name="celular"
        value={formData.celular}
        placeholder="(81) 99999-9999"
        icon="phone"
        error={errors.celular}
        required
        disabled={isSubmitting}
        maxLength={15}
        helperText="Formato: (DD) 99999-9999"
        onChange={handleChange}
      />

      {/* Telefone Fixo */}
      <FormField
        id="telefone"
        label="Telefone Fixo"
        name="telefone"
        value={formData.telefone || ''}
        placeholder="(81) 3333-4444"
        icon="phone"
        error={errors.telefone}
        disabled={isSubmitting}
        maxLength={14}
        helperText="Formato: (DD) 3333-4444 (10 dígitos)"
        onChange={handleChange}
      />

      {/* Botões de ação - só mostra se hideButtons for false */}
      {!hideButtons && (
        <FormActions
          onCancel={onCancel}
          isSubmitting={isSubmitting}
        />
      )}
    </form>
  );
};

export default ContatoForm;