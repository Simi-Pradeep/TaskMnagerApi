import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType, repositoryMockFactory } from './../mock-repository';
import { MongoRepository } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userEntity: User;
  let userRepositoryMock: MockType<MongoRepository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, User, { provide: getRepositoryToken(User), useFactory: repositoryMockFactory }],
    }).compile();

    service = module.get<UserService>(UserService);
    userEntity = module.get<User>(User);
    userRepositoryMock = module.get(getRepositoryToken(User));
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userEntity).toBeDefined();
  });

  it('test user findAll', async () => {
    const users = [{_id:1242, username:"Simi"},{_id:23534, username:"Resmi"}]
    userRepositoryMock.find.mockReturnValue(users);

    const response = await service.findAll();
    expect(response.length).toBeGreaterThan(0);
    expect(response[0].username).toEqual('Simi');
  });

  it('test user findAll', async () => {
    const user= {username:"Aadi",password:"12478"};
    userRepositoryMock.save.mockReturnValue(user);
    const response = await service.create(user);
    expect(response).toBeDefined;
    expect(response.username).toEqual('Aadi');
  })

});
