export class CreateEventDto {
  readonly id: string;
  readonly groupId: string;
  readonly title: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly day: string;
  readonly description: string;
  readonly color: string;
}
