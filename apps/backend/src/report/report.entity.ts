import {Entity, Column, PrimaryGeneratedColumn, RelationOptions, ManyToOne, OneToOne, OneToMany} from 'typeorm';
import {Manager} from "../manager/manager";
import {Employee} from "../employee/employee";

@Entity()
export class ReportEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @Column()
    text: string;

    @Column()
    date: Date;

    @ManyToOne( (type) => Employee, (employee) => employee.reports, { onDelete: 'CASCADE'})
    employee: Employee;

    @ManyToOne( (type) => Manager, (manager) => manager.reports, { onDelete: 'CASCADE'})
    manager: Manager;
}