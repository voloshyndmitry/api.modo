/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { UsersDataClass } from "../Schemas/users.schema";
import { CreateUserDto } from "src/DTO/create-user.dto";
export declare class UsersService {
    private usersModel;
    constructor(usersModel: Model<UsersDataClass>);
    create(createCatDto: CreateUserDto): Promise<UsersDataClass>;
    findAll(): Promise<UsersDataClass[]>;
    findOne(id: string): Promise<UsersDataClass>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, UsersDataClass> & Omit<UsersDataClass & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
