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
import { CategoryDto } from './dto/category.dto';
import { ProductDto, ProductUpdateDto } from './dto/product.attribute.dto';
import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { AttributeService } from './attribute.service';
import { IAttributeDTO } from './attribute.service';
export declare class ProductController {
    private attributeService;
    private categoryService;
    private productService;
    constructor(attributeService: AttributeService, categoryService: CategoryService, productService: ProductService);
    findAllAttribute(): Promise<(import("./product.model").Attribute & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findByIdsAttribute(id: string): Promise<(import("./product.model").Attribute & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findByIdAttribute(id: string): Promise<import("./product.model").Attribute & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
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
    findAllCategory(): Promise<(import("./product.model").Category & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findByIdCategory(id: string): Promise<import("./product.model").Category & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createCategory(dto: CategoryDto): Promise<{
        message: string;
        type: string;
    }>;
    updateCategory(dto: CategoryDto, id: string): Promise<{
        message: string;
        type: string;
    }>;
    destroyCategory(id: string): Promise<{
        message: string;
        type: string;
    }>;
    findAllProduct(query: object): Promise<{
        product: (import("./product.model").Product & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        count: number;
        query: {};
    }>;
    findByIdProduct(id: string): Promise<any>;
    getParam(param: string): Promise<(import("./product.model").Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findUpdateProduct(id: string): Promise<import("./product.model").Product & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
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
