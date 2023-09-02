import { MetaData } from "../Common/common.interfaces";

export class CreateProductDto {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly price: string;
  readonly currency: string;
  readonly groupId: string;
  readonly specialOffers: Offer;
  readonly brand?: string;
  readonly color?: {
    label: string;
    value: string;
  };
  readonly salePrice?: number
  readonly size?: number
  readonly created: MetaData;
  readonly updated: MetaData;
}

interface Offer {
  readonly title: string;
  readonly description: string;
  readonly price: string;
}
