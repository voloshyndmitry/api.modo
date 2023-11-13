import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UsersService } from "./users.service";
import { EventDataClass } from "../Schemas/event.schema";
import { CreateEventDto } from "../DTO/create-event.dto";
const hyperid = require("hyperid");
const generateId = hyperid({ urlSafe: true });
@Injectable()
export class EventsService {
  constructor(
    @InjectModel(EventDataClass.name)
    private EventsModel: Model<EventDataClass>,
    private usersService: UsersService
  ) {}

  async create(createEventDto: CreateEventDto, user): Promise<EventDataClass> {
    const id = `event${generateId()}`;
    const created = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    const currentUser = await this.usersService.findOne(user.sub);
    const createdEvent = new this.EventsModel({
      ...createEventDto,
      groupId: currentUser.groupId,
      id,
      created,
      updated: created,
    });

    return createdEvent.save();
  }

  async update(createEventDto: CreateEventDto, user): Promise<EventDataClass> {
    const { id, ...updateData } = createEventDto;
    const updated = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    const resp = await this.EventsModel.findOneAndUpdate(
      { id },
      { ...updateData, updated },
      {
        new: true,
      }
    );

    return resp;
  }

  async updateValue(
    createEventDto: CreateEventDto,
    user
  ): Promise<EventDataClass> {
    const { id, ...updateData } = createEventDto;
    const updated = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    const Event = await this.findOne(id);

    const resp = await this.EventsModel.findOneAndUpdate(
      { id },
      { ...Event, ...updateData, updated }
    );

    return resp;
  }

  async findAll(user): Promise<EventDataClass[]> {
    const currentUser = await this.usersService.findOne(user?.sub);
    const Events = await this.EventsModel.find({
      groupId: currentUser.groupId,
    }).exec();

    return Events.map((Event) => {
      const { _id, ...EventData } = Event.toObject();
      return EventData;
    });
  }

  async findOne(id: string): Promise<EventDataClass> {
    return this.EventsModel.findOne({ id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.EventsModel.findOneAndRemove({ id }).exec();
    return deletedCat;
  }
}
