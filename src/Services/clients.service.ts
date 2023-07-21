import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateClientDto } from "../DTO/create-client.dto";
import { ClientsDataClass } from "../Schemas/clients.schema";

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(ClientsDataClass.name)
    private clientsModel: Model<ClientsDataClass>
  ) {}

  async create(createClientDto: CreateClientDto): Promise<ClientsDataClass> {
    const id = new Date().getTime();
    const createdCat = new this.clientsModel({ id, ...createClientDto });

    return createdCat.save();
  }

  async update(createClientDto: CreateClientDto): Promise<ClientsDataClass> {
    const { id, ...updateData } = createClientDto;

    const resp = await this.clientsModel.findOneAndUpdate({ id }, updateData, {
      new: true,
    });

    return resp;
  }

  async updateValue(
    createClientDto: CreateClientDto
  ): Promise<ClientsDataClass> {
    const { id, ...updateData } = createClientDto;
    const client = await this.findOne(id);
    const resp = await this.clientsModel.findOneAndUpdate(
      { id },
      { ...client, ...updateData },
      {
        new: true,
      }
    );

    return resp;
  }

  async findAll(): Promise<ClientsDataClass[]> {
    const clients = await this.clientsModel.find().exec();

    return clients.map((client) => {
      const { _id, ...clientData } = client.toObject();
      return clientData;
    });
  }

  async findOne(id: string): Promise<ClientsDataClass> {
    return this.clientsModel.findOne({ id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.clientsModel
      .findOneAndRemove({ id })
      .exec();
    return deletedCat;
  }
}
