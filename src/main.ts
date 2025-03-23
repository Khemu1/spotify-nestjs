import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalErrorFilter } from './core/middleware/Error/GlobalErrorFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips properties that are not in the DTO
    }),
  );
  app.useGlobalFilters(new GlobalErrorFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
