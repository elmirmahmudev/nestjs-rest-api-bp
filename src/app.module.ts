import { Module } from '@nestjs/common';

import { ProductModule } from './products/product.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [ProductModule, TasksModule],
})
export class AppModule {}
