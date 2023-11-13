import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UsersService } from "./users.service";
import { CreatePaymentDto } from "../DTO/create-payment.dto";
import { PaymentDataClass } from "../Schemas/payment.schema";

const hyperid = require("hyperid");
const generateId = hyperid({ urlSafe: true });
@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(PaymentDataClass.name)
    private PaymentsModel: Model<PaymentDataClass>,
    private usersService: UsersService
  ) {}

  async create(
    createPaymentDto: CreatePaymentDto,
    user
  ): Promise<PaymentDataClass> {
    const id = `event${generateId()}`;
    const created = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    const currentUser = await this.usersService.findOne(user.sub);
    const createdPayment = new this.PaymentsModel({
      ...createPaymentDto,
      groupId: currentUser.groupId,
      id,
      created,
      updated: created,
    });

    return createdPayment.save();
  }

  async update(
    createPaymentDto: CreatePaymentDto,
    user
  ): Promise<PaymentDataClass> {
    const { id, ...updateData } = createPaymentDto;
    const updated = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    const resp = await this.PaymentsModel.findOneAndUpdate(
      { id },
      { ...updateData, updated },
      {
        new: true,
      }
    );

    return resp;
  }

  async updateValue(
    createPaymentDto: CreatePaymentDto,
    user
  ): Promise<PaymentDataClass> {
    const { id, ...updateData } = createPaymentDto;
    const updated = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    const Payment = await this.findOne(id);

    const resp = await this.PaymentsModel.findOneAndUpdate(
      { id },
      { ...Payment, ...updateData, updated }
    );

    return resp;
  }

  async findAll(user): Promise<PaymentDataClass[]> {
    const currentUser = await this.usersService.findOne(user?.sub);

    const Payments = await this.PaymentsModel.find({
      groupId: currentUser.groupId,
    }).exec();

    return Payments.map((Payment) => {
      const { _id, ...PaymentData } = Payment.toObject();
      return PaymentData;
    });
  }

  async findAllByClientId(user, clientId): Promise<PaymentDataClass[]> {
    const currentUser = await this.usersService.findOne(user?.sub);
    const Payments = await this.PaymentsModel.find({
      groupId: currentUser.groupId,
      clientId,
    }).exec();

    return Payments.map((Payment) => {
      const { _id, ...PaymentData } = Payment.toObject();
      return PaymentData;
    });
  }

  async findOne(id: string): Promise<PaymentDataClass> {
    return this.PaymentsModel.findOne({ id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.PaymentsModel.findOneAndRemove({ id }).exec();
    return deletedCat;
  }
}
