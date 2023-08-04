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
import { CreateMembershipDto } from "../DTO/create-membership.dto";
import { MembershipDataClass } from "../Schemas/membership.schema";
import { MembershipsService } from "../Services/membership.service";
import { CustomRequest } from "../Common/common.interfaces";
import { LogsService } from "../Services/logs.service";

@Controller("memberships")
export class MembershipsController {
  constructor(
    private readonly MembershipsService: MembershipsService,
    private readonly logsService: LogsService
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() CreateMembershipsDto: CreateMembershipDto,
    @Request() req: CustomRequest
  ) {
    this.logsService.log(req);

    return this.MembershipsService.create(CreateMembershipsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(
    @Body() CreateMembershipsDto: CreateMembershipDto,
    @Request() req: CustomRequest
  ) {
    this.logsService.log(req);

    return this.MembershipsService.update(CreateMembershipsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async updateValue(
    @Body() CreateMembershipsDto: CreateMembershipDto,
    @Request() req: CustomRequest
  ) {
    this.logsService.log(req);

    return this.MembershipsService.updateValue(CreateMembershipsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: CustomRequest): Promise<MembershipDataClass[]> {
    return this.MembershipsService.findAll(req.user);
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Query("id") id: string): Promise<MembershipDataClass> {
    return this.MembershipsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async delete(@Query("id") id: string, @Request() req: CustomRequest) {
    this.logsService.log(req);

    return this.MembershipsService.delete(id);
  }
}
