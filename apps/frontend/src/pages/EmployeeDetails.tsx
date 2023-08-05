import React, {FC, useEffect} from 'react';
import axios from "axios";
import {formatDateToHumanReadable} from "./utils";
import {CurvedContainer} from "../components/styledComponents";
import styled from "styled-components";
import {ModalWrapper} from "../components/ModalWrapper";
import {CreateTask} from "../components/CreateTask";

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
    const [openCreateTask, setOpenCreateTask] = React.useState(false);

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

    const createTask = async (dueDate: string, text: string) => {
        try {
            const newTask = await axios.post(`/api/employee/${employee?.id}/newTask`, {
                dueDate,
                text,
            })
            setOpenCreateTask(false)
            setTasks([...tasks, newTask.data])
        } catch (error) {
            console.error(error)
        }
    }


    function deleteTask(id: number | undefined) {
        try {
            axios.delete(`/api/task/${id}`);
        }catch (e) {
            console.error('Error deleting',e)
        }
    }

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
                            <StyledTableHeader>First Name</StyledTableHeader>
                            <StyledTableHeader>Last Name</StyledTableHeader>
                            <StyledTableHeader>Position</StyledTableHeader>
                        </tr>
                        </thead>
                        <tbody>
                        <StyledTableData>{employee.firstName + ' '}</StyledTableData>
                        <StyledTableData>{employee.lastName}</StyledTableData>
                        <StyledTableData>{employee.position}</StyledTableData>
                        </tbody>
                    </table>
                    {employee.manager && <>
                      <div>
                        <table>
                          <thead>
                          <tr>
                            <StyledTableHeader>Manager Name</StyledTableHeader>
                          </tr>
                          </thead>
                          <tbody>
                          <StyledTableData>{employee.manager?.firstName + ' '}</StyledTableData>
                          <StyledTableData>{employee.manager?.lastName}</StyledTableData>
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
                        <StyledTableHeader>ID</StyledTableHeader>
                        <StyledTableHeader>Text</StyledTableHeader>
                        <StyledTableHeader>Assign Date</StyledTableHeader>
                        <StyledTableHeader>Due Date</StyledTableHeader>
                        <StyledTableHeader>Finished</StyledTableHeader>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <StyledTableData>{task?.id}</StyledTableData>
                            <StyledTableData>{task?.text}</StyledTableData>
                            <StyledTableData>{formatDateToHumanReadable(task?.assignDate)}</StyledTableData>
                            <StyledTableData>{formatDateToHumanReadable(task?.dueDate)}</StyledTableData>
                            <StyledTableData>{task?.isDone}</StyledTableData>
                            <StyledTableData>
                                <button onClick={() => deleteTask(task?.id)}>Remove Task</button>
                                <ModalWrapper openModal={openCreateTask} setOpenModal={setOpenCreateTask}><h1>CREATE TASK</h1>
                                    <CreateTask
                                        employeeId={employee?.id}
                                        onCancel={() => setOpenCreateTask(false)}
                                        onSave={createTask}
                                    />
                                </ModalWrapper>
                            </StyledTableData>
                        </tr>
                    ))}
                    </tbody>
                    <button onClick={() => setOpenCreateTask(!openCreateTask)}>New Task</button>
                    <ModalWrapper openModal={openCreateTask} setOpenModal={setOpenCreateTask}>
                        <CreateTask employeeId={employee.id} onSave={createTask}
                                    onCancel={() => setOpenCreateTask(false)}/>
                    </ModalWrapper>
                </table>
                <h2>Subordinates</h2>
                <table>
                    <thead>
                    <tr>
                        <StyledTableHeader>ID</StyledTableHeader>
                        <StyledTableHeader>First Name</StyledTableHeader>
                        <StyledTableHeader>Last Name</StyledTableHeader>
                    </tr>
                    </thead>
                    <tbody>
                    {subordinates.map((task) => (
                        <tr key={task.id}>
                            <StyledTableData>{task?.id}</StyledTableData>
                            <StyledTableData>{task?.firstName}</StyledTableData>
                            <StyledTableData>{task?.lastName}</StyledTableData>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </MainContainer>
    );
};

const StyledImage = styled.img`
  max-width: 400px;
  max-height: 500px;
`

const StyledTableHeader = styled.th`
  padding: 1rem;
`

const StyledTableData = styled.td`
  padding: 1rem;
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
  justify-content: space-around;
`


export default EmployeeDetail;
