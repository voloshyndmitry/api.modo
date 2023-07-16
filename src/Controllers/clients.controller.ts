import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Put,
} from "@nestjs/common";
import { CreateClientDto } from "../DTO/create-client.dto";
import { ClientsDataClass } from "../Schemas/clients.schema";
import { ClientsService } from "../Services/clients.service";

@Controller("clients")
export class ClientsController {
  constructor(private readonly ClientsService: ClientsService) {}

  @Post()
  async create(@Body() CreateClientsDto: CreateClientDto) {
    return this.ClientsService.create(CreateClientsDto);
  }

  @Put()
  async update(@Body() CreateClientsDto: CreateClientDto) {
    return this.ClientsService.update(CreateClientsDto);
  }

  @Patch()
  async updateValue(@Body() CreateClientsDto: CreateClientDto) {
    return this.ClientsService.updateValue(CreateClientsDto);
  }

  @Get()
  async findAll(): Promise<ClientsDataClass[]> {
    return this.ClientsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<ClientsDataClass> {
    return this.ClientsService.findOne(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.ClientsService.delete(id);
  }
}
