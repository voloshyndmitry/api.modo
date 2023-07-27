import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type EventsDocument = HydratedDocument<EventDataClass>;

@Schema()
export class Time {
  @Prop()
  h: number;

  @Prop()
  m: number;
}

export const TimeSchema = SchemaFactory.createForClass(Time);

@Schema({ collection: "events" })
export class EventDataClass {
  @Prop({ required: true, type: String })
  id: string;

  @Prop({ required: true, type: String })
  groupId: string;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  startTime: string;
  
  @Prop({ required: true, type: String})
  endTime: string;

  @Prop({ required: true, type: String })
  day: string;

  @Prop({ required: false, type: String })
  description: string;

  @Prop({ required: false, type: String })
  color: string;
}

export const EventSchema = SchemaFactory.createForClass(EventDataClass);
