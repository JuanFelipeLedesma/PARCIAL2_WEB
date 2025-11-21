export class CreateEvaluacionDto {
  evaluadorId: number;
  mentorId: number | null;
  proyectoId: number;
  calificacion: number;
}
