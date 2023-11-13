import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users.module";
import { EventsController } from "../Controllers/events.controller";
import { EventsService } from "../Services/events.service";
import { EventDataClass, EventSchema } from "../Schemas/event.schema";
import { LogDataClass, LogSchema } from "../Schemas/log.schema";
import { LogsService } from "../Services/logs.service";

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: EventDataClass.name, schema: EventSchema },
    ]),
    MongooseModule.forFeature([{ name: LogDataClass.name, schema: LogSchema }]),
  ],
  controllers: [EventsController],
  providers: [EventsService, LogsService],
})
export class EventsModule {}
