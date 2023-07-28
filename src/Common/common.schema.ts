import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class MetaData {
  @Prop()
  date: string;

  @Prop()
  userId: string;
}

export const MetaDataSchema = SchemaFactory.createForClass(MetaData);
