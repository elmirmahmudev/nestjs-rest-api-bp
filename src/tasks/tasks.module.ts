import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksController } from './tasks.controller';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

@Module({
  imports:[TypeOrmModule.forFeature([TaskRepository])],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
