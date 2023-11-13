import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users.module";
import { MembershipsController } from "../Controllers/memberships.controller";
import {
  MembershipDataClass,
  MembershipSchema,
} from "../Schemas/membership.schema";
import { MembershipsService } from "../Services/membership.service";
import { LogDataClass, LogSchema } from "../Schemas/log.schema";
import { LogsService } from "../Services/logs.service";

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: MembershipDataClass.name, schema: MembershipSchema },
    ]),
    MongooseModule.forFeature([{ name: LogDataClass.name, schema: LogSchema }]),
  ],
  controllers: [MembershipsController],
  providers: [MembershipsService, LogsService],
})
export class MembershipsModule {}
