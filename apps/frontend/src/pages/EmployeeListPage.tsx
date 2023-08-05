import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeDetail from "./EmployeeDetails";
import {NestedModal} from "../components/NestedModal";

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    position: string;
}

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [open, setOpen] = React.useState(false);

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
        setOpen(true);
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
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Position</th>
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.position}</td>
                        <td>
                            <button onClick={() => handleDetailsClick(employee)}>Details</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {selectedEmployee && (
                <NestedModal open={open} setOpen={setOpen}><EmployeeDetail employee={selectedEmployee} onClose={handleClosePopup} /></NestedModal>
            )}
        </div>
    );
};

export default EmployeeList;
