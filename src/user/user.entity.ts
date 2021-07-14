import { Task } from 'src/task/task.entity';
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column(type => Task)
  tasks: Task[];
}