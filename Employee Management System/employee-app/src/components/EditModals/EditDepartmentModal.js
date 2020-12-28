import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import IconButton from '@material-ui/core/IconButton/IconButton';

export const EditDepartmentModal = (props) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');

    const snackbarClose = (event) => {
        setSnackbarOpen(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const editObject = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DepartmentID: event.target.DepartmentID.value,
                DepartmentName: event.target.DepartmentName.value,
                DepartmentCreated: event.target.DepartmentCreated.value,
                DepartmentStreetName: event.target.DepartmentStreetName.value,
                DepartmentStreetNumber: event.target.DepartmentStreetNumber.value,
                DepartmentManagerName: event.target.DepartmentManagerName.value
            })
        }

        fetch('http://localhost:51958/api/department', editObject)
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

    return (
        <div className="container">
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
                        Edit Department
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={(event) => handleSubmit(event)}>
                                <Form.Group controlId="DepartmentID">
                                    <Form.Control
                                        type="text"
                                        name="DepartmentID"
                                        required
                                        disabled
                                        defaultValue={props.depid}
                                        placeholder="Department ID" ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="DepartmentName">
                                    <Form.Control
                                        type="text"
                                        name="DepartmentName"
                                        required
                                        defaultValue={props.depname}
                                        placeholder="Department Name" ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="DepartmentCreated">
                                    <Form.Control
                                        type="text"
                                        name="DepartmentCreated"
                                        defaultValue={props.depcre}
                                        placeholder="Department Created" ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="DepartmentStreetName">
                                    <Form.Control
                                        type="text"
                                        name="DepartmentStreetName"
                                        defaultValue={props.depstname}
                                        placeholder="Department Street Name" ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="DepartmentStreetNumber">
                                    <Form.Control
                                        type="text"
                                        name="DepartmentStreetNumber"
                                        defaultValue={props.depstnum}
                                        placeholder="Department Street Number" ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="DepartmentManagerName">
                                    <Form.Control
                                        type="text"
                                        name="DepartmentManagerName"
                                        defaultValue={props.depmgname}
                                        placeholder="Department Manager Name" ></Form.Control>
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