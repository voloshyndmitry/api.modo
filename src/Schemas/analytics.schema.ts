import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { MetaData } from "../Common/common.interfaces";
import { MetaDataSchema } from "../Common/common.schema";

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
  
  @Prop({ type: Object })
  device: {
    vendor: string;
    model: string;
  };
  
  @Prop({ type: Object })
  cpu: any;
  
  @Prop({ type: Object })
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

  @Prop({ required: true, type: MetaDataSchema })
  created: MetaData;
}

export const AnalyticSchema = SchemaFactory.createForClass(AnalyticDataClass);
