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
  Request
} from "@nestjs/common";

import { AuthGuard } from "../Services/auth.guard";
import { CreateVisitDto } from "../DTO/create-visit.dto";
import { VisitDataClass } from "../Schemas/visits.schema";
import { VisitsService } from "../Services/visits.service";

@Controller("visits")
export class VisitsController {
  constructor(private readonly VisitsService: VisitsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() CreateVisitsDto: CreateVisitDto, @Request() req: any) {
    return this.VisitsService.create(CreateVisitsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(@Body() CreateVisitsDto: CreateVisitDto, @Request() req: any) {
    return this.VisitsService.update(CreateVisitsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async updateValue(@Body() CreateVisitsDto: CreateVisitDto, @Request() req: any) {
    return this.VisitsService.updateValue(CreateVisitsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: any): Promise<VisitDataClass[]> {
    return this.VisitsService.findAll(req.user);
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Query("id") id: string): Promise<VisitDataClass> {
    return this.VisitsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async delete(@Query("id") id: string) {
    return this.VisitsService.delete(id);
  }
}
