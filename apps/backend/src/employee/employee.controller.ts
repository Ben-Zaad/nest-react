import {Controller, Get, Param, Post} from '@nestjs/common';
import {Employee} from "./employee";
import {EmployeeService} from "./employee.service";

@Controller()
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {}

    @Get('/employee')
    getAllEmployees() {
        return this.employeeService.getAllEmployees();
    }

    @Get('/employee/:employeeId/tasks')
    getEmployeeTasks(@Param('employeeId') employeeId: string) {
        return this.employeeService.getEmployeeTasks(employeeId);
    }
}
