"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const chat_service_1 = require("./chat/chat.service");
const app_module_1 = require("./app.module");
const express_1 = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useWebSocketAdapter(new chat_service_1.WsAdapter(app));
    app.use((0, express_1.json)({ limit: '50gb' }));
    await app.listen(process.env.APP_PORT || 53850);
}
bootstrap();
//# sourceMappingURL=main.js.map