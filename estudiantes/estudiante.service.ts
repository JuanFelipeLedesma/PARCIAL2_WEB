import { Injectable } from '@nestjs/common';
import { Estudiante } from './estudiante.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EstudianteService {
  // descomenta esto si ya tienes TypeORM configurado
  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
  ) {}

  // crearEstudiante() – Solo permitir si el promedio es mayor a 3.2 y semestre ≥ 4
  async crearEstudiante(datos: {
    cedula: number;
    nombre: string;
    semestre: number;
    programa: string;
    promedio: number;
  }): Promise<Estudiante> {
    // TODO: Implementar validación de promedio > 3.2 y semestre >= 4
    // TODO: Crear y guardar el estudiante
    throw new Error('Not implemented');
  }

  // eliminarEstudiante(id) – No se puede eliminar si tiene proyectos activos.
  async eliminarEstudiante(id: number): Promise<void> {
    // TODO:
    // 1. Buscar estudiante y sus proyectos asociados
    // 2. Verificar que no tenga proyectos activos (estado != finalizado)
    // 3. Eliminar si cumple la regla
    throw new Error('Not implemented');
  }
}
