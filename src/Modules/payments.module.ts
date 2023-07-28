import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users.module';
import { PaymentsController } from '../Controllers/payments.controller';
import { PaymentDataClass, PaymentSchema } from '../Schemas/payment.schema';
import { PaymentsService } from '../Services/payments.service';


@Module({
    imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: PaymentDataClass.name, schema: PaymentSchema },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
