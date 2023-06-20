import { Model } from "mongoose";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AuthDataClass } from "../Schemas/auth.schema";
import { CreateAuthDto } from "../DTO/create-auth.dto";
import { UsersService } from "./users.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthDataClass.name) private authModel: Model<AuthDataClass>,
    private usersService: UsersService
  ) {}

  async create(createCatDto: CreateAuthDto): Promise<AuthDataClass> {
    const createdCat = new this.authModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<AuthDataClass[]> {
    return this.authModel.find().exec();
  }

  async findOne(id: string): Promise<AuthDataClass> {
    return this.authModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.authModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user?.pass !== password) {
      throw new UnauthorizedException();
    }
    const { pass, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}
