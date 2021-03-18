import { taskStatus } from "../task.status.enum";
import {IsIn, IsNotEmpty, IsOptional} from 'class-validator'

export class getTaskDto {
    @IsOptional()
    @IsIn([taskStatus.OPEN, taskStatus.PENDING, taskStatus.DONE])
    status: taskStatus;

    @IsNotEmpty()
    @IsOptional()
    search: string;
}