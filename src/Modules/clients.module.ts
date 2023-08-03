import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientsController } from "../Controllers/clients.controller";
import { ClientSchema, ClientsDataClass } from "../Schemas/clients.schema";
import { ClientsService } from "../Services/clients.service";
import { UsersModule } from "./users.module";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: ClientsDataClass.name, schema: ClientSchema },
    ]),
    HttpModule
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
