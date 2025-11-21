import { Injectable } from '@nestjs/common';
import { Proyecto } from './proyecto.entity';
import { Estudiante } from '../estudiantes/estudiante.entity';

@Injectable()
export class ProyectoService {
  // constructor(@InjectRepository(Proyecto) private repo: Repository<Proyecto>) {}

  // crearProyecto() - Valide que el presupuesto > 0, |titulo| > 15.
  async crearProyecto(datos: {
    titulo: string;
    area: string;
    presupuesto: number;
    fechaInicio: string;
    fechaFin: string;
  }): Promise<Proyecto> {
    // TODO: Validar presupuesto > 0
    // TODO: Validar longitud del título > 15
    throw new Error('Not implemented');
  }

  // avanzarProyecto(id) – estado entre 0 y 4, sumar 1 y manejar caso máximo
  async avanzarProyecto(id: number): Promise<Proyecto> {
    // TODO:
    // 1. Buscar proyecto
    // 2. Si estado < 4, incrementar
    // 3. Si estado == 4, decidir qué hacer (error, no-op, etc.)
    throw new Error('Not implemented');
  }

  // findAllEstudiantes() – Retorna estudiantes relacionados al proyecto.
  async findAllEstudiantes(idProyecto: number): Promise<Estudiante[]> {
    // TODO:
    // 1. Cargar proyecto con sus estudiantes relacionados
    // 2. Retornar el listado
    throw new Error('Not implemented');
  }
}
