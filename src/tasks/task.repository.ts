import { DeleteResult, EntityRepository, Repository } from "typeorm";

import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { ETaskStatus } from "./task-status.enum";
import { TaskEntity } from "./task.entity";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
    async getTasks(filterDto: GetTasksFilterDto): Promise<TaskEntity[]> {
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
    async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
        const { title, desc } = createTaskDto;
        const task = new TaskEntity();

        task.title = title;
        task.desc = desc;
        task.status = ETaskStatus.OPEN;
        await task.save();

        return task;
    }
}