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
import { MailService } from './../mail/mail.service';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwt;
    private userService;
    private mail;
    constructor(jwt: JwtService, userService: UserService, mail: MailService);
    authenticating(email: string): Promise<{
        status: boolean;
    }>;
    newCode(): number;
    authorization({ email, password, }: {
        email: string;
        password: string;
    }): Promise<{
        status: boolean;
        payload: string;
        role: string;
    }>;
    load(token: string): Promise<import("../user/user.shema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    generationToken(dto: {
        _id: string;
        email: string;
        role: string;
    }): Promise<string>;
}
