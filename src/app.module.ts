import { Module } from "@nestjs/common";
import { AppService } from "./Services/app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./Modules/auth.module";
import { UsersModule } from "./Modules/users.module";
import { ClientsModule } from "./Modules/clients.module";
import { EventsModule } from './Modules/events.module';
import { VisitsModule } from "./Modules/visits.module";
import { PaymentsModule } from "./Modules/payments.module";
import { MembershipsModule } from "./Modules/memberships.module";
import { AnalyticsModule } from "./Modules/analytics.module";
import { ProductsModule } from "./Modules/products.module";

require('dotenv').config()

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_KEY
    ),
    AuthModule,
    UsersModule,
    ClientsModule,
    EventsModule,
    VisitsModule,
    PaymentsModule,
    MembershipsModule,
    AnalyticsModule,
    ProductsModule
  ],
  providers: [AppService],
})
export class AppModule {}
