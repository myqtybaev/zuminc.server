"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const path = require("path");
const fs = require("fs");
let FileService = class FileService {
    createImage(files) {
        let images = [];
        if (Array.isArray(files))
            images = [...files];
        else
            images = [files];
        const base = images.map((item) => ({
            type: item.split(';')[0].split('/')[1],
            data: item.split('base64,')[1],
        }));
        const pictures = [];
        for (let key in base) {
            let name = (0, uuid_1.v4)() + '.' + base[key].type;
            fs.writeFileSync(path.resolve(__dirname, '..', '..', 'uploads', name), base[key].data, 'base64url');
            pictures.push(name);
        }
        return pictures.map((item) => '/api/image/' + item);
    }
    async destroy(files) {
        let image = Array.isArray(files) ? files : [files];
        for (let key in image) {
            await fs.truncateSync(image[key]);
        }
    }
};
FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map