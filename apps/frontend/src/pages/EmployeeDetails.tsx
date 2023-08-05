import React, {FC, useEffect} from 'react';
import axios from "axios";

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
    title: string;
    description: string;
}

interface Props {
    employee: Partial<Employee>;
    onClose: () => void;

}

const EmployeeDetail: FC<Props> = ({ employee, onClose }) => {
    const [tasks, setTasks] = React.useState<Employee[]>([]);

    useEffect(() => {
        fetchEmployeeData();
    }, []);

    const fetchEmployeeData = async () => {
        try {
            const response = await axios.get(`/api/employee/${employee?.id}/tasks`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };


    return (
        <div>
            <button onClick={onClose}>Close</button>
            <div className="employee-header">
                <img src={employee?.imageUrl} alt={`${employee.firstName} ${employee.lastName}`} className="employee-picture" />
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
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task?.id}</td>
                            {/*<td>{task?.title}</td>*/}
                            {/*<td>{task?.description}</td>*/}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeDetail;
