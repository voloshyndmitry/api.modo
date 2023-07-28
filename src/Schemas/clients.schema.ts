import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { MetaData } from "../Common/common.interfaces";
import { MetaDataSchema } from "../Common/common.schema";

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

  @Prop({ required: true })
  email: string;

  @Prop({ type: String })
  pass: string;

  @Prop({ type: String })
  photo: string;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  sportType: string;

  @Prop()
  isStudent: boolean;

  @Prop({ required: true, type: String })
  surname: string;

  @Prop({ type: String })
  middlename: string;

  @Prop({ type: String })
  dob: string;

  @Prop({ type: String })
  gender: string;

  @Prop({ type: String })
  level: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: AddressSchema })
  address: Address;

  @Prop()
  tags: string[];

  @Prop()
  groups: string[];

  @Prop()
  isApproved: boolean;

  @Prop()
  relatives: {
    relative: string;
    id: string;
  }[];

  @Prop({ type: String })
  paymentOption: string;

  @Prop()
  memberships: string[];

  @Prop()
  status: string;

  @Prop()
  medicalBehavioralInfo: string;

  @Prop({ required: true, type: MetaDataSchema })
  created: MetaData;

  @Prop({ required: true, type: MetaDataSchema })
  updated: MetaData;
}

export const ClientSchema = SchemaFactory.createForClass(ClientsDataClass);
