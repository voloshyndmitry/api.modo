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
exports.ClientsService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const clients_schema_1 = require("../Schemas/clients.schema");
let ClientsService = exports.ClientsService = class ClientsService {
    constructor(usersModel) {
        this.usersModel = usersModel;
    }
    async create(createCatDto) {
        const createdCat = new this.usersModel(createCatDto);
        return createdCat.save();
    }
    async findAll() {
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
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(clients_schema_1.ClientsDataClass.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ClientsService);
//# sourceMappingURL=clients.service.js.map