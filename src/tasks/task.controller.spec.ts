import { TaskRepository } from "./entity/task.repository";
import { TasksController } from "./tasks.controller"
import { TasksService } from "./tasks.service";


describe('Task Controller' , () => {
    let taskController: TasksController;
    let taskService : TasksService;

    let mockTaskRepository: TaskRepository;

    beforeEach(() => {
        taskService  = new TasksService(mockTaskRepository);
        taskController = new TasksController(taskService)
    })

describe('is Task controller defined', () => {
    test('should be defined', ()=>{
        expect(taskController).toBeDefined();
    })

})
})