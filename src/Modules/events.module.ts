import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users.module';
import { EventsController } from '../Controllers/events.controller';
import { EventsService } from '../Services/events.service';
import { EventDataClass, EventSchema } from '../Schemas/event.schema';

@Module({
    imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: EventDataClass.name, schema: EventSchema },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
