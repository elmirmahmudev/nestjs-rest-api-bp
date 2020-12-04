import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';


import { UserEntity } from 'src/auth/user.entity';
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
    ) {

    }
    async getTasks(
        filterDto: GetTasksFilterDto,
        user: UserEntity
    ): Promise<TaskEntity[]> {
        return await this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(
        id: number,
        user: UserEntity
    ): Promise<TaskEntity> {
        console.log(user);

        const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });
        if (!found) {
            throw new NotFoundException(`Task with '${id}' not found`);
        }
        return found;
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        user: UserEntity
    ): Promise<TaskEntity> {
        return await this.taskRepository.createTask(createTaskDto, user);
    }

    async updateTaskStatusById(
        id: number,
        status: ETaskStatus,
        user: UserEntity
    ): Promise<TaskEntity> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        task.save();
        return task;
    }

    async deleteTaskById(
        id: number,
        user: UserEntity
    ): Promise<void> {
        const result = await this.taskRepository.delete({ id, userId: user.id });
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
