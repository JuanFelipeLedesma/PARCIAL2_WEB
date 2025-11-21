import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Estudiante } from '../estudiantes/estudiante.entity';
import { Evaluacion } from '../evaluaciones/evaluacion.entity';

@Entity()
export class Proyecto {
  @PrimaryGeneratedColumn('increment')
  id: number; // Long-Autogenerado

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'varchar', length: 200 })
  area: string;

  @Column({ type: 'int' })
  presupuesto: number;

  @Column({ type: 'int', nullable: true })
  notaFinal: number | null;

  @Column({ type: 'int' })
  estado: number; // 0..4

  @Column({ type: 'varchar', length: 50 })
  fechaInicio: string; // podrías usar Date, pero el parcial dice string

  @Column({ type: 'varchar', length: 50 })
  fechaFin: string;

  // TODO: Ajustar según el diagrama UML (mentor, estudiante líder, etc.)
  @ManyToOne(() => Estudiante, (estudiante) => estudiante.proyectosLiderados)
  estudianteLider: Estudiante;

  @OneToMany(() => Evaluacion, (evaluacion) => evaluacion.proyecto)
  evaluaciones: Evaluacion[];
}
