import {Controller, Get, Param} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/employee/:employeeId')
  getEmployeeTasks(@Param('employeeId') employeeId: string) {
    return this.appService.getEmployeeTasks(employeeId);
  }
}
