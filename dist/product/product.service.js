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
exports.ProductService = void 0;
const file_service_1 = require("./../file/file.service");
const product_model_1 = require("./product.model");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductService = class ProductService {
    constructor(categoryModel, attributeModel, productModel, fileService) {
        this.categoryModel = categoryModel;
        this.attributeModel = attributeModel;
        this.productModel = productModel;
        this.fileService = fileService;
    }
    async findAllProduct() {
        return await this.productModel.find();
    }
    async findParam(param) {
        if (param === 'news') {
            return await this.productModel.find().sort({ _id: -1 }).limit(10);
        }
        if (param === 'hit') {
            return await this.productModel.find({ hit: true }).limit(10);
        }
        if (param === 'discont') {
            return await this.productModel.find({ discont: { $gte: 1 } }).limit(10);
        }
    }
    async findCountProduct(query) {
        let obj = {};
        if (query.category) {
            const { id } = await this.categoryModel.findOne({
                name: query.category,
            });
            query.category = id;
        }
        return {
            product: await this.productModel
                .find(Object.assign(Object.assign({}, query), obj))
                .sort({ _id: -1 })
                .skip(((query === null || query === void 0 ? void 0 : query.count) || 0) * 30)
                .limit(30),
            count: await this.productModel.find(Object.assign(Object.assign({}, query), obj)).count(),
            query: obj,
        };
    }
    async findUpdateProduct(id) {
        const product = await this.productModel.findById(id);
        return product;
    }
    async findOneProduct(id) {
        const product = await this.productModel.findById(id).exec();
        const category = await this.categoryModel.findById(product.category).exec();
        let attributes = await this.attributeModel.find({
            $inc: [...product.attribute.map((item) => item._id)],
        });
        attributes = attributes.map((item) => {
            var _a;
            let obj = {
                meaning: Object.assign({}, item.meaning),
                name: item.name,
                type: item.type,
                value: (_a = product.attribute.find((elem) => elem._id === item.id)) === null || _a === void 0 ? void 0 : _a.value,
            };
            console.log(obj);
            return obj;
        });
        attributes = attributes.filter((item) => item !== null);
        product.category = category;
        product.attribute = attributes;
        return product;
    }
    async createProduct(dto) {
        dto.image = await this.fileService.createImage(dto.image);
        const product = new this.productModel(dto);
        await product.save();
        console.log(product);
        return { message: 'Nоваров создан', type: 'success' };
    }
    async updateProduct(dto, id) {
        let newImage = await this.fileService.createImage(dto.image);
        let image = [...dto.old, ...newImage];
        await this.productModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, dto), { image }));
        return { message: 'Атрибут изменен', type: 'success' };
    }
    async destroyProduct(id) {
        const product = await this.productModel.findByIdAndDelete(id);
        return { message: 'Удален', type: 'success' };
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_model_1.Category.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_model_1.Attribute.name)),
    __param(2, (0, mongoose_1.InjectModel)(product_model_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        file_service_1.FileService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map