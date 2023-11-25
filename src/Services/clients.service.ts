import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateClientDto } from "../DTO/create-client.dto";
import { ClientsDataClass } from "../Schemas/clients.schema";
import { UsersService } from "./users.service";
import { PaymentsService } from "./payments.service";
import { PAYMENT_STATUS } from "src/Common/common.interfaces";
import { MailService } from "./mail.service";

const hyperid = require("hyperid");
const generateId = hyperid({ urlSafe: true });

@Injectable()
export class ClientsService {
  payments;

  constructor(
    @InjectModel(ClientsDataClass.name)
    private clientsModel: Model<ClientsDataClass>,
    private usersService: UsersService,
    private paymentsService: PaymentsService,
    private readonly mailService: MailService
  ) { }

  async publicCreate(clients: CreateClientDto[]): Promise<string> {
    const groupId = "2";
    const isApproved = false;
    /**
     * generate array of ids for each client
     */
    const userIds = Array.from({ length: clients.length }, () => generateId());
    let newRelatives;
    let address;
    let paymentOption;
    const created = {
      date: String(new Date().getTime()),
      userId: "0",
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
          address = client.address;
          paymentOption = client.paymentOption;
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

            const formattedRelative = {
              ...relativeClient,
              id: relativeIds[relIndex],
              groupId,
              isApproved: true,
              relatives: [...reversRelativesChild, ...reversRelativesSpouse],
              created,
              updated: created,
              isVisible: true,
            };
            const createdRelativeClient = new this.clientsModel(
              formattedRelative
            );

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
        const formattedClient = {
          ...client,
          id: userIds[index],
          groupId,
          isApproved,
          relatives: [...siblings, ...newRelatives],
          created,
          address,
          paymentOption,
          updated: created,
          isVisible: true,
        };
        const createdClient = new this.clientsModel(formattedClient);

        /**
         * return promise before go to the next iteration
         */
        await createdClient.save();
        this.mailService.sendUserConfirmation(formattedClient);
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

  private getStatus({ id: clientId, status }: CreateClientDto): string {
    if (status === PAYMENT_STATUS.NOT_ACTIVE) {
      
      return status;
    }

    const lastPaymentByClientId = this.payments
      .sort((next, prev) => Number(prev.date) - Number(next.date))
      .find(
        (payment) =>
          payment.clientId === clientId &&
          payment.title.toLowerCase() === "membership"
      );
    if (!lastPaymentByClientId) {
      return PAYMENT_STATUS.PENDING;
    }

    const date = Number(lastPaymentByClientId.date);
    const expireDate = new Date(date).setMonth(new Date(date).getMonth() + 1);
    const currentDate = new Date().getTime();

    return expireDate > currentDate
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
          status: this.getStatus(client),
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
