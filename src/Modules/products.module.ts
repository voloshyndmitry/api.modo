import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users.module";
import { ProductsController } from "../Controllers/products.controller";
import { ProductDataClass, ProductSchema } from "../Schemas/product.schema";
import { ProductsService } from "../Services/products.service";
import { LogDataClass, LogSchema } from "../Schemas/log.schema";
import { LogsService } from "../Services/logs.service";

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: ProductDataClass.name, schema: ProductSchema },
    ]),
    MongooseModule.forFeature([{ name: LogDataClass.name, schema: LogSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, LogsService],
})
export class ProductsModule {}
