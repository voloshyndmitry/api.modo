import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ClientsDocument = HydratedDocument<ClientsDataClass>;

export class Address {
  @Prop()
  streetAddress1: string;

  @Prop()
  streetAddress2: string;

  @Prop()
  postalCode: string;

  @Prop()
  province: string;

  @Prop()
  city: string;

  @Prop()
  country: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

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
  phone: string;

  @Prop({ type: AddressSchema })
  address: {
    streetAddress1: string;
    streetAddress2: string;
    postalCode: string;
    province: string;
    city: string;
    country: string;
  };

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
