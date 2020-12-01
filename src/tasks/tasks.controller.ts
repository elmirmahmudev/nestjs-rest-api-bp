import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidation } from './pipes/task-status-validation.pipe';
import { ETaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';


@Controller('tasks')
export class TasksController {
    constructor(private taskServices: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskServices.getTasks(filterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe)  id: number): Promise<Task> {
        return this.taskServices.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskServices.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: string): Promise<void> {
        return this.taskServices.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatusById(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidation) status: ETaskStatus
    ): Promise<Task> {
        return this.taskServices.updateTaskStatusById(id, status);
    }
}
