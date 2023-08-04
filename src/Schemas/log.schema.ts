import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { MetaData } from "../Common/common.interfaces";
import { MetaDataSchema } from "../Common/common.schema";

export type LogsDocument = HydratedDocument<LogDataClass>;

@Schema({ collection: "logs" })
export class LogDataClass {
  @Prop({ required: true, type: String })
  id: string;

  @Prop({ required: true, type: String })
  url: string;

  @Prop({ type: String })
  body: string;

  @Prop({ required: true, type: String })
  method: string;

  @Prop({ required: true, type: MetaDataSchema })
  created: MetaData;
}

export const LogSchema = SchemaFactory.createForClass(LogDataClass);
