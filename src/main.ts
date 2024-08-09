import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3333;
  app.enableCors({
    origin:
      process.env.APP_ENV === 'production'
        ? process.env.URL_CLIENT
        : 'http://localhost:3000', //Dev
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(port);
  console.log(`🚀 Initialized server in port: ${port}`);
}
bootstrap();
