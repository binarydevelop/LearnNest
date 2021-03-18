import { EntityRepository, Repository } from "typeorm";
import { createTaskDto } from "../dto/create.task.dto";
import { getTaskDto } from "../dto/get.tasks.dto";
import { taskStatus } from "../task.status.enum";
import { task } from "./task.entity";

@EntityRepository(task)
export class TaskRepository extends Repository<task> {
    
    async getAll(filterDto: getTaskDto): Promise<task[]> {
        const {status, search } = filterDto;
        const query = this.createQueryBuilder('task')

        if(status){
            query.andWhere('task.status = :status', {status})
        }
        if(search){
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', {search : `%${search}%`})
        }
        let task = await query.getMany();
        return task ;
    }

    async createTask(createTaskDto: createTaskDto){
        const { title , description } = createTaskDto;

        const newTask = new task();
        newTask.title = title;
        newTask.description = description; 
        newTask.status = taskStatus.OPEN;
        await newTask.save();

        return newTask;
    }


}


