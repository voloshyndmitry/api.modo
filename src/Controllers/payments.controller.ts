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
import { CreatePaymentDto } from "../DTO/create-payment.dto";
import { PaymentDataClass } from "../Schemas/payment.schema";
import { PaymentsService } from "../Services/payments.service";
import { CustomRequest } from "../Common/common.interfaces";
import { LogsService } from "../Services/logs.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Payments')
@ApiBearerAuth() // Enable Bearer Auth for Swagger UI
@Controller("payments")
export class PaymentsController {
  constructor(
    private readonly PaymentsService: PaymentsService,
    private readonly logsService: LogsService
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() CreatePaymentsDto: CreatePaymentDto,
    @Request() req: CustomRequest
  ) {
    this.logsService.log(req);

    return this.PaymentsService.create(CreatePaymentsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(
    @Body() CreatePaymentsDto: CreatePaymentDto,
    @Request() req: CustomRequest
  ) {
    this.logsService.log(req);

    return this.PaymentsService.update(CreatePaymentsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async updateValue(
    @Body() CreatePaymentsDto: CreatePaymentDto,
    @Request() req: CustomRequest
  ) {
    this.logsService.log(req);

    return this.PaymentsService.updateValue(CreatePaymentsDto, req.user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req: CustomRequest): Promise<PaymentDataClass[]> {
    return this.PaymentsService.findAll(req.user);
  }

  @UseGuards(AuthGuard)
  @Get(":id")
  async findOne(@Query("id") id: string): Promise<PaymentDataClass> {
    return this.PaymentsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async delete(@Query("id") id: string, @Request() req: CustomRequest) {
    this.logsService.log(req);

    return this.PaymentsService.delete(id);
  }
}
