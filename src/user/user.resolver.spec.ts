import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserResolver, {provide:UserService, useFactory: () => jest.mock('./user.service')}],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('test findAll users query', async () => {
    const users = [{_id:1242, username:"Simi"},{_id:23534, username:"Resmi"}]
    service.findAll = jest.fn().mockResolvedValue(users);
    const response  = await resolver.users();
    expect(response.length).toBeGreaterThan(0);
    expect(response[0].username).toEqual('Simi');
  });

  it('test createUser mutation', async () => {
    const user= {username:"Aadi",password:"12478"};
    service.create = jest.fn().mockResolvedValue(user);
    const response  = await resolver.createUser(user);
    expect(response).toBeDefined;
    expect(response.username).toEqual('Aadi');
  });

});
