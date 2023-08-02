import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users.module';
import { ProductsController } from '../Controllers/products.controller';
import { ProductDataClass, ProductSchema } from '../Schemas/product.schema';
import { ProductsService } from '../Services/products.service';



@Module({
    imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: ProductDataClass.name, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
