import { Column, Entity, ObjectIdColumn } from "typeorm";
import { TaskPriorityEnum } from "./taskpriority.enum";
import { TaskStatusEnum } from "./taskstatusenum";

export class Task {
    
  @ObjectIdColumn()
  _id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  priority: TaskPriorityEnum;
  @Column()
  scheduledDate:Date;
  @Column()
  dueDate: Date;
  @Column()
  status: TaskStatusEnum;
  @Column()
  creationDate: Date;
  @Column()
  completedDate: Date;
  @Column()
  completionMarkedDate: Date;

}