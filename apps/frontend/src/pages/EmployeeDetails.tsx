import React, {FC, useEffect} from 'react';
import axios from "axios";
import {formatDateToHumanReadable} from "./utils";
import {CurvedContainer} from "../components/styledComponents";
import styled from "styled-components";

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    position: string;
    manager: string;
    imageUrl: string;
    tasks: Task[];
}

interface Task {
    id: number;
    assignDate: string;
    dueDate: string;
    isDone: boolean;
    text: string;
}

interface Props {
    employee: Partial<Employee>;
    onClose: () => void;

}

const EmployeeDetail: FC<Props> = ({ employee, onClose }) => {
    const [tasks, setTasks] = React.useState<Task[]>([]);

    useEffect(() => {
        fetchEmployeeData();
    }, []);

    const fetchEmployeeData = async () => {
        try {
            const response = await axios.get(`/api/employee/${employee?.id}/tasks`);
            console.log(response.data);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };


    return (
        <CurvedContainer>
            <button onClick={onClose}>Close</button>
            <div className="employee-header">
                <StyledImage src={employee?.imageUrl} alt={`${employee.firstName} ${employee.lastName}`} className="employee-picture" />
                <div className="employee-info">
                    <div className="employee-name">{`${employee.firstName} ${employee.lastName}`}</div>
                    <div className="employee-position">{employee.position}</div>
                    <div className="employee-manager">
                        {employee.manager}
                        <button className="report-button">Report</button>
                    </div>
                </div>
            </div>
            <div className="tasks">
                <h2>Tasks</h2>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Text</th>
                        <th>Assign Date</th>
                        <th>Due Date</th>
                        <th>Finished</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task?.id}</td>
                            <td>{task?.text}</td>
                            <td>{formatDateToHumanReadable(task?.assignDate)}</td>
                            <td>{formatDateToHumanReadable(task?.dueDate)}</td>
                            <td>{task?.isDone}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </CurvedContainer>
    );
};

const StyledImage = styled.img`
    width: 300px;
    height: 200px;
`

export default EmployeeDetail;
