import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ClientsDocument = HydratedDocument<ClientsDataClass>;

@Schema({ collection: "clients" })
export class ClientsDataClass {
  @Prop()
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
  address: string;

  @Prop()
  tags: string[];

  @Prop()
  groups: string[];

  @Prop()
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
