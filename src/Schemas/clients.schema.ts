import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ClientsDocument = HydratedDocument<ClientsDataClass>;

@Schema({ collection: "clients" })
export class ClientsDataClass {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  pass: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  age: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  tags: string[];

  @Prop({ required: true })
  parents: {
    type: string;
    fullName: string;
  }[];
}

export const ClientSchema = SchemaFactory.createForClass(ClientsDataClass);
