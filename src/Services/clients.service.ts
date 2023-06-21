import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateClientDto } from "../DTO/create-client.dto";
import { ClientsDataClass } from "../Schemas/clients.schema";

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(ClientsDataClass.name)
    private usersModel: Model<ClientsDataClass>
  ) {}

  async create(createClientDto: CreateClientDto): Promise<ClientsDataClass> {
    const id = new Date().getTime();
    const createdCat = new this.usersModel({ id, ...createClientDto });

    return createdCat.save();
  }

  async update(createClientDto: CreateClientDto): Promise<ClientsDataClass> {
    const resp = await this.usersModel.findByIdAndUpdate(
      { id: createClientDto.id },
      createClientDto,
      { new: true }
    );

    return resp;
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
