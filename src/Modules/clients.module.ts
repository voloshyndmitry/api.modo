import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientsController } from "../Controllers/clients.controller";
import { ClientSchema, ClientsDataClass } from "../Schemas/clients.schema";
import { ClientsService } from "../Services/clients.service";
import { UsersModule } from "./users.module";
import { HttpModule } from "@nestjs/axios";
import { LogsService } from "../Services/logs.service";
import { LogDataClass, LogSchema } from "../Schemas/log.schema";
import { PaymentsService } from "src/Services/payments.service";
import { PaymentDataClass, PaymentSchema } from "src/Schemas/payment.schema";

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: ClientsDataClass.name, schema: ClientSchema },
    ]),
    MongooseModule.forFeature([
      { name: PaymentDataClass.name, schema: PaymentSchema },
    ]),
    MongooseModule.forFeature([
      { name: LogDataClass.name, schema: LogSchema },
    ]),
    HttpModule
  ],
  controllers: [ClientsController],
  providers: [ClientsService, LogsService, PaymentsService],
})
export class ClientsModule {}
