import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ETaskStatus } from "../tasks.model";

export class TaskStatusValidation implements PipeTransform {
    readonly allowedTaskStatuses = [
        ETaskStatus.OPEN,
        ETaskStatus.IN_PROGRESS,
        ETaskStatus.DONE
    ]
    transform(value: any) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`);
        }
        return value;
    }

    private isStatusValid(status: any) {
        return this.allowedTaskStatuses.indexOf(status) !== -1;
    }
}