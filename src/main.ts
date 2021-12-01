import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 设置全局前缀
  app.setGlobalPrefix('api');
  // 注册全局错误过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 注册全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 设置 swagger 文档
  const config = new DocumentBuilder()
    .setTitle('Blog管理后台')
    .setDescription('Blog管理后台接口文档')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // 注册验证器
  app.useGlobalPipes(new ValidationPipe());

  // 启动服务监听
  await app.listen(8081);
}
bootstrap();
