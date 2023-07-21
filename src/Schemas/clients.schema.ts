import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ClientsDocument = HydratedDocument<ClientsDataClass>;
@Schema()
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
  
  @Prop({ required: true, type: String })
  groupId: string;

  @Prop()
  email: string;

  @Prop()
  pass: string;

  @Prop()
  photo: string;

  @Prop()
  name: string;

  @Prop()
  sportType: string;

  @Prop()
  isStudent: string;

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
  address: Address;

  @Prop()
  tags: string[];

  @Prop()
  groups: {
    day: string;
    time: string;
  }[];

  @Prop()
  relatives: {
    relative: string;
    id: string;
  }[];
}

export const ClientSchema = SchemaFactory.createForClass(ClientsDataClass);
