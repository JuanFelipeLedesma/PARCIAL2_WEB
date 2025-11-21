import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Proyecto } from '../proyectos/proyecto.entity';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn('increment')
  id: number; // Long-Autogenerado

  @Column({ type: 'int' })
  cedula: number;

  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @Column({ type: 'int' })
  semestre: number;

  @Column({ type: 'varchar', length: 200 })
  programa: string;

  @Column({ type: 'int' })
  promedio: number;

  // TODO: ajusta esta relación según el diagrama UML real.
  @OneToMany(() => Proyecto, (proyecto) => proyecto.estudianteLider)
  proyectosLiderados: Proyecto[];
}
