import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "src/Controllers/users.controller";
import { UserSchema, UsersDataClass } from "src/Schemas/users.schema";
import { UsersService } from "src/Services/users.service";

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
