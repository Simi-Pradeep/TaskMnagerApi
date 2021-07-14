import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { MongoRepository } from 'typeorm';
import { Task } from './task.entity';
import { TaskInput } from './taskinput';
import { TaskStatusEnum } from './taskstatusenum';
import * as uuid from 'uuid';

@Injectable()
export class TaskService {

    constructor(private userService: UserService){}

    async reOrderTasks(userId:string, newTaskIndex: number, currentTaskIndex: number) {
        //let finalTaskArray = [];
        const user:User = await this.getUser(userId);
        const tasks = user.tasks;

        Logger.log("Before current task removal--->"+ tasks);
        const currentTask = tasks.splice(currentTaskIndex,1);
        Logger.log("After current task removal--->"+ tasks);
        tasks.splice(newTaskIndex,0, currentTask[0]);
        Logger.log("After replacing task--->"+ tasks);

        // const currentTask = tasks[currentTaskId];
        // if(prevTaskId < 0) {            
        //     const beforeArray = tasks.slice(0, currentTaskId);
        //     const afterArray = tasks.splice(currentTaskId+1);
        //     finalTaskArray.push(currentTask);
        //     finalTaskArray = finalTaskArray.concat(beforeArray);
        //     finalTaskArray = finalTaskArray.concat(afterArray);
        // }
        // else if(prevTaskId < currentTaskId) {
        //     const beforeArray = tasks.slice(0, prevTaskId);
        //     const afterArray_FirstPart = tasks.slice(prevTaskId+1, currentTaskId);
        //     const afterArray_SecondPart = tasks.splice(currentTaskId+1);
        //     finalTaskArray = finalTaskArray.concat(beforeArray);
        //     finalTaskArray.push(currentTask);
        //     finalTaskArray = finalTaskArray.concat(afterArray_FirstPart);
        //     finalTaskArray = finalTaskArray.concat(afterArray_SecondPart);
        // } else {
        //     const beforeArray_FirtPart = tasks.slice(0, currentTaskId-1);
        //     const beforeArray_SecondPart = tasks.slice(currentTaskId+1,prevTaskId);
        //     const afterArray = tasks.splice(prevTaskId+1);
        //     finalTaskArray = finalTaskArray.concat(beforeArray_FirtPart);
        //     finalTaskArray = finalTaskArray.concat(beforeArray_SecondPart);
        //     finalTaskArray.push(currentTask);
        //     finalTaskArray = finalTaskArray.concat(afterArray);
            
        // }

        //user.tasks = finalTaskArray;
        //this.userService.saveUser(user);
        // console.log("finalTaskArray -------------->>>>", finalTaskArray);
        // this.userService.saveUserData(user, {tasks:finalTaskArray});
        // return finalTaskArray;

        this.userService.saveUserData(user, {tasks:tasks});
        return tasks;

    }

    async addTask(userId:string, taskInput:TaskInput, addIndex?: number) {
        let finalTasks = [];
        const user:User = await this.getUser(userId);
        const existingTasks = user.tasks? user.tasks: [];
        const taskToBeAdded  = this.getNewTaskForInput(taskInput);
        // if(!existingTasks || existingTasks.length == 0) {
        //     finalTasks.push(taskToBeAdded);
        // }
        // else if(addIndex != null) {            
        //     const beforeArray = existingTasks.slice(0, addIndex);
        //     const afterArray = existingTasks.splice(addIndex+1);
        //     finalTasks = finalTasks.concat(beforeArray);
        //     finalTasks.push(taskToBeAdded);
        //     finalTasks =finalTasks.concat(afterArray);
        // } else if(addIndex == 0){
        //     finalTasks.push(taskToBeAdded);
        //     finalTasks = finalTasks.concat(existingTasks)
        // } else {
        //     finalTasks = finalTasks.concat(existingTasks);
        //     finalTasks.push(taskToBeAdded)
        // }

        if(!addIndex) {
            existingTasks.push(taskToBeAdded);
        } else {
            existingTasks.splice(addIndex, 0, taskToBeAdded);
        }
        this.userService.saveUserData(user, {tasks: existingTasks});
        return taskToBeAdded;
    }

    async markTaskAsCompleted(userId: string,taskIndex:number) {
        const user:User = await this.getUser(userId);
        const tasks = user.tasks;
        tasks[taskIndex].status = TaskStatusEnum.COMPLETED;
        this.userService.saveUserData(user, {tasks: tasks});
        return tasks[taskIndex];
    }

    async modifyTask(userId: string,taskInput:TaskInput, taskIndex:number) {
        const user:User = await this.getUser(userId);
        const tasks = user.tasks;
        this.modifyTaskWithInput(tasks[taskIndex], taskInput);
        this.userService.saveUserData(user, {tasks: tasks});
        return tasks[taskIndex];
    }

    async getUser(userId: string) {
        return this.userService.getUser(userId);
    }

    getNewTaskForInput(taskInput: TaskInput) {
        const task: Task = new Task();
        task._id = uuid.v4();
        task.title = taskInput.title;
        task.description = taskInput.description;
        task.title = taskInput.title;
        task.dueDate = taskInput.dueDate;
        task.priority = taskInput.priority;
        task.scheduledDate = taskInput.scheduledDate;
        task.status = taskInput.status;
        task.creationDate = new Date();
        return task;
    }

    modifyTaskWithInput(task:Task, taskInput: TaskInput) {
        task.title = taskInput.title;
        task.description = taskInput.description;
        task.title = taskInput.title;
        task.dueDate = taskInput.dueDate;
        task.scheduledDate = taskInput.scheduledDate;
        task.status = taskInput.status;
        task.priority = taskInput.priority;
        task.completedDate = taskInput.completedDate;
        task.completionMarkedDate = taskInput.completionMarkedDate;
        task.creationDate = new Date();
        return task;
    }
}
