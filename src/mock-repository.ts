import { MongoRepository } from "typeorm";

export const repositoryMockFactory: () => MockType<MongoRepository<any>> = jest.fn(() => ({
    findOne: jest.fn(entity => entity),
    find: jest.fn(entity => entity),
    save: jest.fn(entity => entity)
  }));

  export type MockType<T> = {
    [P in keyof T]?: jest.Mock<{}>;
  };