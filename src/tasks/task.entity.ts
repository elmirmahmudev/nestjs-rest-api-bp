import { UserEntity } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(type => UserEntity, user => user.tasks, { eager: false })
    user: UserEntity;

    @Column()
    userId: number;
}