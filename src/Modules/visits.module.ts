import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users.module';
import { VisitDataClass, VisitSchema } from '../Schemas/visits.schema';
import { VisitsService } from '../Services/visits.service';
import { VisitsController } from '../Controllers/visits.controller';
import { LogDataClass, LogSchema } from '../Schemas/log.schema';
import { LogsService } from '../Services/logs.service';

@Module({
    imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: VisitDataClass.name, schema: VisitSchema },
    ]),
    MongooseModule.forFeature([
      { name: LogDataClass.name, schema: LogSchema },
    ]),
  ],
  controllers: [VisitsController],
  providers: [VisitsService, LogsService],
})
export class VisitsModule {}
