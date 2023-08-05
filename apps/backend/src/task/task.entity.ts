import {Entity, Column, PrimaryGeneratedColumn, RelationOptions, ManyToOne, OneToOne, OneToMany} from 'typeorm';
import {Manager} from "../manager/manager";
import {Employee} from "../employee/employee";

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isDone: boolean;

    @Column()
    text: string;

    @Column()
    assignDate: Date;

    @Column()
    dueDate: Date;

    @ManyToOne( (type) => Employee, (employee) => employee.tasks, { onDelete: 'CASCADE'})
    employee: Employee;

    @ManyToOne( (type) => Manager, (manager) => manager.tasks, { onDelete: 'CASCADE'})
    manager: Manager;
}