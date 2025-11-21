import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auditorio } from './auditorio.entity';

@Injectable()
export class AuditorioService {
  constructor(
    @InjectRepository(Auditorio)
    private readonly auditorioRepository: Repository<Auditorio>,
  ) {}

  async crearAuditorio(data: {
    nombre: string;
    capacidad: number;
    ubicacion: string;
  }): Promise<Auditorio> {
    if (data.capacidad <= 0) {
      throw new BadRequestException('La capacidad del auditorio debe ser positiva');
    }
    const auditorio = this.auditorioRepository.create(data);
    return this.auditorioRepository.save(auditorio);
  }
}
