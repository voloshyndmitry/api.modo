import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateClientDto } from "../DTO/create-client.dto";
import { ClientsDataClass } from "../Schemas/clients.schema";
import { UsersService } from "./users.service";
import { PaymentsService } from "./payments.service";
import { PAYMENT_STATUS } from "src/Common/common.interfaces";

const hyperid = require("hyperid");
const generateId = hyperid({ urlSafe: true });

@Injectable()
export class ClientsService {
  payments;

  constructor(
    @InjectModel(ClientsDataClass.name)
    private clientsModel: Model<ClientsDataClass>,
    private usersService: UsersService,
    private paymentsService: PaymentsService
  ) {}

  async publicCreate(clients: CreateClientDto[]): Promise<string> {
    const groupId = "2";
    const isApproved = false;
    /**
     * generate array of ids for each client
     */
    const userIds = Array.from({ length: clients.length }, () => generateId());
    let newRelatives;
    const created = {
      date: new Date().getTime(),
      userId: 0,
    };
    try {
      /**
       * Collect all async operations
       */
      const allPromises = Object.values(clients).map(async (client, index) => {
        /**
         * create newRelatives array only for the first client
         */
        if (!index && client.relatives) {
          const relativeIds = Array.from(
            { length: client.relatives.length },
            () => generateId()
          );

          newRelatives = client.relatives.map((relativeClient, relIndex) => {
            const reversRelativesChild = userIds.map((id) => ({
              id,
              relative: "child",
            }));

            const reversRelativesSpouse = relativeIds
              .map((id) => ({
                id,
                relative: "spouse",
              }))
              .filter(({ id }) => id !== relativeIds[relIndex]);

            const createdRelativeClient = new this.clientsModel({
              ...relativeClient,
              id: relativeIds[relIndex],
              groupId,
              isApproved,
              relatives: [...reversRelativesChild, ...reversRelativesSpouse],
              created,
              updated: created,
              isVisible: true,
            });

            createdRelativeClient.save();

            return {
              id: relativeIds[relIndex],
              relative: relativeClient.relative,
            };
          });
        }

        const siblings = userIds
          .map((id) => ({
            id,
            relative: "sibling",
          }))
          .filter(({ id }) => id !== userIds[index]);

        const createdClient = new this.clientsModel({
          ...client,
          id: userIds[index],
          groupId,
          isApproved,
          relatives: [...siblings, ...newRelatives],
          created,
          updated: created,
          isVisible: true,
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
    const created = {
      date: new Date().getTime(),
      userId: 0,
    };
    const createdClient = new this.clientsModel({
      id,
      ...createClientDto,
      groupId: currentUser.groupId,
      isApproved: true,
      created,
      updated: created,
      isVisible: true,
    });

    return createdClient.save();
  }

  async update(
    createClientDto: CreateClientDto,
    user
  ): Promise<ClientsDataClass> {
    const updated = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    const { id, ...updateData } = createClientDto;
    const resp = await this.clientsModel.findOneAndUpdate(
      { id },
      { ...updateData, updated },
      {
        new: true,
      }
    );

    return resp;
  }

  async updateValue(
    createClientDto: CreateClientDto,
    user
  ): Promise<ClientsDataClass> {
    const updated = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    const { id, ...updateData } = createClientDto;

    const resp = await this.clientsModel.findOneAndUpdate(
      { id },
      { ...updateData, updated }
    );

    return resp;
  }

  private getStatus(clientId: string): string {
    const lastPaymentByClientId = this.payments.findLast(
      (payment) =>
        payment.clientId === clientId && payment.title === "Membership"
    );
    if (!lastPaymentByClientId) {
      return PAYMENT_STATUS.PENDING;
    }
    const { date } = lastPaymentByClientId;
    const expireDate = new Date(date).setMonth(new Date(date).getMonth() + 1)
    const currentDate = new Date().getTime();

    return expireDate < currentDate
      ? PAYMENT_STATUS.ACTIVE
      : PAYMENT_STATUS.PENDING;
  }

  async findAll(user): Promise<ClientsDataClass[]> {
    const currentUser = await this.usersService.findOne(user.sub);

    const clients = await this.clientsModel
      .find({ groupId: currentUser.groupId })
      .exec();
    this.payments = await this.paymentsService.findAll(user);

    return clients
      .filter(({ isVisible = true }) => isVisible)
      .map((client) => {
        const { _id, ...clientData } = client.toObject();
        return {
          ...clientData,
          status: this.getStatus(client.id),
        };
      });
  }

  async findOne(id: string): Promise<ClientsDataClass> {
    return this.clientsModel.findOne({ id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.clientsModel
      .findOneAndUpdate({ id }, { isVisible: false })
      .exec();
    return deletedCat;
  }
}
