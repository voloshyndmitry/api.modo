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
import { AnalyticsService } from "../Services/analytics.service";
import { EventDataClass } from "../Schemas/event.schema";
import { AnalyticDataClass } from "../Schemas/analytics.schema";
const geoip = require('geoip-lite');
const requestIp = require('request-ip');

@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly AnalyticsService: AnalyticsService) {}

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

  @UseGuards(AuthGuard)
  @Get("/init")
  async init(@Request() req: any) {
    const clientIp = requestIp.getClientIp(req); 
    const parser = new UAParser(req.get("user-agent")); // you need to pass the user-agent for nodejs
    const location = geoip.lookup(clientIp);
    const parserResults = parser.getResult();
    const analytics = {...parserResults, location, ip: clientIp}
    console.log(analytics);
    this.AnalyticsService.create(analytics, req.user)
    return {...parserResults, location, ip: clientIp};
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: any): Promise<AnalyticDataClass[]> {
    return this.AnalyticsService.findAll(req.user);
  }

  // @UseGuards(AuthGuard)
  // @Delete()
  // async delete(@Query("id") id: string) {
  //   return this.AnalyticsService.delete(id);
  // }
}
