import {Entity, Column, PrimaryGeneratedColumn, RelationOptions, ManyToOne, OneToMany} from 'typeorm';
import {Manager} from "../manager/manager";
import {EmployeeDetails} from "../personalDetails/employeeDetails";

@Entity()
export class Employee extends EmployeeDetails{
    @ManyToOne(type => Manager, manager => manager.employees)
    manager: Manager;
}