import { MetaData } from "../Common/common.interfaces";

export class CreatePaymentDto {
  readonly id: string;
  readonly amount: number;
  readonly currency: string;
  readonly type: string;
  readonly title: string;
  readonly description: string;
  readonly clientId: string;
  readonly created: MetaData;
  readonly updated: MetaData;
}