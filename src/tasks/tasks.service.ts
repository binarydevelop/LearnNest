import { BadRequestException, Body, HttpException, HttpStatus, Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'node:console';
import { NOTFOUND } from 'node:dns';
import { createTaskDto } from './dto/create.task.dto';
import { getTaskDto } from './dto/get.tasks.dto';
import { task } from './entity/task.entity';
import { TaskRepository } from './entity/task.repository';
import { taskStatus } from './task.status.enum';




@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository) {}

    /*  

     getTasks(): Tasks[] {
         return this.arr;
     }  
     
     getTaskwithFilters(filterData: getTaskDto): Tasks[] {
        const { status, search } = filterData;
        let tasks = this.getTasks();
        
        if(status) {
            tasks = tasks.filter(task =>  task.status === status)
        }

        if(search){
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
        }
        return tasks;
     } 

     createTask(createTaskDto: createTaskDto): Tasks {
        const { title , description } = createTaskDto  //destructuring here as whole body is passed in controller as argument
        let obj : Tasks = {
            id: uuidv4(),
            title,
            description,
            status: taskStatus.OPEN
        }
        this.arr.push(obj);
        return obj;
     }

     
     getTaskById(id: String): Tasks {
        let found =  this.arr.find(task => task.id === id) //task => { task.id === id } Does not work.
        if(!found) {
            throw new NotFoundException(`Task with id: ${id} does not exist. `)
        }
        return found;
     }

     deleteTaskById(id: String) {
            let index = this.arr.indexOf(this.getTaskById(id))
            this.arr.splice(index, 1)
     }

     updateTaskById(id: String, status: taskStatus): Tasks {
            let item = this.arr.find(task => task.id === id)
            item.status = status
            return item;
     }

 */

     async getTaskById(id: number): Promise<task> {
            const found = await this.taskRepository.findOne(id);
            if(!found) {
               throw new HttpException(`Task with id: ${id} does not exist. `, HttpStatus.NOT_FOUND)
           }
           return found;
     }


     async createTask(createTaskDto: createTaskDto): Promise<task> {
         try{
            return this.taskRepository.createTask(createTaskDto);
         }
         catch(err) {
            console.log(err);
         }
     }

     async deleteTaskById(id: number) {
         let found = this.getTaskById(id);
         if(!found){
              throw new BadRequestException(`${id} does not exist.`)
         }
         return this.taskRepository.delete(id);
     }
  
     async updateTaskById(id: number, status: taskStatus) {
         let found = await this.getTaskById(id);
            found.status = status
                return found;
     }

    async getTasks(filterDto :getTaskDto): Promise<task[]> {
         return this.taskRepository.getAll(filterDto)
    }
     

}
