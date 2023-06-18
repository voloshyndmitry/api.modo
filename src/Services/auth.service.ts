import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AuthDataClass } from "../Schemas/auth.schema";
import { CreateAuthDto } from "../DTO/create-auth.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthDataClass.name) private authModel: Model<AuthDataClass>
  ) {}

  async create(createCatDto: CreateAuthDto): Promise<AuthDataClass> {
    const createdCat = new this.authModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<AuthDataClass[]> {
    console.log(await this.authModel.find());
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
}
