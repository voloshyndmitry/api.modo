import { MetaData } from "../Common/common.interfaces";

export class CreateMembershipDto {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly price: string;
  readonly currency: string;
  readonly specialOffers: Offer;
  readonly created: MetaData;
  readonly updated: MetaData;
}

interface Offer {
  readonly title: string;
  readonly description: string;
  readonly price: string;
}
