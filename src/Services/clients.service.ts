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

  async publicCreate(clients: CreateClientDto[]): Promise<string> {
    const groupId = "2";
    const isApproved = false;
    console.log({clients})
    try {
      /**
       * Collect all async operations
       */
      const allPromises = Object.values(clients).map(async (client) => {
        const newRelatives = client.relatives.map(async (relativeClient) => {
          console.log("IN <<<", client)
          const relativeId = `rel${new Date().getTime()}`;
          const createdRelativeClient = new this.clientsModel({
            id: relativeId,
            ...relativeClient,
            groupId,
            isApproved,
          });
          console.log({createdRelativeClient})
          createdRelativeClient.save();

          return { id: relativeId, relative: relativeClient.relative };
        });

        const id = `client${new Date().getTime()}`;
        const createdClient = new this.clientsModel({
          id,
          ...client,
          groupId,
          isApproved,
          relatives: newRelatives,
        });
        console.log({createdClient})

        /**
         * return promise before go to the next iteration
         */
        await createdClient.save();
      });

      /**
       * wait all iterations before return success message
       */
      await Promise.all(allPromises);

      return "200";
    } catch (error) {
      /**
       * return error if some of iterations has been failed
       */
      return error;
    }
  }

  async create(
    createClientDto: CreateClientDto,
    user
  ): Promise<ClientsDataClass> {
    const id = new Date().getTime();
    const currentUser = await this.usersService.findOne(user.sub);
    const createdClient = new this.clientsModel({
      id,
      ...createClientDto,
      groupId: currentUser.groupId,
      isApproved: true,
    });

    return createdClient.save();
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
    const currentUser = await this.usersService.findOne(user.sub);
    const clients = await this.clientsModel
      .find({ groupId: currentUser.groupId })
      .exec();

    return clients.map((client) => {
      const { _id, ...clientData } = client.toObject();
      return clientData;
    });
  }

  async findOne(id: string): Promise<ClientsDataClass> {
    return this.clientsModel.findOne({ id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.clientsModel.findOneAndRemove({ id }).exec();
    return deletedCat;
  }
}
