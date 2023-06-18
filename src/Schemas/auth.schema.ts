import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AuthDocument = HydratedDocument<AuthDataClass>;

@Schema({ collection: "auth_data" })
export class AuthDataClass {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  pass: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthDataClass);
