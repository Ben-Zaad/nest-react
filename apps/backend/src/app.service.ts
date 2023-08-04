import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {Employee} from "./employee/employee";

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hey Ben';
  }


}
