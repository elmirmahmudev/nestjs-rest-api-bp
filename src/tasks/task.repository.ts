import { InternalServerErrorException, Logger } from "@nestjs/common";
import { GetUser } from "src/auth/get-user.decorator";
import { UserEntity } from "src/auth/user.entity";
import { DeleteResult, EntityRepository, Repository } from "typeorm";

import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { ETaskStatus } from "./task-status.enum";
import { TaskEntity } from "./task.entity";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
    private logger = new Logger('TaskRepository');
    async getTasks(
        filterDto: GetTasksFilterDto,
        @GetUser() user: UserEntity
    ): Promise<TaskEntity[]> {
        const { search, status } = filterDto;
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id });

        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere('(task.title LIKE :search OR task.desc LIKE :search)', { search: `%${search}%` });
        }
        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            this.logger.error(`Failed to 'getTasks' for user '${user.username}'. Filters: ${JSON.stringify(filterDto)}`, error.stack);
            throw new InternalServerErrorException();
        }
    }
    async createTask(
        createTaskDto: CreateTaskDto,
        user: UserEntity
    ): Promise<TaskEntity> {
        const { title, desc } = createTaskDto;
        const task = new TaskEntity();

        task.title = title;
        task.desc = desc;
        task.status = ETaskStatus.OPEN;
        task.user = user;

        try {
            await task.save();
            delete task.user;
            return task;
        } catch (error) {
            this.logger.error(`Failed to 'createTask' for user '${user.username}'. Data: ${JSON.stringify(createTaskDto)}`, error.stack);
            throw new InternalServerErrorException();
        }
    }
}