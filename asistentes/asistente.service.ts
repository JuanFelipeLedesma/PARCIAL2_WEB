import {Injectable,
BadRequestException,
ConflictException,
NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asistente } from './asistente.entity';
import { Evento } from '../eventos/evento.entity';

@Injectable()
export class AsistenteService {
  constructor(
    @InjectRepository(Asistente)
    private readonly asistenteRepository: Repository<Asistente>,
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}

  async registrarAsistente(
    eventoId: number,
    data: {
      nombre: string;
      codigoEstudiante: string;
      email: string;
    },
  ): Promise<Asistente> {
    const evento = await this.eventoRepository.findOne({
      where: { id: eventoId },
      relations: ['asistentes', 'auditorio'],
    });
    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }
    if (!evento.auditorio) {
      throw new BadRequestException('El evento no tiene auditorio asignado');
    }

    const emailExiste = evento.asistentes.some((a) => a.email === data.email);
    if (emailExiste) {
      throw new ConflictException('Ya existe un asistente con ese email en el evento');
    }

    if (evento.asistentes.length >= evento.auditorio.capacidad) {
      throw new ConflictException('La capacidad del auditorio ha sido alcanzada');
    }

    const asistente = this.asistenteRepository.create({
      ...data,
      evento,
    });
    return this.asistenteRepository.save(asistente);
  }

  async findAsistentesByEvento(eventoId: number): Promise<Asistente[]> {
    const evento = await this.eventoRepository.findOne({
      where: { id: eventoId },
      relations: ['asistentes'],
    });
    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }
    return evento.asistentes;
  }
}
