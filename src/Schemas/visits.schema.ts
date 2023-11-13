import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { MetaData } from "../Common/common.interfaces";
import { MetaDataSchema } from "../Common/common.schema";

export type VisitsDocument = HydratedDocument<VisitDataClass>;

@Schema({ collection: "visit_history" })
export class VisitDataClass {
  @Prop({ required: true, type: String })
  id: string;

  @Prop({ required: true, type: String })
  groupId: string;

  @Prop({ required: true, type: String })
  eventId: string;

  @Prop({ required: true, type: String })
  date: string;

  @Prop({ required: true, type: Array })
  clientsIds: string[];

  @Prop({ required: false, type: String })
  type: string;

  @Prop({ type: MetaDataSchema })
  created: MetaData;

  @Prop({ type: MetaDataSchema })
  updated: MetaData;
}

export const VisitSchema = SchemaFactory.createForClass(VisitDataClass);
