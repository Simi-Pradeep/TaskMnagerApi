import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { DateResolver} from "graphql-scalars";
import { ConfigModule } from '@nestjs/config';

Logger.log("Directory Name: ",__dirname);
Logger.log("process.env.NIRA_TODO_WEB_URL: ",process.env.NIRA_TODO_WEB_URL);
Logger.log("process.env.DB_URL: ",process.env.DB_URL);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      resolvers: {Date: DateResolver},
      playground: true,
      cors: {
        origin: `${process.env.NIRA_TODO_WEB_URL}`,
        credentials: false,
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url:process.env.DB_URL,
        //'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
      entities: ['dist/**/*.entity.js'],
      database:'nira-todo',
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }),
    UserModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    Logger.log("process.env.NIRA_TODO_WEB_URL: ", `${process.env.NIRA_TODO_WEB_URL}`);
    Logger.log("process.env.DB_URL: ",process.env.DB_URL);
  }
}
