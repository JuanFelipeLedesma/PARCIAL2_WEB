import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Evento } from '../eventos/evento.entity';

@Entity()
export class Asistente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 200 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  codigoEstudiante: string;

  @Column({ type: 'varchar', length: 200 })
  email: string;

  @ManyToOne(() => Evento, (evento) => evento.asistentes, { nullable: false })
  evento: Evento;
}
