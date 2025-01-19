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
  UnauthorizedException,
} from "@nestjs/common";
import { UAParser } from "ua-parser-js";
import { AuthGuard } from "../Services/auth.guard";
import { AnalyticsService } from "../Services/analytics.service";
import { EventDataClass } from "../Schemas/event.schema";
import { AnalyticDataClass } from "../Schemas/analytics.schema";
import { JwtService } from "@nestjs/jwt";
import { request } from "express";
import { jwtConstants } from "../Constants/auth.constants";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
const geoip = require("geoip-lite");
const requestIp = require("request-ip");

interface CustomHeaders extends Headers {
  authorization?: string;
}

interface CustomRequest extends Request {
  headers: CustomHeaders;
}


@ApiTags('Analytics')
@ApiBearerAuth() // Enable Bearer Auth for Swagger UI
@Controller("analytics")
export class AnalyticsController {
  constructor(
    private readonly AnalyticsService: AnalyticsService,
    private jwtService: JwtService
  ) {}

  @Get("/init")
  async init(@Request() req: any) {
    const clientIp = requestIp.getClientIp(req);
    const token = this.extractTokenFromHeader(req as CustomRequest);
    console.log({ token });
    const user = await this.getUserFromToken(token);
    const parser = new UAParser(req.get("user-agent")); // you need to pass the user-agent for nodejs
    const location = geoip.lookup(clientIp);
    const parserResults = parser.getResult();
    const analytics = { ...parserResults, location, ip: clientIp };
    console.log(analytics);
    console.log({ user });

    return this.AnalyticsService.create(analytics, user);
  }

  private async getUserFromToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      console.log({ payload });
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      return payload;
    } catch {
      return { sub: "1" };
    }
  }

  private extractTokenFromHeader(request: CustomRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
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
