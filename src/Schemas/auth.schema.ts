import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthDocument = HydratedDocument<AuthDataClass>;

@Schema()
export class AuthDataClass {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  pass: number;
}

export const AuthSchema = SchemaFactory.createForClass(AuthDataClass);