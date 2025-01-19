import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Query,
  Put,
  UseGuards,
  Request,
} from "@nestjs/common";

import { AuthGuard } from "../Services/auth.guard";
import { CreateEventDto } from "../DTO/create-event.dto";
import { EventsService } from "../Services/events.service";
import { EventDataClass } from "../Schemas/event.schema";
import { LogsService } from "../Services/logs.service";
import { CustomRequest } from "../Common/common.interfaces";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Events')
@ApiBearerAuth() // Enable Bearer Auth for Swagger UI
@Controller("events")
export class EventsController {
  constructor(
    private readonly EventsService: EventsService,
    private readonly logsService: LogsService
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() CreateEventsDto: CreateEventDto,
    @Request() req: CustomRequest
  ) {
    this.logsService.log(req);
    return this.EventsService.create(CreateEventsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(
    @Body() CreateEventsDto: CreateEventDto,
    @Request() req: CustomRequest
  ) {
    this.logsService.log(req);
    return this.EventsService.update(CreateEventsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async updateValue(
    @Body() CreateEventsDto: CreateEventDto,
    @Request() req: CustomRequest
  ) {
    this.logsService.log(req);
    return this.EventsService.updateValue(CreateEventsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: CustomRequest): Promise<EventDataClass[]> {
    return this.EventsService.findAll(req.user);
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Query("id") id: string): Promise<EventDataClass> {
    return this.EventsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async delete(@Query("id") id: string, @Request() req: CustomRequest) {
    this.logsService.log(req);
    return this.EventsService.delete(id);
  }
}
