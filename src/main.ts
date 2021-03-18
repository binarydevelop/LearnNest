import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //creating new instance of Nest Application.
  await app.listen(3000);
}
bootstrap(); //calling the instance of bootstrapping.