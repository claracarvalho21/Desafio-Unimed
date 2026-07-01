// src/application/use-cases/CriarContatoUseCase.ts

import { IContatoRepository } from '../../domain/interfaces/IContatoRepository';
import { ContatoMapper } from '../mappers/ContatoMapper';
import { AppError } from '../../shared/errors/AppError';

export class CriarContatoUseCase {
  constructor(private contatoRepository: IContatoRepository) {}

  async execute(data: { 
    nome: string; 
    email: string; 
    celular: string; 
    telefone?: string 
  }) {
    const emailExistente = await this.contatoRepository.buscarPorEmail(data.email);
    if (emailExistente) {
      throw new AppError('Email já cadastrado', 400);
    }

    const celularExistente = await this.contatoRepository.buscarPorCelular(data.celular);
    if (celularExistente) {
      throw new AppError('Celular já cadastrado', 400);
    }

    const novoContato = await this.contatoRepository.criar({
      nome: data.nome.trim(),
      email: data.email.trim(),
      celular: data.celular.replace(/\D/g, ''),
      telefone: data.telefone ? data.telefone.replace(/\D/g, '') : '',
      favorito: false,
      ativo: true,
    });

    if (!novoContato) {
      throw new AppError('Erro ao criar contato', 500);
    }

    return ContatoMapper.toResponse(novoContato);
  }
}