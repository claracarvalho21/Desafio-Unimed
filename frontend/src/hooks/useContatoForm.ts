// frontend/src/hooks/useContatoForm.ts

import { useState, useCallback } from 'react';
import type { Contato } from '../types/contato';
import { masks } from '../utils/masks';

export interface ContatoFormData {
  nome: string;
  email: string;
  celular: string;
  telefone?: string;
}

interface UseContatoFormProps {
  contato?: Contato;
  onSubmit: (data: ContatoFormData) => void;
}

export function useContatoForm({ contato, onSubmit }: UseContatoFormProps) {
  const [formData, setFormData] = useState<ContatoFormData>({
    nome: contato?.nome || '',
    email: contato?.email || '',
    celular: contato?.celular || '',
    telefone: contato?.telefone || '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    if (name === 'celular') {
      formattedValue = masks.celular(value);
    } else if (name === 'telefone') {
      formattedValue = masks.telefoneFixo(value);
    }

    setErrors((prev) => ({ ...prev, [name]: '' }));

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 3) {
      newErrors.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Email inválido';
    }

    const celularClean = formData.celular.replace(/\D/g, '');
    if (!celularClean) {
      newErrors.celular = 'Celular é obrigatório';
    } else if (celularClean.length !== 11) {
      newErrors.celular = `Celular deve ter 11 dígitos (DDD + número). Atualmente tem ${celularClean.length} dígitos.`;
    }

    const telefoneClean = formData.telefone?.replace(/\D/g, '');
    if (telefoneClean && telefoneClean.length !== 10) {
      newErrors.telefone = `Telefone deve ter 10 dígitos (DDD + número). Atualmente tem ${telefoneClean.length} dígitos.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const dataToSend: ContatoFormData = {
      nome: formData.nome.trim(),
      email: formData.email.trim(),
      celular: formData.celular.replace(/\D/g, ''),
      telefone: formData.telefone ? formData.telefone.replace(/\D/g, '') : undefined,
    };

    onSubmit(dataToSend);
  }, [formData, validateForm, onSubmit]);

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    setFormData,
  };
}