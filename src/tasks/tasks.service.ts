import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

import { CreateTaskDto } from './dto/create-task.dto';
import { ETaskStatus, ITask } from './tasks.model';

@Injectable()
export class TasksService {
    private tasks: ITask[] = [];

    getAllTasks(): ITask[] {
        return this.tasks;
    }

    getTaskById(id: string): ITask {
        const found = this.tasks.find(task=>task.id===id)
        if (!found) {
            throw new NotFoundException(`Task with '${id}' not found`);
        }
        return found;
    }

    createTask(createTaskDto: CreateTaskDto): ITask {
        const { title, desc } = createTaskDto;
        const task: ITask = {
            id: uuid(),
            title,
            desc,
            status: ETaskStatus.OPEN
        }

        this.tasks.push(task);
        return task;
    }

    updateTaskStatusById(id: string, status: ETaskStatus): ITask {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    deleteTaskById(id: string): boolean {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter(task=>task.id!==found.id)
        return true;
    }
}
