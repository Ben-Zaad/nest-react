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
    ) {
    }

    getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.find({relations: ['manager']})
    }

    getEmployeeById(employeeId): Promise<Employee> {
        return this.employeeRepository.findOne({where: {id: employeeId} ,relations: ['manager']})
    }

    getEmployeeTasks(employeeId) {
        return this.taskRepository.find({where: {employee: {id: employeeId}}})
    }

    getEmployeeSubordinates(employeeId) {
        return this.employeeRepository.find({where: {manager: {id: employeeId}}})
    }

    getEmployeeManager(employeeId) {
        return this.employeeRepository.find({where: {id: employeeId}, relations: ['manager']})
    }

    async createTask({employeeId, dueDate, text}) {
        try {
            const employee = await this.getEmployeeById(employeeId)
            const newTask = this.taskRepository.create()
            console.log('NEW TASK', newTask)
            newTask.employee = employee;
            newTask.dueDate = dueDate;
            newTask.text = text;
        } catch (e) {

        }
    }

    createEmployee(employee: Employee) {
        return this.employeeRepository.save(employee);
    }

    createEmploteeReport(employeeId, report) {

    }
}
