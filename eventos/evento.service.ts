import { Injectable, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './evento.entity';
import { Ponente } from '../ponentes/ponente.entity';
import { Auditorio } from '../auditorios/auditorio.entity';

@Injectable()
export class EventoService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
    @InjectRepository(Ponente)
    private readonly ponenteRepository: Repository<Ponente>,
    @InjectRepository(Auditorio)
    private readonly auditorioRepository: Repository<Auditorio>,
  ) {}

  async crearEvento(data: {
    titulo: string;
    descripcion: string;
    fecha: Date;
    duracionHoras: number;
    ponenteId: number;
    auditorioId: number;
  }): Promise<Evento> {
    if (data.duracionHoras <= 0) {
      throw new BadRequestException('La duración del evento debe ser positiva');
    }

    const ponente = await this.ponenteRepository.findOne({ where: { id: data.ponenteId } });
    if (!ponente) {
      throw new NotFoundException('Ponente no encontrado');
    }

    const descripcionLimpia = data.descripcion ? data.descripcion.trim() : '';
    if (ponente.tipoPonente === 'Invitado' && descripcionLimpia.length < 50) {
      throw new BadRequestException('La descripción debe tener al menos 50 caracteres para ponentes invitados');
    }

    const auditorio = await this.auditorioRepository.findOne({ where: { id: data.auditorioId } });
    if (!auditorio) {
      throw new NotFoundException('Auditorio no encontrado');
    }

    const evento = this.eventoRepository.create({
      titulo: data.titulo,
      descripcion: data.descripcion,
      fecha: data.fecha,
      duracionHoras: data.duracionHoras,
      estado: 'Propuesto',
      ponente,
      auditorio,
    });

    return this.eventoRepository.save(evento);
  }

  async aprobarEvento(id: number): Promise<Evento> {
    const evento = await this.eventoRepository.findOne({
      where: { id },
      relations: ['auditorio'],
    });
    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }
    if (!evento.auditorio) {
      throw new BadRequestException('No se puede aprobar un evento sin auditorio asignado');
    }
    evento.estado = 'Aprobado';
    return this.eventoRepository.save(evento);
  }

  async eliminarEvento(id: number): Promise<void> {
    const evento = await this.eventoRepository.findOne({ where: { id } });
    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }
    if (evento.estado === 'Aprobado') {
      throw new ConflictException('No se puede eliminar un evento aprobado');
    }
    await this.eventoRepository.remove(evento);
  }

  async findEventoById(id: number): Promise<Evento> {
    const evento = await this.eventoRepository.findOne({
      where: { id },
      relations: ['ponente', 'auditorio', 'asistentes'],
    });
    if (!evento) {
      throw new NotFoundException('Evento no encontrado');
    }
    return evento;
  }
}