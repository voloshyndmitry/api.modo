import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateClientDto } from "../DTO/create-client.dto";
import { ClientsDataClass } from "../Schemas/clients.schema";
import { UsersService } from "./users.service";
const hyperid = require('hyperid')
const generateId = hyperid({ urlSafe: true });

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
    /**
     * generate array of ids for each client
     */
    const userIds = Array.from({ length: clients.length }, () => generateId());
    let newRelatives;

    try {
      /**
       * Collect all async operations
       */
      const allPromises = Object.values(clients).map(async (client, index) => {

        /**
         * create newRelatives array only for the first client
         */
        if (!index) {
          newRelatives = client.relatives.map((relativeClient) => {
            const relativeId = `rel${generateId()}`;
            const createdRelativeClient = new this.clientsModel({
              ...relativeClient,
              id: relativeId,
              groupId,
              isApproved,
              relatives: userIds.map((id) => ({
                id,
                relative: "child",
              })),
            });

            createdRelativeClient.save();

            return { id: relativeId, relative: relativeClient.relative };
          });
        }

        const siblings = userIds.map((id) => ({
          id,
          relative: "sibling"
        })).filter(({id}) => id !== userIds[index])

        const createdClient = new this.clientsModel({
          ...client,
          id: userIds[index],
          groupId,
          isApproved,
          relatives: [
            ...siblings,
            ...newRelatives
          ],
        });

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
      console.log(`publicCreate error: ${error}`);
      return error;
    }
  }

  async create(
    createClientDto: CreateClientDto,
    user
  ): Promise<ClientsDataClass> {
    const id = generateId();
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
