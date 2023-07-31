import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users.module';
import {AnalyticsController} from '../Controllers/analytics.controller'
import { AnalyticDataClass, AnalyticSchema } from '../Schemas/analytics.schema';
import { AnalyticsService } from '../Services/analytics.service';
@Module({
    imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: AnalyticDataClass.name, schema: AnalyticSchema },
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
