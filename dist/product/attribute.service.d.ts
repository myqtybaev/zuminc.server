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
import { Model } from 'mongoose';
import { Attribute, AttributeDocument } from './product.model';
export interface IAttribute {
    meaning: {
        RU: string;
        KZ: string;
        EN: string;
    };
    name: string;
    type: string;
}
export interface IAttributeDTO {
    meaning: {
        RU: string;
        KZ: string;
        EN: string;
    };
    name: string;
    type: string;
}
export declare class AttributeService {
    private attributeModel;
    constructor(attributeModel: Model<AttributeDocument>);
    findAllAttribute(): Promise<(Attribute & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOneAttribute(id: string): Promise<Attribute & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findByIdsAttributes(ids: string[]): Promise<(Attribute & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    createAttribute(dto: IAttributeDTO): Promise<{
        message: string;
        type: string;
    }>;
    updateAttribute(dto: IAttributeDTO, id: string): Promise<{
        message: string;
        type: string;
    }>;
    destroyAttribute(id: string): Promise<{
        message: string;
        type: string;
    }>;
}
