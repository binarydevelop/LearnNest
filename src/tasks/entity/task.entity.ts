import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { taskStatus } from "../task.status.enum";

@Entity()
export class task extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column(({ default: taskStatus.OPEN }))
    status: taskStatus;
}


