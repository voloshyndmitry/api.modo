export class CreateVisitDto {
  readonly id: string;
  readonly groupId: string;
  readonly eventId: string;
  readonly date: string;
  readonly clientsIds: string[];
}