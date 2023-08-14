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
import { CreateClientDto } from "../DTO/create-client.dto";
import { ClientsDataClass } from "../Schemas/clients.schema";
import { ClientsService } from "../Services/clients.service";
import { AuthGuard } from "../Services/auth.guard";
import { LogsService } from "../Services/logs.service";
import { CustomRequest } from "../Common/common.interfaces";

@Controller("clients")
export class ClientsController {
  constructor(
    private readonly ClientsService: ClientsService,
    private readonly logsService: LogsService,
  ) {}

  @Post("public")
  async publicCreate(
    @Body() CreateClientsDto: CreateClientDto[],
    @Request() req: CustomRequest
  ) {
    this.logsService.log(req);
    return this.ClientsService.publicCreate(CreateClientsDto);
  }
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() CreateClientsDto: CreateClientDto, @Request() req: CustomRequest) {
    this.logsService.log(req);

    return this.ClientsService.create(CreateClientsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(@Body() CreateClientsDto: CreateClientDto, @Request() req: CustomRequest) {
    this.logsService.log(req);

    return this.ClientsService.update(CreateClientsDto, req.user);
  }
  @UseGuards(AuthGuard)
  @Patch()
  async updateValue(
    @Body() CreateClientsDto: CreateClientDto,
    @Request() req: CustomRequest
  ) {
    this.logsService.log(req);
    return this.ClientsService.updateValue(CreateClientsDto, req.user);
  }

  // @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: CustomRequest): Promise<ClientsDataClass[]> {
    return this.ClientsService.findAll(req.user || { sub: 1});
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Query("id") id: string): Promise<ClientsDataClass> {
    return this.ClientsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async delete(@Query("id") id: string, req: CustomRequest) {
    this.logsService.log(req);

    return this.ClientsService.delete(id);
  }
}
