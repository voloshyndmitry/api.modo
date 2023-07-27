import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UsersService } from "./users.service";
import { VisitDataClass } from "../Schemas/visits.schema";
import { CreateVisitDto } from "../DTO/create-visit.dto";

const hyperid = require('hyperid')
const generateId = hyperid({ urlSafe: true });
@Injectable()
export class VisitsService {
  constructor(
    @InjectModel(VisitDataClass.name)
    private VisitsModel: Model<VisitDataClass>,
    private usersService: UsersService
  ) {}

  async create(createVisitDto: CreateVisitDto, user): Promise<VisitDataClass> {
    const id = `Visit${generateId()}`;
    const currentUser = await this.usersService.findOne(user.sub)
    const createdVisit = new this.VisitsModel({ ...createVisitDto, groupId: currentUser.groupId, id});

    return createdVisit.save();
  }

  async update(createVisitDto: CreateVisitDto): Promise<VisitDataClass> {
    const { id, ...updateData } = createVisitDto;

    const resp = await this.VisitsModel.findOneAndUpdate({ id }, updateData, {
      new: true,
    });

    return resp;
  }

  async updateValue(
    createVisitDto: CreateVisitDto
  ): Promise<VisitDataClass> {
    const { id, ...updateData } = createVisitDto;
    const Visit = await this.findOne(id);

    const resp = await this.VisitsModel.findOneAndUpdate(
      { id },
      { ...Visit, ...updateData }
    );

    return resp;
  }

  async findAll(user): Promise<VisitDataClass[]> {
    const currentUser = await this.usersService.findOne(user?.sub)
    const Visits = await this.VisitsModel.find({ groupId: currentUser.groupId }).exec();

    return Visits.map((Visit) => {
      const { _id, ...VisitData } = Visit.toObject();
      return VisitData;
    });
  }

  async findOne(id: string): Promise<VisitDataClass> {
    return this.VisitsModel.findOne({ id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.VisitsModel
      .findOneAndRemove({ id })
      .exec();
    return deletedCat;
  }
}
