import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { MetaData } from "../Common/common.interfaces";
import { MetaDataSchema } from "../Common/common.schema";

export type ProductsDocument = HydratedDocument<ProductDataClass>;

@Schema()
export class Offer {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: string;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
@Schema()
export class Color {
  @Prop()
  label: string;

  @Prop()
  value: string;
}

export const ColorSchema = SchemaFactory.createForClass(Color);

@Schema({ collection: "products" })
export class ProductDataClass {
  @Prop({ required: true, type: String })
  id: string;

  @Prop({ required: true, type: String })
  value: string;

  @Prop({ type: String })
  label: string;

  @Prop({ required: true, type: String })
  price: string;

  @Prop({ required: true, type: String })
  groupId: string;

  @Prop({ type: String })
  currency: string;

  @Prop({ type: String })
  brand?: string;

  @Prop({ type: String })
  size?: string;

  @Prop({ type: ColorSchema })
  color: Color;

  @Prop({ type: Number })
  salePrice: number

  @Prop({ type: OfferSchema })
  specialOffers: Offer;

  @Prop({ type: MetaDataSchema })
  created: MetaData;

  @Prop({ type: MetaDataSchema })
  updated: MetaData;
}

export const ProductSchema = SchemaFactory.createForClass(ProductDataClass);
