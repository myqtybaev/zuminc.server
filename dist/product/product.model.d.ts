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
import { Document } from 'mongoose';
import { IAttribute } from './attribute.service';
export type AttributeDocument = Attribute & Document;
export declare class Attribute {
    name: string;
    meaning: {
        KZ: string;
        RU: string;
        EN: string;
    };
    type: string;
}
export declare const AttributeSchema: import("mongoose").Schema<Attribute, import("mongoose").Model<Attribute, any, any, any, any>, {}, {}, {}, {}, "type", Attribute>;
export interface ICategory {
    _id: string;
    name: string;
    meaning: {
        KZ: string;
        RU: string;
        EN: string;
    };
    attribute: IAttribute[];
}
export type CategoryDocument = Category & Document;
export declare class Category {
    name: string;
    meaning: {
        KZ: string;
        RU: string;
        EN: string;
    };
    attribute: string[];
}
export declare const CategorySchema: import("mongoose").Schema<Category, import("mongoose").Model<Category, any, any, any, any>, {}, {}, {}, {}, "type", Category>;
export type ProductDocument = Product & Document;
export declare class Product {
    image: string[];
    title: IRaw;
    prise: number;
    category: string;
    attribute: IRaw[];
    inStock: boolean;
    hit: boolean;
    discont: number;
    description: IRaw;
}
export declare const ProductSchema: import("mongoose").Schema<Product, import("mongoose").Model<Product, any, any, any, any>, {}, {}, {}, {}, "type", Product>;
export interface IRaw {
    RU: string;
    KZ: string;
    EN: string;
}
export interface IProductAttribute {
    _id: string;
    value: IRaw;
}
