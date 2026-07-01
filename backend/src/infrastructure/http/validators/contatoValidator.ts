import { z } from 'zod';

// Schema para criar contato
export const criarContatoSchema = z.object({
  body: z.object({
    nome: z.string()
      .min(3, 'Nome deve ter pelo menos 3 caracteres')
      .max(100, 'Nome deve ter no máximo 100 caracteres'),
    
    email: z.string()
      .email('Email inválido')
      .max(255, 'Email deve ter no máximo 255 caracteres'),
    
    celular: z.string()
      .regex(/^\d{10,11}$/, 'Celular deve ter 10 ou 11 dígitos')
      .transform(val => val.replace(/\D/g, '')),
    
    telefone: z.string()
      .regex(/^\d{10}$/, 'Telefone deve ter 10 dígitos')
      .transform(val => val.replace(/\D/g, ''))
      .optional(),
  }),
});

// Schema para atualizar contato
export const atualizarContatoSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID deve ser um número'),
  }),
  body: z.object({
    nome: z.string()
      .min(3, 'Nome deve ter pelo menos 3 caracteres')
      .max(100, 'Nome deve ter no máximo 100 caracteres')
      .optional(),
    
    email: z.string()
      .email('Email inválido')
      .max(255, 'Email deve ter no máximo 255 caracteres')
      .optional(),
    
    celular: z.string()
      .regex(/^\d{10,11}$/, 'Celular deve ter 10 ou 11 dígitos')
      .transform(val => val.replace(/\D/g, ''))
      .optional(),
    
    telefone: z.string()
      .regex(/^\d{10}$/, 'Telefone deve ter 10 dígitos')
      .transform(val => val.replace(/\D/g, ''))
      .optional(),
  }),
});

// Schema para ID em params
export const idParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID deve ser um número'),
  }),
});

// Schema para buscar contatos
export const buscarContatosSchema = z.object({
  query: z.object({
    filtro: z.string().optional(),
  }),
});