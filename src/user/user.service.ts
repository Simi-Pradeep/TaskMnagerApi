import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './user.entity';
import { UserInput } from './user.input';
import * as uuid from 'uuid';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: MongoRepository<User>,
      ) {}
    
      async findAll(): Promise<User[]> {
        return this.userRepository.find();
      }

      async findUser(userId: string): Promise<User> {
        return this.userRepository.findOne({where: {_id:userId}});
      }
    
    
      async create(input: UserInput): Promise<User> {
        const user = new User();
        user._id = uuid.v4();
        user.username = input.username;
        user.password = input.password;
        return this.userRepository.save(user);
      }

      async login(input: UserInput): Promise<User> {
        const user:User = await this.userRepository.findOne(
          {where: {username:input.username, password: input.password}});
        console.log('user ->>>>>>>>>>>>>>>>>>>>>>',user);
        if(user) return user;
      }


      async getUser(userId: string) {
        console.log('userId ->>>>>>>>>>>>>>>>>>>>>>',userId);
        const user:User = await this.userRepository.findOne({where: {_id:userId}});
        if(user) return user;
      }

      async saveUser(user: User) {
        console.log('user ->>>>>>>>>>>>>>>>>>>>>>',user);
        await this.userRepository.save(user);
      }

      async saveUserData(user: User, updateData: any) {
        console.log('user ->>>>>>>>>>>>>>>>>>>>>>',user);
        console.log('updateData ->>>>>>>>>>>>>>>>>>>>>>',updateData);

        await this.userRepository.update({_id:user._id}, updateData);
      }
}
