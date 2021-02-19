import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // whitelist: true 로 설정하면 데코레이터가 없는 속성은 제거하여 저장됨
    forbidNonWhitelisted: true, // whitelist에 없는 속성은 HttpException 을 던짐
    transform: true // 요청해서 넘어온 자료 형변환
  }));
  await app.listen(3000);
}
bootstrap();
