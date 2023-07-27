import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users.module';
import { VisitDataClass, VisitSchema } from '../Schemas/visits.schema';
import { VisitsService } from '../Services/visits.service';
import { VisitsController } from '../Controllers/visits.controller';

@Module({
    imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: VisitDataClass.name, schema: VisitSchema },
    ]),
  ],
  controllers: [VisitsController],
  providers: [VisitsService],
})
export class VisitsModule {}
