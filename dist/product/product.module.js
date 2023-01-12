"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const file_module_1 = require("./../file/file.module");
const user_module_1 = require("./../user/user.module");
const auth_module_1 = require("./../auth/auth.module");
const product_model_1 = require("./product.model");
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const product_controller_1 = require("./product.controller");
const product_service_1 = require("./product.service");
const category_service_1 = require("./category.service");
const attribute_service_1 = require("./attribute.service");
const multer_1 = require("@nestjs/platform-express/multer");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: product_model_1.Attribute.name, schema: product_model_1.AttributeSchema },
                { name: product_model_1.Category.name, schema: product_model_1.CategorySchema },
                { name: product_model_1.Product.name, schema: product_model_1.ProductSchema },
            ]),
            multer_1.MulterModule.register({
                dest: './upload',
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            file_module_1.FileModule,
        ],
        controllers: [product_controller_1.ProductController],
        providers: [attribute_service_1.AttributeService, category_service_1.CategoryService, product_service_1.ProductService],
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=product.module.js.map