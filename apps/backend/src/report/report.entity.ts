import {Entity, Column, PrimaryGeneratedColumn, RelationOptions, ManyToOne, OneToOne, OneToMany} from 'typeorm';
import {Manager} from "../manager/manager";
import {EmployeeEntity} from "../employee/employee.entity";

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

    @ManyToOne( (type) => EmployeeEntity, (employee) => employee.reports, { onDelete: 'CASCADE'})
    employee: EmployeeEntity;

    @ManyToOne( (type) => Manager, (manager) => manager.reports, { onDelete: 'CASCADE'})
    manager: Manager;
}