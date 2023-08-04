import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Employee} from "./employee";
import {EmployeeService} from "./employee.service";
import {EmployeeController} from "./employee.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Employee])],
    exports: [EmployeeService],
    controllers: [EmployeeController],
    providers: [EmployeeService],
})
export class EmployeeModule {}