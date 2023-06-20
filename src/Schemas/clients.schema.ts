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
  photo: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  surname: string;

  @Prop({ required: true })
  middlename: string;

  @Prop({ required: true })
  dob: string;

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
    fullName: string;
    relative: string;
    name: string;
    middlename: string;
    surname: string;
    email: string;
    phone: string;
  }[];
}

export const ClientSchema = SchemaFactory.createForClass(ClientsDataClass);
