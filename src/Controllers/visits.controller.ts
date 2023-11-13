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
import { CreateVisitDto } from "../DTO/create-visit.dto";
import { VisitDataClass } from "../Schemas/visits.schema";
import { VisitsService } from "../Services/visits.service";
import { CustomRequest } from "../Common/common.interfaces";
import { LogsService } from "../Services/logs.service";

@Controller("visits")
export class VisitsController {
  constructor(
    private readonly VisitsService: VisitsService,
    private readonly logsService: LogsService
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() CreateVisitsDto: CreateVisitDto,
    @Request() req: CustomRequest
  ) {
    this.logsService.log(req);
    return this.VisitsService.create(CreateVisitsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Post('/drop-in')
  async createDropIn(
    @Body() CreateVisitsDto: CreateVisitDto,
    @Request() req: CustomRequest
  ) {
    this.logsService.log(req);
    return this.VisitsService.createDropIn(CreateVisitsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(
    @Body() CreateVisitsDto: CreateVisitDto,
    @Request() req: CustomRequest
  ) {
    this.logsService.log(req);
    return this.VisitsService.update(CreateVisitsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async updateValue(
    @Body() CreateVisitsDto: CreateVisitDto,
    @Request() req: CustomRequest
  ) {
    this.logsService.log(req);
    return this.VisitsService.updateValue(CreateVisitsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: CustomRequest): Promise<VisitDataClass[]> {
    return this.VisitsService.findAll(req.user);
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Query("id") id: string): Promise<VisitDataClass> {
    return this.VisitsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async delete(@Query("id") id: string, @Request() req: CustomRequest) {
    this.logsService.log(req);
    return this.VisitsService.delete(id);
  }
}
