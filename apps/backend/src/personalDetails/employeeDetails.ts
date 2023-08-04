import {Entity, Column, PrimaryGeneratedColumn, RelationOptions, ManyToOne, OneToMany} from 'typeorm';
import {Manager} from "../manager/manager";
import {Employee} from "../employee/employee";
import {ReportEntity} from "../report/report.entity";
import {TaskEntity} from "../task/task.entity";

@Entity()
export abstract class EmployeeDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({default: true})
    isActive: boolean;

    @Column()
    position: string;

    @Column({nullable: true})
    address: string;

    @Column()
    phoneNumber: string;

    @OneToMany(type => ReportEntity, report => report.employee)
    reports: Report[];

    @OneToMany(type => ReportEntity, report => report.employee)
    tasks: TaskEntity[];
}