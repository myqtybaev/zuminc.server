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
exports.CategoryService = void 0;
const product_model_1 = require("./product.model");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CategoryService = class CategoryService {
    constructor(categoryModel, attributeModel) {
        this.categoryModel = categoryModel;
        this.attributeModel = attributeModel;
    }
    async findAllCategory() {
        return await this.categoryModel.find();
    }
    async findOneCategory(id) {
        const category = await this.categoryModel.findById(id);
        return await this.categoryModel.findById(id);
    }
    async createCategory(dto) {
        const candidate = await this.categoryModel.findOne({
            name: dto.name,
        });
        if (candidate) {
            throw new common_1.HttpException('Ярлык занято', common_1.HttpStatus.BAD_REQUEST);
        }
        const category = new this.categoryModel(Object.assign({}, dto));
        await category.save();
        return { message: 'Категория товаров создан', type: 'success' };
    }
    async updateCategory(dto, id) {
        const candidate = await this.categoryModel.findOne({
            name: dto.name,
        });
        if (candidate && candidate.id !== id) {
            throw new common_1.HttpException('Ярлык занято', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.categoryModel.findByIdAndUpdate(id, Object.assign({}, dto));
        return { message: 'Атрибут изменен', type: 'success' };
    }
    async destroyCategory(id) {
        await this.categoryModel.findByIdAndDelete(id);
        return { message: 'Атрибут изменен', type: 'success' };
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_model_1.Category.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_model_1.Attribute.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map