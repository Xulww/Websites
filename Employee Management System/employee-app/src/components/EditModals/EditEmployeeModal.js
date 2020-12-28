import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import IconButton from '@material-ui/core/IconButton/IconButton';

export const EditEmployeeModal = (props) => {
    const [deps, setDeps] = useState([]);
    const [coms, setComs] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');

    useEffect(() => {
        fetch('http://localhost:51958/api/department')
            .then(res => res.json())
            .then(data => { 
                setDeps(data);
        });

        fetch('http://localhost:51958/api/company')
            .then(res => res.json())
            .then(data => { 
                setComs(data);
        });
    }, []);

    const snackbarClose = (event) => {
        setSnackbarOpen(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const postObject = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeID: event.target.EmployeeID.value,
                EmployeeFullName: event.target.EmployeeFullName.value,
                EmployeeHired: event.target.EmployeeHired.value,
                MailID: event.target.MailID.value,
                PhoneNumber: event.target.PhoneNumber.value,
                DepartmentID: event.target.DepartmentID.value.split('.')[0],
                CompanyID: event.target.CompanyID.value.split('.')[0]
            })
        }

        console.log(event.target.DepartmentID.value.split('.')[0]);

        fetch('http://localhost:51958/api/employee', postObject)
            .then(res => res.json())
            .then((result) => {
                //alert(result);
                setSnackbarOpen(true);
                setSnackbarMsg(result);
                props.history.goBack();
            })
            .catch(err => {
                //alert("Failed");
                setSnackbarOpen(true);
                setSnackbarMsg('Failed');
            });
    }

    let depComboDefVal = deps.filter(dep => dep.DepartmentName === props.empdep)
    let depComboObj = depComboDefVal[0];
    let depDefValString = "" + depComboObj?.DepartmentID + ". " + depComboObj?.DepartmentName + "";

    let comComboDefVal = coms.filter(com => com.CompanyName === props.empcom)
    let comComboObj = comComboDefVal[0];
    let comDefValString = "" + comComboObj?.CompanyID + ". " + comComboObj?.CompanyName + "";

    return (
        <div className="container">
            <Snackbar 
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={snackbarClose}
                message={<span id="message-id">{snackbarMsg}</span>}
                action={[
                    <IconButton 
                        key="close"
                        arial-label="Close"
                        color="inherit"
                        onClick={snackbarClose}>X</IconButton>
                ]} />
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Employee
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={(event) => handleSubmit(event)}>
                                <Form.Group controlId="EmployeeID">
                                    <Form.Control
                                        type="text"
                                        name="EmployeeID"
                                        required
                                        disabled
                                        defaultValue={props.empid}
                                        placeholder="Employee ID" ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="EmployeeFullName">
                                    <Form.Control
                                        type="text"
                                        name="EmployeeFullName"
                                        required
                                        defaultValue={props.empname}
                                        placeholder="Employee Full Name" ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="EmployeeHired">
                                    <Form.Control
                                        type="text"
                                        name="EmployeeHired"
                                        defaultValue={props.emphir}
                                        placeholder="Employee Hired" ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="MailID">
                                    <Form.Control
                                        type="text"
                                        name="MailID"
                                        defaultValue={props.empmail}
                                        placeholder="Mail" ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="PhoneNumber">
                                    <Form.Control
                                        type="text"
                                        name="PhoneNumber"
                                        defaultValue={props.empnum}
                                        placeholder="Phone Number" ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="DepartmentID">
                                    <Form.Control as="select" defaultValue={depDefValString}>
                                        {deps.map(dep => {
                                            return <option key={dep.DepartmentID}>{dep.DepartmentID}. {dep.DepartmentName}</option>
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="CompanyID" defaultValue={comDefValString}>
                                    <Form.Control as="select">
                                        {coms.map(com => {
                                            return <option key={com.CompanyID}>{com.CompanyID}. {com.CompanyName}</option>
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">Update</Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}