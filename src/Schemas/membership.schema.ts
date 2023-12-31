import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { MetaData } from "../Common/common.interfaces";
import { MetaDataSchema } from "../Common/common.schema";

export type MembershipsDocument = HydratedDocument<MembershipDataClass>;

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

@Schema({ collection: "memberships" })
export class MembershipDataClass {
  @Prop({ required: true, type: String })
  id: string;

  @Prop({ required: true, type: String })
  value: string;

  @Prop({ required: true, type: String })
  label: string;

  @Prop({ required: true, type: String })
  price: string;

  @Prop({ required: true, type: String })
  groupId: string;

  @Prop({ type: String })
  currency: string;

  @Prop({ type: OfferSchema })
  specialOffers: Offer;

  @Prop({ type: MetaDataSchema })
  created: MetaData;

  @Prop({ type: MetaDataSchema })
  updated: MetaData;
}

export const MembershipSchema =
  SchemaFactory.createForClass(MembershipDataClass);
