import React, { useCallback } from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Button, Row, Col, Form } from 'react-bootstrap';

import app from './base';

const SignUp = ({ history }) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();

        const {email, password} = event.target.elements;

        try {
            await app.auth().createUserWithEmailAndPassword(email.value, password.value);
            history.push('/');
        } catch (error) {
            alert(error);
        }
    }, [history]);

    return (
        <div className="container">
            <Row>
                <Col sm={6}>
                    <h4>Sign Up</h4>
                    <Form onSubmit={handleSignUp}>
                        <Form.Group controlId="email">
                            <Form.Control
                                type="email"
                                name="email"
                                required
                                maxLength={100}
                                placeholder="E-mail" ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Control
                                type="password"
                                name="password"
                                minLength={6}
                                placeholder="Password" ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="primary" type="submit">SignUp</Button>
                        </Form.Group>
                    </Form>
                    <div>
                        Already have an account?
                        <NavLink className="d-inline p-2" to="/login">Log In!</NavLink>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default withRouter(SignUp);