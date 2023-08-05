import {InjectRepository} from "@nestjs/typeorm";
import {Employee} from "./employee";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {TaskEntity} from "../task/task.entity";
import {ReportEntity} from "../report/report.entity";

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
        @InjectRepository(TaskEntity)
        private taskRepository: Repository<TaskEntity>,
        @InjectRepository(ReportEntity)
        private reportRepository: Repository<ReportEntity>,
    ) {
    }

    getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.find({relations: ['manager']})
    }

    getEmployeeById(employeeId): Promise<Employee> {
        return this.employeeRepository.findOne({where: {id: employeeId}, relations: ['manager']})
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
            newTask.employee = employee;
            newTask.dueDate = dueDate;
            newTask.assignDate = new Date();
            newTask.text = text;
            newTask.isDone = false;
            return this.taskRepository.save(newTask)
        } catch (e) {

        }
    }

    async markTaskDone(taskId){
        try {
            const task = await this.taskRepository.findOne({where: {id: taskId},relations:['employee']})
            task.isDone = true;
            await this.taskRepository.save(task);
            return this.getEmployeeTasks(task.employee.id)
        } catch (e) {
            console.error(`Can't Change task #${taskId} status`, e)
        }
    }

    async deleteTask(taskId) {
        try {
            const task = await this.taskRepository.findOne({where: {id: taskId},relations:['employee']})
            await this.taskRepository.remove(task)
            return this.getEmployeeTasks(task.employee.id)
        } catch (e) {
            console.error(`Can't Delete task #${taskId}`, e)
        }
    }


    async createEmployeeReport({employeeId, text, status}) {
        try {
            const employee = await this.getEmployeeById(employeeId)
            const newReport = this.reportRepository.create()
            newReport.employee = employee;
            newReport.date = new Date();
            newReport.text = text;
            newReport.status = status;
            return this.reportRepository.save(newReport)
        } catch (e) {

        }
    }
    createEmployee(employee: Employee) {
        return this.employeeRepository.save(employee);
    }
}
