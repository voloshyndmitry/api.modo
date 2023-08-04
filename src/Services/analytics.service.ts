import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UsersService } from "./users.service";
import { AnalyticDataClass } from "../Schemas/analytics.schema";
import { CreateAnalyticDto } from "../DTO/create-analytic.dto";


const hyperid = require("hyperid");
const generateId = hyperid({ urlSafe: true });
@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(AnalyticDataClass.name)
    private AnalyticsModel: Model<AnalyticDataClass>,
    private usersService: UsersService
  ) {}

  async create(createAnalyticDto: CreateAnalyticDto, user): Promise<boolean> {
    const id = `event${generateId()}`;
    const created = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    try{
      const currentUser = await this.usersService.findOne(user.sub);
      const createdAnalytic = new this.AnalyticsModel({
        ...createAnalyticDto,
        groupId: currentUser.groupId,
        id,
        created,
      });
  
      await createdAnalytic.save();

      return true
    } catch {
      return false
    }
    
  }

  async update(createAnalyticDto: CreateAnalyticDto, user): Promise<AnalyticDataClass> {
    const { id, ...updateData } = createAnalyticDto;
    const updated = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    const resp = await this.AnalyticsModel.findOneAndUpdate({ id }, {...updateData, updated}, {
      new: true,
    });

    return resp;
  }

  async updateValue(createAnalyticDto: CreateAnalyticDto, user): Promise<AnalyticDataClass> {
    const { id, ...updateData } = createAnalyticDto;
    const updated = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    const Analytic = await this.findOne(id);

    const resp = await this.AnalyticsModel.findOneAndUpdate(
      { id },
      { ...Analytic, ...updateData, updated }
    );

    return resp;
  }

  async findAll(user): Promise<AnalyticDataClass[]> {
    const currentUser = await this.usersService.findOne(user?.sub);
    const Analytics = await this.AnalyticsModel.find().exec();

    return Analytics.map((Analytic) => {
      const { _id, ...AnalyticData } = Analytic.toObject();
      return AnalyticData;
    });
  }

  async findOne(id: string): Promise<AnalyticDataClass> {
    return this.AnalyticsModel.findOne({ id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.AnalyticsModel.findOneAndRemove({ id }).exec();
    return deletedCat;
  }
}
