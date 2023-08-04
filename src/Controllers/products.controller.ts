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
import { CreateProductDto } from "../DTO/create-product.dto";
import { ProductDataClass } from "../Schemas/product.schema";
import { ProductsService } from "../Services/products.service";
import { CustomRequest } from "../Common/common.interfaces";
import { LogsService } from "../Services/logs.service";

@Controller("products")
export class ProductsController {
  constructor(
    private readonly ProductsService: ProductsService,
    private readonly logsService: LogsService
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() CreateProductsDto: CreateProductDto,
    @Request() req: CustomRequest
  ) {
    this.logsService.log(req);
    return this.ProductsService.create(CreateProductsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(
    @Body() CreateProductsDto: CreateProductDto,
    @Request() req: CustomRequest
  ) {
    this.logsService.log(req);
    return this.ProductsService.update(CreateProductsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async updateValue(
    @Body() CreateProductsDto: CreateProductDto,
    @Request() req: CustomRequest
  ) {
    this.logsService.log(req);
    return this.ProductsService.updateValue(CreateProductsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: CustomRequest): Promise<ProductDataClass[]> {
    return this.ProductsService.findAll(req.user);
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Query("id") id: string): Promise<ProductDataClass> {
    return this.ProductsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async delete(@Query("id") id: string, @Request() req: CustomRequest) {
    this.logsService.log(req);
    return this.ProductsService.delete(id);
  }
}
