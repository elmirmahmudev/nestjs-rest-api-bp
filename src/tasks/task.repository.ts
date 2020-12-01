import { EntityRepository, Repository } from "typeorm";

import { CreateTaskDto } from "./dto/create-task.dto";
import { ETaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, desc } = createTaskDto;
        const task = new Task();

        task.title = title;
        task.desc = desc;
        task.status = ETaskStatus.OPEN;
        await task.save();

        return task;
    }
}