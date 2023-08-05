import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
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

}