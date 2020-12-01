import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidation } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';


@Controller('tasks')
export class TasksController {
    constructor(private taskServices: TasksService) { }

    // @Get()
    // getAllTasks(): ITask[] {
    //     return this.taskServices.getAllTasks();
    // }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe)  id: number): Promise<Task> {
        return this.taskServices.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskServices.createTask(createTaskDto);
    }

    // @Delete('/:id')
    // deleteTaskById(@Param('id') id: string): boolean {
    //     return this.taskServices.deleteTaskById(id);
    // }

    // @Patch('/:id/status')
    // updateTaskStatusById(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidation) status: ETaskStatus
    // ): ITask {
    //     return this.taskServices.updateTaskStatusById(id, status);
    // }
}
