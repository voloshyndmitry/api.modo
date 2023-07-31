import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AnalyticsDocument = HydratedDocument<AnalyticDataClass>;

@Schema({ collection: "analytics" })
export class AnalyticDataClass {
  @Prop({ required: true, type: String })
  id: string;
  
  @Prop({ required: true, type: String })
  groupId: string;

  @Prop({ type: String })
  ua: string;
  
  @Prop({ type: Object })
  browser: {
    name: string;
    version: string;
    major: string;
  };
  
  @Prop({ type: Object })
  engine: {
    name: string;
    version: string;
  };
  
  @Prop({ type: Object })
  os: {
    name: string;
    version: string;
  };
  
  @Prop()
  device: {
    vendor: string;
    model: string;
  };
  
  @Prop()
  cpu: any;
  
  @Prop()
  location: {
    range: number[];
    country: string;
    region: string;
    eu: string;
    timezone: string;
    city: string;
    ll: number[];
    metro: number;
    area: number;
  };
  
  @Prop({ type: String })
  ip: string;
}

export const AnalyticSchema = SchemaFactory.createForClass(AnalyticDataClass);
