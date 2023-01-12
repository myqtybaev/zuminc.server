import { NestFactory } from '@nestjs/core';
import { WsAdapter } from './chat/chat.service';
import { AppModule } from './app.module';
import { json } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useWebSocketAdapter(new WsAdapter(app));
  app.use(json({ limit: '50gb' }));
  await app.listen(process.env.APP_PORT || 53850);
}
bootstrap();
