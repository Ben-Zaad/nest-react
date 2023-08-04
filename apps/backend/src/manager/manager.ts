import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {Employee} from "../employee/employee";
import {EmployeeDetails} from "../personalDetails/employeeDetails";
import {ReportEntity} from "../report/report.entity";

@Entity()
export class Manager extends EmployeeDetails {
    @OneToMany(type => Employee, employee => employee.manager)
    employees: Employee[];

    @ManyToOne(type => Manager, manager => manager.employees,{nullable: true})
    manager: Manager;

    @OneToMany(type => ReportEntity, report => report.manager)
    reports: Report[];
}