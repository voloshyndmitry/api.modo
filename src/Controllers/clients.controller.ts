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
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Controller("clients")
export class ClientsController {
  constructor(
    private readonly ClientsService: ClientsService,
    private readonly httpService: HttpService
  ) {}

  @Get("send")
  async sendEmail(@Request() req: any): Promise<any> {
    try {
      const data = await firstValueFrom(
        this.httpService.get(
          "https://realemail.expeditedaddons.com/?api_key=" +
            process.env.REALEMAIL_API_KEY +
            "&email=woloshindima+test-email@gmail.com&fix_typos=false",
        )
      );
      console.log({ data });
    } catch (error) {
      console.log(error);
    }
    return {"response": "ok"}
  }

  @Post("public")
  async publicCreate(@Body() CreateClientsDto: CreateClientDto[]) {
    return this.ClientsService.publicCreate(CreateClientsDto);
  }
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() CreateClientsDto: CreateClientDto, @Request() req: any) {
    return this.ClientsService.create(CreateClientsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(@Body() CreateClientsDto: CreateClientDto, @Request() req: any) {
    return this.ClientsService.update(CreateClientsDto, req.user);
  }
  @UseGuards(AuthGuard)
  @Patch()
  async updateValue(
    @Body() CreateClientsDto: CreateClientDto,
    @Request() req: any
  ) {
    return this.ClientsService.updateValue(CreateClientsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: any): Promise<ClientsDataClass[]> {
    return this.ClientsService.findAll(req.user);
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Query("id") id: string): Promise<ClientsDataClass> {
    return this.ClientsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async delete(@Query("id") id: string) {
    return this.ClientsService.delete(id);
  }
}