"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const users_schema_1 = require("../Schemas/users.schema");
let UsersService = exports.UsersService = class UsersService {
    constructor(usersModel) {
        this.usersModel = usersModel;
    }
    async create(createCatDto) {
        const createdCat = new this.usersModel(createCatDto);
        return createdCat.save();
    }
    async findAll() {
        console.log(await this.usersModel.find());
        return this.usersModel.find().exec();
    }
    async findOne(id) {
        return this.usersModel.findOne({ _id: id }).exec();
    }
    async delete(id) {
        const deletedCat = await this.usersModel
            .findByIdAndRemove({ _id: id })
            .exec();
        return deletedCat;
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(users_schema_1.UsersDataClass.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
//# sourceMappingURL=users.service%20copy.js.map