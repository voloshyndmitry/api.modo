import { MetaData } from "../Common/common.interfaces";

export class CreateVisitDto {
  readonly id: string;
  readonly groupId: string;
  readonly eventId: string;
  readonly date: string;
  readonly clientsIds: string[];
  readonly created: MetaData;
  readonly updated: MetaData;
}