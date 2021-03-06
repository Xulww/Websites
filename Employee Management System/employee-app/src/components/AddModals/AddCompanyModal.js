import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import IconButton from '@material-ui/core/IconButton/IconButton';

export const AddCompanyModal = (props) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState('');

    const snackbarClose = (event) => {
        setSnackbarOpen(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const postObject = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CompanyID: null,
                CompanyName: event.target.CompanyName.value,
                CompanyCreated: event.target.CompanyCreated.value,
                CompanyStreetName: event.target.CompanyStreetName.value,
                CompanyStreetNumber: event.target.CompanyStreetNumber.value,
                CompanyCEOName: event.target.CompanyCEOName.value
            })
        }

        fetch('http://localhost:51958/api/company', postObject)
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
                        Add Company
            </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={(event) => handleSubmit(event)}>
                                <Form.Group controlId="CompanyName">
                                    <Form.Control
                                        type="text"
                                        name="CompanyName"
                                        required
                                        placeholder="Company Name" ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="CompanyCreated">
                                    <Form.Control
                                        type="text"
                                        name="CompanyCreated"
                                        placeholder="Company Created (yyyy-MM-dd hh:mm:ss)" ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="CompanyStreetName">
                                    <Form.Control
                                        type="text"
                                        name="CompanyStreetName"
                                        placeholder="Company Street Name" ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="CompanyStreetNumber">
                                    <Form.Control
                                        type="text"
                                        name="CompanyStreetNumber"
                                        placeholder="Company Street Number" ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="CompanyCEOName">
                                    <Form.Control
                                        type="text"
                                        name="CompanyCEOName"
                                        placeholder="Company CEO Name" ></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">Add</Button>
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