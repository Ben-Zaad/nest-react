import {InjectRepository} from "@nestjs/typeorm";
import {Employee} from "./employee";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {TaskEntity} from "../task/task.entity";

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
        @InjectRepository(TaskEntity)
        private taskRepository: Repository<TaskEntity>,
    ) {}

    getAllEmployees(): Promise<Employee[]>{
        return this.employeeRepository.find()
    }

    getEmployeeTasks(employeeId) {
        return this.taskRepository.find({where: {employee: {id:employeeId}}})
    }

    getEmployeeSubordinates(employeeId) {
        return this.employeeRepository.find({where: {manager: {id:employeeId}}})
    }

    createEmployee(employee: Employee) {
        return this.employeeRepository.save(employee);
    }

    createEmploteeReport(employeeId, report){

    }
}
