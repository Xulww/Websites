import React, { useState, useEffect } from 'react';
import { Table, Button, ButtonToolbar, InputGroup, FormControl } from 'react-bootstrap';

import { createBrowserHistory } from 'history';
import { AddEmployeeModal } from './AddModals/AddEmployeeModal';
import { EditEmployeeModal } from './EditModals/EditEmployeeModal';

export const Employee = () => {
    const [emps, setEmps] = useState([]);
    const [search, setSearch] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [empid, setEmpid] = useState('');
    const [empname, setEmpname] = useState('');
    const [emphir, setEmphir] = useState('');
    const [empmail, setEmpmail] = useState('');
    const [empnum, setEmpnum] = useState('');
    const [empdep, setEmpdep] = useState('');
    const [empcom, setEmpcom] = useState('');

    useEffect(() => {
        populateTable();
    }, []);

    const populateTable = () => {
        fetch('http://localhost:51958/api/employee')
            .then(res => res.json())
            .then(data => { 
                setEmps(data);
        });
    }

    const history = createBrowserHistory();

    const filterTable = emps.filter(emp => {
        return emp.EmployeeFullName.toLowerCase().includes(search.toLocaleLowerCase())
    })
    
    let modalDontShow = () => {
        setModalShow(false);
    }

    let editModalDontShow = () => {
        setEditModalShow(false);
    }

    const deleteObject = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const deleteEmployee = (empid) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            fetch('http://localhost:51958/api/employee/' + empid, deleteObject);
            history.goBack();
        }
    }

    return (
        <React.Fragment>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Search By Employee Name</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    type="text"
                    onChange={event => setSearch(event.target.value)}
                    />
            </InputGroup>
            <Table className="mt-4" striped bordered hover size="small">
            <thead>
                <tr>
                    <th>EmployeeID</th>
                    <th>EmployeeFullName</th>
                    <th>EmployeeHired</th>
                    <th>MailID</th>
                    <th>PhoneNumber</th>
                    <th>DepartmentName</th>
                    <th>CompanyName</th>
                    <th>Options</th>
                </tr>  
            </thead>
            <tbody>
                {filterTable.map(emp => {
                    return (
                        <tr key={emp.EmployeeID}>
                            <td>{emp.EmployeeID}</td>
                            <td>{emp.EmployeeFullName}</td>
                            <td>{emp.EmployeeHired}</td>
                            <td>{emp.MailID}</td>
                            <td>{emp.PhoneNumber}</td>
                            <td>{emp.DepartmentName}</td>
                            <td>{emp.CompanyName}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button 
                                        className="mr-2" 
                                        variant="info"
                                        onClick={() => {
                                            setEditModalShow(true);
                                            setEmpid(emp.EmployeeID);
                                            setEmpname(emp.EmployeeFullName);
                                            setEmphir(emp.EmployeeHired);
                                            setEmpmail(emp.MailID);
                                            setEmpnum(emp.PhoneNumber);
                                            setEmpdep(emp.DepartmentName);
                                            setEmpcom(emp.CompanyName);
                                        }}>Edit</Button>
                                    <Button 
                                        className="mr-2"
                                        onClick={() => deleteEmployee(emp.EmployeeID)}
                                        variant="danger">Delete</Button>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="primary" onClick={() => setModalShow(true)}>Add Employee</Button>
                <AddEmployeeModal show={modalShow} onHide={modalDontShow} history={history} />
                <EditEmployeeModal 
                    show={editModalShow} 
                    onHide={editModalDontShow} 
                    history={history}
                    empid={empid}
                    empname={empname}
                    emphir={emphir}
                    empmail={empmail}
                    empnum={empnum}
                    empdep={empdep}
                    empcom={empcom} />
            </ButtonToolbar>
        </React.Fragment>
    );
}