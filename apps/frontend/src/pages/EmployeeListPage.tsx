import React, {useEffect, useState} from 'react';
import axios from 'axios';
import EmployeeDetail from "./EmployeeDetails";
import {NestedModal} from "../components/NestedModal";
import styled from "styled-components";

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    position: string;
}

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [openChildModal, setOpenChildModal] = React.useState(false);

    useEffect(() => {
        fetchEmployeeData();
    }, []);

    const fetchEmployeeData = async () => {
        try {
            const response = await axios.get('/api/employee');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    const handleDetailsClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setOpenModal(true);
    };

    const handleClosePopup = () => {
        setSelectedEmployee(null);
    };

    return (
        <div>
            <h1>Employee List</h1>
            <table>
                <thead>
                <tr>
                    <StyledTableHeader>ID</StyledTableHeader>
                    <StyledTableHeader>First Name</StyledTableHeader>
                    <StyledTableHeader>Last Name</StyledTableHeader>
                    <StyledTableHeader>Position</StyledTableHeader>
                    <StyledTableHeader>Details</StyledTableHeader>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <StyledTableData>{employee.id}</StyledTableData>
                        <StyledTableData>{employee.firstName}</StyledTableData>
                        <StyledTableData>{employee.lastName}</StyledTableData>
                        <StyledTableData>{employee.position}</StyledTableData>
                        <StyledTableData>
                            <Button onClick={() => handleDetailsClick(employee)}>View</Button>
                        </StyledTableData>
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedEmployee && (
                <NestedModal openModal={openModal} setOpenModal={setOpenModal} openChildModal={openChildModal}
                             setOpenChildModal={setOpenChildModal}>
                    <EmployeeDetail employee={selectedEmployee}
                                    onClose={handleClosePopup}/>
                </NestedModal>
            )}
        </div>
    );
};

const Button = styled.button`
  background-color: cadetblue;
`

const StyledTableData = styled.td`
  padding: 1rem
`

const StyledTableHeader = styled.th`
  padding: 1rem
`

export default EmployeeList;
