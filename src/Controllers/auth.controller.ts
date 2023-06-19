import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateAuthDto } from "../DTO/create-auth.dto";
import { AuthDataClass } from "../Schemas/auth.schema";
import { AuthService } from "../Services/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post()
  async create(@Body() CreateAuthDto: CreateAuthDto) {
    await this.AuthService.create(CreateAuthDto);
  }

  @Get()
  async findAll(): Promise<AuthDataClass[]> {
    return this.AuthService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<AuthDataClass> {
    return this.AuthService.findOne(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.AuthService.delete(id);
  }
}
