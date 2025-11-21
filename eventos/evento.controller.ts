import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { EventoService } from './evento.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { Evento } from './evento.entity';

@Controller('eventos')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post()
  async crearEvento(@Body() dto: CreateEventoDto): Promise<Evento> {
    return this.eventoService.crearEvento({
      titulo: dto.titulo,
      descripcion: dto.descripcion,
      fecha: dto.fecha,
      duracionHoras: dto.duracionHoras,
      ponenteId: dto.ponenteId,
      auditorioId: dto.auditorioId,
    });
  }

  @Get(':id')
  async findEventoById(@Param('id', ParseIntPipe) id: number): Promise<Evento> {
    return this.eventoService.findEventoById(id);
  }

  @Post(':id/aprobar')
  async aprobarEvento(@Param('id', ParseIntPipe) id: number): Promise<Evento> {
    return this.eventoService.aprobarEvento(id);
  }

  @Delete(':id')
  async eliminarEvento(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.eventoService.eliminarEvento(id);
  }
}