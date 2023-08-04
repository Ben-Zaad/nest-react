import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ServeStaticModule} from "@nestjs/serve-static";
import { TypeOrmModule } from '@nestjs/typeorm';

import {join} from "path";
import {DataSource} from "typeorm";

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
    entities: [],
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private dataSource: DataSource) {}
}
