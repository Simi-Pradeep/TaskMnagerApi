import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TaskInput } from './taskinput';
import { TaskService } from './task.service';

@Resolver()
export class TaskResolver {

    constructor(private taskService: TaskService) {}

    @Mutation(() => Task)
    async addTask(@Args('userId')userId: string, @Args('task')task: TaskInput, @Args('taskIndex')taskIndex: number) {
        return this.taskService.addTask(userId, task, taskIndex);
    }

    @Mutation(() => [Task])
    async reOrderTask(@Args('userId')userId: string,
     @Args('newTaskIndex')newTaskIndex: number, @Args('currentTaskIndex')currentTaskIndex: number) {
        return this.taskService.reOrderTasks(userId, newTaskIndex, currentTaskIndex );
    }

    @Mutation(() => Task)
    async completeTask(@Args('userId')userId: string,
     @Args('taskIndex')taskIndex: number) {
        return this.taskService.markTaskAsCompleted(userId, taskIndex );
    }

    @Mutation(() => Task)
    async modifyTask(@Args('userId')userId: string, @Args('task')task: TaskInput,
     @Args('taskIndex')taskIndex: number) {
        return this.taskService.modifyTask(userId, task, taskIndex );
    }

    


}
