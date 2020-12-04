import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as config from 'config';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');
  const port = Number(process.env.PORT)|| serverConfig.port;
  
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
