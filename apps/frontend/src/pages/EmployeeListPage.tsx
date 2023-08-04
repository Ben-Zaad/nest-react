import React from 'react';

// interface Item {
//     firstName: string;
//     lastName: string;
//     position: string;
// }

// interface Props {
//     items: Item[];
// }



const EmployeeListPage = () => {
    // const [employees, setEmployees] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/employee').then(
            (res) => {
                console.log("FINDME",res)
                res.text()
            }
        ).then((res)=>console.log("FINDME",res));
    }, [])

    return (
        <div>
            <h1>Item List</h1>
            <table>
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Position</th>
                    <th>View</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    );
};

// const handleViewClick = (item: Item) => {
//     // Implement your view logic here
//     console.log('View clicked for', item);
// };

export default EmployeeListPage;
