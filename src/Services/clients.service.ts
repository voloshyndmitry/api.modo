import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateClientDto } from "src/DTO/create-client.dto";
import { ClientsDataClass } from "src/Schemas/clients.schema";

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(ClientsDataClass.name)
    private usersModel: Model<ClientsDataClass>
  ) {}

  async create(createCatDto: CreateClientDto): Promise<ClientsDataClass> {
    const createdCat = new this.usersModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<ClientsDataClass[]> {
    return this.usersModel.find().exec();
  }

  async findOne(id: string): Promise<ClientsDataClass> {
    return this.usersModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.usersModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
