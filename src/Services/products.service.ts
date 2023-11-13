import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UsersService } from "./users.service";
import { CreateProductDto } from "../DTO/create-product.dto";
import { ProductDataClass } from "../Schemas/product.schema";

const hyperid = require("hyperid");
const generateId = hyperid({ urlSafe: true });
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ProductDataClass.name)
    private ProductsModel: Model<ProductDataClass>,
    private usersService: UsersService
  ) {}

  async create(
    createProductDto: CreateProductDto,
    user
  ): Promise<ProductDataClass> {
    const id = `event${generateId()}`;
    const created = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    const currentUser = await this.usersService.findOne(user.sub);
    const createdProduct = new this.ProductsModel({
      ...createProductDto,
      groupId: currentUser.groupId,
      id,
      created,
      updated: created,
    });

    return createdProduct.save();
  }

  async update(
    createProductDto: CreateProductDto,
    user
  ): Promise<ProductDataClass> {
    const { id, ...updateData } = createProductDto;
    const updated = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    const resp = await this.ProductsModel.findOneAndUpdate(
      { id },
      { ...updateData, updated },
      {
        new: true,
      }
    );

    return resp;
  }

  async updateValue(
    createProductDto: CreateProductDto,
    user
  ): Promise<ProductDataClass> {
    const { id, ...updateData } = createProductDto;
    const updated = {
      date: new Date().getTime(),
      userId: user.sub,
    };
    const Product = await this.findOne(id);

    const resp = await this.ProductsModel.findOneAndUpdate(
      { id },
      { ...Product, ...updateData, updated }
    );

    return resp;
  }

  async findAll(user): Promise<ProductDataClass[]> {
    const currentUser = await this.usersService.findOne(user?.sub);
    const Products = await this.ProductsModel.find({
      groupId: currentUser.groupId,
    }).exec();

    return Products.map((Product) => {
      const { _id, ...ProductData } = Product.toObject();
      return ProductData;
    });
  }

  async findOne(id: string): Promise<ProductDataClass> {
    return this.ProductsModel.findOne({ id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.ProductsModel.findOneAndRemove({ id }).exec();
    return deletedCat;
  }
}
