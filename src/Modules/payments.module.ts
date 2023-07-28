import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users.module';
import { PaymentDataClass, PaymentSchema } from '../Schemas/payment.schema';
import { PaymentsService } from '../Services/payments.service';
import { PaymentsController } from '../Controllers/payments.controller';


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
