import React, {FC, useEffect} from 'react';
import axios from "axios";
import {formatDateToHumanReadable} from "./utils";
import {CurvedContainer} from "../components/styledComponents";
import styled from "styled-components";
import {ModalWrapper} from "../components/ModalWrapper";

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    position: string;
    manager: Employee;
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

const EmployeeDetail: FC<Props> = ({employee, onClose}) => {
    const [tasks, setTasks] = React.useState<Task[]>([]);
    const [subordinates, setSubordinates] = React.useState<Employee[]>([]);
    const [openReports, setOpenReports] = React.useState(false);

    useEffect(() => {
        fetchEmployeeData();
    }, []);

    const fetchEmployeeData = async () => {
        try {
            const tasks = await axios.get(`/api/employee/${employee?.id}/tasks`);
            const subordinates = await axios.get(`/api/employee/${employee?.id}/subordinates`);
            setTasks(tasks.data);
            setSubordinates(subordinates.data);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };


    return (
        <MainContainer>
            <button onClick={onClose}>Close</button>
            <RowContainer>
                <StyledImage src={employee?.imageUrl} alt={`${employee.firstName} ${employee.lastName}`}
                             className="employee-picture"/>
                <EmployeeDetailContainer>
                    <table>
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Position</th>
                        </tr>
                        </thead>
                        <tbody>
                        <td>{employee.firstName + ' '}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.position}</td>
                        </tbody>
                    </table>
                    {employee.manager && <>
                      <div>
                        <table>
                          <thead>
                          <tr>
                            <th>Manager Name</th>
                          </tr>
                          </thead>
                          <tbody>
                          <td>{employee.manager?.firstName + ' '}</td>
                          <td>{employee.manager?.lastName}</td>
                          </tbody>
                        </table>
                        <button onClick={() => setOpenReports(!openReports)}>Report</button>
                        <ModalWrapper openModal={openReports} setOpenModal={setOpenReports}><h1>REPORT</h1>
                        </ModalWrapper>
                      </div>
                    </>}
                </EmployeeDetailContainer>
            </RowContainer>
            <div>
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

                    <h2>Subordinates</h2>
                    <tbody>
                    {subordinates.map((task) => (
                        <tr key={task.id}>
                            <td>{task?.id}</td>
                            <td>{task?.firstName}</td>
                            <td>{task?.lastName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </MainContainer>
    );
};

const StyledImage = styled.img`
  max-width: 500px;
  max-height: 500px;
`

const EmployeeDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const MainContainer = styled(CurvedContainer)`
  position: sticky;
  width: fit-content;
  overflow: hidden;
`


export default EmployeeDetail;
