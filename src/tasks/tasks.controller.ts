import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { taskStatusValidationPipe } from 'src/tasks/pipes/task.status.validationPipe';
import { createTaskDto } from './dto/create.task.dto';
import { getTaskDto } from './dto/get.tasks.dto';
import {  taskStatus } from './task.status.enum';
import { TasksService } from './tasks.service';
import { task } from './entity/task.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private readonly taskService: TasksService){}

    @Get(':id')
    getTaskById(@Param('id', ParseIntPipe)  id: number ): Promise<task>{
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask( @Body() createTaskDto: createTaskDto) : Promise<task> {
                    return this.taskService.createTask(createTaskDto);
              }

    @Delete(':id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number) {
        return this.taskService.deleteTaskById(id);
    }

    @Put(':id/status')
    updateTaskById(
                    @Param('id') id: number,
                    @Body('status') status: taskStatus
                  ) {
        return this.taskService.updateTaskById(id, status);
    }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: getTaskDto) {
         return this.taskService.getTasks(filterDto)
    }

   /* 

  

   

    

    */

}
