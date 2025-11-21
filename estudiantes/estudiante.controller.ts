import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Controller('estudiantes')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  async crear(@Body() dto: CreateEstudianteDto) {
    return this.estudianteService.crearEstudiante(dto);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    return this.estudianteService.eliminarEstudiante(Number(id));
  }
}
