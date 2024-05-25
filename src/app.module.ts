import { Module } from "@nestjs/common";
import { AppService } from "./Services/app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./Modules/auth.module";
import { UsersModule } from "./Modules/users.module";
import { EventsModule } from "./Modules/events.module";
import { VisitsModule } from "./Modules/visits.module";
import { PaymentsModule } from "./Modules/payments.module";
import { MembershipsModule } from "./Modules/memberships.module";
import { AnalyticsModule } from "./Modules/analytics.module";
import { ProductsModule } from "./Modules/products.module";
import { Transport, ClientsModule } from '@nestjs/microservices';

require("dotenv").config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_KEY),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.CLOUDAMQP_URL || 'amqp://localhost:5672'],
          queue: 'main_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    AuthModule,
    UsersModule,
    ClientsModule,
    EventsModule,
    VisitsModule,
    PaymentsModule,
    MembershipsModule,
    AnalyticsModule,
    ProductsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
