import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { ETaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ){

    }
    async getTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
        return await this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: number): Promise<TaskEntity> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with '${id}' not found`);
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        return await this.taskRepository.createTask(createTaskDto);
    }

    async updateTaskStatusById(id: number, status: ETaskStatus): Promise<TaskEntity> {
        const task = await this.getTaskById(id);
        task.status = status;
        task.save();
        return task;
    }
    // updateTaskStatusById(id: string, status: ETaskStatus): ITask {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

    async deleteTaskById(id: string): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with '${id}' not found`);
        }
    }
    // deleteTaskById(id: string): boolean {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task=>task.id!==found.id)
    //     return true;
    // }
}
