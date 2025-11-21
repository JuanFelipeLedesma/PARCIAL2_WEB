import { Body, Controller, Post } from '@nestjs/common';
import { AuditorioService } from './auditorio.service';
import { CreateAuditorioDto } from './dto/create-auditorio.dto';
import { Auditorio } from './auditorio.entity';

@Controller('auditorios')
export class AuditorioController {
  constructor(private readonly auditorioService: AuditorioService) {}

  @Post()
  async crearAuditorio(@Body() dto: CreateAuditorioDto): Promise<Auditorio> {
    return this.auditorioService.crearAuditorio({
      nombre: dto.nombre,
      capacidad: dto.capacidad,
      ubicacion: dto.ubicacion,
    });
  }
}