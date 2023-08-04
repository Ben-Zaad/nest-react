import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {Employee} from "./employee/employee";

@Injectable()
export class AppService {
  constructor(
      @InjectRepository(Employee)
      private employeeRepository: Repository<Employee>,
  ) {}
  getHello(): string {
    return 'Hey Ben';
  }

  getEmployeeTasks(employeeId) {
    return this.employeeRepository.find({where: {id: employeeId}})
  }
}
