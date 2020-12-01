import { DeleteResult, EntityRepository, Repository } from "typeorm";

import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { ETaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { search, status } = filterDto;
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere('(task.title LIKE :search OR task.desc LIKE :search)', { search: `%${search}%` });
        }
        const tasks = await query.getMany();
        return tasks;
    }
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