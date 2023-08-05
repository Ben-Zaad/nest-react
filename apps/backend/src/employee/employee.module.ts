import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Employee} from "./employee";
import {EmployeeService} from "./employee.service";
import {EmployeeController} from "./employee.controller";
import {TaskEntity} from "../task/task.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Employee, TaskEntity])],
    exports: [EmployeeService],
    controllers: [EmployeeController],
    providers: [EmployeeService],
})
export class EmployeeModule {}