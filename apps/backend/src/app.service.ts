import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {EmployeeEntity} from "./employee/employee.entity";

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hey Ben';
  }


}
