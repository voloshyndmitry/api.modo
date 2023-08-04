import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UsersService } from "./users.service";
import { CreateLogDto } from "../DTO/create-log.dto";
import { LogDataClass } from "../Schemas/log.schema";
import { CustomRequest } from "../Common/common.interfaces";

const hyperid = require("hyperid");
const generateId = hyperid({ urlSafe: true });
@Injectable()
export class LogsService {
  constructor(
    @InjectModel(LogDataClass.name)
    private LogsModel: Model<LogDataClass>,
    private usersService: UsersService
  ) {}

  async log(req: CustomRequest): Promise<LogDataClass> {
    const id = `log${generateId()}`;
    const created = {
      date: new Date().getTime(),
      userId: req?.user?.sub || "unauthorized",
    };
    const createdLog = new this.LogsModel({
      url: req.url,
      body: JSON.stringify(req.body),
      method: req.method,
      id,
      created,
    });

    return createdLog.save();
  }

  async findAll(user: { sub: string }): Promise<LogDataClass[]> {
    const currentUser = await this.usersService.findOne(user?.sub);
    const Logs = await this.LogsModel.find({
      groupId: currentUser.groupId,
    }).exec();

    return Logs.map((Log) => {
      const { _id, ...LogData } = Log.toObject();
      return LogData;
    });
  }

  async findOne(id: string): Promise<LogDataClass> {
    return this.LogsModel.findOne({ id: id }).exec();
  }
}
