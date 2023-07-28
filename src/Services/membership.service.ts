import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UsersService } from "./users.service";
import { CreateMembershipDto } from "../DTO/create-membership.dto";
import { MembershipDataClass } from "../Schemas/membership.schema";

const hyperid = require("hyperid");
const generateId = hyperid({ urlSafe: true });
@Injectable()
export class MembershipsService {
  constructor(
    @InjectModel(MembershipDataClass.name)
    private MembershipsModel: Model<MembershipDataClass>,
    private usersService: UsersService
  ) {}

  async create(createMembershipDto: CreateMembershipDto, user): Promise<MembershipDataClass> {
    const id = `event${generateId()}`;
    const created = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    const currentUser = await this.usersService.findOne(user.sub);
    const createdMembership = new this.MembershipsModel({
      ...createMembershipDto,
      groupId: currentUser.groupId,
      id,
      created,
      updated: created,
    });

    return createdMembership.save();
  }

  async update(createMembershipDto: CreateMembershipDto, user): Promise<MembershipDataClass> {
    const { id, ...updateData } = createMembershipDto;
    const updated = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    const resp = await this.MembershipsModel.findOneAndUpdate({ id }, {...updateData, updated}, {
      new: true,
    });

    return resp;
  }

  async updateValue(createMembershipDto: CreateMembershipDto, user): Promise<MembershipDataClass> {
    const { id, ...updateData } = createMembershipDto;
    const updated = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    const Membership = await this.findOne(id);

    const resp = await this.MembershipsModel.findOneAndUpdate(
      { id },
      { ...Membership, ...updateData, updated }
    );

    return resp;
  }

  async findAll(user): Promise<MembershipDataClass[]> {
    const currentUser = await this.usersService.findOne(user?.sub);
    const Memberships = await this.MembershipsModel.find({
      groupId: currentUser.groupId,
    }).exec();

    return Memberships.map((Membership) => {
      const { _id, ...MembershipData } = Membership.toObject();
      return MembershipData;
    });
  }

  async findOne(id: string): Promise<MembershipDataClass> {
    return this.MembershipsModel.findOne({ id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.MembershipsModel.findOneAndRemove({ id }).exec();
    return deletedCat;
  }
}
