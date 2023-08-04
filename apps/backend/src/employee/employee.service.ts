import {InjectRepository} from "@nestjs/typeorm";
import {Employee} from "./employee";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
    ) {}

    getEmployeeTasks(employeeId) {
        return this.employeeRepository.find({where: {id: employeeId}})
    }

    createEmployee(employee: Employee) {
        return this.employeeRepository.save(employee);
    }

    createEmploteeReport(employeeId, report){

    }
}
