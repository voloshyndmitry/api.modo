import { Module } from "@nestjs/common";
import { AppController } from "./Controllers/app.controller";
import { AppService } from "./Services/app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./Modules/auth.module";
import { UsersModule } from "./Modules/users.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://modo-db-user:xiFT3EugrW8XihZE@modo.gqztrmr.mongodb.net/modo_main_db"
    ),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
