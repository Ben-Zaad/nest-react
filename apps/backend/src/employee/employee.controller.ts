import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {EmployeeService} from "./employee.service";
import {TaskEntity} from "../task/task.entity";
import {ReportEntity} from "../report/report.entity";

@Controller()
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {
    }

    @Get('/employee')
    getAllEmployees() {
        return this.employeeService.getAllEmployees();
    }

    @Get('/employee/:employeeId/tasks')
    getEmployeeTasks(@Param('employeeId') employeeId: string) {
        return this.employeeService.getEmployeeTasks(employeeId);
    }

    @Get('/employee/:employeeId/subordinates')
    getEmployeeSubordinates(@Param('employeeId') employeeId: string) {
        return this.employeeService.getEmployeeSubordinates(employeeId);
    }

    @Get('/employee/:employeeId/manager')
    getEmployeeManager(@Param('employeeId') employeeId: string) {
        return this.employeeService.getEmployeeManager(employeeId);
    }

    @Post('employee/:employeeId/newTask')
    createTask(@Param('employeeId') employeeId: string, @Body() task: Partial<TaskEntity>,
    ) {
        return this.employeeService.createTask({employeeId, dueDate: task.dueDate, text: task.text});
    }

    @Put('task/:taskId')
    markTaskDone(@Param('taskId') taskId: string) {
        return this.employeeService.markTaskDone(taskId);
    }

    @Delete('task/:taskId')
    deleteTask(@Param('taskId') taskId: string) {
        return this.employeeService.deleteTask(taskId);
    }

    @Post('employee/:employeeId/newReport')
    createReport(@Param('employeeId') employeeId: string, @Body() report: Partial<ReportEntity>,
    ) {
        return this.employeeService.createEmployeeReport({employeeId, text: report.text, status: report.status});
    }
}
