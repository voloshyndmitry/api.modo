import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ClientsDocument = HydratedDocument<ClientsDataClass>;

@Schema({ collection: "clients" })
export class ClientsDataClass {
  @Prop({ required: true, type: String })
  id: string;

  @Prop()
  email: string;

  @Prop()
  pass: string;

  @Prop()
  photo: string;

  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  middlename: string;

  @Prop()
  dob: string;

  @Prop()
  gender: string;

  @Prop()
  level: string;

  @Prop()
  color: string;

  @Prop()
  phone: string;

  @Prop()
  address: string[];

  @Prop()
  tags: string[];

  @Prop()
  groups: string[];

  @Prop()
  relatives: {
    relative: string;
    id: string;
  }[];
}

export const ClientSchema = SchemaFactory.createForClass(ClientsDataClass);
