import { MetaData } from "../Common/common.interfaces";

export class CreateLogDto {
  readonly id: string;
  readonly url: string;
  readonly body: string;
  readonly method: string;
  readonly created: MetaData;
}
