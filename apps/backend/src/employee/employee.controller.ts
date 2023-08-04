import {Controller, Get, Param, Post} from '@nestjs/common';
import {Employee} from "./employee";
import {EmployeeService} from "./employee.service";

@Controller()
export class EmployeeController {
    constructor(private readonly emloyeeService: EmployeeService) {}

    @Get('/employee/:employeeId')
    getEmployeeTasks(@Param('employeeId') employeeId: string) {
        return this.emloyeeService.getEmployeeTasks(employeeId);
    }


}
