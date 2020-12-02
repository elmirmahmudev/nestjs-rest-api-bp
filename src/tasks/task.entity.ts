import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ETaskStatus } from "./task-status.enum";

@Entity()
export class TaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    desc: string;

    @Column()
    status: ETaskStatus;
}