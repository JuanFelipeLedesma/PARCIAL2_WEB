import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ponente } from './ponente.entity';

@Injectable()
export class PonenteService {
  constructor(
    @InjectRepository(Ponente)
    private readonly ponenteRepository: Repository<Ponente>,
  ) {}

  async crearPonente(data: {
    cedula: number;
    nombre: string;
    email: string;
    tipoPonente: string;
    especialidad: string;
  }): Promise<Ponente> {
    if (data.tipoPonente === 'Interno' && !data.email.endsWith('.edu')) {
      throw new BadRequestException('El email de un ponente interno debe terminar en .edu');
    }
    if (data.tipoPonente === 'Invitado') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new BadRequestException('Email inválido para ponente invitado');
      }
    }
    const ponente = this.ponenteRepository.create(data);
    return this.ponenteRepository.save(ponente);
  }

  async findPonenteById(id: number): Promise<Ponente> {
    const ponente = await this.ponenteRepository.findOne({ where: { id } });
    if (!ponente) {
      throw new NotFoundException('Ponente no encontrado');
    }
    return ponente;
  }

  async eliminarPonente(id: number): Promise<void> {
    const ponente = await this.ponenteRepository.findOne({
      where: { id },
      relations: ['eventos'],
    });
    if (!ponente) {
      throw new NotFoundException('Ponente no encontrado');
    }
    if (ponente.eventos && ponente.eventos.length > 0) {
      throw new ConflictException('No se puede eliminar un ponente con eventos asociados');
    }
    await this.ponenteRepository.remove(ponente);
  }
}
