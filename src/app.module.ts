import { Module } from "@nestjs/common";
import { AppController } from "./Controllers/app.controller";
import { AppService } from "./Services/app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./Modules/auth.module";
import { UsersModule } from "./Modules/users.module";
import { ClientsModule } from "./Modules/clients.module";
require('dotenv').config()

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_KEY
    ),
    AuthModule,
    // UsersModule,
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
