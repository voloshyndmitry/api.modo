import { MetaData } from "../Common/common.interfaces";

export class CreateEventDto {
  readonly id: string;
  readonly groupId: string;
  readonly title: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly day: string;
  readonly description: string;
  readonly color: string;
  readonly created: MetaData;
  readonly updated: MetaData;
}
