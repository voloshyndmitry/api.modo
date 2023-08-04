import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users.module';
import { PaymentDataClass, PaymentSchema } from '../Schemas/payment.schema';
import { PaymentsService } from '../Services/payments.service';
import { PaymentsController } from '../Controllers/payments.controller';
import { LogDataClass, LogSchema } from '../Schemas/log.schema';
import { LogsService } from '../Services/logs.service';


@Module({
    imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: PaymentDataClass.name, schema: PaymentSchema },
    ]),
    MongooseModule.forFeature([
      { name: LogDataClass.name, schema: LogSchema },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, LogsService],
})
export class PaymentsModule {}
