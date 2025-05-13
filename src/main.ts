import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggerInterceptorInterceptor } from './logger-interceptor/logger-interceptor.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.enableCors({
    origin: '*',
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
  });
2
  const config = new DocumentBuilder()
    .setTitle('poker API')
    .setDescription('poker API ')
    .setVersion('1.0')
    .addTag('poker')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalInterceptors(new LoggerInterceptorInterceptor())
  await app.listen(3000);
}
bootstrap();
