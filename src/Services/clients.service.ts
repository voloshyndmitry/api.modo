import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateClientDto } from "../DTO/create-client.dto";
import { ClientsDataClass } from "../Schemas/clients.schema";
import { UsersService } from "./users.service";

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(ClientsDataClass.name)
    private clientsModel: Model<ClientsDataClass>,
    private usersService: UsersService
  ) {}

  async publicCreate(createClientDto: CreateClientDto): Promise<ClientsDataClass> {
    const id = new Date().getTime();
    const createdCat = new this.clientsModel({ id, ...createClientDto, groupId: '2', isApproved: false });

    return createdCat.save();
  }

  async create(createClientDto: CreateClientDto, user): Promise<ClientsDataClass> {
    const id = new Date().getTime();
    const currentUser = await this.usersService.findOne(user.sub)
    const createdCat = new this.clientsModel({ id, ...createClientDto, groupId: currentUser.groupId, isApproved: true });

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
      { ...client, ...updateData }
    );

    return resp;
  }

  async findAll(user): Promise<ClientsDataClass[]> {
    const currentUser = await this.usersService.findOne(user.sub)
    const clients = await this.clientsModel.find({ groupId: currentUser.groupId }).exec();

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
