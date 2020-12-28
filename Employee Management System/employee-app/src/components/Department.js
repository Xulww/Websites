import React, { useState, useEffect } from 'react';
import { Table, Button, ButtonToolbar, InputGroup, FormControl } from 'react-bootstrap';

import { createBrowserHistory } from 'history';
import { AddDepartmentModal } from './AddModals/AddDepartmentModal';
import { EditDepartmentModal } from './EditModals/EditDepartmentModal';

export const Department = () => {
    const [deps, setDeps] = useState([]);
    const [search, setSearch] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [depid, setDepid] = useState('');
    const [depname, setDepname] = useState('');
    const [depcre, setDepcre] = useState('');
    const [depstname, setDepstname] = useState('');
    const [depstnum, setDepstnum] = useState('');
    const [depmgname, setDepmgname] = useState('');

    useEffect(() => {
        fetch('http://localhost:51958/api/department')
            .then(res => res.json())
            .then(data => { 
                setDeps(data);
        });
    }, []);

    const history = createBrowserHistory();

    const filterTable = deps.filter(dep => {
        return dep.DepartmentName.toLowerCase().includes(search.toLocaleLowerCase())
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

    const deleteDepartment = (depid) => {
        if (window.confirm('Are you sure you want to delete this department?')) {
            fetch('http://localhost:51958/api/department/' + depid, deleteObject);
            history.goBack();
        }
    }

    return (
        <React.Fragment>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Search By Department Name</InputGroup.Text>
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
                    <th>DepartmentID</th>
                    <th>DepartmentName</th>
                    <th>DepartmentCreated</th>
                    <th>DepartmentStreetName</th>
                    <th>DepartmentStreetNumber</th>
                    <th>DepartmentManagerName</th>
                    <th>Options</th>
                </tr>  
            </thead>
            <tbody>
                {filterTable.map(dep => {
                    return (
                        <tr key={dep.DepartmentID}>
                            <td>{dep.DepartmentID}</td>
                            <td>{dep.DepartmentName}</td>
                            <td>{dep.DepartmentCreated}</td>
                            <td>{dep.DepartmentStreetName}</td>
                            <td>{dep.DepartmentStreetNumber}</td>
                            <td>{dep.DepartmentManagerName}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button 
                                        className="mr-2" 
                                        variant="info"
                                        onClick={() => {
                                            setEditModalShow(true);
                                            setDepid(dep.DepartmentID);
                                            setDepname(dep.DepartmentName);
                                            setDepcre(dep.DepartmentCreated);
                                            setDepstname(dep.DepartmentStreetName);
                                            setDepstnum(dep.DepartmentStreetNumber);
                                            setDepmgname(dep.DepartmentManagerName);
                                        }}>Edit</Button>
                                    <Button 
                                        className="mr-2"
                                        onClick={() => deleteDepartment(dep.DepartmentID)}
                                        variant="danger">Delete</Button>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="primary" onClick={() => setModalShow(true)}>Add Department</Button>
                <AddDepartmentModal show={modalShow} onHide={modalDontShow} history={history} />
                <EditDepartmentModal 
                    show={editModalShow} 
                    onHide={editModalDontShow}
                    history={history} 
                    depid={depid}
                    depname={depname}
                    depcre={depcre}
                    depstname={depstname}
                    depstnum={depstnum}
                    depmgname={depmgname} />
            </ButtonToolbar>
        </React.Fragment>
    );
}