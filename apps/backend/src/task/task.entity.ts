import {Entity, Column, PrimaryGeneratedColumn, RelationOptions, ManyToOne, OneToOne, OneToMany} from 'typeorm';
import {Manager} from "../manager/manager";
import {EmployeeEntity} from "../employee/employee.entity";

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

    @ManyToOne( (type) => EmployeeEntity, (employee) => employee.tasks, { onDelete: 'CASCADE'})
    employee: EmployeeEntity;

    @ManyToOne( (type) => Manager, (manager) => manager.tasks, { onDelete: 'CASCADE'})
    manager: Manager;
}