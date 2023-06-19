import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from "../Controllers/auth.controller";
import { AuthDataClass, AuthSchema } from "../Schemas/auth.schema";
import { AuthService } from "../Services/auth.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuthDataClass.name, schema: AuthSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
