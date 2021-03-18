import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { taskStatus } from "../task.status.enum";

@Injectable()
export class taskStatusValidationPipe implements PipeTransform{
    readonly allowedStatus = [
        taskStatus.OPEN,
        taskStatus.PENDING,
        taskStatus.DONE
    ]

    transform(value: any){
        value = value.toUpperCase();

        if(!this.isValidStatus(value)){
            throw new BadRequestException(`${value} is not valid.`)
        }
    }

    private isValidStatus(status: any){
        let index = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
}