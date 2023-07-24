export class CreateEventDto {
  readonly id: string;
  readonly groupId: string;
  readonly title: string;
  readonly startTime: {
    h: number,
    m: number,
  };
  readonly endTime: {
    h: number,
    m: number,
  };
  readonly day: string;
}
