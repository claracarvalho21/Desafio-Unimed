import React from 'react';
import { Container } from '../../atoms/Container/Container';
import { Typography } from '../../atoms/Typography/Typography';
import { ContatoForm, type ContatoFormData } from '../../organisms/ContatoForm/ContatoForm';
import type { Contato } from '../../../types/contato';

interface ContatoFormTemplateProps {
  title: string;
  initialData?: Contato;
  onSave: (data: ContatoFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const ContatoFormTemplate: React.FC<ContatoFormTemplateProps> = ({
  title,
  initialData,
  onSave,
  onCancel,
  isSubmitting = false,
}) => {
  return (
    <Container padding="md" maxWidth="full">
      <div className="max-w-2xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-6">
          <Typography variant="h2" color="primary">
            {title}
          </Typography>
        </div>

        <ContatoForm
          contato={initialData}
          onSave={onSave}
          onCancel={onCancel}
          isSubmitting={isSubmitting}
        />
      </div>
    </Container>
  );
};