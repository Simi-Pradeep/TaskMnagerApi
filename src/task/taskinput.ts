import { TaskPriorityEnum } from "./taskpriority.enum"
import { TaskStatusEnum } from "./taskstatusenum"

export class TaskInput {
    userId: string
    title: string
    description: string
    dueDate: Date
    scheduledDate: Date
    status: TaskStatusEnum
    priority: TaskPriorityEnum
    completedDate: Date
    completionMarkedDate: Date
}