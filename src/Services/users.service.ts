import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UsersDataClass } from "../Schemas/users.schema";
import { CreateUserDto } from "../DTO/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersDataClass.name) private usersModel: Model<UsersDataClass>
  ) {}

  async create(createCatDto: CreateUserDto): Promise<UsersDataClass> {
    const createdCat = new this.usersModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<UsersDataClass[]> {
    return this.usersModel.find().exec();
  }

  async findOne(id: string): Promise<UsersDataClass> {
    return this.usersModel.findOne({ id: id });
  }

  async update(user: CreateUserDto): Promise<CreateUserDto> {
    const { id, ...updateData } = user;

    const resp = await this.usersModel.findOneAndUpdate({ id }, updateData, {
      new: true,
    });

    return resp;
  }

  async delete(id: string) {
    const deletedCat = await this.usersModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
