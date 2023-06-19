import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "../Controllers/users.controller";
import { UserSchema, UsersDataClass } from "../Schemas/users.schema";
import { UsersService } from "../Services/users.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UsersDataClass.name, schema: UserSchema },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
