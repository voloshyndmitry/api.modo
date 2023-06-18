import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from "src/Controllers/auth.controller";
import { AuthDataClass, AuthSchema } from "src/Schemas/auth.schema";
import { AuthService } from "src/Services/auth.service";

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
