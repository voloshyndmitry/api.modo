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
import { UAParser } from "ua-parser-js";
import { AuthGuard } from "../Services/auth.guard";
import { CreateEventDto } from "../DTO/create-event.dto";
// import { AnalyticsService } from "../Services/events.service";.
import { EventDataClass } from "../Schemas/event.schema";
const geoip = require('geoip-lite');
const requestIp = require('request-ip');

@Controller("analytics")
export class AnalyticsController {
  constructor() {}
  // constructor(private readonly AnalyticsService: AnalyticsService) {}

  // @UseGuards(AuthGuard)
  // @Post()
  // async create(@Body() CreateAnalyticsDto: CreateEventDto, @Request() req: any) {
  //   return this.AnalyticsService.create(CreateAnalyticsDto, req.user);
  // }

  // @UseGuards(AuthGuard)
  // @Put()
  // async update(@Body() CreateAnalyticsDto: CreateEventDto, @Request() req: any) {
  //   return this.AnalyticsService.update(CreateAnalyticsDto, req.user);
  // }

  // @UseGuards(AuthGuard)
  // @Patch()
  // async updateValue(@Body() CreateAnalyticsDto: CreateEventDto, @Request() req: any) {
  //   return this.AnalyticsService.updateValue(CreateAnalyticsDto, req.user);
  // }

  // @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: any) {
    const clientIp = requestIp.getClientIp(req); 
    let parser = new UAParser(req.get("user-agent")); // you need to pass the user-agent for nodejs
    const location = geoip.lookup(clientIp);
    let parserResults = parser.getResult();
    console.log(parserResults);
    return {...parserResults, location, ip: clientIp};
  }

  // @UseGuards(AuthGuard)
  // @Get(":id")
  // async findOne(@Query("id") id: string): Promise<EventDataClass> {
  //   return this.AnalyticsService.findOne(id);
  // }

  // @UseGuards(AuthGuard)
  // @Delete()
  // async delete(@Query("id") id: string) {
  //   return this.AnalyticsService.delete(id);
  // }
}
