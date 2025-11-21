import { Injectable } from '@nestjs/common';
import { Evaluacion } from './evaluacion.entity';

@Injectable()
export class EvaluacionService {
  // constructor(@InjectRepository(Evaluacion) private repo: Repository<Evaluacion>) {}

  // crearEvaluacion() - Validar que evaluador ≠ mentor, calificación entre 0 y 5.
  async crearEvaluacion(datos: {
    evaluadorId: number;
    mentorId: number | null;
    proyectoId: number;
    calificacion: number;
  }): Promise<Evaluacion> {
    // TODO:
    // 1. Validar que evaluadorId !== mentorId cuando mentorId no es null
    // 2. Validar que 0 <= calificacion <= 5
    // 3. Crear y guardar evaluación
    throw new Error('Not implemented');
  }
}
