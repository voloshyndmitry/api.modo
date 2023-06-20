import { Model } from "mongoose";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AuthDataClass } from "../Schemas/auth.schema";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthDataClass.name) private authModel: Model<AuthDataClass>,

    private jwtService: JwtService
  ) {}

  async findOne(login: string): Promise<AuthDataClass> {
    console.log({ login });
    return this.authModel.findOne({ login: login }).exec();
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.findOne(email);
    console.log({ user });
    if (user?.pass !== password) {
      throw new UnauthorizedException();
    }
    const { id } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    const payload = { sub: user.id, username: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
      id,
    };
  }
}
