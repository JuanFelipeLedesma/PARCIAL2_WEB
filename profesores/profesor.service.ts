import { Injectable } from '@nestjs/common';
import { Profesor } from './profesor.entity';

@Injectable()
export class ProfesorService {
  // constructor(@InjectRepository(Profesor) private repo: Repository<Profesor>) {}

  // crearProfesor() – Validar extensión con exactamente 5 dígitos
  async crearProfesor(datos: {
    cedula: number;
    nombre: string;
    departamento: string;
    extension: number;
    esParEvaluador?: boolean;
  }): Promise<Profesor> {
    // TODO: Validar que la extensión tenga exactamente 5 dígitos
    // Hint: extension >= 10000 && extension <= 99999
    throw new Error('Not implemented');
  }

  // asignarEvaluador() - Solo si el profesor tiene menos de 3 evaluaciones activas
  async asignarEvaluador(profesorId: number, evaluacionId: number): Promise<void> {
    // TODO:
    // 1. Contar evaluaciones activas del profesor
    // 2. Si < 3, asignarlo como evaluador de la evaluación dada
    throw new Error('Not implemented');
  }
}
