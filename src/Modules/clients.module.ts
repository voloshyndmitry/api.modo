import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientsController } from "../Controllers/clients.controller";
import { ClientSchema, ClientsDataClass } from "../Schemas/clients.schema";
import { ClientsService } from "../Services/clients.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClientsDataClass.name, schema: ClientSchema },
    ]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
