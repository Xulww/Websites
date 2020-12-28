import React, { useState, useEffect } from 'react';
import { Table, Button, ButtonToolbar, InputGroup, FormControl } from 'react-bootstrap';

import { createBrowserHistory } from 'history';
import { AddCompanyModal } from './AddModals/AddCompanyModal';
import { EditCompanyModal } from './EditModals/EditCompanyModal';

export const Company = () => {
    const [coms, setComs] = useState([]);
    const [search, setSearch] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [comid, setComid] = useState('');
    const [comname, setComname] = useState('');
    const [comcre, setComcre] = useState('');
    const [comstname, setComstname] = useState('');
    const [comstnum, setComstnum] = useState('');
    const [comceoname, setComceoname] = useState('');

    useEffect(() => {
        populateTable();
    }, []);

    const populateTable = () => {
        fetch('http://localhost:51958/api/company')
            .then(res => res.json())
            .then(data => { 
                setComs(data);
            });
    }

    const filterTable = coms.filter(com => {
        return com.CompanyName.toLowerCase().includes(search.toLocaleLowerCase())
    })
    
    const history = createBrowserHistory();

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

    const deleteCompany = (comid) => {
        if (window.confirm('Are you sure you want to delete this company?')) {
            fetch('http://localhost:51958/api/company/' + comid, deleteObject);
            history.goBack();
        }
    }

    return (
        <React.Fragment>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroup-sizing-default">Search By Company Name</InputGroup.Text>
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
                    <th>CompanyID</th>
                    <th>CompanyName</th>
                    <th>CompanyCreated</th>
                    <th>CompanyStreetName</th>
                    <th>CompanyStreetNumber</th>
                    <th>CompanyCEOName</th>
                    <th>Options</th>
                </tr>  
            </thead>
            <tbody>
                {filterTable.map(com => {
                    return (
                        <tr key={com.CompanyID}>
                            <td>{com.CompanyID}</td>
                            <td>{com.CompanyName}</td>
                            <td>{com.CompanyCreated}</td>
                            <td>{com.CompanyStreetName}</td>
                            <td>{com.CompanyStreetNumber}</td>
                            <td>{com.CompanyCEOName}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button 
                                        className="mr-2" 
                                        variant="info"
                                        onClick={() => {
                                            setEditModalShow(true);
                                            setComid(com.CompanyID);
                                            setComname(com.CompanyName);
                                            setComcre(com.CompanyCreated);
                                            setComstname(com.CompanyStreetName);
                                            setComstnum(com.CompanyStreetNumber);
                                            setComceoname(com.CompanyCEOName);
                                        }}>Edit</Button>
                                    <Button 
                                        className="mr-2"
                                        onClick={() => deleteCompany(com.CompanyID)}
                                        variant="danger">Delete</Button>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="primary" onClick={() => setModalShow(true)}>Add Company</Button>
                <AddCompanyModal show={modalShow} onHide={modalDontShow} history={history} />
                <EditCompanyModal 
                    show={editModalShow} 
                    onHide={editModalDontShow}
                    history={history} 
                    comid={comid}
                    comname={comname}
                    comcre={comcre}
                    comstname={comstname}
                    comstnum={comstnum}
                    comceoname={comceoname} />
            </ButtonToolbar>
        </React.Fragment>
    );
}