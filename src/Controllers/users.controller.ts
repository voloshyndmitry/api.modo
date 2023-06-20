import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDto } from "../DTO/create-user.dto";
import { UsersDataClass } from "../Schemas/users.schema";
import { UsersService } from "../Services/users.service";
import { AuthGuard } from "../Services/auth.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  // @Post()
  // async create(@Body() CreateUsersDto: CreateUserDto) {
  //   await this.UsersService.create(CreateUsersDto);
  // }

  @Get()
  async findAll(): Promise<UsersDataClass[]> {
    return this.UsersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<UsersDataClass> {
    return this.UsersService.findOne(id);
  }

  // @Delete(":id")
  // async delete(@Param("id") id: string) {
  //   return this.UsersService.delete(id);
  // }
}
