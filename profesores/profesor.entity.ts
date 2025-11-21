import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Evaluacion } from '../evaluaciones/evaluacion.entity';

@Entity()
export class Profesor {
  @PrimaryGeneratedColumn('increment')
  id: number; // Long-Autogenerado

  @Column({ type: 'int' })
  cedula: number;

  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @Column({ type: 'varchar', length: 200 })
  departamento: string;

  @Column({ type: 'int' })
  extension: number;

  @Column({ type: 'boolean', default: false })
  esParEvaluador: boolean;

  // TODO: Ajustar con el diagrama. Evaluaciones donde este profesor es evaluador, etc.
  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.evaluador)
  evaluaciones: Evaluacion[];
}
