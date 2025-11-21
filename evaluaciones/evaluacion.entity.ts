import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Profesor } from '../profesores/profesor.entity';
import { Proyecto } from '../proyectos/proyecto.entity';

@Entity()
export class Evaluacion {
  @PrimaryGeneratedColumn('increment')
  id: number; // Long-Autogenerado

  @Column({ type: 'int', nullable: true })
  calificacion: number | null;

  // TODO: Ajustar nombres exactos mentor/evaluador según diagrama UML
  @ManyToOne(() => Profesor, (profesor) => profesor.evaluaciones, {
    nullable: false,
  })
  evaluador: Profesor;

  @ManyToOne(() => Profesor, { nullable: true })
  mentor: Profesor;

  @ManyToOne(() => Proyecto, (proyecto) => proyecto.evaluaciones, {
    nullable: false,
  })
  proyecto: Proyecto;
}
