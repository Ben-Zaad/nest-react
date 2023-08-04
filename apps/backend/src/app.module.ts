import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ServeStaticModule} from "@nestjs/serve-static";
import { TypeOrmModule } from '@nestjs/typeorm';

import {join} from "path";
import {DataSource} from "typeorm";
import {Employee} from "./employee/employee";
import {Manager} from "./manager/manager";
import {ReportEntity} from "./report/report.entity";
import {TaskEntity} from "./task/task.entity";

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../..', 'frontend','dist')
  }),
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'test',
    entities: [Employee, Manager,ReportEntity,TaskEntity],
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private dataSource: DataSource) {}
}
