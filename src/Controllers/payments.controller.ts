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
import { CreatePaymentDto } from "../DTO/create-payment.dto";
import { PaymentDataClass } from "../Schemas/payment.schema";
import { PaymentsService } from "../Services/payments.service";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly PaymentsService: PaymentsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() CreatePaymentsDto: CreatePaymentDto, @Request() req: any) {
    return this.PaymentsService.create(CreatePaymentsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(@Body() CreatePaymentsDto: CreatePaymentDto) {
    return this.PaymentsService.update(CreatePaymentsDto);
  }

  @Patch()
  async updateValue(@Body() CreatePaymentsDto: CreatePaymentDto) {
    return this.PaymentsService.updateValue(CreatePaymentsDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: any): Promise<PaymentDataClass[]> {
    return this.PaymentsService.findAll(req.user);
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Query("id") id: string): Promise<PaymentDataClass> {
    return this.PaymentsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async delete(@Query("id") id: string) {
    return this.PaymentsService.delete(id);
  }
}
