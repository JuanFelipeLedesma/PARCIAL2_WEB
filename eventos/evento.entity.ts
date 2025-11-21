import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Ponente } from '../ponentes/ponente.entity';
import { Auditorio } from '../auditorios/auditorio.entity';
import { Asistente } from '../asistentes/asistente.entity';

@Entity()
export class Evento {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 200 })
  titulo: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column({ type: 'int' })
  duracionHoras: number;

  @Column({ type: 'varchar', length: 20 })
  estado: string;

  @ManyToOne(() => Ponente, (ponente) => ponente.eventos, { nullable: false })
  ponente: Ponente;

  @ManyToOne(() => Auditorio, (auditorio) => auditorio.eventos, {
    nullable: false,
  })
  auditorio: Auditorio;

  @OneToMany(() => Asistente, (asistente) => asistente.evento)
  asistentes: Asistente[];
}
