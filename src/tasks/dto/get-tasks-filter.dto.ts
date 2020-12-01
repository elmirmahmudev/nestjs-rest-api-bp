import { IsOptional } from "class-validator";

import { ETaskStatus } from "../task-status.enum";

export class GetTasksFilterDto {
    @IsOptional()
    status: ETaskStatus;

    @IsOptional()
    search: string;
}