import { Body, Controller, Post } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { Evaluacion } from './evaluacion.entity';

@Controller('evaluaciones')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  // Punto 3. BONO: controlador que permita usar crearEvaluacion()
  @Post()
  async crearEvaluacion(@Body() dto: CreateEvaluacionDto): Promise<Evaluacion> {
    return this.evaluacionService.crearEvaluacion({
      evaluadorId: dto.evaluadorId,
      mentorId: dto.mentorId,
      proyectoId: dto.proyectoId,
      calificacion: dto.calificacion,
    });
  }
}
