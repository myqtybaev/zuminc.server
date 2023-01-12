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
exports.AttributeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_model_1 = require("./product.model");
let AttributeService = class AttributeService {
    constructor(attributeModel) {
        this.attributeModel = attributeModel;
    }
    async findAllAttribute() {
        return await this.attributeModel.find();
    }
    async findOneAttribute(id) {
        return await this.attributeModel.findById(id);
    }
    async findByIdsAttributes(ids) {
        return await this.attributeModel.find({ _id: { $in: ids } });
    }
    async createAttribute(dto) {
        const candidate = await this.attributeModel.findOne({
            name: dto.name,
        });
        if (candidate) {
            throw new common_1.HttpException('Ярлык занято', common_1.HttpStatus.BAD_REQUEST);
        }
        const attribute = new this.attributeModel(Object.assign({}, dto));
        await attribute.save();
        return { message: 'Атрибут создан', type: 'success' };
    }
    async updateAttribute(dto, id) {
        const candidateLabel = await this.attributeModel.findOne({
            name: dto.name,
        });
        if (candidateLabel && id !== candidateLabel.id) {
            throw new common_1.HttpException('Ярлык занято', common_1.HttpStatus.BAD_REQUEST);
        }
        const attribute = await this.attributeModel.findByIdAndUpdate(id, dto);
        return { message: 'Атрибут изменен', type: 'success' };
    }
    async destroyAttribute(id) {
        const attribute = await this.attributeModel.findByIdAndDelete(id);
        return { message: 'Атрибут изменен', type: 'success' };
    }
};
AttributeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_model_1.Attribute.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AttributeService);
exports.AttributeService = AttributeService;
//# sourceMappingURL=attribute.service.js.map