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
import { FileService } from './../file/file.service';
import { ProductDto, ProductUpdateDto } from './dto/product.attribute.dto';
import { AttributeDocument, CategoryDocument, Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';
export interface IPage {
    _id: string;
    image: string[];
    title: string;
    prise: number;
    category: {
        _id: string;
        value: string;
        label: string;
    };
    attribute: object[];
    inStock: boolean;
    hit: boolean;
    discont: number;
    description: string;
}
export declare class ProductService {
    private categoryModel;
    private attributeModel;
    private productModel;
    private fileService;
    constructor(categoryModel: Model<CategoryDocument>, attributeModel: Model<AttributeDocument>, productModel: Model<ProductDocument>, fileService: FileService);
    findAllProduct(): Promise<(Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findParam(param: string): Promise<(Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findCountProduct(query: any): Promise<{
        product: (Product & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        count: number;
        query: {};
    }>;
    findUpdateProduct(id: string): Promise<Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOneProduct(id: string): Promise<any>;
    createProduct(dto: ProductDto): Promise<{
        message: string;
        type: string;
    }>;
    updateProduct(dto: ProductUpdateDto, id: string): Promise<{
        message: string;
        type: string;
    }>;
    destroyProduct(id: string): Promise<{
        message: string;
        type: string;
    }>;
}
