import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {ReportEntity} from "../report/report.entity";
import {TaskEntity} from "../task/task.entity";

@Entity()
export class Employee{
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

    @Column({nullable: true})
    imageUrl: string;

    @OneToMany(type => ReportEntity, report => report.employee)
    reports: Report[];

    @OneToMany(type => ReportEntity, report => report.employee)
    tasks: TaskEntity[];

    @ManyToOne(type => Employee, manager => manager.subordinates)
    manager: Employee;

    @OneToMany(type => Employee, subordinates => subordinates.manager)
    subordinates: Employee[]
}