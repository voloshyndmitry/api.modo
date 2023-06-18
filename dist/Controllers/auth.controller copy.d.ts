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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateAuthDto } from "src/DTO/create-auth.dto";
import { AuthDataClass } from "src/Schemas/auth.schema";
import { AuthService } from "src/Services/auth.service";
export declare class AuthController {
    private readonly AuthService;
    constructor(AuthService: AuthService);
    create(CreateAuthDto: CreateAuthDto): Promise<void>;
    findAll(): Promise<AuthDataClass[]>;
    findOne(id: string): Promise<AuthDataClass>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, AuthDataClass> & Omit<AuthDataClass & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
