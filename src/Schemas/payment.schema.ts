import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { MetaData } from "../Common/common.interfaces";
import { MetaDataSchema } from "../Common/common.schema";

export type PaymentsDocument = HydratedDocument<PaymentDataClass>;

@Schema({ collection: "payments" })
export class PaymentDataClass {
  @Prop({ required: true, type: String })
  id: string;

  @Prop({ required: true, type: String })
  amount: number;

  @Prop({ required: true, type: String })
  currency: string;

  @Prop({ required: true, type: String })
  type: string;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  clientId: string;

  @Prop({ required: true, type: MetaDataSchema })
  created: MetaData;
  
  @Prop({ required: true, type: MetaDataSchema })
  updated: MetaData;
}

export const PaymentSchema = SchemaFactory.createForClass(PaymentDataClass);
